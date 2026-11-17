"""Pre-trade analysis for one long or short stock position.

    python3 tools/analyse.py TICKER long|short --conviction 1-10 --target PCT
            [--entry PRICE] [--p PROB] [--tactical] [--book FILE] [--nav USD] [--json]

  --target    the move you expect in the trade's favour, in %
  --p         your probability the target is hit before the stop (0-1)
  --tactical  a short-term trade: stop-out odds over 5 days, not 20
  --book      positions as JSON [{ticker, side, pctNav}] -- e.g. the live book
              pulled from IBKR. Defaults to the last Saturday book in
              js/fund-data.js
  --nav       net liquidation value; defaults to the one in js/fund-data.js

Analysis only. This never places, previews or changes an order.
"""
import argparse
import json
import os
import subprocess
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
import risk_engine as E  # noqa: E402
import refresh_risk as F  # noqa: E402


def fund_nav():
    js = ("const fs=require('fs'),vm=require('vm');const c={};vm.createContext(c);"
          "vm.runInContext(fs.readFileSync(process.argv[1],'utf8')+';globalThis.__D=FUND_DATA;',c);"
          "process.stdout.write(String(c.__D.portfolioValue));")
    return float(subprocess.run(["node", "-e", js, F.FUND], capture_output=True,
                                text=True, check=True).stdout)


def money(x):
    return f"${x:,.0f}"


def card(r, nav, book_label):
    side = r["side"]
    lines = [
        f"{r['ticker']} {side.upper()}  ·  conviction {r['conviction']}/10  ·  "
        f"{r['window']['days']} days of prices to {r['window']['to']}",
        "",
        f"  Price {r['price']:.2f}   volatility {r['vol']:.0f}% a year   "
        f"ATR {r['atrPct']:.1f}%   beta {r['beta']}",
        "",
        "  PLAN",
        f"    Stop      {r['stop']['price']:>10.2f}   {r['stop']['distancePct']:.1f}% away "
        f"({r['stop']['atrMultiple']}x ATR)",
        f"    Target    {r['target']['price']:>10.2f}   {r['target']['pct']:.1f}%",
        f"    Reward:risk  {r['rewardRisk']:.2f} : 1",
        f"    Size      {r['size']['pctNav']:.2f}% of NAV (cap {r['size']['cap']:.0f}%)  "
        f"= {r['size']['shares']:,} shares, {money(r['size']['dollars'])}",
        f"    If stopped   -{r['lossAtStop']['pctNav']:.2f}% of NAV  ({money(r['lossAtStop']['dollars'])})",
        "",
        "  ODDS",
        "    Normal movement alone hits the stop: " +
        ", ".join(f"{v:.0f}% within {k}" for k, v in r["noiseStopOdds"].items()),
        f"    With no edge the target comes first {r['breakevenWinRate']:.0f}% of the time"
        " — you need to be right more often than that",
    ]
    if r["expectedValuePctNav"] is not None:
        lines.append(f"    Expected value at your probability: {r['expectedValuePctNav']:+.2f}% of NAV")
    b = r["book"]
    lines += [
        "",
        f"  BOOK ({book_label})",
        f"    Book volatility {b['volBefore']:.1f}% -> {b['volAfter']:.1f}%  "
        f"({b['volChange']:+.2f} pts)",
        f"    On its own it would add {b['standaloneVolContribution']:.1f} pts; "
        f"correlation decides the rest",
        f"    Its share of the book's risk: {b['shareOfRisk']:.1f}%",
    ]
    if r["related"]:
        lines.append("    Moves with: " + ", ".join(
            f"{x['ticker']} {x['corr']:+.2f} ({x['relation']})" for x in r["related"]))
    if r["existing"]:
        e = r["existing"]
        lines.append(f"    Already held: {e['side']} {e['pctNav']:.2f}% of NAV — this adds to it")
    lines += ["", "  FLAGS"] + ([f"    - {f}" for f in r["flags"]] or ["    none"])
    return "\n".join(lines)


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("ticker")
    ap.add_argument("side", choices=["long", "short"])
    ap.add_argument("--conviction", type=float, required=True)
    ap.add_argument("--target", type=float, required=True)
    ap.add_argument("--entry", type=float)
    ap.add_argument("--p", type=float)
    ap.add_argument("--tactical", action="store_true")
    ap.add_argument("--book")
    ap.add_argument("--nav", type=float)
    ap.add_argument("--json", action="store_true")
    a = ap.parse_args()

    if a.book:
        book = json.load(open(a.book))
        label = f"live book, {len(book)} positions"
    else:
        as_of, book = F.read_book()
        label = f"book as of {as_of}, {len(book)} positions"
    nav = a.nav or fund_nav()

    r = E.analyse_candidate(book, a.ticker, a.side, a.conviction, a.target, nav,
                            entry=a.entry, horizon=5 if a.tactical else 20, p_win=a.p)
    r["mode"] = "tactical" if a.tactical else "conviction"
    r["nav"] = nav
    print(json.dumps(r, indent=2) if a.json else card(r, nav, label))


if __name__ == "__main__":
    main()
