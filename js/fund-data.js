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
    asOf: "2026-08-09",
    ibkrLastUpdate: "2026-08-09 13:56:59",

    // Wall-clock time this file was regenerated. Always changes, even when the
    // market data does not — so every refresh leaves a commit and `git log`
    // answers "did the weekly job actually run?". Without it, a healthy run on
    // a quiet week is indistinguishable from a job that never fired.
    generatedAt: "2026-08-09T14:00:56Z",

    // --- Headline figures ---
    portfolioValue: 1244510.08,   // net liquidation value
    cash: 1862292.56,
    grossExposure: 3137341.20,    // long + short notional
    leverage: 2.52,

    // --- Performance (time-weighted return, per IBKR) ---
    // The account's performance history begins at inception below;
    // there is no calendar-YTD figure available before that date.
    inceptionDate: "2026-04-27",
    returnSinceInception: 80.27,

    mtdReturn: 25.63,
    mtdWindow: "31 Jul – 9 Aug 2026",

    // --- Primary benchmark (used in the homepage banner and stat blocks) ---
    benchmark: {
        name: "S&P 500",
        proxy: "SPY",
        sinceInception: 8.31,    // 24 Apr close 713.94 -> 7 Aug 773.26
        calendarYtd: 13.39,      // 31 Dec close 681.92 -> 773.26
    },

    // --- Benchmark panel, all measured over the SAME window as the fund ---
    // ETF closes are used as index proxies. Every figure runs from the
    // account's inception date to `asOf`, so the comparison is like-for-like.
    benchmarks: [
        { name: "S&P 500",      proxy: "SPY", sinceInception: 8.31 },  // 713.94 -> 773.26
        { name: "Nasdaq 100",   proxy: "QQQ", sinceInception: 8.91 },  // 663.88 -> 723.03
        { name: "Russell 2000", proxy: "IWM", sinceInception: 9.00 },  // 276.65 -> 301.56
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
        long: 1259771.87,
        short: -1877569.33,
        net: -617797.46,
        gross: 3137341.20,
        cash: 1862307.54,
        longPct: 101.23,
        shortPct: -150.87,
        netPct: -49.64,
        grossPct: 252.09,
        cashPct: 149.64,
    },

    // --- Risk, derived from IBKR's own daily time-weighted return series ---
    // IBKR exposes no risk-analytics endpoint; these are standard statistics
    // computed on the `cps` series that IBKR itself reports. See AUTOUPDATE.md.
    risk: {
        maxDrawdown: -27.14,
        annualizedVol: 101.36,
        sharpe: 5.94,
        sharpeRiskFree: 4.0,
        tradingDays: 76,
    },

    // --- Monthly time-weighted returns vs benchmark ---
    monthlyReturns: [
        { month: "2026-04", fund: -4.27,  benchmark: 0.66,  partial: true },
        { month: "2026-05", fund: -19.08, benchmark: 5.26 },
        { month: "2026-06", fund: -2.13,  benchmark: -1.28 },
        { month: "2026-07", fund: 89.26,  benchmark: 0.03 },
        { month: "2026-08", fund: 25.63,  benchmark: null,  partial: true },
    ],

    // --- Open positions (36) ---
    positions: {
        longs: [
            { ticker: "CEG",  quantity: 600,  price: 269.89, value: 161934.01 },
            { ticker: "SPOT", quantity: 305,  price: 488.14, value: 148882.70 },
            { ticker: "CRCL", quantity: 2050, price: 66.67,  value: 136673.50 },
            { ticker: "CRM",  quantity: 650,  price: 192.74, value: 125281.00 },
            { ticker: "WMT",  quantity: 950,  price: 111.85, value: 106257.50 },
            { ticker: "COIN", quantity: 600,  price: 154.06, value: 92436.00  },
            { ticker: "XE",   quantity: 4010, price: 22.65,  value: 90826.50  },
            { ticker: "COST", quantity: 95,   price: 947.82, value: 90042.90  },
            { ticker: "IBIT", quantity: 2200, price: 36.80,  value: 80960.00  },
            { ticker: "VST",  quantity: 550,  price: 140.59, value: 77324.50  },
            { ticker: "ASTS", quantity: 1050, price: 72.54,  value: 76169.94  },
            { ticker: "INTC", quantity: 500,  price: 101.69, value: 50845.00  },
        ],
        shorts: [
            { ticker: "NVDA", quantity: -775,   price: 223.80, value: -173445.00 },
            { ticker: "TEAM", quantity: -1075,  price: 149.07, value: -160250.26 },
            { ticker: "AMD",  quantity: -300,   price: 483.15, value: -144945.00 },
            { ticker: "ORCL", quantity: -850,   price: 147.02, value: -124967.00 },
            { ticker: "ROKU", quantity: -700,   price: 153.11, value: -107177.00 },
            { ticker: "ACN",  quantity: -600,   price: 175.72, value: -105432.00 },
            { ticker: "CRWV", quantity: -1150,  price: 91.28,  value: -104972.00 },
            { ticker: "WDAY", quantity: -550,   price: 179.75, value: -98862.50  },
            { ticker: "INTU", quantity: -300,   price: 326.94, value: -98082.00  },
            { ticker: "AAOI", quantity: -700,   price: 135.91, value: -95137.00  },
            { ticker: "DELL", quantity: -200,   price: 454.20, value: -90840.00  },
            { ticker: "PLTR", quantity: -500,   price: 171.81, value: -85905.00  },
            { ticker: "NOW",  quantity: -650,   price: 124.75, value: -81089.45  },
            { ticker: "SPCE", quantity: -25000, price: 3.12,   value: -77987.50  },
            { ticker: "IONQ", quantity: -1750,  price: 44.21,  value: -77367.50  },
            { ticker: "SHOP", quantity: -500,   price: 151.20, value: -75602.00  },
            { ticker: "META", quantity: -125,   price: 591.93, value: -73990.75  },
            { ticker: "OKLO", quantity: -1500,  price: 48.52,  value: -72784.80  },
        ],
        options: [
            { ticker: "MU",   contract: "Dec 18 '26 · 850 Put",  quantity: 1,   price: 135.53, value: 13552.60  },
            { ticker: "SPCE", contract: "Oct 16 '26 · 3 Put",    quantity: 100, price: 0.50,   value: 5000.00   },
            { ticker: "DELL", contract: "Dec 18 '26 · 320 Put",  quantity: 1,   price: 27.01,  value: 2701.44   },
            { ticker: "DELL", contract: "Sep 18 '26 · 510 Call", quantity: -1,  price: 33.33,  value: -3333.44  },
            { ticker: "XE",   contract: "Oct 16 '26 · 20 Put",   quantity: -30, price: 2.47,   value: -7407.39  },
            { ticker: "XE",   contract: "Oct 16 '26 · 30 Put",   quantity: -20, price: 9.22,   value: -18433.36 },
        ],
    },
};
