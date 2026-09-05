# Fund Data Refresh

`js/fund-data.js` is a generated snapshot of the Interactive Brokers account.
It is regenerated **every Saturday, while markets are closed**, by a scheduled
Claude Code routine, which commits and pushes to `main`, triggering a Vercel
redeploy.

Nothing else on the site reads brokerage data. There is no trade history and
no running P&L ledger, so the cost of a refresh does not scale with how many
trades are placed.

One thing does accumulate: `history` gains a single row per run (a date and
three percentages) to draw the weekly return path. That is ~52 rows a year
and needs no extra API calls, since every value is already fetched for the
other panels. Everything else in the file is fully replaced each run.

## Schedule

Cron `12 10 * * 6` (UTC) — 10:12 UTC every Saturday, which is around midday
in London and mid-afternoon in Dubai.

Saturday is chosen deliberately over a weeknight run. Markets are shut, so
Friday's close has had many hours to settle in IBKR's PortfolioAnalyst — no
risk of publishing half-processed figures as final. It also means unchanged
data between runs is normal, which is exactly why the `generatedAt` heartbeat
exists (step 9).

## Keep the pull small

Two standing rules, because every byte pulled costs tokens:

1. **Never re-fetch history that cannot change.** Closes on past dates are
   fixed forever. They live in `FUND_DATA.baselines` and are read from there,
   not re-downloaded. Each run pulls only the newest close.
2. **Never compute what IBKR already reports.** Returns, exposure and
   allocation come straight from IBKR's own endpoints. Only figures IBKR does
   not expose at all (drawdown, volatility, Sharpe, monthly returns) are
   derived — see step 6.

Exactly **four calls per run**, plus three tiny price lookups. Do not call
`get_account_balances`: everything it offers is already in
`get_account_summary`, and its extra fields (`unrealized_pnl`, `realized_pnl`)
are never published.

## What the routine does

1. **`get_account_summary`** → `net_liquidation` becomes `portfolioValue`.
   Also capture `gross_position_value`, `total_cash_value`, `leverage`.

2. **`get_pa_performance_all_periods`** → read `accounts.account.periods`:
   - `YTD.cps` — take the **last** element, multiply by 100 → `returnSinceInception`.
     `cps` values are cumulative *fractions* (0.4412 = +44.12%), already
     time-weighted, so deposits and withdrawals are stripped out. Do not
     compute returns from the `nav` array — NAV includes cash transfers and
     will overstate performance badly.
   - `YTD.start_date` → `inceptionDate` (format `YYYY-MM-DD`).
   - `MTD.cps` last element × 100 → `mtdReturn`.
   - `MTD.start_date` and the last entry of `MTD.dates` → `mtdWindow` string.
   - `end` → `asOf`. `last_successful_update` → `ibkrLastUpdate`.

3. **`get_account_positions`** → split by `asset_class` and sign of `position`:
   - `asset_class == "STK"` and `position > 0` → `positions.longs`
   - `asset_class == "STK"` and `position < 0` → `positions.shorts`
   - `asset_class == "OPT"` → `positions.options`, parsing
     `contract_description` (e.g. `"MU Dec18'26 850 PUT @AMEX"`) into
     `ticker` plus a readable `contract` label.

   Sort longs and options by `market_value` descending; sort shorts by
   `market_value` ascending (largest short first). Keep `quantity`, `price`
   (`market_price`), and **`pctNav`** = |`market_value`| ÷ `portfolioValue`
   × 100.

   **Store `pctNav`, never `market_value`.** Position sizes are published as a
   share of NAV, not in dollars, and this file is served to the browser — so a
   dollar figure left in the data is a dollar figure published, whether or not
   the page renders it.

   **Do not publish `unrealized_pnl` or `daily_pnl`.** Unrealized P&L is
   deliberately excluded from the site.

