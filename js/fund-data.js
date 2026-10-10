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
    asOf: "2026-10-10",
    ibkrLastUpdate: "2026-10-10 10:13:07",

    // Wall-clock time this file was regenerated. Always changes, even when the
    // market data does not — so every refresh leaves a commit and `git log`
    // answers "did the weekly job actually run?". Without it, a healthy run on
    // a quiet week is indistinguishable from a job that never fired.
    generatedAt: "2026-10-10T10:14:35Z",

    // --- Headline figures ---
    portfolioValue: 1537186.76,   // net liquidation value
    cash: 535140.28,
    grossExposure: 5617884.99,    // long + short notional
    leverage: 3.65,

    // --- Performance (time-weighted return, per IBKR) ---
    // The account's performance history begins at inception below;
    // there is no calendar-YTD figure available before that date.
    inceptionDate: "2026-04-27",
    returnSinceInception: 95.38,

    mtdReturn: 4.98,
    mtdWindow: "30 Sep – 10 Oct 2026",

    // --- Primary benchmark (used in the homepage banner and stat blocks) ---
    benchmark: {
        name: "S&P 500",
        proxy: "SPY",
        sinceInception: 9.05,    // 27 Apr close 713.94 -> 9 Oct 778.57
        calendarYtd: 14.17,      // 31 Dec close 681.92 -> 778.57
    },

    // --- Benchmark panel, all measured over the SAME window as the fund ---
    // ETF closes are used as index proxies. Every figure runs from the
    // account's inception date to `asOf`, so the comparison is like-for-like.
    benchmarks: [
        { name: "S&P 500",      proxy: "SPY", sinceInception: 9.05 },   // 713.94 -> 778.57
        { name: "Nasdaq 100",   proxy: "QQQ", sinceInception: 13.16 },  // 663.88 -> 751.27
        { name: "Russell 2000", proxy: "IWM", sinceInception: 0.83 },   // 276.65 -> 278.94
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
        { date: "2026-10-09", fund:  95.25, spy: 9.05, qqq: 13.16 },
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
        MRNA:    "Moderna",
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
        PANW:    "Palo Alto Networks",
        PLTR:    "Palantir Technologies",
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
            { name: "Technology",           pct: 25.70 },
            { name: "Industrial",           pct: 21.65 },
            { name: "Financials",           pct: 19.43 },
            { name: "Healthcare",           pct: 8.68 },
            { name: "Energy",               pct: 7.35 },
            { name: "Basic Materials",      pct: 5.87 },
            { name: "Consumer Non-Cyc",     pct: 4.20 },
            { name: "Consumer Cyclicals",   pct: 3.86 },
            { name: "Utilities",            pct: 3.26 },
        ],

        // Short book by sector, % of short equity exposure.
        sectorsShort: [
            { name: "Technology",           pct: 95.12 },
            { name: "Healthcare",           pct: 4.88 },
        ],

        // Net sector exposure (long minus short) as % of NAV — the actual
        // directional bet. A long-only sector pie hides that this book is
        // materially net SHORT technology while net long everything else.
        netTilt: [
            { name: "Industrial",           pct: 46.63 },
            { name: "Financials",           pct: 41.84 },
            { name: "Energy",               pct: 15.83 },
            { name: "Basic Materials",      pct: 12.63 },
            { name: "Healthcare",           pct: 11.35 },
            { name: "Consumer Non-Cyc",     pct: 9.05 },
            { name: "Consumer Cyclicals",   pct: 8.32 },
            { name: "Utilities",            pct: 7.02 },
            { name: "Technology",           pct: -87.43 },
        ],

        // Five largest positions by absolute size, as % of NAV.
        topPositions: [
            { ticker: "NET", side: "Short", pctNav: 16.48 },
            { ticker: "AMD", side: "Short", pctNav: 13.46 },
            { ticker: "ASTS", side: "Long", pctNav: 12.92 },
            { ticker: "OKTA", side: "Short", pctNav: 12.08 },
            { ticker: "UBER", side: "Long", pctNav: 10.91 },
        ],

        equityLongCount: 28,
        equityShortCount: 14,
        top5Concentration: 18.02,   // % of gross exposure
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
        long: 3310302.03,
        short: -2307582.96,
        net: 1002719.07,
        gross: 5617884.99,
        cash: 535140.28,
        longPct: 215.35,
        shortPct: -150.12,
        netPct: 65.23,
        grossPct: 365.47,
        cashPct: 34.81,
    },

    // --- Risk, derived from IBKR's own daily time-weighted return series ---
    // IBKR exposes no risk-analytics endpoint; these are standard statistics
    // computed on the `cps` series that IBKR itself reports. See AUTOUPDATE.md.
    risk: {
        maxDrawdown: -27.14,
        annualizedVol: 87.75,
        sharpe: 3.41,
        sharpeRiskFree: 4.0,
        tradingDays: 121,
    },

    // --- The week's commentary, keyed by week-ending date ---
    // Generated by the Saturday refresh from priorPrices below, which costs no
    // extra IBKR calls: the position pull already happening is compared with
    // the prices it recorded a week earlier. Says what moved, never why — the
    // account has no news in it. A hand-written note in js/notes.js wins over
    // anything here. Populates from the first refresh after priorPrices exists.
    weeklyNotes: {},

    // Last refresh's close for each held ticker, so next week has something to
    // measure against. Written every run; read only by the run after it.
    priorPrices: {
        ADBE: 242.27,
        AMD: 608.49,
        APO: 118.65,
        ASTS: 50.92,
        AVAV: 137.10,
        BX: 114.40,
        CEG: 298.07,
        COST: 947.00,
        CRCL: 84.80,
        CRWD: 275.04,
        DDOG: 292.46,
        DELL: 586.06,
        FSLR: 177.82,
        HPE: 73.69,
        IBKR: 88.00,
        INTC: 104.43,
        JBLU: 3.85,
        KKR: 90.95,
        KTOS: 42.50,
        LHX: 236.97,
        LMT: 510.19,
        MP: 46.14,
        MRNA: 225.47,
        MU: 1029.00,
        MXL: 96.50,
        NET: 361.80,
        NOC: 480.72,
        NVO: 38.64,
        OKTA: 232.13,
        ORCL: 141.55,
        OSCR: 33.37,
        PANW: 419.00,
        PLTR: 208.73,
        SNOW: 368.90,
        SPOT: 529.14,
        UBER: 71.37,
        UNH: 379.98,
        USAR: 12.58,
        VG: 13.16,
        VST: 161.02,
        WMT: 111.35,
        XE: 13.67,
    },

    // --- Open positions (46) ---
    positions: {
        longs: [
            { ticker: "ASTS", quantity: 3900, price: 50.92, pctNav: 12.92 },
            { ticker: "UBER", quantity: 2350, price: 71.37, pctNav: 10.91 },
            { ticker: "BX", quantity: 1450, price: 114.40, pctNav: 10.79 },
            { ticker: "SPOT", quantity: 300, price: 529.14, pctNav: 10.33 },
            { ticker: "NVO", quantity: 3750, price: 38.64, pctNav: 9.43 },
            { ticker: "UNH", quantity: 375, price: 379.98, pctNav: 9.27 },
            { ticker: "WMT", quantity: 1250, price: 111.35, pctNav: 9.05 },
            { ticker: "KKR", quantity: 1500, price: 90.95, pctNav: 8.87 },
            { ticker: "COST", quantity: 135, price: 947.00, pctNav: 8.32 },
            { ticker: "NOC", quantity: 265, price: 480.72, pctNav: 8.29 },
            { ticker: "OSCR", quantity: 3750, price: 33.37, pctNav: 8.14 },
            { ticker: "LMT", quantity: 245, price: 510.19, pctNav: 8.13 },
            { ticker: "FSLR", quantity: 700, price: 177.82, pctNav: 8.10 },
            { ticker: "APO", quantity: 1000, price: 118.65, pctNav: 7.72 },
            { ticker: "LHX", quantity: 500, price: 236.97, pctNav: 7.71 },
            { ticker: "VG", quantity: 9000, price: 13.16, pctNav: 7.70 },
            { ticker: "KTOS", quantity: 2650, price: 42.50, pctNav: 7.33 },
            { ticker: "CRCL", quantity: 1300, price: 84.80, pctNav: 7.17 },
            { ticker: "ADBE", quantity: 450, price: 242.27, pctNav: 7.09 },
            { ticker: "MP", quantity: 2300, price: 46.14, pctNav: 6.90 },
            { ticker: "INTC", quantity: 1000, price: 104.43, pctNav: 6.79 },
            { ticker: "IBKR", quantity: 1100, price: 88.00, pctNav: 6.30 },
            { ticker: "JBLU", quantity: 25000, price: 3.85, pctNav: 6.26 },
            { ticker: "USAR", quantity: 7000, price: 12.58, pctNav: 5.73 },
            { ticker: "AVAV", quantity: 600, price: 137.10, pctNav: 5.35 },
            { ticker: "CEG", quantity: 200, price: 298.07, pctNav: 3.88 },
            { ticker: "XE", quantity: 4010, price: 13.67, pctNav: 3.57 },
            { ticker: "VST", quantity: 300, price: 161.02, pctNav: 3.14 },
        ],
        shorts: [
            { ticker: "NET", quantity: -700, price: 361.80, pctNav: 16.48 },
            { ticker: "AMD", quantity: -340, price: 608.49, pctNav: 13.46 },
            { ticker: "OKTA", quantity: -800, price: 232.13, pctNav: 12.08 },
            { ticker: "CRWD", quantity: -600, price: 275.04, pctNav: 10.74 },
            { ticker: "DELL", quantity: -270, price: 586.06, pctNav: 10.29 },
            { ticker: "HPE", quantity: -2100, price: 73.69, pctNav: 10.07 },
            { ticker: "MXL", quantity: -1600, price: 96.50, pctNav: 10.04 },
            { ticker: "SNOW", quantity: -400, price: 368.90, pctNav: 9.60 },
            { ticker: "DDOG", quantity: -500, price: 292.46, pctNav: 9.51 },
            { ticker: "ORCL", quantity: -1000, price: 141.55, pctNav: 9.21 },
            { ticker: "PANW", quantity: -335, price: 419.00, pctNav: 9.13 },
            { ticker: "PLTR", quantity: -600, price: 208.73, pctNav: 8.15 },
            { ticker: "MU", quantity: -120, price: 1029.00, pctNav: 8.03 },
            { ticker: "MRNA", quantity: -500, price: 225.47, pctNav: 7.33 },
        ],
        options: [
            { ticker: "MU", contract: "Dec 18 '26 · 850 Put", quantity: 1, price: 17.77, pctNav: 0.12 },
            { ticker: "DELL", contract: "Dec 18 '26 · 320 Put", quantity: 1, price: 1.24, pctNav: 0.01 },
            { ticker: "DELL", contract: "Jan 15 '27 · 600 Call", quantity: -5, price: 71.05, pctNav: 2.31 },
            { ticker: "CRWD", contract: "Nov 20 '26 · 275 Call", quantity: -30, price: 18.98, pctNav: 3.70 },
        ],
    },
};
