# Trade decisions: how they are analysed and logged

The owner trades. Claude analyses and logs. **Nothing in this workflow places,
previews or changes an order**, whatever the IBKR connector is able to do.

## 1. Analyse, before the trade

The owner names a ticker, a side, a conviction (1–10) and the move they expect:

> *analyse SNOW short, conviction 7, target 40%*

Pull the live book so the analysis measures today's positions rather than
Saturday's: `get_account_summary` for NAV and `get_account_positions` for the
stocks (options are not modelled). Write them as
`[{ticker, side, pctNav}]` to a scratch file, then:

```
python3 tools/analyse.py SNOW short --conviction 7 --target 40 \
        --book /path/to/live-book.json --nav <NAV> [--p 0.4] [--tactical]
```

`--tactical` is for short-term trades: stop-out odds over 5 days, not 20.
`--json` gives the same result in the shape logged below.

| Rule | Value |
|---|---|
| Size | conviction ÷ 10 × cap; cap 12% of NAV long, 10% short |
| Stop | 2.5 × ATR(14) from entry — outside normal daily movement |
| Reward : risk | 3 : 1 or better, else flagged with the target that would pass |

Show the owner the card. They decide.

## 2. Log it, in Notion

Search Notion for the **Trade Decisions** database and add one page. It is
private, and it is the only place stop prices and dollar sizes are kept.

| Property | From |
|---|---|
| Decision | `"<TICKER> <side> · <d Mon>"` |
| Ticker, Side, Conviction | the request |
| Mode | Conviction, or Tactical if `--tactical` |
| Status | **Proposed** while undecided, **Open** once the owner says it is placed, **Passed** if not taken |
| Decided | today |
| Entry, Stop, Target | `price`, `stop.price`, `target.price` |
| Stop distance %, Target % | `stop.distancePct`, `target.pct` |
| Reward:risk | `rewardRisk` |
| Size % NAV, Shares | `size.pctNav`, `size.shares` |
| Loss at stop % NAV, Loss at stop $ | `lossAtStop.pctNav`, `lossAtStop.dollars` |
| Book vol before / after, Share of risk % | `book.volBefore`, `book.volAfter`, `book.shareOfRisk` |
| Your probability | `--p`, if given |
| Flags | `flags`, joined |
| Thesis | one line from the owner; conviction trades only |
| Publish | ticked only for conviction trades the owner wants on the site |

The page body holds the full card and, for conviction trades, the thesis in
the owner's words. Do not invent a thesis: if the owner has not given one,
leave it empty and ask.

## 3. Close it

When the owner closes a position: Status **Closed**, Exit price, Exit date,
**Result (R)** = realised P&L ÷ the loss at stop (so +2 is twice what was
risked, −1 is a full stop-out), and **Stop honoured** — whether the exit came
at or before the planned stop.

## What reaches the website

Never: stop prices, stop distances, dollar sizes, share counts, tactical
trades, or anything not marked Publish.

Conviction trades marked Publish: ticker, side, the one-line thesis, the date
decided, reward : risk at entry, and size as % of NAV — enough to show the
trade was justified before it was taken, and nothing that would advertise
where it gets cut.
