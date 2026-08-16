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
    asOf: "2026-08-16",
    ibkrLastUpdate: "2026-08-16 12:25:20",

    // Wall-clock time this file was regenerated. Always changes, even when the
    // market data does not — so every refresh leaves a commit and `git log`
    // answers "did the weekly job actually run?". Without it, a healthy run on
    // a quiet week is indistinguishable from a job that never fired.
    generatedAt: "2026-08-16T12:27:58Z",

    // --- Headline figures ---
    portfolioValue: 1258287.39,   // net liquidation value
    cash: 2731237.33,
    grossExposure: 4817619.88,    // long + short notional
    leverage: 3.83,

    // --- Performance (time-weighted return, per IBKR) ---
    // The account's performance history begins at inception below;
    // there is no calendar-YTD figure available before that date.
    inceptionDate: "2026-04-27",
    returnSinceInception: 82.26,

    mtdReturn: 27.02,
    mtdWindow: "31 Jul – 16 Aug 2026",

    // --- Primary benchmark (used in the homepage banner and stat blocks) ---
    benchmark: {
        name: "S&P 500",
        proxy: "SPY",
        sinceInception: 8.74,    // 27 Apr close 713.94 -> 14 Aug 776.34
        calendarYtd: 13.85,      // 31 Dec close 681.92 -> 776.34
    },

    // --- Benchmark panel, all measured over the SAME window as the fund ---
    // ETF closes are used as index proxies. Every figure runs from the
    // account's inception date to `asOf`, so the comparison is like-for-like.
    benchmarks: [
        { name: "S&P 500",      proxy: "SPY", sinceInception: 8.74 },   // 713.94 -> 776.34
        { name: "Nasdaq 100",   proxy: "QQQ", sinceInception: 10.12 },  // 663.88 -> 731.07
        { name: "Russell 2000", proxy: "IWM", sinceInception: 10.28 }, // 276.65 -> 305.09
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
    ],

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
        },
    },

    // --- Exposure, straight from get_pa_allocation (reconciles to NAV) ---
    exposure: {
        long: 1672178.51,
        short: -3145441.37,
        net: -1473262.86,
        gross: 4817619.88,
        cash: 2731550.25,
        longPct: 132.89,
        shortPct: -249.98,
        netPct: -117.08,
        grossPct: 382.87,
        cashPct: 217.08,
    },

    // --- Risk, derived from IBKR's own daily time-weighted return series ---
    // IBKR exposes no risk-analytics endpoint; these are standard statistics
    // computed on the `cps` series that IBKR itself reports. See AUTOUPDATE.md.
    risk: {
        maxDrawdown: -27.14,
        annualizedVol: 98.87,
        sharpe: 5.49,
        sharpeRiskFree: 4.0,
        tradingDays: 81,
    },

    // --- Monthly time-weighted returns vs benchmark ---
    monthlyReturns: [
        { month: "2026-04", fund: -4.27,  benchmark: 0.66,  partial: true },
        { month: "2026-05", fund: -19.08, benchmark: 5.26 },
        { month: "2026-06", fund: -2.13,  benchmark: -1.28 },
        { month: "2026-07", fund: 89.26,  benchmark: 0.03 },
        { month: "2026-08", fund: 27.02,  benchmark: null,  partial: true },
    ],

    // --- Open positions (46) ---
    positions: {
        longs: [
            { ticker: "CEG",  quantity: 600,   price: 282.70, value: 169620.01 },
            { ticker: "COIN", quantity: 900,   price: 148.47, value: 133623.00 },
            { ticker: "SPOT", quantity: 250,   price: 512.82, value: 128205.00 },
            { ticker: "CRM",  quantity: 650,   price: 196.21, value: 127536.50 },
            { ticker: "ASTS", quantity: 1750,  price: 70.90,  value: 124075.00 },
            { ticker: "UNH",  quantity: 300,   price: 401.73, value: 120519.00 },
            { ticker: "WMT",  quantity: 950,   price: 115.34, value: 109573.00 },
            { ticker: "UBER", quantity: 1250,  price: 75.95,  value: 94937.50  },
            { ticker: "ONDS", quantity: 10000, price: 9.24,   value: 92400.00  },
            { ticker: "COST", quantity: 95,    price: 960.68, value: 91264.41  },
            { ticker: "VST",  quantity: 600,   price: 148.36, value: 89016.00  },
            { ticker: "KTOS", quantity: 1350,  price: 64.58,  value: 87183.00  },
            { ticker: "XE",   quantity: 4010,  price: 21.15,  value: 84811.50  },
            { ticker: "IBIT", quantity: 2200,  price: 35.65,  value: 78430.00  },
            { ticker: "DT",   quantity: 1500,  price: 49.14,  value: 73710.00  },
            { ticker: "CRSP", quantity: 1000,  price: 53.73,  value: 53730.50  },
        ],
        shorts: [
            { ticker: "NBIS", quantity: -850,   price: 277.80,  value: -236129.99 },
            { ticker: "LITE", quantity: -190,   price: 926.14,  value: -175966.60 },
            { ticker: "NVDA", quantity: -775,   price: 224.75,  value: -174179.70 },
            { ticker: "TEAM", quantity: -1075,  price: 161.61,  value: -173730.75 },
            { ticker: "SMCI", quantity: -4100,  price: 39.90,   value: -163590.01 },
            { ticker: "SNDK", quantity: -95,    price: 1657.00, value: -157415.00 },
            { ticker: "AMD",  quantity: -300,   price: 514.39,  value: -154317.00 },
            { ticker: "STX",  quantity: -150,   price: 973.44,  value: -146016.00 },
            { ticker: "ORCL", quantity: -950,   price: 150.77,  value: -143231.50 },
            { ticker: "ROKU", quantity: -900,   price: 157.35,  value: -141612.30 },
            { ticker: "CRWD", quantity: -650,   price: 217.65,  value: -141472.50 },
            { ticker: "SHOP", quantity: -900,   price: 154.32,  value: -138888.01 },
            { ticker: "PANW", quantity: -350,   price: 384.27,  value: -134494.50 },
            { ticker: "DELL", quantity: -265,   price: 491.85,  value: -130340.25 },
            { ticker: "AAOI", quantity: -800,   price: 151.38,  value: -121104.00 },
            { ticker: "CRWV", quantity: -1150,  price: 105.26,  value: -121049.00 },
            { ticker: "NET",  quantity: -350,   price: 315.78,  value: -110523.00 },
            { ticker: "PLTR", quantity: -600,   price: 173.99,  value: -104394.00 },
            { ticker: "RDDT", quantity: -500,   price: 178.26,  value: -89130.00  },
            { ticker: "COHR", quantity: -250,   price: 327.15,  value: -81787.50  },
            { ticker: "BE",   quantity: -350,   price: 231.04,  value: -80864.00  },
            { ticker: "HPE",  quantity: -1250,  price: 58.85,   value: -73562.50  },
            { ticker: "OCC",  quantity: -4000,  price: 17.89,   value: -71560.00  },
            { ticker: "MU",   quantity: -50,    price: 972.98,  value: -48649.00  },
        ],
        options: [
            { ticker: "MU",   contract: "Dec 18 '26 · 850 Put",  quantity: 1,   price: 88.48, value: 8848.42   },
            { ticker: "SPCE", contract: "Oct 16 '26 · 3 Put",    quantity: 100, price: 0.34,  value: 3432.08   },
            { ticker: "DELL", contract: "Dec 18 '26 · 320 Put",  quantity: 1,   price: 16.42, value: 1642.34   },
            { ticker: "DELL", contract: "Sep 18 '26 · 510 Call", quantity: -1,  price: 40.51, value: -4051.24  },
            { ticker: "XE",   contract: "Oct 16 '26 · 20 Put",   quantity: -30, price: 2.42,  value: -7246.23  },
            { ticker: "XE",   contract: "Oct 16 '26 · 30 Put",   quantity: -20, price: 9.73,  value: -19460.86 },
        ],
    },
};
