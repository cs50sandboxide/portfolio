"""Rebuild the weekly risk history from the books already published.

    python3 tools/backfill_risk_history.py

Every Saturday refresh committed that week's positions in js/fund-data.js, so
git already holds the book as it stood each week. For each one, this measures
that book exactly as refresh_risk.py would have on the day: the same model,
using only prices up to that Saturday. Nothing later is allowed to leak in.

The result is written into the `history` array of js/risk-data.js. After this
one-off rebuild, refresh_risk.py adds a point every Saturday.

Weights: from 5 Sep 2026 positions carry pctNav. Earlier books stored dollar
values instead; those are converted to a share of that week's NAV.
"""
import json
import os
import subprocess
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
sys.path.insert(0, HERE)
import risk_engine as E  # noqa: E402
import refresh_risk as F  # noqa: E402

READ = ("const vm=require('vm');let s='';process.stdin.on('data',d=>s+=d).on('end',()=>{"
        "const c={};vm.createContext(c);vm.runInContext(s+';globalThis.__D=FUND_DATA;',c);"
        "const d=c.__D;process.stdout.write(JSON.stringify({asOf:d.asOf,nav:d.portfolioValue,"
        "longs:(d.positions||{}).longs||[],shorts:(d.positions||{}).shorts||[]}));});")


def books():
    """(asOf, positions) for every distinct published week, oldest first."""
    shas = subprocess.run(["git", "log", "--format=%H", "origin/main", "--", "js/fund-data.js"],
                          cwd=ROOT, capture_output=True, text=True, check=True).stdout.split()
    seen, out = set(), []
    for sha in shas:                       # newest first: keep the last commit of each week
        src = subprocess.run(["git", "show", f"{sha}:js/fund-data.js"], cwd=ROOT,
                             capture_output=True, text=True).stdout
        if not src:
            continue
        r = subprocess.run(["node", "-e", READ], input=src, capture_output=True, text=True)
        if r.returncode:
            continue
        d = json.loads(r.stdout)
        if d["asOf"] in seen or not (d["longs"] or d["shorts"]):
            continue
        seen.add(d["asOf"])

        def pct(p):
            if "pctNav" in p:
                return abs(p["pctNav"])
            return abs(p.get("value", 0)) / d["nav"] * 100

        book = ([{"ticker": p["ticker"], "side": "long", "pctNav": pct(p)} for p in d["longs"]] +
                [{"ticker": p["ticker"], "side": "short", "pctNav": pct(p)} for p in d["shorts"]])
        out.append((d["asOf"], [b for b in book if b["pctNav"] > 0]))
    return sorted(out)


def main():
    weeks = books()
    cache = {}

    def fetch(t):
        if t not in cache:
            cache[t] = E.fetch_daily(t, rng="2y")
        return cache[t]

    history = []
    for as_of, book in weeks:
        risk = E.analyse_book(book, fetch=fetch, end=as_of)
        pt = E.history_point(as_of, book, risk)
        if risk["unpriced"]:
            pt["unpriced"] = len(risk["unpriced"])
        history.append(pt)
        print(f"{as_of}  vol {pt['vol']:6.1f}%  div {pt['diversificationRatio']:.2f}x  "
              f"corr {pt['avgPairCorr']:.2f}  beta {pt['betaToSPY']:5.2f}  "
              f"gross {pt['gross']:6.1f}%  net {pt['net']:6.1f}%  n={pt['positions']}"
              + (f"  unpriced {pt['unpriced']}" if risk["unpriced"] else ""))

    cur = F.read_existing()
    if cur is None:
        print("js/risk-data.js missing: run refresh_risk.py first", file=sys.stderr)
        return 1
    cur["history"] = history
    F.write(cur)
    print(f"\nwrote {len(history)} weeks of history to js/risk-data.js")
    return 0


if __name__ == "__main__":
    sys.exit(main())
