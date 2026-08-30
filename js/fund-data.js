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
    asOf: "2026-08-30",
    ibkrLastUpdate: "2026-08-30 16:54:19",

    // Wall-clock time this file was regenerated. Always changes, even when the
    // market data does not — so every refresh leaves a commit and `git log`
    // answers "did the weekly job actually run?". Without it, a healthy run on
    // a quiet week is indistinguishable from a job that never fired.
    generatedAt: "2026-08-30T16:56:39Z",

    // --- Headline figures ---
    portfolioValue: 1417604.34,   // net liquidation value
    cash: -6897.54,
    grossExposure: 6247902.02,    // long + short notional
    leverage: 4.41,

    // --- Performance (time-weighted return, per IBKR) ---
    // The account's performance history begins at inception below;
    // there is no calendar-YTD figure available before that date.
    inceptionDate: "2026-04-27",
    returnSinceInception: 105.34,

    mtdReturn: 43.11,
    mtdWindow: "31 Jul – 30 Aug 2026",

    // --- Primary benchmark (used in the homepage banner and stat blocks) ---
    benchmark: {
        name: "S&P 500",
        proxy: "SPY",
        sinceInception: 7.76,    // 27 Apr close 713.94 -> 28 Aug 769.35
        calendarYtd: 12.82,      // 31 Dec close 681.92 -> 769.35
    },

    // --- Benchmark panel, all measured over the SAME window as the fund ---
    // ETF closes are used as index proxies. Every figure runs from the
    // account's inception date to `asOf`, so the comparison is like-for-like.
    benchmarks: [
        { name: "S&P 500",      proxy: "SPY", sinceInception: 7.76 },   // 713.94 -> 769.35
        { name: "Nasdaq 100",   proxy: "QQQ", sinceInception: 7.92 },   // 663.88 -> 716.43
        { name: "Russell 2000", proxy: "IWM", sinceInception: 6.90 },   // 276.65 -> 295.75
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
        long: 3835556.21,
        short: -2412345.81,
        net: 1423210.41,
        gross: 6247902.02,
        cash: -5606.07,
        longPct: 270.57,
        shortPct: -170.17,
        netPct: 100.40,
        grossPct: 440.74,
        cashPct: -0.40,
    },

    // --- Risk, derived from IBKR's own daily time-weighted return series ---
    // IBKR exposes no risk-analytics endpoint; these are standard statistics
    // computed on the `cps` series that IBKR itself reports. See AUTOUPDATE.md.
    risk: {
        maxDrawdown: -27.14,
        annualizedVol: 95.56,
        sharpe: 6.59,
        sharpeRiskFree: 4.0,
        tradingDays: 91,
    },

    // --- Monthly time-weighted returns vs benchmark ---
    monthlyReturns: [
        { month: "2026-04", fund: -4.27,  benchmark: 0.66,  partial: true },
        { month: "2026-05", fund: -19.08, benchmark: 5.26 },
        { month: "2026-06", fund: -2.13,  benchmark: -1.28 },
        { month: "2026-07", fund: 89.26,  benchmark: 0.03 },
        { month: "2026-08", fund: 43.11,  benchmark: null,  partial: true },
    ],

    // --- Open positions (54) ---
    positions: {
        longs: [
            { ticker: "CEG",  quantity: 700,   price: 277.07, value: 193949.01 },
            { ticker: "UBER", quantity: 2250,  price: 78.82,  value: 177345.00 },
            { ticker: "META", quantity: 300,   price: 578.35, value: 173504.99 },
            { ticker: "INTC", quantity: 1850,  price: 89.25,  value: 165112.50 },
            { ticker: "SPOT", quantity: 275,   price: 547.51, value: 150565.25 },
            { ticker: "BX",   quantity: 1050,  price: 142.39, value: 149509.50 },
            { ticker: "NOC",  quantity: 265,   price: 543.10, value: 143921.49 },
            { ticker: "KKR",  quantity: 1300,  price: 108.68, value: 141284.00 },
            { ticker: "VST",  quantity: 1000,  price: 137.09, value: 137090.00 },
            { ticker: "GOOG", quantity: 400,   price: 342.48, value: 136992.00 },
            { ticker: "ASTS", quantity: 2350,  price: 58.09,  value: 136511.50 },
            { ticker: "APO",  quantity: 1000,  price: 135.04, value: 135039.99 },
            { ticker: "KTOS", quantity: 2550,  price: 52.02,  value: 132648.71 },
            { ticker: "WMT",  quantity: 1150,  price: 103.07, value: 118530.50 },
            { ticker: "TLN",  quantity: 400,   price: 296.25, value: 118500.00 },
            { ticker: "UNH",  quantity: 300,   price: 392.95, value: 117885.00 },
            { ticker: "ONDS", quantity: 14000, price: 7.93,   value: 111020.00 },
            { ticker: "COIN", quantity: 600,   price: 178.64, value: 107184.00 },
            { ticker: "LHX",  quantity: 400,   price: 262.82, value: 105128.00 },
            { ticker: "OSCR", quantity: 3400,  price: 30.47,  value: 103598.00 },
            { ticker: "FSLR", quantity: 500,   price: 204.46, value: 102230.00 },
            { ticker: "CRSP", quantity: 1750,  price: 57.62,  value: 100833.95 },
            { ticker: "IREN", quantity: 2760,  price: 35.60,  value: 98261.80  },
            { ticker: "HONA", quantity: 600,   price: 162.30, value: 97381.20  },
            { ticker: "CRCL", quantity: 1100,  price: 86.68,  value: 95348.00  },
            { ticker: "USAR", quantity: 5000,  price: 18.04,  value: 90200.00  },
            { ticker: "COST", quantity: 95,    price: 945.47, value: 89819.65  },
            { ticker: "IONQ", quantity: 2250,  price: 39.38,  value: 88605.00  },
            { ticker: "QBTS", quantity: 5000,  price: 17.01,  value: 85050.00  },
            { ticker: "CRWV", quantity: 1000,  price: 84.23,  value: 84230.00  },
            { ticker: "XE",   quantity: 4010,  price: 17.22,  value: 69052.20  },
            { ticker: "RKLB", quantity: 1000,  price: 64.52,  value: 64520.00  },
        ],
        shorts: [
            { ticker: "NVDA", quantity: -875,  price: 217.88, value: -190645.00 },
            { ticker: "NET",  quantity: -600,  price: 299.84, value: -179904.00 },
            { ticker: "CRM",  quantity: -700,  price: 256.48, value: -179536.01 },
            { ticker: "NOW",  quantity: -1200, price: 143.20, value: -171840.00 },
            { ticker: "SNOW", quantity: -500,  price: 328.00, value: -164000.00 },
            { ticker: "CRWD", quantity: -750,  price: 217.66, value: -163245.00 },
            { ticker: "ORCL", quantity: -1050, price: 150.95, value: -158499.60 },
            { ticker: "ROKU", quantity: -1000, price: 157.68, value: -157679.99 },
            { ticker: "TEAM", quantity: -825,  price: 190.41, value: -157092.37 },
            { ticker: "AMD",  quantity: -300,  price: 466.04, value: -139812.60 },
            { ticker: "OKTA", quantity: -750,  price: 166.18, value: -124634.99 },
            { ticker: "DELL", quantity: -265,  price: 456.24, value: -120903.60 },
            { ticker: "ADBE", quantity: -350,  price: 291.29, value: -101949.75 },
            { ticker: "MSTR", quantity: -750,  price: 127.94, value: -95955.00  },
            { ticker: "PLTR", quantity: -500,  price: 186.29, value: -93145.00  },
            { ticker: "DUOL", quantity: -600,  price: 146.85, value: -88107.60  },
            { ticker: "WIX",  quantity: -1000, price: 87.60,  value: -87600.00  },
        ],
        options: [
            { ticker: "MU",   contract: "Dec 18 '26 · 850 Put",  quantity: 1,   price: 77.38, value: 7737.68   },
            { ticker: "SPCE", contract: "Oct 16 '26 · 3 Put",    quantity: 100, price: 0.37,  value: 3664.19   },
            { ticker: "DELL", contract: "Dec 18 '26 · 320 Put",  quantity: 1,   price: 13.63, value: 1363.34   },
            { ticker: "XE",   contract: "Oct 16 '26 · 20 Put",   quantity: -30, price: 4.17,  value: -12517.29 },
            { ticker: "XE",   contract: "Oct 16 '26 · 30 Put",   quantity: -20, price: 13.02, value: -26033.80 },
        ],
    },
};