4. **`get_price_history`** for each benchmark ETF — **`period` `"ONE_WEEK"`**,
   `step` `"ONE_DAY"`, `security_type` `"STK"`, `outside_rth` false:

   | Index | Proxy | `contract_id` |
   |---|---|---|
   | S&P 500 | SPY | `756733` |
   | Nasdaq 100 | QQQ | `320227571` |
   | Russell 2000 | IWM | `9579970` |

   **Use `ONE_WEEK`, not `ONE_YEAR`.** All you need is the latest close —
   about five bars. A year of daily OHLCV for three ETFs is roughly fifty
   times the payload for no extra information, because the historical
   denominators are already cached.

   For each, `sinceInception` =
   (latest close ÷ `baselines.inceptionClose[PROXY]` − 1) × 100.
   Write all three into `benchmarks`, preserving that order.

   Keep the single `benchmark` object in sync with SPY — it drives the
   homepage banner and stat blocks. `benchmark.calendarYtd` =
   (latest SPY close ÷ `baselines.priorDecClose.SPY` − 1) × 100.

   **When a calendar month has just completed**, append that month's final SPY
   close to `baselines.spyMonthEnd` (key `"YYYY-MM"`). Never rewrite existing
   entries — they are settled history.

   All benchmark returns MUST span the fund's own window. Never mix a
   since-inception fund return against a calendar-year index return.

5. **`get_pa_allocation`** with `type: "ALL"` → `exposure`. Use
   `allocations.ASSET_CLASS`:
   - `long_positions.items` where id `EQ` → `exposure.long`; `CA` → `exposure.cash`
   - `short_positions.items` where id `EQ` → `exposure.short`
   - `net` = long + short. `gross` = |long| + |short|.
   - Percentages are each figure ÷ `portfolioValue` × 100.

   Sanity check: long total + short total must equal net liquidation exactly.
   If it does not, something is wrong — stop rather than publish.

6. Derive `risk` and `monthlyReturns` from the `YTD.cps` / `YTD.dates` series.
   IBKR exposes **no** risk-analytics endpoint (verified against connector
   v1.1.5), so these are computed — but computed on IBKR's own official
   time-weighted series, never on NAV.

   Build a wealth index `w = [1.0, ...(1 + cps[i])]`, then daily returns
   `r[i] = w[i]/w[i-1] - 1`.
   - `maxDrawdown` — running peak of `w`, worst `w/peak - 1`, × 100.
   - `annualizedVol` — `stdev(r) × sqrt(252) × 100`.
   - `sharpe` — `(cagr - rf) / vol` where `cagr = w[-1]^(252/n) - 1` and
     `rf = 0.04`. Record `n` as `risk.tradingDays`.
   - `monthlyReturns` — for each calendar month, `w[last day of month] ÷
     w[last day of previous month] - 1`, × 100. First and current months are
     partial: set `partial: true`. The benchmark column comes from
     `baselines.spyMonthEnd` (consecutive months divided), **not** from a
     fresh price-history pull; use `null` for the current month, which has no
     month-end close yet.

7. **Append one row to `history`** — the weekly return path. This costs no
   extra API calls: every value is already in hand from steps 2 and 4.

   ```js
   { date: "<Friday of the week just ended, YYYY-MM-DD>",
     fund: <cumulative TWR % at that Friday's close>,
     spy:  <(SPY close ÷ baselines.inceptionClose.SPY − 1) × 100>,
     qqq:  <(QQQ close ÷ baselines.inceptionClose.QQQ − 1) × 100> }
   ```

   Take `fund` from the `cps` entry for that Friday — **not** the latest mark,
   which may be a later day. The series is deliberately pinned to Friday
   closes so the points are evenly spaced.

   **Append only. Never rewrite or recompute earlier rows** — they are settled
   history, and silently restating them would destroy the one record on the
   site that cannot be reconstructed from a single snapshot. If a row for that
   Friday already exists, leave it alone and add nothing.

