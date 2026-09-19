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
    asOf: "2026-09-19",
    ibkrLastUpdate: "2026-09-19 10:12:35",

    // Wall-clock time this file was regenerated. Always changes, even when the
    // market data does not — so every refresh leaves a commit and `git log`
    // answers "did the weekly job actually run?". Without it, a healthy run on
    // a quiet week is indistinguishable from a job that never fired.
    generatedAt: "2026-09-19T10:22:00Z",

    // --- Headline figures ---
    portfolioValue: 1473551.06,   // net liquidation value
    cash: -829425.96,
    grossExposure: 5761030.32,    // long + short notional
    leverage: 3.91,

    // --- Performance (time-weighted return, per IBKR) ---
    // The account's performance history begins at inception below;
    // there is no calendar-YTD figure available before that date.
    inceptionDate: "2026-04-27",
    returnSinceInception: 113.45,

    mtdReturn: 7.03,
    mtdWindow: "31 Aug – 19 Sep 2026",

    // --- Primary benchmark (used in the homepage banner and stat blocks) ---
    benchmark: {
        name: "S&P 500",
        proxy: "SPY",
        sinceInception: 6.69,    // 27 Apr close 713.94 -> 18 Sep 761.69
        calendarYtd: 11.70,      // 31 Dec close 681.92 -> 761.69
    },

    // --- Benchmark panel, all measured over the SAME window as the fund ---
    // ETF closes are used as index proxies. Every figure runs from the
    // account's inception date to `asOf`, so the comparison is like-for-like.
    benchmarks: [
        { name: "S&P 500",      proxy: "SPY", sinceInception: 6.69 },   // 713.94 -> 761.69
        { name: "Nasdaq 100",   proxy: "QQQ", sinceInception: 8.67 },   // 663.88 -> 721.45
        { name: "Russell 2000", proxy: "IWM", sinceInception: 2.69 },   // 276.65 -> 284.10
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
        COHR:    "Coherent",
        COIN:    "Coinbase Global",
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
            { name: "Technology",         pct: 24.96 },
            { name: "Industrial",         pct: 22.42 },
            { name: "Financials",         pct: 15.94 },
            { name: "Utilities",          pct: 10.82 },
            { name: "Healthcare",         pct: 7.53  },
            { name: "Energy",             pct: 6.56  },
            { name: "Basic Materials",    pct: 5.46  },
            { name: "Consumer Non-Cyc",   pct: 3.31  },
            { name: "Consumer Cyclicals", pct: 3.00  },
        ],

        // Short book by sector, % of short equity exposure.
        sectorsShort: [
            { name: "Technology",         pct: 98.36 },
            { name: "Industrial",         pct: 1.64  },
        ],

        // Net sector exposure (long minus short) as % of NAV — the actual
        // directional bet. A long-only sector pie hides that this book is
        // materially net SHORT technology while net long everything else.
        netTilt: [
            { name: "Industrial",         pct: 59.44  },
            { name: "Financials",         pct: 43.64  },
            { name: "Utilities",          pct: 29.63  },
            { name: "Healthcare",         pct: 20.61  },
            { name: "Energy",             pct: 17.96  },
            { name: "Basic Materials",    pct: 14.93  },
            { name: "Consumer Non-Cyc",   pct: 9.07   },
            { name: "Consumer Cyclicals", pct: 8.22   },
            { name: "Technology",         pct: -46.97 },
        ],

        // Five largest positions by absolute size, as % of NAV.
        topPositions: [
            { ticker: "NET",  side: "Short", pctNav: 15.37 },
            { ticker: "AMD",  side: "Short", pctNav: 12.86 },
            { ticker: "BX",   side: "Long",  pctNav: 12.30 },
            { ticker: "CEG",  side: "Long",  pctNav: 12.15 },
            { ticker: "ASTS", side: "Long",  pctNav: 11.52 },
        ],

        equityLongCount: 32,
        equityShortCount: 12,
        top5Concentration: 16.42,   // % of gross exposure
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
        long: 4033683.32,
        short: -1727347.00,
        net: 2306336.32,
        gross: 5761030.32,
        cash: -832785.26,
        longPct: 273.74,
        shortPct: -117.22,
        netPct: 156.52,
        grossPct: 390.96,
        cashPct: -56.52,
    },

    // --- Risk, derived from IBKR's own daily time-weighted return series ---
    // IBKR exposes no risk-analytics endpoint; these are standard statistics
    // computed on the `cps` series that IBKR itself reports. See AUTOUPDATE.md.
    risk: {
        maxDrawdown: -27.14,
        annualizedVol: 91.97,
        sharpe: 5.46,
        sharpeRiskFree: 4.0,
        tradingDays: 106,
    },

    // --- Open positions (50) ---
    positions: {
        longs: [
            { ticker: "BX",   quantity: 1450,  price: 124.96, pctNav: 12.30 },
            { ticker: "CEG",  quantity: 700,   price: 255.75, pctNav: 12.15 },
            { ticker: "ASTS", quantity: 2900,  price: 58.52,  pctNav: 11.52 },
            { ticker: "UBER", quantity: 2350,  price: 70.60,  pctNav: 11.26 },
            { ticker: "CRCL", quantity: 1800,  price: 91.59,  pctNav: 11.19 },
            { ticker: "NVO",  quantity: 3750,  price: 43.24,  pctNav: 11.00 },
            { ticker: "SPOT", quantity: 300,   price: 509.45, pctNav: 10.37 },
            { ticker: "KKR",  quantity: 1500,  price: 98.81,  pctNav: 10.06 },
            { ticker: "UNH",  quantity: 375,   price: 376.90, pctNav: 9.59  },
            { ticker: "VST",  quantity: 1000,  price: 140.44, pctNav: 9.53  },
            { ticker: "NOC",  quantity: 265,   price: 527.39, pctNav: 9.48  },
            { ticker: "FSLR", quantity: 700,   price: 196.19, pctNav: 9.32  },
            { ticker: "WMT",  quantity: 1250,  price: 106.73, pctNav: 9.05  },
            { ticker: "LMT",  quantity: 245,   price: 534.60, pctNav: 8.89  },
            { ticker: "RKLB", quantity: 2000,  price: 64.45,  pctNav: 8.75  },
            { ticker: "VG",   quantity: 9000,  price: 14.14,  pctNav: 8.64  },
            { ticker: "KTOS", quantity: 2650,  price: 47.56,  pctNav: 8.55  },
            { ticker: "APO",  quantity: 1000,  price: 125.91, pctNav: 8.54  },
            { ticker: "LHX",  quantity: 500,   price: 247.29, pctNav: 8.39  },
            { ticker: "COST", quantity: 135,   price: 896.70, pctNav: 8.22  },
            { ticker: "TLN",  quantity: 400,   price: 292.35, pctNav: 7.94  },
            { ticker: "ADBE", quantity: 450,   price: 249.26, pctNav: 7.61  },
            { ticker: "USAR", quantity: 7000,  price: 15.65,  pctNav: 7.43  },
            { ticker: "JBLU", quantity: 25000, price: 4.37,   pctNav: 7.41  },
            { ticker: "ACN",  quantity: 600,   price: 181.29, pctNav: 7.38  },
            { ticker: "MP",   quantity: 2300,  price: 47.26,  pctNav: 7.38  },
            { ticker: "IBKR", quantity: 1100,  price: 90.69,  pctNav: 6.77  },
            { ticker: "OSCR", quantity: 2750,  price: 32.13,  pctNav: 6.00  },
            { ticker: "AVAV", quantity: 500,   price: 159.95, pctNav: 5.43  },
            { ticker: "XE",   quantity: 4010,  price: 15.83,  pctNav: 4.31  },
            { ticker: "HOOD", quantity: 500,   price: 119.91, pctNav: 4.07  },
            { ticker: "IONQ", quantity: 1500,  price: 39.13,  pctNav: 3.98  },
        ],
        shorts: [
            { ticker: "NET",  quantity: -700,  price: 323.60,  pctNav: 15.37 },
            { ticker: "AMD",  quantity: -340,  price: 557.50,  pctNav: 12.86 },
            { ticker: "DELL", quantity: -270,  price: 571.09,  pctNav: 10.46 },
            { ticker: "SNDK", quantity: -85,   price: 1798.00, pctNav: 10.37 },
            { ticker: "CRWD", quantity: -600,  price: 237.10,  pctNav: 9.65  },
            { ticker: "MXL",  quantity: -1600, price: 81.17,   pctNav: 8.81  },
            { ticker: "SDGR", quantity: -4000, price: 29.13,   pctNav: 7.91  },
            { ticker: "COHR", quantity: -350,  price: 317.70,  pctNav: 7.55  },
            { ticker: "OKTA", quantity: -600,  price: 182.95,  pctNav: 7.45  },
            { ticker: "COIN", quantity: -550,  price: 194.60,  pctNav: 7.26  },
            { ticker: "MU",   quantity: -100,  price: 1017.79, pctNav: 6.91  },
            { ticker: "HPE",  quantity: -1500, price: 60.90,   pctNav: 6.20  },
        ],
        options: [
            { ticker: "MU",   contract: "Dec 18 '26 · 850 Put",  quantity: 1,   price: 41.08, pctNav: 0.28 },
            { ticker: "SPCE", contract: "Oct 16 '26 · 3 Put",    quantity: 100, price: 0.20,  pctNav: 0.13 },
            { ticker: "DELL", contract: "Dec 18 '26 · 320 Put",  quantity: 1,   price: 3.17,  pctNav: 0.02 },
            { ticker: "XE",   contract: "Oct 16 '26 · 30 Put",   quantity: -20, price: 14.20, pctNav: 1.93 },
            { ticker: "CRWD", contract: "Nov 20 '26 · 275 Call", quantity: -30, price: 9.67,  pctNav: 1.97 },
            { ticker: "DELL", contract: "Jan 15 '27 · 600 Call", quantity: -5,  price: 76.49, pctNav: 2.60 },
        ],
    },
};
