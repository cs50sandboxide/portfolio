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
    asOf: "2026-10-03",
    ibkrLastUpdate: "2026-10-03 10:13:02",

    // Wall-clock time this file was regenerated. Always changes, even when the
    // market data does not — so every refresh leaves a commit and `git log`
    // answers "did the weekly job actually run?". Without it, a healthy run on
    // a quiet week is indistinguishable from a job that never fired.
    generatedAt: "2026-10-03T10:14:56Z",

    // --- Headline figures ---
    portfolioValue: 1412151.11,   // net liquidation value
    cash: 491413.26,
    grossExposure: 5771541.03,    // long + short notional
    leverage: 4.09,

    // --- Performance (time-weighted return, per IBKR) ---
    // The account's performance history begins at inception below;
    // there is no calendar-YTD figure available before that date.
    inceptionDate: "2026-04-27",
    returnSinceInception: 79.49,

    mtdReturn: -3.56,
    mtdWindow: "30 Sep – 3 Oct 2026",

    // --- Primary benchmark (used in the homepage banner and stat blocks) ---
    benchmark: {
        name: "S&P 500",
        proxy: "SPY",
        sinceInception: 7.80,    // 27 Apr close 713.94 -> 2 Oct 769.64
        calendarYtd: 12.86,      // 31 Dec close 681.92 -> 769.64
    },

    // --- Benchmark panel, all measured over the SAME window as the fund ---
    // ETF closes are used as index proxies. Every figure runs from the
    // account's inception date to `asOf`, so the comparison is like-for-like.
    benchmarks: [
        { name: "S&P 500",      proxy: "SPY", sinceInception: 7.80 },   // 713.94 -> 769.64
        { name: "Nasdaq 100",   proxy: "QQQ", sinceInception: 12.91 },  // 663.88 -> 749.58
        { name: "Russell 2000", proxy: "IWM", sinceInception: 1.76 },   // 276.65 -> 281.52
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
        { date: "2026-10-02", fund:  78.34, spy: 7.80, qqq: 12.91 },
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
        AAOI:    "Applied Optoelectronics",
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
        MDB:     "MongoDB",
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
            { name: "Industrial",          pct: 21.42 },
            { name: "Technology",          pct: 21.02 },
            { name: "Financials",          pct: 18.66 },
            { name: "Utilities",           pct: 9.69 },
            { name: "Healthcare",          pct: 8.34 },
            { name: "Energy",              pct: 7.20 },
            { name: "Basic Materials",     pct: 6.07 },
            { name: "Consumer Non-Cyc",    pct: 3.89 },
            { name: "Consumer Cyclicals",  pct: 3.70 },
        ],

        // Short book by sector, % of short equity exposure.
        sectorsShort: [
            { name: "Technology",          pct: 91.05 },
            { name: "Industrial",          pct: 8.95 },
        ],

        // Net sector exposure (long minus short) as % of NAV — the actual
        // directional bet. A long-only sector pie hides that this book is
        // materially net SHORT technology while net long everything else.
        netTilt: [
            { name: "Financials",          pct: 44.27 },
            { name: "Industrial",          pct: 35.45 },
            { name: "Utilities",           pct: 22.99 },
            { name: "Healthcare",          pct: 19.78 },
            { name: "Energy",              pct: 17.08 },
            { name: "Basic Materials",     pct: 14.41 },
            { name: "Consumer Non-Cyc",    pct: 9.23 },
            { name: "Consumer Cyclicals",  pct: 8.79 },
            { name: "Technology",          pct: -106.31 },
        ],

        // Five largest positions by absolute size, as % of NAV.
        topPositions: [
            { ticker: "NET", side: "Short", pctNav: 17.30 },
            { ticker: "AMD", side: "Short", pctNav: 15.25 },
            { ticker: "CEG", side: "Long", pctNav: 12.76 },
            { ticker: "ASTS", side: "Long", pctNav: 12.01 },
            { ticker: "MXL", side: "Short", pctNav: 11.99 },
        ],

        equityLongCount: 27,
        equityShortCount: 16,
        top5Concentration: 16.96,   // % of gross exposure
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
            "2026-09": 762.63,
        },
    },

    // --- Exposure, straight from get_pa_allocation (reconciles to NAV) ---
    exposure: {
        long: 3349527.90,
        short: -2422013.13,
        net: 927514.78,
        gross: 5771541.03,
        cash: 484636.33,
        longPct: 237.19,
        shortPct: -171.51,
        netPct: 65.68,
        grossPct: 408.71,
        cashPct: 34.32,
    },

    // --- Risk, derived from IBKR's own daily time-weighted return series ---
    // IBKR exposes no risk-analytics endpoint; these are standard statistics
    // computed on the `cps` series that IBKR itself reports. See AUTOUPDATE.md.
    risk: {
        maxDrawdown: -27.14,
        annualizedVol: 88.81,
        sharpe: 2.84,
        sharpeRiskFree: 4.0,
        tradingDays: 116,
    },

    // --- Open positions (51) ---
    positions: {
        longs: [
            { ticker: "CEG", quantity: 700, price: 257.49, pctNav: 12.76 },
            { ticker: "ASTS", quantity: 2900, price: 58.46, pctNav: 12.01 },
            { ticker: "BX", quantity: 1450, price: 111.75, pctNav: 11.47 },
            { ticker: "UBER", quantity: 2350, price: 68.01, pctNav: 11.32 },
            { ticker: "SPOT", quantity: 300, price: 472.89, pctNav: 10.05 },
            { ticker: "VST", quantity: 1000, price: 140.02, pctNav: 9.92 },
            { ticker: "NVO", quantity: 3750, price: 37.32, pctNav: 9.91 },
            { ticker: "UNH", quantity: 375, price: 371.90, pctNav: 9.88 },
            { ticker: "KKR", quantity: 1500, price: 90.29, pctNav: 9.59 },
            { ticker: "WMT", quantity: 1250, price: 104.26, pctNav: 9.23 },
            { ticker: "NOC", quantity: 265, price: 479.69, pctNav: 9.00 },
            { ticker: "COST", quantity: 135, price: 920.65, pctNav: 8.80 },
            { ticker: "LMT", quantity: 245, price: 505.41, pctNav: 8.77 },
            { ticker: "FSLR", quantity: 700, price: 174.92, pctNav: 8.67 },
            { ticker: "VG", quantity: 9000, price: 13.19, pctNav: 8.41 },
            { ticker: "LHX", quantity: 500, price: 236.60, pctNav: 8.38 },
            { ticker: "OSCR", quantity: 3750, price: 30.94, pctNav: 8.22 },
            { ticker: "KTOS", quantity: 2650, price: 43.13, pctNav: 8.09 },
            { ticker: "APO", quantity: 1000, price: 114.02, pctNav: 8.07 },
            { ticker: "MP", quantity: 2300, price: 46.97, pctNav: 7.65 },
            { ticker: "ADBE", quantity: 450, price: 237.69, pctNav: 7.57 },
            { ticker: "CRCL", quantity: 1300, price: 81.71, pctNav: 7.52 },
            { ticker: "JBLU", quantity: 25000, price: 4.15, pctNav: 7.35 },
            { ticker: "IBKR", quantity: 1100, price: 88.20, pctNav: 6.87 },
            { ticker: "USAR", quantity: 7000, price: 13.59, pctNav: 6.74 },
            { ticker: "AVAV", quantity: 500, price: 140.90, pctNav: 4.99 },
            { ticker: "XE", quantity: 4010, price: 14.45, pctNav: 4.10 },
        ],
        shorts: [
            { ticker: "NET", quantity: -700, price: 349.07, pctNav: 17.30 },
            { ticker: "AMD", quantity: -340, price: 633.25, pctNav: 15.25 },
            { ticker: "MXL", quantity: -1600, price: 105.86, pctNav: 11.99 },
            { ticker: "OKTA", quantity: -800, price: 211.49, pctNav: 11.98 },
            { ticker: "CRWD", quantity: -600, price: 269.90, pctNav: 11.47 },
            { ticker: "DELL", quantity: -270, price: 562.52, pctNav: 10.76 },
            { ticker: "SNDK", quantity: -85, price: 1717.30, pctNav: 10.34 },
            { ticker: "COHR", quantity: -400, price: 337.04, pctNav: 9.55 },
            { ticker: "HPE", quantity: -1800, price: 69.67, pctNav: 8.88 },
            { ticker: "SNOW", quantity: -350, price: 341.04, pctNav: 8.45 },
            { ticker: "TWLO", quantity: -400, price: 294.58, pctNav: 8.34 },
            { ticker: "AAOI", quantity: -1000, price: 115.01, pctNav: 8.14 },
            { ticker: "DDOG", quantity: -400, price: 276.23, pctNav: 7.82 },
            { ticker: "MU", quantity: -100, price: 1069.18, pctNav: 7.57 },
            { ticker: "BE", quantity: -350, price: 289.15, pctNav: 7.17 },
            { ticker: "NBIS", quantity: -350, price: 242.98, pctNav: 6.02 },
        ],
        options: [
            { ticker: "MDB", contract: "Nov 6 '26 · 340 Call", quantity: 5, price: 35.50, pctNav: 1.26 },
            { ticker: "MU", contract: "Dec 18 '26 · 850 Put", quantity: 1, price: 16.53, pctNav: 0.12 },
            { ticker: "SPCE", contract: "Oct 16 '26 · 3 Put", quantity: 100, price: 0.15, pctNav: 0.10 },
            { ticker: "DELL", contract: "Dec 18 '26 · 320 Put", quantity: 1, price: 2.13, pctNav: 0.02 },
            { ticker: "AMD", contract: "Nov 20 '26 · 700 Call", quantity: -10, price: 27.10, pctNav: 1.92 },
            { ticker: "XE", contract: "Oct 16 '26 · 30 Put", quantity: -20, price: 15.62, pctNav: 2.21 },
            { ticker: "DELL", contract: "Jan 15 '27 · 600 Call", quantity: -5, price: 62.56, pctNav: 2.22 },
            { ticker: "CRWD", contract: "Nov 20 '26 · 275 Call", quantity: -30, price: 19.16, pctNav: 4.07 },
        ],
    },
};
