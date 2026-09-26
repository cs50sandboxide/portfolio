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
    asOf: "2026-09-26",
    ibkrLastUpdate: "2026-09-26 10:13:23",

    // Wall-clock time this file was regenerated. Always changes, even when the
    // market data does not — so every refresh leaves a commit and `git log`
    // answers "did the weekly job actually run?". Without it, a healthy run on
    // a quiet week is indistinguishable from a job that never fired.
    generatedAt: "2026-09-26T10:17:20Z",

    // --- Headline figures ---
    portfolioValue: 1512948.96,   // net liquidation value
    cash: -209902.91,
    grossExposure: 5616620.20,    // long + short notional
    leverage: 3.71,

    // --- Performance (time-weighted return, per IBKR) ---
    // The account's performance history begins at inception below;
    // there is no calendar-YTD figure available before that date.
    inceptionDate: "2026-04-27",
    returnSinceInception: 92.30,

    mtdReturn: -3.57,
    mtdWindow: "31 Aug – 26 Sep 2026",

    // --- Primary benchmark (used in the homepage banner and stat blocks) ---
    benchmark: {
        name: "S&P 500",
        proxy: "SPY",
        sinceInception: 8.04,    // 27 Apr close 713.94 -> 25 Sep 771.35
        calendarYtd: 13.11,      // 31 Dec close 681.92 -> 771.35
    },

    // --- Benchmark panel, all measured over the SAME window as the fund ---
    // ETF closes are used as index proxies. Every figure runs from the
    // account's inception date to `asOf`, so the comparison is like-for-like.
    benchmarks: [
        { name: "S&P 500",      proxy: "SPY", sinceInception: 8.04 },   // 713.94 -> 771.35
        { name: "Nasdaq 100",   proxy: "QQQ", sinceInception: 12.14 },  // 663.88 -> 744.50
        { name: "Russell 2000", proxy: "IWM", sinceInception: 1.92 },   // 276.65 -> 281.97
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
        { date: "2026-09-11", fund: 103.72, spy: 7.05, qqq:  7.68 },
        { date: "2026-09-18", fund: 111.29, spy: 6.69, qqq:  8.67 },
        { date: "2026-09-25", fund:  92.41, spy: 8.04, qqq: 12.14 },
    ],

    // --- Ticker to company name ---
    // Cached so the weekly refresh never re-looks-up a name it already holds;
    // only a genuinely new ticker costs a lookup. IBKR's positions endpoint
    // returns no company name, so these come from search_contracts.
    //
    // A ticker missing from this map simply renders blank in the holdings
    // table. Leave it blank rather than guessing — a wrong company name
    // against a real position is worse than an empty cell.
    tickerNames: {
        ACN:     "Accenture",
        ADBE:    "Adobe",
        ALAB:    "Astera Labs",
        AMD:     "Advanced Micro Devices",
        APO:     "Apollo Global Management",
        ARM:     "Arm Holdings",
        ASTS:    "AST SpaceMobile",
        AVAV:    "AeroVironment",
        BE:      "Bloom Energy",
        BX:      "Blackstone",
        CEG:     "Constellation Energy",
        COHR:    "Coherent",
        COIN:    "Coinbase Global",
        COST:    "Costco Wholesale",
        CRCL:    "Circle Internet Group",
        CRM:     "Salesforce",
        CRSP:    "CRISPR Therapeutics",
        CRWD:    "CrowdStrike",
        DDOG:    "Datadog",
        DELL:    "Dell Technologies",
        FSLR:    "First Solar",
        GFS:     "GlobalFoundries",
        GOOG:    "Alphabet",
        HIMS:    "Hims &amp; Hers Health",
        HOOD:    "Robinhood Markets",
        HPE:     "Hewlett Packard Enterprise",
        IBKR:    "Interactive Brokers Group",
        INFQ:    "Infleqtion",
        INTC:    "Intel",
        IONQ:    "IonQ",
        JBLU:    "JetBlue Airways",
        KKR:     "KKR &amp; Co",
        KTOS:    "Kratos Defense &amp; Security",
        LHX:     "L3Harris Technologies",
        LMT:     "Lockheed Martin",
        LULU:    "Lululemon Athletica",
        META:    "Meta Platforms",
        MP:      "MP Materials",
        MSTR:    "Strategy",
        MU:      "Micron Technology",
        MXL:     "MaxLinear",
        NBIS:    "Nebius Group",
        NET:     "Cloudflare",
        NOC:     "Northrop Grumman",
        NOW:     "ServiceNow",
        NVDA:    "NVIDIA",
        NVO:     "Novo Nordisk",
        OKLO:    "Oklo",
        OKTA:    "Okta",
        ORCL:    "Oracle",
        OSCR:    "Oscar Health",
        RKLB:    "Rocket Lab",
        ROKU:    "Roku",
        SDGR:    "Schrodinger",
        SHOP:    "Shopify",
        SNDK:    "SanDisk",
        SNOW:    "Snowflake",
        SPCE:    "Virgin Galactic",
        SPOT:    "Spotify Technology",
        TEAM:    "Atlassian",
        TLN:     "Talen Energy",
        TWLO:    "Twilio",
        UBER:    "Uber Technologies",
        UNH:     "UnitedHealth Group",
        USAR:    "USA Rare Earth",
        VG:      "Venture Global",
        VST:     "Vistra",
        WMT:     "Walmart",
        XE:      "X-Energy",
    },

    // --- Attribution: how the book is positioned right now ---
    // Every figure here comes from get_pa_allocation and get_account_positions,
    // both of which the refresh already calls. No extra API cost.
    //
    // These figures describe OPEN POSITIONS ONLY and will NOT reconcile to
    // returnSinceInception, which is driven mostly by closed trades. This
    // describes positioning today, not what drove the return.
    attribution: {
        // Long book by sector, % of long equity exposure (cash excluded).
        sectorsLong: [
            { name: "Technology",         pct: 22.45 },
            { name: "Industrial",         pct: 20.45 },
            { name: "Financials",         pct: 17.66 },
            { name: "Utilities",          pct: 12.12 },
            { name: "Healthcare",         pct: 7.81  },
            { name: "Energy",             pct: 6.49  },
            { name: "Basic Materials",    pct: 5.96  },
            { name: "Consumer Non-Cyc",   pct: 3.67  },
            { name: "Consumer Cyclicals", pct: 3.39  },
        ],

        // Short book by sector, % of short equity exposure.
        sectorsShort: [
            { name: "Technology",         pct: 98.47 },
            { name: "Industrial",         pct: 1.53  },
        ],

        // Net sector exposure (long minus short) as % of NAV — the actual
        // directional bet. A long-only sector pie hides that this book is
        // materially net SHORT technology while net long everything else.
        netTilt: [
            { name: "Industrial",         pct: 47.67  },
            { name: "Financials",         pct: 42.86  },
            { name: "Utilities",          pct: 29.42  },
            { name: "Healthcare",         pct: 18.96  },
            { name: "Energy",             pct: 15.76  },
            { name: "Basic Materials",    pct: 14.46  },
            { name: "Consumer Non-Cyc",   pct: 8.92   },
            { name: "Consumer Cyclicals", pct: 8.23   },
            { name: "Technology",         pct: -72.04 },
        ],

        // Five largest positions by absolute size, as % of NAV.
        topPositions: [
            { ticker: "NET",  side: "Short", pctNav: 16.15 },
            { ticker: "AMD",  side: "Short", pctNav: 14.18 },
            { ticker: "CEG",  side: "Long",  pctNav: 12.18 },
            { ticker: "ASTS", side: "Long",  pctNav: 11.85 },
            { ticker: "BX",   side: "Long",  pctNav: 11.35 },
        ],

        equityLongCount: 29,
        equityShortCount: 12,
        top5Concentration: 17.70,   // % of gross exposure
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
        long: 3672517.10,
        short: -1944103.10,
        net: 1728414.01,
        gross: 5616620.20,
        cash: -215465.05,
        longPct: 242.74,
        shortPct: -128.50,
        netPct: 114.24,
        grossPct: 371.24,
        cashPct: -14.24,
    },

    // --- Risk, derived from IBKR's own daily time-weighted return series ---
    // IBKR exposes no risk-analytics endpoint; these are standard statistics
    // computed on the `cps` series that IBKR itself reports. See AUTOUPDATE.md.
    risk: {
        maxDrawdown: -27.14,
        annualizedVol: 90.43,
        sharpe: 3.73,
        sharpeRiskFree: 4.0,
        tradingDays: 111,
    },

    // --- Open positions (50) ---
    positions: {
        longs: [
            { ticker: "CEG",  quantity: 700,   price: 263.27, pctNav: 12.18 },
            { ticker: "ASTS", quantity: 2900,  price: 61.81,  pctNav: 11.85 },
            { ticker: "BX",   quantity: 1450,  price: 118.42, pctNav: 11.35 },
            { ticker: "UBER", quantity: 2350,  price: 69.66,  pctNav: 10.82 },
            { ticker: "SPOT", quantity: 300,   price: 510.01, pctNav: 10.11 },
            { ticker: "NVO",  quantity: 3750,  price: 38.80,  pctNav: 9.62  },
            { ticker: "KKR",  quantity: 1500,  price: 96.67,  pctNav: 9.58  },
            { ticker: "UNH",  quantity: 375,   price: 377.17, pctNav: 9.35  },
            { ticker: "VST",  quantity: 1000,  price: 138.76, pctNav: 9.17  },
            { ticker: "NOC",  quantity: 265,   price: 510.52, pctNav: 8.94  },
            { ticker: "WMT",  quantity: 1250,  price: 107.98, pctNav: 8.92  },
            { ticker: "LMT",  quantity: 245,   price: 519.56, pctNav: 8.41  },
            { ticker: "FSLR", quantity: 700,   price: 178.01, pctNav: 8.24  },
            { ticker: "COST", quantity: 135,   price: 922.77, pctNav: 8.23  },
            { ticker: "TLN",  quantity: 400,   price: 304.43, pctNav: 8.05  },
            { ticker: "APO",  quantity: 1000,  price: 121.69, pctNav: 8.04  },
            { ticker: "KTOS", quantity: 2650,  price: 45.72,  pctNav: 8.01  },
            { ticker: "LHX",  quantity: 500,   price: 237.69, pctNav: 7.86  },
            { ticker: "CRCL", quantity: 1300,  price: 87.38,  pctNav: 7.51  },
            { ticker: "VG",   quantity: 9000,  price: 12.62,  pctNav: 7.51  },
            { ticker: "MP",   quantity: 2300,  price: 48.83,  pctNav: 7.42  },
            { ticker: "OSCR", quantity: 3750,  price: 29.60,  pctNav: 7.34  },
            { ticker: "JBLU", quantity: 25000, price: 4.40,   pctNav: 7.27  },
            { ticker: "USAR", quantity: 7000,  price: 15.19,  pctNav: 7.03  },
            { ticker: "ADBE", quantity: 450,   price: 235.50, pctNav: 7.00  },
            { ticker: "ACN",  quantity: 600,   price: 176.11, pctNav: 6.98  },
            { ticker: "IBKR", quantity: 1100,  price: 89.24,  pctNav: 6.49  },
            { ticker: "AVAV", quantity: 500,   price: 153.04, pctNav: 5.06  },
            { ticker: "XE",   quantity: 4010,  price: 15.13,  pctNav: 4.01  },
        ],
        shorts: [
            { ticker: "NET",  quantity: -700,  price: 349.02,  pctNav: 16.15 },
            { ticker: "AMD",  quantity: -340,  price: 630.92,  pctNav: 14.18 },
            { ticker: "OKTA", quantity: -800,  price: 196.50,  pctNav: 10.39 },
            { ticker: "DELL", quantity: -270,  price: 563.23,  pctNav: 10.05 },
            { ticker: "CRWD", quantity: -600,  price: 252.13,  pctNav: 10.00 },
            { ticker: "SNDK", quantity: -85,   price: 1772.04, pctNav: 9.96  },
            { ticker: "MXL",  quantity: -1600, price: 93.84,   pctNav: 9.92  },
            { ticker: "ARM",  quantity: -400,  price: 310.85,  pctNav: 8.22  },
            { ticker: "ALAB", quantity: -300,  price: 364.62,  pctNav: 7.23  },
            { ticker: "MU",   quantity: -100,  price: 1085.02, pctNav: 7.17  },
            { ticker: "DDOG", quantity: -400,  price: 268.40,  pctNav: 7.10  },
            { ticker: "HPE",  quantity: -1500, price: 62.94,   pctNav: 6.24  },
        ],
        options: [
            { ticker: "MU",   contract: "Dec 18 '26 · 850 Put",  quantity: 1,   price: 27.13, pctNav: 0.18 },
            { ticker: "SPCE", contract: "Oct 16 '26 · 3 Put",    quantity: 100, price: 0.13,  pctNav: 0.08 },
            { ticker: "DELL", contract: "Dec 18 '26 · 320 Put",  quantity: 1,   price: 2.78,  pctNav: 0.02 },
            { ticker: "INTC", contract: "Nov 20 '26 · 140 Call", quantity: -20, price: 8.33,  pctNav: 1.10 },
            { ticker: "ARM",  contract: "Nov 20 '26 · 350 Call", quantity: -10, price: 23.68, pctNav: 1.57 },
            { ticker: "XE",   contract: "Oct 16 '26 · 30 Put",   quantity: -20, price: 14.92, pctNav: 1.97 },
            { ticker: "AMD",  contract: "Nov 20 '26 · 700 Call", quantity: -10, price: 33.44, pctNav: 2.21 },
            { ticker: "DELL", contract: "Jan 15 '27 · 600 Call", quantity: -5,  price: 68.50, pctNav: 2.26 },
            { ticker: "CRWD", contract: "Nov 20 '26 · 275 Call", quantity: -30, price: 13.60, pctNav: 2.70 },
        ],
    },
};