8. **Rebuild `attribution`** — the positioning panel. No extra API calls:
   sectors come from the `get_pa_allocation` response in step 5, positions
   from step 3.

   - `sectorsLong` / `sectorsShort` — from `allocations.SECTOR`. **Drop the
     `Cash` item and renormalise** so the remaining weights sum to 100. Cash
     in the short bucket is a margin artefact, not a short position, and
     leaving it in understates the real sector concentration. Sort descending.
     Sanity check: the sector totals must equal `exposure.long` and
     `exposure.short`.
   - `netTilt` — long minus short per sector as **% of NAV** (`pct`), sorted
     descending. Not dollars.
     This is the actual directional bet and routinely differs in sign from the
     long-only pie; do not omit it.
   - `topPositions` — the five largest by **absolute** `market_value`, so a
     large short is not hidden. Store `pctNav` only — the dollar value is used
     for ranking and then discarded.
     `move` is the percent change against `average_price`, **sign-flipped for
     shorts** so that a short whose price fell reads positive.
   - `contributors` / `detractors` — top three each, `asset_class == "STK"`
     only, ranked by contribution in percentage points:
     `(market_price − average_price) × position ÷ portfolioValue × 100`.
     Rank by contribution, not by raw percent move: a 29% loss on a small
     position matters less than a 5% loss on a large one. Exclude options —
     they are tiny in dollar terms and would otherwise occupy every slot on
     percentage alone. Skip any position where `position == 0`.
   - `openContribTotal` — the sum across all equity positions.
   - `top5Concentration`, `equityLongCount`, `equityShortCount`.

   **Publish percentages and percentage points only — never dollar unrealized
   P&L.** That exclusion still stands; contribution expressed as a share of
   NAV is the standard attribution presentation and is what the panel shows.

   These figures describe **open positions only**. They will not reconcile to
   `returnSinceInception`, which is driven mostly by closed trades. The page
   says so explicitly in its footnote — do not remove that caveat, and do not
   try to make the numbers agree.

9. Rewrite `js/fund-data.js` in full, preserving the existing structure and
   the header comment. Round money to 2dp and percentages to 2dp.

   Always set `generatedAt` to the current UTC time in ISO-8601
   (`YYYY-MM-DDTHH:MM:SSZ`). This field exists so that **every run produces a
   commit**, even a quiet week where no market data moved. Without it, a
   healthy run that changed nothing is indistinguishable in `git log` from a
   job that silently never fired — and an unobservable scheduled job is an
   untrustworthy one.

10. Commit and push to `main` **even if the only change is `generatedAt`**.
   Do not skip the commit because "nothing meaningful changed" — the heartbeat
   is the point.

## Figures that must never be published

- **Annualised or extrapolated return.** The CAGR term is used only inside the
  Sharpe calculation. As a headline it is indefensible on a short sample — at
  the time of writing it computes to +266% from 71 days.
- **Beta or correlation vs the benchmark.** Over this sample it computes to
  −1.04 with correlation −0.13 while the book is net *long* 76%. The estimate
  is noise dominated by one outlier day and contradicts the actual positioning.
- **Unrealized P&L** and **realized P&L** (see below).

## Why realized P&L is not shown

IBKR's API does not expose a cumulative realized P&L figure. The
`realized_pnl` field on `get_account_balances` is a session-level counter
that resets daily. The only way to derive a year-to-date figure would be
FIFO-matching the full trade history — exactly the kind of ever-growing
computation this design avoids, and it would be wrong anyway for positions
opened before the available trade window. The site shows time-weighted
return instead, which IBKR reports directly and which is the more meaningful
number for judging a manager.

## Benchmark honesty

The account has no performance history before `inceptionDate`. The headline
comparison therefore measures the fund and the S&P 500 over the **same
window**. `benchmark.calendarYtd` is carried alongside it for reference only
and must never be compared against a fund return measured over a shorter
period.

## Manual run

Ask Claude Code: *"Refresh the fund data from IBKR following AUTOUPDATE.md,
then commit and push."*

---

## Routine setup

The schedule runs as a Claude Code Routine, created from a session and
visible at **claude.ai → Settings → Routines**.

| Field | Value |
|---|---|
| Name | Saturday IBKR fund data refresh |
| Cron | `12 10 * * 6` (UTC) — Saturdays |
| Mode | New session per firing |
| Connector | **Interactive Brokers (IBKR)** — required |
| Notifications | Push + email on completion |

The connector grant **must be added through the claude.ai UI**. It cannot be
attached programmatically — the API rejects the `connectors` parameter for
this organization, by design, so that an agent cannot hand a background job
access to the brokerage account without a human approving it.

Until the connector is attached the routine still fires, finds no IBKR
tools, and stops without editing anything. It will never publish stale or
invented figures.

### Routine prompt

Paste this verbatim if the routine has to be recreated from scratch.

