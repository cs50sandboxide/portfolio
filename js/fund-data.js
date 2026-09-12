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
    asOf: "2026-09-12",
    ibkrLastUpdate: "2026-09-12 10:13:05",

    // Wall-clock time this file was regenerated. Always changes, even when the
    // market data does not — so every refresh leaves a commit and `git log`
    // answers "did the weekly job actually run?". Without it, a healthy run on
    // a quiet week is indistinguishable from a job that never fired.
    generatedAt: "2026-09-12T10:18:08Z",

    // --- Headline figures ---
    portfolioValue: 1410883.60,   // net liquidation value
    cash: -2636645.30,
    grossExposure: 6813465.95,    // long + short notional
    leverage: 4.83,

    // --- Performance (time-weighted return, per IBKR) ---
    // The account's performance history begins at inception below;
    // there is no calendar-YTD figure available before that date.
    inceptionDate: "2026-04-27",
    returnSinceInception: 104.37,

    mtdReturn: 2.48,
    mtdWindow: "31 Aug – 12 Sep 2026",

    // --- Primary benchmark (used in the homepage banner and stat blocks) ---
    benchmark: {
        name: "S&P 500",
        proxy: "SPY",
        sinceInception: 7.05,    // 27 Apr close 713.94 -> 11 Sep 764.29
        calendarYtd: 12.08,      // 31 Dec close 681.92 -> 764.29
    },

    // --- Benchmark panel, all measured over the SAME window as the fund ---
    // ETF closes are used as index proxies. Every figure runs from the
    // account's inception date to `asOf`, so the comparison is like-for-like.
    benchmarks: [
        { name: "S&P 500",      proxy: "SPY", sinceInception: 7.05 },   // 713.94 -> 764.29
        { name: "Nasdaq 100",   proxy: "QQQ", sinceInception: 7.68 },   // 663.88 -> 714.88
        { name: "Russell 2000", proxy: "IWM", sinceInception: 4.42 },   // 276.65 -> 288.89
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
        AMD:     "Advanced Micro Devices",
        APO:     "Apollo Global Management",
        ASTS:    "AST SpaceMobile",
        AVAV:    "AeroVironment",
        BE:      "Bloom Energy",
        BX:      "Blackstone",
        CEG:     "Constellation Energy",
        COST:    "Costco Wholesale",
        CRCL:    "Circle Internet Group",
        CRM:     "Salesforce",
        CRSP:    "CRISPR Therapeutics",
        CRWD:    "CrowdStrike",
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
        NBIS:    "Nebius Group",
        NET:     "Cloudflare",
        NOC:     "Northrop Grumman",
        NOW:     "ServiceNow",
        NVDA:    "NVIDIA",
        NVO:     "Novo Nordisk",
        OKLO:    "Oklo",
        ORCL:    "Oracle",
        OSCR:    "Oscar Health",
        RKLB:    "Rocket Lab",
        ROKU:    "Roku",
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
            { name: "Technology",         pct: 30.88 },
            { name: "Industrial",         pct: 17.61 },
            { name: "Financials",         pct: 12.12 },
            { name: "Utilities",          pct: 9.86  },
            { name: "Healthcare",         pct: 7.25  },
            { name: "Telecomm",           pct: 5.72  },
            { name: "Energy",             pct: 5.32  },
            { name: "Consumer Cyclicals", pct: 4.62  },
            { name: "Basic Materials",    pct: 4.16  },
            { name: "Consumer Non-Cyc",   pct: 2.46  },
        ],

        // Short book by sector, % of short equity exposure.
        sectorsShort: [
            { name: "Technology",         pct: 74.11 },
            { name: "Industrial",         pct: 25.89 },
        ],

        // Net sector exposure (long minus short) as % of NAV — the actual
        // directional bet. A long-only sector pie hides that this book is
        // materially net SHORT technology while net long everything else.
        netTilt: [
            { name: "Financials",         pct: 46.64 },
            { name: "Technology",         pct: 46.24 },
            { name: "Industrial",         pct: 42.40 },
            { name: "Utilities",          pct: 37.95 },
            { name: "Healthcare",         pct: 27.89 },
            { name: "Telecomm",           pct: 22.01 },
            { name: "Energy",             pct: 20.49 },
            { name: "Consumer Cyclicals", pct: 17.78 },
            { name: "Basic Materials",    pct: 16.01 },
            { name: "Consumer Non-Cyc",   pct: 9.49  },
        ],

        // Five largest positions by absolute size, as % of NAV.
        topPositions: [
            { ticker: "NET",  side: "Short", pctNav: 15.21 },
            { ticker: "BE",   side: "Short", pctNav: 13.70 },
            { ticker: "BX",   side: "Long",  pctNav: 13.21 },
            { ticker: "GOOG", side: "Long",  pctNav: 12.84 },
            { ticker: "ADBE", side: "Long",  pctNav: 12.51 },
        ],

        equityLongCount: 41,
        equityShortCount: 8,
        top5Concentration: 13.97,   // % of gross exposure
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
        long: 5430630.73,
        short: -1382835.22,
        net: 4047795.51,
        gross: 6813465.95,
        cash: -2636911.91,
        longPct: 384.91,
        shortPct: -98.01,
        netPct: 286.90,
        grossPct: 482.92,
        cashPct: -186.90,
    },

    // --- Risk, derived from IBKR's own daily time-weighted return series ---
    // IBKR exposes no risk-analytics endpoint; these are standard statistics
    // computed on the `cps` series that IBKR itself reports. See AUTOUPDATE.md.
    risk: {
        maxDrawdown: -27.14,
        annualizedVol: 92.65,
        sharpe: 5.30,
        sharpeRiskFree: 4.0,
        tradingDays: 101,
    },

    // --- Open positions (54) ---
    positions: {
        longs: [
            { ticker: "BX",   quantity: 1450,  price: 128.51, pctNav: 13.21 },
            { ticker: "GOOG", quantity: 540,   price: 335.38, pctNav: 12.84 },
            { ticker: "ADBE", quantity: 700,   price: 252.23, pctNav: 12.51 },
            { ticker: "ASTS", quantity: 2900,  price: 59.73,  pctNav: 12.28 },
            { ticker: "CEG",  quantity: 600,   price: 285.01, pctNav: 12.12 },
            { ticker: "UBER", quantity: 2350,  price: 71.65,  pctNav: 11.93 },
            { ticker: "NVO",  quantity: 3750,  price: 43.11,  pctNav: 11.46 },
            { ticker: "IONQ", quantity: 4350,  price: 36.88,  pctNav: 11.37 },
            { ticker: "KKR",  quantity: 1500,  price: 101.08, pctNav: 10.75 },
            { ticker: "RKLB", quantity: 2400,  price: 62.95,  pctNav: 10.71 },
            { ticker: "VST",  quantity: 1000,  price: 148.38, pctNav: 10.52 },
            { ticker: "ACN",  quantity: 800,   price: 183.60, pctNav: 10.41 },
            { ticker: "FSLR", quantity: 700,   price: 209.03, pctNav: 10.37 },
            { ticker: "GFS",  quantity: 3100,  price: 47.03,  pctNav: 10.33 },
            { ticker: "VG",   quantity: 9000,  price: 15.80,  pctNav: 10.08 },
            { ticker: "UNH",  quantity: 375,   price: 376.41, pctNav: 10.00 },
            { ticker: "NOC",  quantity: 265,   price: 518.97, pctNav: 9.75  },
            { ticker: "CRCL", quantity: 1500,  price: 90.90,  pctNav: 9.66  },
            { ticker: "WMT",  quantity: 1250,  price: 107.07, pctNav: 9.49  },
            { ticker: "SPOT", quantity: 250,   price: 525.75, pctNav: 9.32  },
            { ticker: "META", quantity: 200,   price: 647.58, pctNav: 9.18  },
            { ticker: "APO",  quantity: 1000,  price: 128.98, pctNav: 9.14  },
            { ticker: "LULU", quantity: 1300,  price: 98.95,  pctNav: 9.12  },
            { ticker: "LMT",  quantity: 245,   price: 524.19, pctNav: 9.10  },
            { ticker: "TLN",  quantity: 400,   price: 312.74, pctNav: 8.87  },
            { ticker: "KTOS", quantity: 2650,  price: 46.77,  pctNav: 8.78  },
            { ticker: "INTC", quantity: 1200,  price: 103.05, pctNav: 8.76  },
            { ticker: "LHX",  quantity: 500,   price: 245.54, pctNav: 8.70  },
            { ticker: "COST", quantity: 135,   price: 904.77, pctNav: 8.66  },
            { ticker: "AVAV", quantity: 809,   price: 146.00, pctNav: 8.37  },
            { ticker: "MP",   quantity: 2300,  price: 50.67,  pctNav: 8.26  },
            { ticker: "JBLU", quantity: 25000, price: 4.41,   pctNav: 7.81  },
            { ticker: "SHOP", quantity: 850,   price: 128.72, pctNav: 7.75  },
            { ticker: "USAR", quantity: 7000,  price: 15.62,  pctNav: 7.75  },
            { ticker: "HOOD", quantity: 900,   price: 112.32, pctNav: 7.16  },
            { ticker: "IBKR", quantity: 1100,  price: 91.70,  pctNav: 7.15  },
            { ticker: "INFQ", quantity: 7500,  price: 13.12,  pctNav: 6.97  },
            { ticker: "OKLO", quantity: 2500,  price: 36.30,  pctNav: 6.43  },
            { ticker: "CRSP", quantity: 1750,  price: 51.80,  pctNav: 6.43  },
            { ticker: "OSCR", quantity: 2750,  price: 32.77,  pctNav: 6.39  },
            { ticker: "XE",   quantity: 4010,  price: 15.01,  pctNav: 4.27  },
        ],
        shorts: [
            { ticker: "NET",  quantity: -700,  price: 306.53, pctNav: 15.21 },
            { ticker: "BE",   quantity: -700,  price: 276.10, pctNav: 13.70 },
            { ticker: "AMD",  quantity: -340,  price: 515.78, pctNav: 12.43 },
            { ticker: "NVDA", quantity: -775,  price: 218.26, pctNav: 11.99 },
            { ticker: "DELL", quantity: -270,  price: 569.84, pctNav: 10.91 },
            { ticker: "ORCL", quantity: -1000, price: 147.81, pctNav: 10.48 },
            { ticker: "NBIS", quantity: -600,  price: 224.49, pctNav: 9.55  },
            { ticker: "HPE",  quantity: -2000, price: 62.10,  pctNav: 8.80  },
        ],
        options: [
            { ticker: "MU",   contract: "Dec 18 '26 · 850 Put",  quantity: 1,   price: 56.00, pctNav: 0.40 },
            { ticker: "SPCE", contract: "Oct 16 '26 · 3 Put",    quantity: 100, price: 0.31,  pctNav: 0.22 },
            { ticker: "DELL", contract: "Dec 18 '26 · 320 Put",  quantity: 1,   price: 4.24,  pctNav: 0.03 },
            { ticker: "XE",   contract: "Oct 16 '26 · 30 Put",   quantity: -20, price: 15.12, pctNav: 2.14 },
            { ticker: "DELL", contract: "Jan 15 '27 · 600 Call", quantity: -5,  price: 78.52, pctNav: 2.78 },
        ],
    },
};
