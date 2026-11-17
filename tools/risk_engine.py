"""Portfolio risk engine. Standard library only.

No numpy or pandas, on purpose: the Saturday refresh runs in a fresh
container every time, and a job that has to install a scientific stack
before it can run has more ways to fail on a Saturday morning than one that
does not. The book is ~40 positions, so a 40x40 matrix in pure Python is
milliseconds.

What it computes, for the stock positions in the book (options excluded):

  volatility       annualised standard deviation of daily log returns
  ATR              average true range over 14 days, as % of price
  correlation      pairwise, on overlapping days, shrunk toward the average
                   correlation and repaired to a valid (PSD) matrix
  portfolio vol    sqrt(w' S w): the volatility today's book implies, given
                   today's weights (ex-ante, as distinct from the realised
                   volatility of the fund's own history)
  risk contribution  w_i (S w)_i / sigma_p, as a share of portfolio vol.
                   These sum exactly to 100%; a short that hedges the book
                   shows a negative contribution
  diversification ratio  sum |w_i| sigma_i / sigma_p: how much smaller the
                   book's risk is than the sum of its parts
"""

import json
import math
import time
import urllib.error
import urllib.request
from datetime import datetime, timedelta, timezone

TRADING_DAYS = 252
WINDOW = 126          # ~6 months of daily returns
MIN_OVERLAP = 40      # fewer shared days than this and a pairwise corr is not trusted
SHRINK = 0.25         # weight on the average correlation


# ---------------------------------------------------------------- prices

def _yahoo_symbol(ticker):
    return ticker.replace(".", "-")


def fetch_daily(ticker, rng="1y", retries=3):
    """Daily bars from Yahoo's chart endpoint.

    Returns a list of dicts {date, high, low, close, adj} in date order, with
    any day carrying a missing field dropped.
    """
    sym = _yahoo_symbol(ticker)
    last_err = None
    for attempt in range(retries):
        host = "query1" if attempt % 2 == 0 else "query2"
        url = (f"https://{host}.finance.yahoo.com/v8/finance/chart/{sym}"
               f"?range={rng}&interval=1d&events=split%2Cdiv")
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        try:
            with urllib.request.urlopen(req, timeout=20) as resp:
                payload = json.load(resp)
            res = payload["chart"]["result"][0]
            off = res["meta"].get("gmtoffset", 0)
            q = res["indicators"]["quote"][0]
            adj = res["indicators"].get("adjclose", [{}])[0].get("adjclose") or q["close"]
            bars = []
            for i, ts in enumerate(res.get("timestamp") or []):
                h, l, c, a = q["high"][i], q["low"][i], q["close"][i], adj[i]
                if None in (h, l, c, a) or c <= 0 or a <= 0:
                    continue
                d = datetime.fromtimestamp(ts + off, tz=timezone.utc).strftime("%Y-%m-%d")
                bars.append({"date": d, "high": h, "low": l, "close": c, "adj": a})
            if bars:
                return bars
            last_err = "no bars"
        except (urllib.error.URLError, KeyError, IndexError, TypeError, ValueError) as e:
            last_err = e
        time.sleep(1.5 * (attempt + 1))
    raise RuntimeError(f"{ticker}: could not fetch prices ({last_err})")


# ---------------------------------------------------------------- series maths

def log_returns(bars):
    """{date: log return} from adjusted closes, so splits and dividends do not
    read as price moves."""
    out = {}
    for prev, cur in zip(bars, bars[1:]):
        out[cur["date"]] = math.log(cur["adj"] / prev["adj"])
    return out


def atr_pct(bars, n=14):
    """Average true range over n days, as a fraction of the last close."""
    if len(bars) < n + 1:
        return None
    trs = []
    for prev, cur in zip(bars[-(n + 1):], bars[-n:]):
        trs.append(max(cur["high"] - cur["low"],
                       abs(cur["high"] - prev["close"]),
                       abs(cur["low"] - prev["close"])))
    return sum(trs) / n / bars[-1]["close"]


def mean(xs):
    return sum(xs) / len(xs)


def stdev(xs):
    m = mean(xs)
    return math.sqrt(sum((x - m) ** 2 for x in xs) / (len(xs) - 1))


def pair_corr(ra, rb, dates):
    common = [d for d in dates if d in ra and d in rb]
    if len(common) < MIN_OVERLAP:
        return None, len(common)
    a = [ra[d] for d in common]
    b = [rb[d] for d in common]
    ma, mb = mean(a), mean(b)
    cov = sum((x - ma) * (y - mb) for x, y in zip(a, b))
    va = sum((x - ma) ** 2 for x in a)
    vb = sum((y - mb) ** 2 for y in b)
    if va == 0 or vb == 0:
        return None, len(common)
    return cov / math.sqrt(va * vb), len(common)


