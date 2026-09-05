/* ============================================
   FUND DATA — Live snapshot from Interactive Brokers
   ============================================
   AUTO-GENERATED. Do not hand-edit.
   Regenerated every Saturday, while markets are closed,
   by the routine described in AUTOUPDATE.md.

   Source: IBKR account summary, positions, performance
           and allocation endpoints, plus the latest close
           for each benchmark ETF. Historical closes are
           cached in `baselines` and never re-fetched.
   ============================================ */

const FUND_DATA = {
    // --- Snapshot metadata ---
    asOf: "2026-09-05",
    ibkrLastUpdate: "2026-09-05 10:13:04",

    // Wall-clock time this file was regenerated. Always changes, even when the
    // market data does not — so every refresh leaves a commit and `git log`
    // answers "did the weekly job actually run?". Without it, a healthy run on
    // a quiet week is indistinguishable from a job that never fired.
    generatedAt: "2026-09-05T10:16:19Z",

    // --- Headline figures ---
    portfolioValue: 1498036.05,   // net liquidation value
    cash: -324362.50,
    grossExposure: 6953260.27,    // long + short notional
    leverage: 4.64,

    // --- Performance (time-weighted return, per IBKR) ---
    // The account's performance history begins at inception below;
    // there is no calendar-YTD figure available before that date.
    inceptionDate: "2026-04-27",
    returnSinceInception: 116.99,

    mtdReturn: 8.81,
    mtdWindow: "31 Aug – 05 Sep 2026",

    // --- Primary benchmark (used in the homepage banner and stat blocks) ---
    benchmark: {
        name: "S&P 500",
        proxy: "SPY",
        sinceInception: 7.88,    // 27 Apr close 713.94 -> 04 Sep 770.19
        calendarYtd: 12.94,      // 31 Dec close 681.92 -> 770.19
    },

    // --- Benchmark panel, all measured over the SAME window as the fund ---
    // ETF closes are used as index proxies. Every figure runs from the
    // account's inception date to `asOf`, so the comparison is like-for-like.
    benchmarks: [
        { name: "S&P 500",      proxy: "SPY", sinceInception: 7.88 },   // 713.94 -> 770.19
        { name: "Nasdaq 100",   proxy: "QQQ", sinceInception: 8.30 },   // 663.88 -> 718.96
        { name: "Russell 2000", proxy: "IWM", sinceInception: 7.00 },   // 276.65 -> 296.01
    ],

    // --- Weekly cumulative return path, fund vs benchmarks ---
    // One row per refresh, appended — never recomputed. Every value is a
    // cumulative return from inceptionDate, in percent, measured at that
    // week's Friday close.
    //
    // Costs nothing extra to maintain: the fund figure is the same `cps` the
    // run already reads, and the index figures come from the same latest
    // closes it already fetches for the bar chart.
    //
    // The final `fund` value can differ slightly from `returnSinceInception`
    // above — this series is pinned to Friday closes, while the headline uses
    // the most recent mark IBKR reports. That is intended, not a mismatch.
    history: [
        { date: "2026-04-24", fund:   0.00, spy: 0.00, qqq:  0.00 },
        { date: "2026-05-01", fund:  -4.58, spy: 0.94, qqq:  1.55 },
        { date: "2026-05-08", fund:  -2.72, spy: 3.32, qqq:  7.13 },
        { date: "2026-05-15", fund:  -5.01, spy: 3.53, qqq:  6.79 },
        { date: "2026-05-22", fund:  -4.96, spy: 4.44, qqq:  8.08 },
        { date: "2026-05-29", fund: -22.54, spy: 5.96, qqq: 11.21 },
        { date: "2026-06-05", fund:  -6.23, spy: 3.31, qqq:  6.20 },
        { date: "2026-06-12", fund: -12.86, spy: 3.90, qqq:  8.66 },
        { date: "2026-06-19", fund: -19.60, spy: 4.59, qqq: 11.56 },
        { date: "2026-06-26", fund: -13.46, spy: 2.11, qqq:  6.42 },
        { date: "2026-07-03", fund:  -1.78, spy: 4.32, qqq:  7.34 },
        { date: "2026-07-10", fund:   1.51, spy: 5.74, qqq:  9.28 },
        { date: "2026-07-17", fund:   7.58, spy: 4.11, qqq:  4.74 },
        { date: "2026-07-24", fund:   6.12, spy: 3.50, qqq:  3.07 },
        { date: "2026-07-31", fund:  43.49, spy: 4.63, qqq:  3.63 },
        { date: "2026-08-07", fund:  80.01, spy: 8.31, qqq:  8.91 },
        { date: "2026-08-14", fund:  82.79, spy: 8.74, qqq: 10.12 },
        { date: "2026-08-21", fund: 109.83, spy: 7.25, qqq:  7.47 },
        { date: "2026-08-28", fund: 104.59, spy: 7.76, qqq:  7.92 },
        { date: "2026-09-04", fund: 116.74, spy: 7.88, qqq:  8.30 },
    ],

    // --- Attribution: how the book is positioned right now ---
    // Every figure here comes from get_pa_allocation and get_account_positions,
    // both of which the refresh already calls. No extra API cost.
    //
    // IMPORTANT: `contributors` / `detractors` are UNREALIZED moves on
    // currently-open positions against their average entry price. They sum to
    // `openContribTotal` and deliberately do NOT reconcile to
    // returnSinceInception — that return came predominantly from closed
    // trades, which this panel does not and cannot see. This describes
    // positioning today, not what drove the return.
    attribution: {
        // Long book by sector, % of long equity exposure (cash excluded).
        sectorsLong: [
            { name: "Industrial",         pct: 21.26 },
            { name: "Technology",         pct: 19.77 },
            { name: "Financials",         pct: 15.00 },
            { name: "Healthcare",         pct: 10.65 },
            { name: "Utilities",          pct: 10.39 },
            { name: "Telecomm",           pct: 6.28  },
            { name: "Basic Materials",    pct: 5.70  },
            { name: "Consumer Cyclicals", pct: 5.11  },
            { name: "Consumer Non-Cyc",   pct: 3.05  },
            { name: "Energy",             pct: 2.79  },
        ],

        // Short book by sector, % of short equity exposure.
        sectorsShort: [
            { name: "Technology",         pct: 84.01 },
            { name: "Industrial",         pct: 9.92  },
            { name: "Consumer Cyclicals", pct: 6.06  },
        ],

        // Net sector exposure (long minus short), $ — the actual directional
        // bet. A long-only sector pie hides that this book is materially net
        // SHORT technology while net long everything else.
        netTilt: [
            { name: "Industrial",         net:   678227 },
            { name: "Financials",         net:   658221 },
            { name: "Healthcare",         net:   467085 },
            { name: "Utilities",          net:   455852 },
            { name: "Telecomm",           net:   275467 },
            { name: "Basic Materials",    net:   250085 },
            { name: "Consumer Non-Cyc",   net:   133912 },
            { name: "Energy",             net:   122574 },
            { name: "Consumer Cyclicals", net:    68494 },
            { name: "Technology",         net: -1288513 },
        ],

        // Five largest positions by absolute market value.
        topPositions: [
            { ticker: "DELL", side: "Short", value: 198527, pctNav: 13.3, move: -7.87 },
            { ticker: "CRM",  side: "Short", value: 181461, pctNav: 12.1, move: -3.41 },
            { ticker: "CEG",  side: "Long",  value: 179376, pctNav: 12.0, move:  2.16 },
            { ticker: "UBER", side: "Long",  value: 177895, pctNav: 11.9, move: -0.52 },
            { ticker: "NVDA", side: "Short", value: 177852, pctNav: 11.9, move: -4.36 },
        ],

        // Ranked by contribution in percentage points of NAV, not by raw %
        // move — a 29% loss on a small position matters less than a 5% loss on
        // a large one. Equities only; the five option positions are tiny in
        // dollar terms and would otherwise dominate both ends on percentage.
        contributors: [
            { ticker: "IONQ", side: "Long",  pp:  0.26, move:  2.78 },
            { ticker: "CEG",  side: "Long",  pp:  0.25, move:  2.16 },
            { ticker: "VST",  side: "Long",  pp:  0.18, move:  1.71 },
        ],
        detractors: [
            { ticker: "XE",   side: "Long",  pp: -1.91, move: -28.67 },
            { ticker: "KTOS", side: "Long",  pp: -1.49, move: -14.97 },
            { ticker: "MSTR", side: "Short", pp: -1.10, move: -11.22 },
        ],

        openContribTotal: -13.25,
        equityLongCount: 34,
        equityShortCount: 17,
        top5Concentration: 13.2,   // % of gross exposure
    },

    // --- Cached baselines: fixed history the refresh job must NOT re-fetch ---
    // These are closes on dates already in the past, so they can never change.
    // Caching them means each run pulls only the newest close (one week of
    // daily bars) instead of a full year of OHLCV for three ETFs.
    baselines: {
        // Closes on inceptionDate — denominator for every `sinceInception`.
        inceptionClose: { SPY: 713.94, QQQ: 663.88, IWM: 276.65 },

        // Prior-December close — denominator for benchmark.calendarYtd (SPY only).
        priorDecClose: { SPY: 681.92 },

        // SPY month-end closes, for the S&P column of the monthly table.
        // Append one entry when a month completes; never recompute the rest.
        spyMonthEnd: {
            "2026-04": 718.66,
            "2026-05": 756.48,
            "2026-06": 746.77,
            "2026-07": 747.03,
            "2026-08": 767.05,
        },
    },

    // --- Exposure, straight from get_pa_allocation (reconciles to NAV) ---
    exposure: {
        long: 4387332.18,
        short: -2565928.09,
        net: 1821404.09,
        gross: 6953260.27,
        cash: -323368.04,
        longPct: 292.87,
        shortPct: -171.29,
        netPct: 121.59,
        grossPct: 464.16,
        cashPct: -21.59,
    },

    // --- Risk, derived from IBKR's own daily time-weighted return series ---
    // IBKR exposes no risk-analytics endpoint; these are standard statistics
    // computed on the `cps` series that IBKR itself reports. See AUTOUPDATE.md.
    risk: {
        maxDrawdown: -27.14,
        annualizedVol: 93.76,
        sharpe: 7.04,
        sharpeRiskFree: 4.0,
        tradingDays: 96,
    },

    // --- Monthly time-weighted returns vs benchmark ---
    monthlyReturns: [
        { month: "2026-04", fund: -4.27,  benchmark: 0.66,  partial: true },
        { month: "2026-05", fund: -19.08, benchmark: 5.26 },
        { month: "2026-06", fund: -2.13,  benchmark: -1.28 },
        { month: "2026-07", fund: 89.26,  benchmark: 0.03 },
        { month: "2026-08", fund: 38.99,  benchmark: 2.68 },
        { month: "2026-09", fund: 8.81,   benchmark: null,  partial: true },
    ],

    // --- Open positions (56) ---
    positions: {
        longs: [
            { ticker: "CEG",  quantity: 600,   price: 298.96, value: 179375.99 },
            { ticker: "UBER", quantity: 2350,  price: 75.70,  value: 177894.99 },
            { ticker: "INTC", quantity: 1850,  price: 95.89,  value: 177396.50 },
            { ticker: "GOOG", quantity: 500,   price: 335.72, value: 167860.50 },
            { ticker: "VST",  quantity: 1050,  price: 149.79, value: 157279.49 },
            { ticker: "NVO",  quantity: 3250,  price: 46.50,  value: 151125.00 },
            { ticker: "KKR",  quantity: 1400,  price: 107.73, value: 150822.00 },
            { ticker: "UNH",  quantity: 375,   price: 397.14, value: 148927.51 },
            { ticker: "IONQ", quantity: 3600,  price: 39.73,  value: 143028.00 },
            { ticker: "BX",   quantity: 1050,  price: 136.15, value: 142957.49 },
            { ticker: "NOC",  quantity: 265,   price: 514.98, value: 136469.69 },
            { ticker: "SPOT", quantity: 250,   price: 542.43, value: 135607.50 },
            { ticker: "WMT",  quantity: 1250,  price: 107.14, value: 133925.00 },
            { ticker: "APO",  quantity: 1000,  price: 133.67, value: 133670.00 },
            { ticker: "AVAV", quantity: 900,   price: 145.91, value: 131318.10 },
            { ticker: "OSCR", quantity: 4000,  price: 32.25,  value: 129000.00 },
            { ticker: "LMT",  quantity: 245,   price: 526.23, value: 128925.61 },
            { ticker: "LHX",  quantity: 500,   price: 256.45, value: 128225.01 },
            { ticker: "MP",   quantity: 2350,  price: 54.46,  value: 127990.40 },
            { ticker: "KTOS", quantity: 2650,  price: 47.82,  value: 126723.00 },
            { ticker: "ASTS", quantity: 2000,  price: 62.08,  value: 124160.00 },
            { ticker: "COST", quantity: 135,   price: 915.74, value: 123624.90 },
            { ticker: "FSLR", quantity: 600,   price: 204.45, value: 122670.00 },
            { ticker: "USAR", quantity: 7000,  price: 17.44,  value: 122060.40 },
            { ticker: "TLN",  quantity: 375,   price: 318.50, value: 119437.50 },
            { ticker: "JBLU", quantity: 25000, price: 4.63,   value: 115750.00 },
            { ticker: "META", quantity: 175,   price: 615.20, value: 107659.48 },
            { ticker: "INFQ", quantity: 8000,  price: 12.85,  value: 102800.00 },
            { ticker: "IBKR", quantity: 1100,  price: 92.65,  value: 101915.00 },
            { ticker: "LULU", quantity: 1000,  price: 100.61, value: 100610.00 },
            { ticker: "CRSP", quantity: 1750,  price: 55.99,  value: 97982.50  },
            { ticker: "RKLB", quantity: 1400,  price: 64.26,  value: 89964.00  },
            { ticker: "XE",   quantity: 4010,  price: 17.75,  value: 71168.28  },
            { ticker: "HIMS", quantity: 2500,  price: 27.82,  value: 69550.00  },
        ],
        shorts: [
            { ticker: "DELL", quantity: -380,  price: 522.44, value: -198526.83 },
            { ticker: "CRM",  quantity: -700,  price: 259.23, value: -181461.01 },
            { ticker: "NVDA", quantity: -775,  price: 229.49, value: -177852.42 },
            { ticker: "TEAM", quantity: -925,  price: 189.85, value: -175611.26 },
            { ticker: "AMD",  quantity: -360,  price: 477.57, value: -171925.20 },
            { ticker: "MSTR", quantity: -1150, price: 142.58, value: -163963.55 },
            { ticker: "CRWD", quantity: -750,  price: 213.20, value: -159900.00 },
            { ticker: "ORCL", quantity: -1000, price: 159.70, value: -159700.00 },
            { ticker: "ROKU", quantity: -1000, price: 155.59, value: -155590.00 },
            { ticker: "NOW",  quantity: -1100, price: 141.26, value: -155385.99 },
            { ticker: "NET",  quantity: -500,  price: 278.92, value: -139460.01 },
            { ticker: "HOOD", quantity: -1100, price: 122.10, value: -134310.00 },
            { ticker: "SNDK", quantity: -75,   price: 1734.01, value: -130050.75 },
            { ticker: "SNOW", quantity: -350,  price: 338.03, value: -118309.81 },
            { ticker: "NBIS", quantity: -500,  price: 225.12, value: -112562.50 },
            { ticker: "BE",   quantity: -400,  price: 266.18, value: -106472.00 },
            { ticker: "TWLO", quantity: -400,  price: 232.98, value: -93192.00  },
        ],
        options: [
            { ticker: "MU",   contract: "Dec 18 '26 · 850 Put",  quantity: 1,   price: 56.80, value: 5680.48   },
            { ticker: "SPCE", contract: "Oct 16 '26 · 3 Put",    quantity: 100, price: 0.29,  value: 2910.37   },
            { ticker: "DELL", contract: "Dec 18 '26 · 320 Put",  quantity: 1,   price: 6.24,  value: 623.92    },
            { ticker: "XE",   contract: "Oct 16 '26 · 20 Put",   quantity: -30, price: 3.58,  value: -10728.21 },
            { ticker: "XE",   contract: "Oct 16 '26 · 30 Put",   quantity: -20, price: 12.41, value: -24829.40 },
        ],
    },
};
