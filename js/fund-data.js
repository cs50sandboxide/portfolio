/* ============================================
   FUND DATA — Live snapshot from Interactive Brokers
   ============================================
   AUTO-GENERATED. Do not hand-edit.
   Regenerated weekly (Fridays after US market close)
   by the routine described in AUTOUPDATE.md.

   Source: IBKR account summary, balances, positions,
           and performance endpoints + SPY daily closes.
   ============================================ */

const FUND_DATA = {
    // --- Snapshot metadata ---
    asOf: "2026-08-02",
    ibkrLastUpdate: "2026-08-02 12:28:46",

    // Wall-clock time this file was regenerated. Always changes, even when the
    // market data does not — so every refresh leaves a commit and `git log`
    // answers "did the weekly job actually run?". Without it, a healthy run on
    // a quiet week is indistinguishable from a job that never fired.
    generatedAt: "2026-08-02T12:30:00Z",

    // --- Headline figures ---
    portfolioValue: 994975.73,   // net liquidation value
    cash: 245624.50,
    grossExposure: 2498810.75,   // long + short notional
    leverage: 2.51,

    // --- Performance (time-weighted return, per IBKR) ---
    // The account's performance history begins at inception below;
    // there is no calendar-YTD figure available before that date.
    inceptionDate: "2026-04-24",
    returnSinceInception: 44.12,

    mtdReturn: 90.10,
    mtdWindow: "30 Jun – 2 Aug 2026",

    // --- Primary benchmark (used in the homepage banner and stat blocks) ---
    benchmark: {
        name: "S&P 500",
        proxy: "SPY",
        sinceInception: 4.63,    // 24 Apr close 713.94 -> 31 Jul 747.03
        calendarYtd: 9.55,       // 31 Dec close 681.92 -> 747.03
    },

    // --- Benchmark panel, all measured over the SAME window as the fund ---
    // ETF closes are used as index proxies. Every figure runs from the
    // account's inception date to `asOf`, so the comparison is like-for-like.
    benchmarks: [
        { name: "S&P 500",      proxy: "SPY", sinceInception: 4.63 },  // 713.94 -> 747.03
        { name: "Nasdaq 100",   proxy: "QQQ", sinceInception: 3.63 },  // 663.88 -> 687.99
        { name: "Russell 2000", proxy: "IWM", sinceInception: 5.26 },  // 276.65 -> 291.20
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
        long: 1624847.14,        // long equities incl. options
        short: -873963.62,
        net: 750883.52,
        gross: 2498810.76,
        cash: 245701.67,
        longPct: 163.3,
        shortPct: -87.8,
        netPct: 75.5,
        grossPct: 251.1,
        cashPct: 24.7,
    },

    // --- Risk, derived from IBKR's own daily time-weighted return series ---
    // IBKR exposes no risk-analytics endpoint; these are standard statistics
    // computed on the `cps` series that IBKR itself reports. See AUTOUPDATE.md.
    risk: {
        maxDrawdown: -27.1,
        annualizedVol: 103.5,
        sharpe: 2.53,
        sharpeRiskFree: 4.0,
        tradingDays: 71,
    },

    // --- Monthly time-weighted returns vs benchmark ---
    monthlyReturns: [
        { month: "2026-04", fund: -4.27,  benchmark: 0.66,  partial: true },
        { month: "2026-05", fund: -19.08, benchmark: 5.26 },
        { month: "2026-06", fund: -2.13,  benchmark: -1.28 },
        { month: "2026-07", fund: 89.26,  benchmark: 0.03 },
        { month: "2026-08", fund: 0.44,   benchmark: null,  partial: true },
    ],

    // --- Open positions (34) ---
    positions: {
        longs: [
            { ticker: "CEG",  quantity: 600,  price: 264.00,  value: 158400.00 },
            { ticker: "DT",   quantity: 3000, price: 44.32,   value: 132960.00 },
            { ticker: "META", quantity: 200,  price: 553.80,  value: 110760.00 },
            { ticker: "UBER", quantity: 1550, price: 70.45,   value: 109197.50 },
            { ticker: "PLTR", quantity: 850,  price: 122.77,  value: 104354.50 },
            { ticker: "HOOD", quantity: 1100, price: 86.23,   value: 94853.00  },
            { ticker: "CRM",  quantity: 500,  price: 183.38,  value: 91690.00  },
            { ticker: "CRCL", quantity: 1450, price: 61.59,   value: 89305.50  },
            { ticker: "IBIT", quantity: 2200, price: 35.59,   value: 78291.18  },
            { ticker: "WMT",  quantity: 700,  price: 111.33,  value: 77927.50  },
            { ticker: "MXL",  quantity: 1150, price: 66.06,   value: 75969.00  },
            { ticker: "USAR", quantity: 5000, price: 14.92,   value: 74600.00  },
            { ticker: "COIN", quantity: 500,  price: 146.26,  value: 73130.00  },
            { ticker: "COST", quantity: 75,   price: 951.88,  value: 71391.00  },
            { ticker: "NOW",  quantity: 600,  price: 111.23,  value: 66738.00  },
            { ticker: "XE",   quantity: 4010, price: 16.31,   value: 65403.10  },
            { ticker: "ASTS", quantity: 1050, price: 58.35,   value: 61267.50  },
            { ticker: "IONQ", quantity: 1600, price: 36.44,   value: 58304.00  },
        ],
        shorts: [
            { ticker: "NBIS", quantity: -725,  price: 186.70,  value: -135357.50 },
            { ticker: "BE",   quantity: -550,  price: 201.50,  value: -110825.00 },
            { ticker: "CIFR", quantity: -4500, price: 22.18,   value: -99810.00  },
            { ticker: "SNDK", quantity: -80,   price: 1205.00, value: -96400.00  },
            { ticker: "ADBE", quantity: -350,  price: 250.00,  value: -87500.00  },
            { ticker: "DELL", quantity: -200,  price: 402.20,  value: -80440.00  },
            { ticker: "COHR", quantity: -300,  price: 262.89,  value: -78867.00  },
            { ticker: "DOCN", quantity: -600,  price: 117.50,  value: -70500.00  },
            { ticker: "CBRS", quantity: -350,  price: 198.71,  value: -69548.50  },
        ],
        options: [
            { ticker: "MU",   contract: "Dec 18 '26 · 850 Put",  quantity: 1,   price: 179.16, value: 17916.20  },
            { ticker: "SPCE", contract: "Oct 16 '26 · 3 Put",    quantity: 100, price: 0.76,   value: 7606.32   },
            { ticker: "DELL", contract: "Dec 18 '26 · 320 Put",  quantity: 1,   price: 39.01,  value: 3900.96   },
            { ticker: "ARM",  contract: "Aug 21 '26 · 180 Put",  quantity: 5,   price: 2.43,   value: 1215.58   },
            { ticker: "DELL", contract: "Sep 18 '26 · 510 Call", quantity: -1,  price: 20.94,  value: -2094.26  },
            { ticker: "XE",   contract: "Oct 16 '26 · 20 Put",   quantity: -30, price: 5.44,   value: -16316.16 },
            { ticker: "XE",   contract: "Oct 16 '26 · 30 Put",   quantity: -20, price: 14.09,  value: -28179.40 },
        ],
    },
};
