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
