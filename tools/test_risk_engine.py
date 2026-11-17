"""Checks the risk engine against cases with known answers.

Run:  python3 tools/test_risk_engine.py
"""
import math
import os
import random
import sys
import unittest

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import risk_engine as re_  # noqa: E402


def synthetic_bars(daily_vol, n=300, seed=0, start=100.0, rho_with=None, rho=0.0):
    """Daily bars with a known volatility, optionally correlated with another
    series' shocks. Returns (bars, shocks)."""
    rnd = random.Random(seed)
    shocks = [rnd.gauss(0, 1) for _ in range(n)]
    if rho_with is not None:
        shocks = [rho * a + math.sqrt(1 - rho * rho) * b for a, b in zip(rho_with, shocks)]
    bars, p = [], start
    for i, z in enumerate(shocks):
        p *= math.exp(daily_vol * z)
        d = f"2026-{1 + i // 28:02d}-{1 + i % 28:02d}"
        bars.append({"date": d, "high": p * 1.01, "low": p * 0.99, "close": p, "adj": p})
    return bars, shocks


class LinearAlgebra(unittest.TestCase):
    def test_jacobi_reconstructs(self):
        A = [[4, 1, 2], [1, 3, 0.5], [2, 0.5, 5]]
        vals, V = re_.jacobi_eigen(A)
        n = 3
        M = [[sum(V[i][k] * vals[k] * V[j][k] for k in range(n)) for j in range(n)] for i in range(n)]
        for i in range(n):
            for j in range(n):
                self.assertAlmostEqual(M[i][j], A[i][j], places=9)

    def test_repair_makes_invalid_matrix_valid(self):
        # Three things that cannot all be true at once: A~B, A~C strongly,
        # but B and C strongly opposed.
        R = [[1, 0.9, 0.9], [0.9, 1, -0.9], [0.9, -0.9, 1]]
        self.assertLess(min(re_.jacobi_eigen(R)[0]), 0)
        F = re_.nearest_correlation(R)
        self.assertGreaterEqual(min(re_.jacobi_eigen(F)[0]), -1e-9)
        for i in range(3):
            self.assertAlmostEqual(F[i][i], 1.0, places=9)


class PortfolioMaths(unittest.TestCase):
    def test_two_asset_closed_form(self):
        s1, s2, rho, w = 0.2, 0.3, 0.5, [0.5, 0.5]
        out = re_.portfolio_risk(w, [s1, s2], [[1, rho], [rho, 1]])
        expected = math.sqrt(0.25 * s1 ** 2 + 0.25 * s2 ** 2 + 2 * 0.25 * rho * s1 * s2)
        self.assertAlmostEqual(out["sigma"], expected, places=12)

    def test_contributions_sum_to_total(self):
        rnd = random.Random(1)
        n = 8
        vols = [rnd.uniform(0.2, 1.0) for _ in range(n)]
        R = re_.nearest_correlation([[1 if i == j else 0.3 for j in range(n)] for i in range(n)])
        w = [rnd.uniform(-0.12, 0.12) for _ in range(n)]
        out = re_.portfolio_risk(w, vols, R)
        self.assertAlmostEqual(sum(out["rc"]), out["sigma"], places=10)

    def test_short_hedges_its_twin(self):
        # Long and short the same risk in equal size: nothing left.
        out = re_.portfolio_risk([0.1, -0.1], [0.5, 0.5], [[1, 1], [1, 1]])
        self.assertAlmostEqual(out["sigma"], 0.0, places=9)

    def test_hedge_has_negative_contribution(self):
        # A small short in something correlated with a big long reduces risk.
        out = re_.portfolio_risk([0.12, -0.04], [0.4, 0.4], [[1, 0.8], [0.8, 1]])
        self.assertLess(out["rc"][1], 0)

    def test_low_correlation_diversifies(self):
        # The user's principle: the same risky bets, less correlated, less risk.
        w, v = [0.1] * 5, [0.8] * 5
        def sig(rho):
            R = [[1 if i == j else rho for j in range(5)] for i in range(5)]
            return re_.portfolio_risk(w, v, R)["sigma"]
        self.assertLess(sig(0.1), sig(0.7))


