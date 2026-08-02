# Weekly Fund Data Refresh

`js/fund-data.js` is a generated snapshot of the Interactive Brokers account.
It is regenerated **every Friday after the US market close** by a scheduled
Claude Code routine, which commits and pushes to `main`, triggering a Vercel
redeploy.

Nothing else on the site reads brokerage data. There is no trade history, no
running P&L ledger, and no state that grows over time — each refresh fully
replaces the file, so cost and complexity stay flat regardless of how long
the fund runs or how many trades are placed.

## Schedule

Cron `0 22 * * 5` (UTC) — 22:00 UTC Friday, which is 6pm ET during EDT and
5pm ET during EST. Both land safely after the 4pm ET close.

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
   (`market_price`), and `value` (`market_value`).

   **Do not publish `unrealized_pnl` or `daily_pnl`.** Unrealized P&L is
   deliberately excluded from the site.

4. **`get_price_history`** for SPY (`contract_id` 756733, `security_type`
   `"STK"`, `step` `"ONE_DAY"`, `period` `"ONE_YEAR"`, `outside_rth` false):
   - `benchmark.sinceInception` = (last close ÷ close on `inceptionDate` − 1) × 100.
     If `inceptionDate` is not a trading day, use the last close on or before it.
   - `benchmark.calendarYtd` = (last close ÷ last close of the prior December − 1) × 100.

5. Rewrite `js/fund-data.js` in full, preserving the existing structure and
   the header comment. Round money to 2dp and percentages to 2dp.

6. Commit and push to `main`.

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
| Name | Weekly IBKR fund data refresh |
| Cron | `0 22 * * 5` (UTC) |
| Mode | New session per firing |
| Connector | **Interactive Brokers (IBKR)** — required |
| Notifications | Push on completion |

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