# ---------------------------------------------------------------- linear algebra

def matvec(M, v):
    return [sum(M[i][j] * v[j] for j in range(len(v))) for i in range(len(M))]


def dot(a, b):
    return sum(x * y for x, y in zip(a, b))


def jacobi_eigen(A, tol=1e-12, max_sweeps=100):
    """Eigen-decomposition of a symmetric matrix by cyclic Jacobi rotations.
    Returns (eigenvalues, eigenvectors-as-columns)."""
    n = len(A)
    a = [row[:] for row in A]
    v = [[1.0 if i == j else 0.0 for j in range(n)] for i in range(n)]
    for _ in range(max_sweeps):
        off = sum(a[i][j] ** 2 for i in range(n) for j in range(n) if i != j)
        if off < tol:
            break
        for p in range(n - 1):
            for q in range(p + 1, n):
                if abs(a[p][q]) < 1e-300:
                    continue
                theta = (a[q][q] - a[p][p]) / (2 * a[p][q])
                t = (1 if theta >= 0 else -1) / (abs(theta) + math.sqrt(theta * theta + 1))
                c = 1 / math.sqrt(t * t + 1)
                s = t * c
                for k in range(n):
                    akp, akq = a[k][p], a[k][q]
                    a[k][p] = c * akp - s * akq
                    a[k][q] = s * akp + c * akq
                for k in range(n):
                    apk, aqk = a[p][k], a[q][k]
                    a[p][k] = c * apk - s * aqk
                    a[q][k] = s * apk + c * aqk
                for k in range(n):
                    vkp, vkq = v[k][p], v[k][q]
                    v[k][p] = c * vkp - s * vkq
                    v[k][q] = s * vkp + c * vkq
    return [a[i][i] for i in range(n)], v


def nearest_correlation(R, floor=1e-6):
    """Make a pairwise-estimated correlation matrix valid: clip negative
    eigenvalues, rebuild, and rescale to a unit diagonal. Pairwise estimates
    on different overlapping windows can be jointly impossible, which would
    let the portfolio variance come out negative."""
    n = len(R)
    vals, vecs = jacobi_eigen(R)
    vals = [max(x, floor) for x in vals]
    M = [[sum(vecs[i][k] * vals[k] * vecs[j][k] for k in range(n)) for j in range(n)]
         for i in range(n)]
    d = [math.sqrt(M[i][i]) for i in range(n)]
    return [[M[i][j] / (d[i] * d[j]) for j in range(n)] for i in range(n)]


# ---------------------------------------------------------------- the model

def correlation_matrix(tickers, rets, dates):
    """Pairwise correlations, gaps filled with the average, shrunk toward it,
    then repaired. Returns (R, raw pairs, average correlation)."""
    n = len(tickers)
    raw = [[None] * n for _ in range(n)]
    seen = []
    for i in range(n):
        raw[i][i] = 1.0
        for j in range(i + 1, n):
            c, _ = pair_corr(rets[tickers[i]], rets[tickers[j]], dates)
            raw[i][j] = raw[j][i] = c
            if c is not None:
                seen.append(c)
    avg = mean(seen) if seen else 0.0
    R = [[1.0 if i == j else (1 - SHRINK) * (raw[i][j] if raw[i][j] is not None else avg) + SHRINK * avg
          for j in range(n)] for i in range(n)]
    return nearest_correlation(R), raw, avg


def portfolio_risk(weights, vols, R):
    """weights: signed fractions of NAV. vols: annualised. R: correlation.
    Returns sigma_p and per-position contributions."""
    n = len(weights)
    S = [[R[i][j] * vols[i] * vols[j] for j in range(n)] for i in range(n)]
    Sw = matvec(S, weights)
    var = dot(weights, Sw)
    sigma = math.sqrt(max(var, 0.0))
    rc = [weights[i] * Sw[i] / sigma if sigma > 0 else 0.0 for i in range(n)]
    # Correlation of each position with the rest of the book: how much it
    # moves with everything else held, signed by which way you hold it.
    corr_book = []
    for i in range(n):
        w_ex = [0.0 if k == i else weights[k] for k in range(n)]
        Sw_ex = matvec(S, w_ex)
        var_ex = dot(w_ex, Sw_ex)
        if var_ex <= 0 or vols[i] == 0:
            corr_book.append(None)
        else:
            corr_book.append(Sw_ex[i] / (vols[i] * math.sqrt(var_ex)))
    return {"sigma": sigma, "S": S, "rc": rc, "corr_book": corr_book}