class SeriesMaths(unittest.TestCase):
    def test_atr_of_known_bars(self):
        bars = [{"date": str(i), "high": 102, "low": 98, "close": 100, "adj": 100} for i in range(20)]
        self.assertAlmostEqual(re_.atr_pct(bars), 0.04, places=12)

    def test_vol_and_corr_recovered_from_synthetic_data(self):
        a, za = synthetic_bars(0.02, seed=3)
        b, _ = synthetic_bars(0.04, seed=4, rho_with=za, rho=0.6)
        spy, _ = synthetic_bars(0.01, seed=5)

        def fetch(t):
            return {"AAA": a, "BBB": b, "SPY": spy}[t]
        out = re_.analyse_book(
            [{"ticker": "AAA", "side": "long", "pctNav": 10},
             {"ticker": "BBB", "side": "short", "pctNav": 8}],
            fetch=fetch, window=250)
        rows = {r["ticker"]: r for r in out["positions"]}
        self.assertAlmostEqual(rows["AAA"]["vol"], 0.02 * math.sqrt(252) * 100, delta=4)
        self.assertAlmostEqual(rows["BBB"]["vol"], 0.04 * math.sqrt(252) * 100, delta=8)
        self.assertAlmostEqual(sum(r["riskContribPct"] for r in out["positions"]), 100, delta=0.2)
        self.assertEqual(out["hedges"][0]["kind"], "offsetting")


class AsOfDate(unittest.TestCase):
    def test_no_prices_after_the_cutoff_are_used(self):
        a, _ = synthetic_bars(0.02, seed=21)
        spy, _ = synthetic_bars(0.01, seed=22)
        # Poison everything after the cutoff: a 1000x move would dominate the
        # volatility if a single later day leaked in.
        cut = spy[200]["date"]
        a = [dict(x) for x in a]
        for x in a:
            if x["date"] > cut:
                x["adj"] = x["close"] = x["adj"] * 1000
        out = re_.analyse_book([{"ticker": "AAA", "side": "long", "pctNav": 10}],
                               fetch=lambda t: {"AAA": a, "SPY": spy}[t], window=120, end=cut)
        self.assertLessEqual(out["window"]["to"], cut)
        self.assertLess(out["positions"][0]["vol"], 100)


class PreTrade(unittest.TestCase):
    """The calculator, on synthetic prices where the right answer is known."""

    def setUp(self):
        self.a, za = synthetic_bars(0.03, seed=11)                       # held long
        self.twin, _ = synthetic_bars(0.03, seed=12, rho_with=za, rho=0.95)
        self.free, _ = synthetic_bars(0.03, seed=13)                     # unrelated
        self.spy, _ = synthetic_bars(0.01, seed=14)
        data = {"AAA": self.a, "TWIN": self.twin, "FREE": self.free, "SPY": self.spy}
        self.fetch = lambda t: data[t]
        self.book = [{"ticker": "AAA", "side": "long", "pctNav": 10}]

    def run_(self, ticker, side, conviction=10, target=60):
        return re_.analyse_candidate(self.book, ticker, side, conviction, target,
                                     nav=1_000_000, fetch=self.fetch, window=250)

    def test_size_scales_with_conviction_to_the_cap(self):
        self.assertAlmostEqual(self.run_("FREE", "long", 5)["size"]["pctNav"], 6.0)
        self.assertAlmostEqual(self.run_("FREE", "short", 5)["size"]["pctNav"], 5.0)
        self.assertAlmostEqual(self.run_("FREE", "long", 10)["size"]["pctNav"], 12.0)

    def test_short_stop_sits_above_entry(self):
        out = self.run_("FREE", "short")
        self.assertGreater(out["stop"]["price"], out["price"])
        self.assertLess(out["target"]["price"], out["price"])

    def test_loss_at_stop_is_size_times_distance(self):
        out = self.run_("FREE", "long", 10)
        self.assertAlmostEqual(out["lossAtStop"]["pctNav"],
                               12 * out["stop"]["distancePct"] / 100, places=1)

    def test_three_to_one_rule_flags_a_small_target(self):
        out = self.run_("FREE", "long", target=1)
        self.assertTrue(any("fails 3:1" in f for f in out["flags"]))

    def test_correlated_long_adds_more_risk_than_an_unrelated_one(self):
        twin = self.run_("TWIN", "long")["book"]["volChange"]
        free = self.run_("FREE", "long")["book"]["volChange"]
        self.assertGreater(twin, free)

    def test_shorting_the_twin_hedges(self):
        self.assertLess(self.run_("TWIN", "short", 8)["book"]["volChange"], 0)

    def test_related_names_say_which_way(self):
        rel = self.run_("TWIN", "long")["related"][0]
        self.assertEqual((rel["ticker"], rel["relation"]), ("AAA", "doubles up"))
        rel = self.run_("TWIN", "short")["related"][0]
        self.assertEqual(rel["relation"], "offsets")


if __name__ == "__main__":
    unittest.main(verbosity=2)
