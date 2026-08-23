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
    asOf: "2026-08-23",
    ibkrLastUpdate: "2026-08-23 08:12:45",

    // Wall-clock time this file was regenerated. Always changes, even when the
    // market data does not — so every refresh leaves a commit and `git log`
    // answers "did the weekly job actually run?". Without it, a healthy run on
    // a quiet week is indistinguishable from a job that never fired.
    generatedAt: "2026-08-23T08:16:13Z",

    // --- Headline figures ---
    portfolioValue: 1448060.14,   // net liquidation value
    cash: 1248867.58,
    grossExposure: 5287672.75,    // long + short notional
    leverage: 3.65,

    // --- Performance (time-weighted return, per IBKR) ---
    // The account's performance history begins at inception below;
    // there is no calendar-YTD figure available before that date.
    inceptionDate: "2026-04-27",
    returnSinceInception: 109.75,

    mtdReturn: 46.18,
    mtdWindow: "31 Jul – 23 Aug 2026",

    // --- Primary benchmark (used in the homepage banner and stat blocks) ---
    benchmark: {
        name: "S&P 500",
        proxy: "SPY",
        sinceInception: 7.25,    // 27 Apr close 713.94 -> 21 Aug 765.72
        calendarYtd: 12.29,      // 31 Dec close 681.92 -> 765.72
    },

    // --- Benchmark panel, all measured over the SAME window as the fund ---
    // ETF closes are used as index proxies. Every figure runs from the
    // account's inception date to `asOf`, so the comparison is like-for-like.
    benchmarks: [
        { name: "S&P 500",      proxy: "SPY", sinceInception: 7.25 },   // 713.94 -> 765.72
        { name: "Nasdaq 100",   proxy: "QQQ", sinceInception: 7.47 },   // 663.88 -> 713.44
        { name: "Russell 2000", proxy: "IWM", sinceInception: 8.43 },   // 276.65 -> 299.96
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
        long: 2742813.25,
        short: -2544859.50,
        net: 197953.74,
        gross: 5287672.75,
        cash: 1250106.40,
        longPct: 189.41,
        shortPct: -175.74,
        netPct: 13.67,
        grossPct: 365.16,
        cashPct: 86.33,
    },

    // --- Risk, derived from IBKR's own daily time-weighted return series ---
    // IBKR exposes no risk-analytics endpoint; these are standard statistics
    // computed on the `cps` series that IBKR itself reports. See AUTOUPDATE.md.
    risk: {
        maxDrawdown: -27.14,
        annualizedVol: 97.71,
        sharpe: 7.90,
        sharpeRiskFree: 4.0,
        tradingDays: 86,
    },

    // --- Monthly time-weighted returns vs benchmark ---
    monthlyReturns: [
        { month: "2026-04", fund: -4.27,  benchmark: 0.66,  partial: true },
        { month: "2026-05", fund: -19.08, benchmark: 5.26 },
        { month: "2026-06", fund: -2.13,  benchmark: -1.28 },
        { month: "2026-07", fund: 89.26,  benchmark: 0.03 },
        { month: "2026-08", fund: 46.18,  benchmark: null,  partial: true },
    ],

    // --- Open positions (49) ---
    positions: {
        longs: [
            { ticker: "CEG",  quantity: 600,   price: 272.88, value: 163728.00 },
            { ticker: "UBER", quantity: 2050,  price: 78.80,  value: 161540.01 },
            { ticker: "ASTS", quantity: 2350,  price: 68.73,  value: 161515.51 },
            { ticker: "INTC", quantity: 1750,  price: 89.86,  value: 157255.00 },
            { ticker: "KKR",  quantity: 1200,  price: 108.48, value: 130176.00 },
            { ticker: "USAR", quantity: 6500,  price: 19.26,  value: 125190.00 },
            { ticker: "DT",   quantity: 2500,  price: 49.30,  value: 123250.00 },
            { ticker: "VST",  quantity: 900,   price: 136.21, value: 122589.01 },
            { ticker: "ONDS", quantity: 14000, price: 8.68,   value: 121520.00 },
            { ticker: "WMT",  quantity: 1150,  price: 103.67, value: 119219.35 },
            { ticker: "CBRS", quantity: 600,   price: 196.13, value: 117678.00 },
            { ticker: "KTOS", quantity: 2050,  price: 57.39,  value: 117649.50 },
            { ticker: "UNH",  quantity: 300,   price: 390.20, value: 117060.00 },
            { ticker: "LHX",  quantity: 400,   price: 266.73, value: 106692.00 },
            { ticker: "META", quantity: 175,   price: 552.95, value: 96766.25  },
            { ticker: "IONQ", quantity: 2150,  price: 44.86,  value: 96449.00  },
            { ticker: "NOC",  quantity: 175,   price: 551.03, value: 96430.26  },
            { ticker: "BX",   quantity: 650,   price: 143.67, value: 93386.80  },
            { ticker: "MP",   quantity: 1550,  price: 60.05,  value: 93077.50  },
            { ticker: "COST", quantity: 95,    price: 947.74, value: 90035.30  },
            { ticker: "CRWV", quantity: 1000,  price: 87.68,  value: 87682.30  },
            { ticker: "OSCR", quantity: 2500,  price: 32.02,  value: 80050.00  },
            { ticker: "XE",   quantity: 4010,  price: 18.95,  value: 75989.50  },
            { ticker: "RKLB", quantity: 1000,  price: 72.57,  value: 72570.00  },
        ],
        shorts: [
            { ticker: "NVDA", quantity: -875,   price: 215.38,  value: -188457.50 },
            { ticker: "CRCL", quantity: -1900,  price: 88.55,   value: -168245.01 },
            { ticker: "SNOW", quantity: -500,   price: 333.30,  value: -166649.99 },
            { ticker: "ROKU", quantity: -1000,  price: 157.00,  value: -157000.00 },
            { ticker: "ORCL", quantity: -1050,  price: 146.69,  value: -154024.50 },
            { ticker: "SNDK", quantity: -95,    price: 1593.20, value: -151354.00 },
            { ticker: "TEAM", quantity: -875,   price: 171.47,  value: -150036.25 },
            { ticker: "NET",  quantity: -500,   price: 293.14,  value: -146570.01 },
            { ticker: "AMD",  quantity: -300,   price: 473.25,  value: -141975.00 },
            { ticker: "COIN", quantity: -700,   price: 189.10,  value: -132370.00 },
            { ticker: "NOW",  quantity: -950,   price: 127.94,  value: -121543.00 },
            { ticker: "WDAY", quantity: -600,   price: 199.96,  value: -119976.00 },
            { ticker: "DELL", quantity: -265,   price: 440.77,  value: -116804.58 },
            { ticker: "HOOD", quantity: -950,   price: 108.52,  value: -103096.85 },
            { ticker: "MU",   quantity: -100,   price: 963.20,  value: -96320.00  },
            { ticker: "MSTR", quantity: -750,   price: 121.16,  value: -90870.00  },
            { ticker: "DUOL", quantity: -600,   price: 145.77,  value: -87463.20  },
            { ticker: "SPCE", quantity: -27500, price: 3.08,    value: -84700.00  },
            { ticker: "RGTI", quantity: -4000,  price: 17.87,   value: -71480.00  },
            { ticker: "QUBT", quantity: -7000,  price: 8.92,    value: -62440.00  },
        ],
        options: [
            { ticker: "MU",   contract: "Dec 18 '26 · 850 Put",  quantity: 1,   price: 83.93, value: 8392.57   },
            { ticker: "SPCE", contract: "Oct 16 '26 · 3 Put",    quantity: 100, price: 0.37,  value: 3717.49   },
            { ticker: "DELL", contract: "Dec 18 '26 · 320 Put",  quantity: 1,   price: 20.70, value: 2070.28   },
            { ticker: "XE",   contract: "Oct 16 '26 · 20 Put",   quantity: -30, price: 3.42,  value: -10254.18 },
            { ticker: "XE",   contract: "Oct 16 '26 · 30 Put",   quantity: -20, price: 11.82, value: -23639.00 },
        ],
    },
};