def build_model(positions, benchmark="SPY", fetch=fetch_daily, window=WINDOW, end=None):
    """Fetch prices and build vols and the correlation matrix for a set of
    positions. Shared by the weekly book model and the pre-trade calculator,
    so both measure risk the same way."""
    tickers = [p["ticker"] for p in positions]
    bars, failed = {}, []
    for t in sorted(set(tickers + [benchmark])):
        try:
            bars[t] = fetch(t)
        except RuntimeError as e:
            failed.append(str(e))
    if benchmark not in bars:
        raise RuntimeError(f"benchmark {benchmark} unavailable: {failed}")

    # end: measure as at that date, using only prices up to it. Used to rebuild
    # past weeks without hindsight.
    if end:
        bars = {t: [x for x in b if x["date"] <= end] for t, b in bars.items()}
        bars = {t: b for t, b in bars.items() if len(b) >= 2}
    rets = {t: log_returns(b) for t, b in bars.items()}
    cal = sorted(rets[benchmark])[-window:]
    use = [p for p in positions if p["ticker"] in bars]
    names = [p["ticker"] for p in use]

    vols, atrs, obs = [], [], []
    for t in names:
        r = [rets[t][d] for d in cal if d in rets[t]]
        obs.append(len(r))
        vols.append(stdev(r) * math.sqrt(TRADING_DAYS) if len(r) >= 20 else None)
        atrs.append(atr_pct(bars[t]))

    # A position with too little history for a volatility borrows the median,
    # and is flagged, rather than silently dropping out of the risk total.
    known = sorted(v for v in vols if v is not None)
    med = known[len(known) // 2] if known else 0.5
    vols = [v if v is not None else med for v in vols]

    R, raw, avg_corr = correlation_matrix(names, rets, cal)
    return {"bars": bars, "rets": rets, "cal": cal, "use": use, "names": names,
            "vols": vols, "atrs": atrs, "obs": obs, "R": R, "raw": raw,
            "avg_corr": avg_corr, "failed": failed, "benchmark": benchmark}


def signed_weight(p):
    return (p["pctNav"] if p["side"] == "long" else -p["pctNav"]) / 100


def analyse_book(positions, benchmark="SPY", fetch=fetch_daily, window=WINDOW, end=None):
    """positions: [{ticker, side: 'long'|'short', pctNav}]. Returns the risk block."""
    m = build_model(positions, benchmark, fetch, window, end)
    bars, rets, cal, use, names = m["bars"], m["rets"], m["cal"], m["use"], m["names"]
    vols, atrs, obs, R, raw, avg_corr, failed = (m["vols"], m["atrs"], m["obs"], m["R"],
                                                 m["raw"], m["avg_corr"], m["failed"])
    w = [signed_weight(p) for p in use]
    risk = portfolio_risk(w, vols, R)
    sigma = risk["sigma"]

    spy_r = [rets[benchmark][d] for d in cal]
    spy_vol = stdev(spy_r) * math.sqrt(TRADING_DAYS)
    betas = []
    for i, t in enumerate(names):
        c, _ = pair_corr(rets[t], rets[benchmark], cal)
        betas.append(c * vols[i] / spy_vol if c is not None else None)
    book_beta = sum(w[i] * betas[i] for i in range(len(w)) if betas[i] is not None)

    gross_sum = sum(abs(w[i]) * vols[i] for i in range(len(w)))

    rows = []
    for i, p in enumerate(use):
        rows.append({
            "ticker": p["ticker"],
            "side": p["side"],
            "pctNav": round(p["pctNav"], 2),
            "vol": round(vols[i] * 100, 1),
            "atrPct": round(atrs[i] * 100, 1) if atrs[i] is not None else None,
            "beta": round(betas[i], 2) if betas[i] is not None else None,
            "corrToBook": round(risk["corr_book"][i], 2) if risk["corr_book"][i] is not None else None,
            "riskContribPct": round(risk["rc"][i] / sigma * 100, 1) if sigma else 0.0,
            "standaloneRiskPct": round(abs(w[i]) * vols[i] / gross_sum * 100, 1) if gross_sum else 0.0,
            "obs": obs[i],
        })
    rows.sort(key=lambda r: -r["riskContribPct"])

    # Pairs worth knowing about: same direction and moving together (risk
    # doubled up), or opposite directions and moving together (a hedge).
    pairs = []
    for i in range(len(names)):
        for j in range(i + 1, len(names)):
            c = raw[i][j]
            if c is None:
                continue
            same = (w[i] > 0) == (w[j] > 0)
            pairs.append({"a": names[i], "b": names[j], "corr": round(c, 2),
                          "kind": "same direction" if same else "offsetting"})
    doubled = sorted([p for p in pairs if p["kind"] == "same direction"], key=lambda p: -p["corr"])[:5]
    hedges = sorted([p for p in pairs if p["kind"] == "offsetting"], key=lambda p: -p["corr"])[:3]

    return {
        "window": {"days": len(cal), "from": cal[0], "to": cal[-1]},
        "portfolio": {
            "vol": round(sigma * 100, 1),
            "sumOfStandaloneVol": round(gross_sum * 100, 1),
            "diversificationRatio": round(gross_sum / sigma, 2) if sigma else None,
            "betaToSPY": round(book_beta, 2),
            "avgPairCorr": round(avg_corr, 2),
            "positions": len(use),
        },
        "positions": rows,
        "doubledUp": doubled,
        "hedges": [h for h in hedges if h["corr"] > 0.3],
        "lowHistory": [r["ticker"] for r in rows if r["obs"] < MIN_OVERLAP],
        "unpriced": failed,
    }


# ---------------------------------------------------------------- pre-trade

LONG_CAP = 12.0       # % of NAV at conviction 10
SHORT_CAP = 10.0
ATR_MULT = 2.5        # stop sits this many ATRs from entry
MIN_REWARD_RISK = 3.0 # the owner's rule: expect ~10% for every ~3.3% risked


def phi(x):
    return 0.5 * (1 + math.erf(x / math.sqrt(2)))


def analyse_candidate(book, ticker, side, conviction, target_pct, nav,
                      entry=None, atr_mult=ATR_MULT, horizon=20, p_win=None,
                      benchmark="SPY", fetch=fetch_daily, window=WINDOW):
    """Everything needed to decide on one trade, before it is placed.

    book        current positions [{ticker, side, pctNav}]
    side        'long' or 'short'
    conviction  1-10; size = conviction/10 x the cap for that side
    target_pct  expected move in the trade's favour, in % (positive)
    nav         net liquidation value, for share counts and dollar risk
    horizon     trading days the trade is expected to need (20 conviction,
                5 tactical) -- only used for the stop-out odds
    p_win       optional: your probability the target is hit first
    """
    ticker = ticker.upper()
    side = side.lower()
    if side not in ("long", "short"):
        raise ValueError("side must be long or short")
    if not 1 <= conviction <= 10:
        raise ValueError("conviction is 1-10")

    cap = LONG_CAP if side == "long" else SHORT_CAP
    size_pct = conviction / 10 * cap

    # Model the book with the candidate in it at zero weight first, so the
    # before and after are measured on exactly the same matrix.
    held = [p for p in book if p["ticker"] != ticker]
    existing = next((p for p in book if p["ticker"] == ticker), None)
    m = build_model(held + [{"ticker": ticker, "side": side, "pctNav": 0.0}],
                    benchmark, fetch, window)
    if ticker not in m["names"]:
        raise RuntimeError(f"{ticker}: no price history")
    names, vols, R = m["names"], m["vols"], m["R"]
    k = names.index(ticker)
    w_before = [signed_weight(p) for p in m["use"]]
    if existing:
        w_before[k] = signed_weight(existing)
    w_after = w_before[:]
    w_after[k] += (size_pct if side == "long" else -size_pct) / 100

    before = portfolio_risk(w_before, vols, R)
    after = portfolio_risk(w_after, vols, R)

    bars = m["bars"][ticker]
    px = entry or bars[-1]["close"]
    atr = m["atrs"][k]
    vol = vols[k]
    stop_dist = atr_mult * atr                      # fraction of price
    stop_px = px * (1 - stop_dist) if side == "long" else px * (1 + stop_dist)
    target_px = (px * (1 + target_pct / 100) if side == "long"
                 else px * (1 - target_pct / 100))
    rr = (target_pct / 100) / stop_dist if stop_dist else None

    # How often normal movement alone would hit the stop: the probability a
    # driftless random walk touches the stop within the horizon.
    sd_daily = vol / math.sqrt(TRADING_DAYS)
    b = abs(math.log(1 - stop_dist)) if side == "long" else math.log(1 + stop_dist)
    noise = {f"{h}d": round(2 * phi(-b / (sd_daily * math.sqrt(h))) * 100, 0)
             for h in (1, 5, horizon) if sd_daily > 0}

    # With no edge, the target is hit first this often; a trade only makes
    # money if you are right more often than this.
    a_ = math.log(1 + target_pct / 100) if side == "long" else abs(math.log(1 - target_pct / 100))
    breakeven = b / (a_ + b) if (a_ + b) else None
    ev = None
    if p_win is not None:
        ev = (p_win * target_pct - (1 - p_win) * stop_dist * 100) * size_pct / 100

    # Holdings it moves with, signed by direction: same-direction and
    # correlated means doubling a risk already held; opposite means a hedge.
    rel = []
    for j, t in enumerate(names):
        if j == k or w_before[j] == 0:
            continue
        c, _ = pair_corr(m["rets"][ticker], m["rets"][t], m["cal"])
        if c is None:
            continue
        same = (w_before[j] > 0) == (side == "long")
        rel.append({"ticker": t, "corr": round(c, 2),
                    "relation": "doubles up" if same else "offsets",
                    "effect": c if same else -c})
    rel.sort(key=lambda r: -abs(r["effect"]))

    c_spy, _ = pair_corr(m["rets"][ticker], m["rets"][benchmark], m["cal"])
    spy_vol = stdev([m["rets"][benchmark][d] for d in m["cal"]]) * math.sqrt(TRADING_DAYS)

    flags = []
    if rr is not None and rr < MIN_REWARD_RISK:
        need = MIN_REWARD_RISK * stop_dist * 100
        flags.append(f"fails 3:1 — at this volatility the target needs to be {need:.0f}% or more")
    if noise.get(f"{horizon}d", 0) >= 60:
        flags.append(f"{noise[f'{horizon}d']:.0f}% chance normal movement hits the stop within "
                     f"{horizon} days")
    top_double = [r for r in rel if r["relation"] == "doubles up" and r["corr"] >= 0.7]
    if top_double:
        flags.append("concentration: moves with " +
                     ", ".join(f"{r['ticker']} ({r['corr']:.2f})" for r in top_double[:3]))
    d_vol = (after["sigma"] - before["sigma"]) * 100
    sigma_after = after["sigma"]
    share_after = after["rc"][k] / sigma_after * 100 if sigma_after else 0.0
    if share_after > 12:
        flags.append(f"would be {share_after:.0f}% of the book's risk on its own")

    shares = int(size_pct / 100 * nav / px)
    return {
        "ticker": ticker, "side": side, "conviction": conviction,
        "price": round(px, 2), "vol": round(vol * 100, 1), "atrPct": round(atr * 100, 2),
        "beta": round(c_spy * vol / spy_vol, 2) if c_spy is not None else None,
        "stop": {"price": round(stop_px, 2), "distancePct": round(stop_dist * 100, 1),
                 "atrMultiple": atr_mult},
        "target": {"price": round(target_px, 2), "pct": target_pct},
        "rewardRisk": round(rr, 2) if rr else None,
        "noiseStopOdds": noise,
        "breakevenWinRate": round(breakeven * 100, 0) if breakeven else None,
        "size": {"pctNav": round(size_pct, 2), "cap": cap, "shares": shares,
                 "dollars": round(shares * px, 0)},
        "lossAtStop": {"pctNav": round(size_pct * stop_dist, 2),
                       "dollars": round(shares * px * stop_dist, 0)},
        "expectedValuePctNav": round(ev, 2) if ev is not None else None,
        "book": {"volBefore": round(before["sigma"] * 100, 1),
                 "volAfter": round(sigma_after * 100, 1),
                 "volChange": round(d_vol, 2),
                 "standaloneVolContribution": round(size_pct / 100 * vol * 100, 1),
                 "shareOfRisk": round(share_after, 1)},
        "related": [{k2: v for k2, v in r.items() if k2 != "effect"} for r in rel[:6]],
        "flags": flags,
        "window": {"days": len(m["cal"]), "to": m["cal"][-1]},
        "existing": existing,
    }


def history_point(as_of, positions, risk):
    """One week's entry in the risk history: the book as published that
    Saturday, measured on prices up to it."""
    p = risk["portfolio"]
    longs = sum(x["pctNav"] for x in positions if x["side"] == "long")
    shorts = sum(x["pctNav"] for x in positions if x["side"] == "short")
    return {"date": as_of, "vol": p["vol"], "diversificationRatio": p["diversificationRatio"],
            "avgPairCorr": p["avgPairCorr"], "betaToSPY": p["betaToSPY"],
            "gross": round(longs + shorts, 1), "net": round(longs - shorts, 1),
            "positions": p["positions"]}