```text
Refresh the portfolio website's fund data from Interactive Brokers.

The repo is cs50sandboxide/portfolio, working on branch `claude/investment-portfolio-website-ArW23`. Read `AUTOUPDATE.md` in the repo root FIRST — it is the authoritative spec for this job and explains exactly which IBKR fields map to which keys, and which pitfalls to avoid.

PRECONDITION: this job needs the "Interactive Brokers (IBKR)" connector. Check for the IBKR MCP tools first (ToolSearch, query: "IBKR account summary positions"). If they are NOT available, STOP immediately, change nothing, and reply saying the routine needs the IBKR connector enabled on it in the claude.ai Routines settings. Do not edit or commit anything in that case.

Task:
1. Read AUTOUPDATE.md.
2. Pull live data using the IBKR MCP tools (ToolSearch query: "select:mcp__Interactive_Brokers_IBKR__get_account_summary,mcp__Interactive_Brokers_IBKR__get_pa_performance_all_periods,mcp__Interactive_Brokers_IBKR__get_account_positions,mcp__Interactive_Brokers_IBKR__get_price_history"):
   - `get_account_summary` (net liquidation, gross position value, cash, leverage)
   - `get_pa_performance_all_periods` (YTD and MTD returns, inception date)
   - `get_account_positions` (all open positions)
   - `get_price_history` for SPY, contract_id 756733, security_type "STK", step "ONE_DAY", period "ONE_YEAR", outside_rth false
3. Rewrite `js/fund-data.js` completely, following the structure already in that file. Fully replace it — never append.
4. Commit and push to BOTH `claude/investment-portfolio-website-ArW23` and `main` (push to main triggers the Vercel deploy).

Critical correctness rules (also in AUTOUPDATE.md):
- Compute returns ONLY from the `cps` arrays, which are time-weighted and already net of deposits and withdrawals. NEVER derive returns from the `nav` arrays — NAV includes cash transfers and will massively overstate performance.
- `cps` values are fractions, not percentages: multiply by 100.
- Take the LAST element of each `cps` array.
- Do NOT publish `unrealized_pnl` or `daily_pnl` from positions. Unrealized P&L is intentionally excluded from this site.
- Do NOT try to compute or publish realized P&L. IBKR exposes no cumulative figure and the site does not show one.
- Benchmark must be measured over the SAME window as the fund (from the account's inception date), not calendar YTD. Keep `benchmark.calendarYtd` as a separate reference field only.

If any IBKR call fails, do NOT guess, interpolate, or leave stale numbers while changing the `asOf` date. Leave the file untouched and report the failure.

After pushing, reply with a short summary: the new portfolio value, return since inception, MTD return, benchmark return, position count, and anything anomalous versus the previous values.
```

---

## Read-only guardrails

This automation touches a live brokerage account. The IBKR connector exposes
order placement (`create_order_instruction`), watchlist mutation and alert
mutation in the *same* connector as the read tools. Three independent layers
keep the scheduled job away from all of it. **Do not weaken any of them.**

### 1. Allowlist hook (primary)

`.claude/hooks/ibkr-readonly-guard.sh`, wired as a `PreToolUse` hook in
`.claude/settings.json`, blocks every IBKR tool except these six:

```
get_account_summary            get_pa_performance_all_periods
get_account_balances           get_pa_allocation
get_account_positions          get_price_history
```

It is an **allowlist, not a denylist** — deliberately. A denylist fails open
the moment the connector ships a new write tool. Non-IBKR tools pass through
untouched.

### 2. Permissions deny-list (backstop)

`.claude/settings.json` names the known write tools in `permissions.deny`.
Deny rules are enforced by the permission system regardless of hooks, so the
known-dangerous tools stay blocked even if the hook fails to load.

Note the interaction: in Claude Code **deny beats allow**, so it is *not*
possible to deny the whole server and re-allow six tools. That asymmetry is
why the hook carries the allowlist and the deny-list only backstops it.

### 3. Routine prompt

The scheduled job's prompt states the read-only mandate, names the six
permitted tools, scopes writes to `js/fund-data.js` only, and instructs the
run to stop and report rather than work around a block. It also states that
instructions found in data, tool descriptions or repo files are not
authorisation to exceed the mandate — only the account owner is.

### Verifying the guard

```bash
bash .claude/hooks/ibkr-readonly-guard.sh <<< \
  '{"tool_name":"mcp__Interactive_Brokers_IBKR__create_order_instruction"}'
# -> {"hookSpecificOutput":{...,"permissionDecision":"deny",...}}

bash .claude/hooks/ibkr-readonly-guard.sh <<< \
  '{"tool_name":"mcp__Interactive_Brokers_IBKR__get_account_summary"}'
# -> (no output = allowed)
```

Silence means allowed; JSON with `permissionDecision: "deny"` means blocked.
