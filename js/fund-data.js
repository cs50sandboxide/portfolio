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
    asOf: "2026-10-24",
    ibkrLastUpdate: "2026-10-24 10:13:23",

    // Wall-clock time this file was regenerated. Always changes, even when the
    // market data does not — so every refresh leaves a commit and `git log`
    // answers "did the weekly job actually run?". Without it, a healthy run on
    // a quiet week is indistinguishable from a job that never fired.
    generatedAt: "2026-10-24T10:14:48Z",

    // --- Headline figures ---
    portfolioValue: 1477085.34,   // net liquidation value
    cash: -2311702.38,
    grossExposure: 4422366.01,    // long + short notional
    leverage: 2.99,

    // --- Performance (time-weighted return, per IBKR) ---
    // The account's performance history begins at inception below;
    // there is no calendar-YTD figure available before that date.
    inceptionDate: "2026-04-27",
    returnSinceInception: 87.74,

    mtdReturn: 0.88,
    mtdWindow: "30 Sep – 24 Oct 2026",

    // --- Primary benchmark (used in the homepage banner and stat blocks) ---
    benchmark: {
        name: "S&P 500",
        proxy: "SPY",
        sinceInception: 6.45,    // 27 Apr close 713.94 -> 23 Oct 759.97
        calendarYtd: 11.45,      // 31 Dec close 681.92 -> 759.97
    },

    // --- Benchmark panel, all measured over the SAME window as the fund ---
    // ETF closes are used as index proxies. Every figure runs from the
    // account's inception date to `asOf`, so the comparison is like-for-like.
    benchmarks: [
        { name: "S&P 500",      proxy: "SPY", sinceInception: 6.45 },   // 713.94 -> 759.97
        { name: "Nasdaq 100",   proxy: "QQQ", sinceInception: 6.10 },   // 663.88 -> 704.40
        { name: "Russell 2000", proxy: "IWM", sinceInception: -0.33 },  // 276.65 -> 275.75
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
        { date: "2026-10-16", fund:  88.97, spy: 6.91, qqq:  6.92 },
        { date: "2026-10-23", fund:  88.61, spy: 6.45, qqq:  6.10 },
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
        AMZN:    "Amazon",
        APO:     "Apollo Global Management",
        ARM:     "Arm Holdings",
        ASTS:    "AST SpaceMobile",
        AVAV:    "AeroVironment",
        BE:      "Bloom Energy",
        BX:      "Blackstone",
        CBRS:    "Cerebras Systems",
        CEG:     "Constellation Energy",
        COHR:    "Coherent",
        COIN:    "Coinbase Global",
        COST:    "Costco Wholesale",
        CRCL:    "Circle Internet Group",
        CRM:     "Salesforce",
        CRSP:    "CRISPR Therapeutics",
        CRWD:    "CrowdStrike",
        CRWV:    "CoreWeave",
        DDOG:    "Datadog",
        DELL:    "Dell Technologies",
        FSLR:    "First Solar",
        GEV:     "GE Vernova",
        GFS:     "GlobalFoundries",
        GOOG:    "Alphabet",
        HIMS:    "Hims &amp; Hers Health",
        HOOD:    "Robinhood Markets",
        HPE:     "Hewlett Packard Enterprise",
        IBKR:    "Interactive Brokers Group",
        INFQ:    "Infleqtion",
        INTC:    "Intel",
        IONQ:    "IonQ",
        IREN:    "IREN",
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
        NFLX:    "Netflix",
        NKE:     "Nike",
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
        WDC:     "Western Digital",
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
            { name: "Technology", pct: 33.40 },
            { name: "Industrial", pct: 22.10 },
            { name: "Financials", pct: 15.24 },
            { name: "Energy", pct: 6.00 },
            { name: "Utilities", pct: 5.69 },
            { name: "Consumer Cyclicals", pct: 5.15 },
            { name: "Telecomm", pct: 5.13 },
            { name: "Basic Materials", pct: 3.73 },
            { name: "Healthcare", pct: 3.56 },
        ],

        // Short book by sector, % of short equity exposure.
        sectorsShort: [
            { name: "Technology", pct: 53.34 },
            { name: "Consumer Cyclicals", pct: 31.60 },
            { name: "Industrial", pct: 15.05 },
        ],

        // Net sector exposure (long minus short) as % of NAV — the actual
        // directional bet. A long-only sector pie hides any offsetting shorts.
        netTilt: [
            { name: "Technology", pct: 81.51 },
            { name: "Industrial", pct: 58.26 },
            { name: "Financials", pct: 42.37 },
            { name: "Energy", pct: 16.68 },
            { name: "Utilities", pct: 15.82 },
            { name: "Telecomm", pct: 14.26 },
            { name: "Basic Materials", pct: 10.39 },
            { name: "Healthcare", pct: 9.91 },
            { name: "Consumer Cyclicals", pct: 7.58 },
        ],

        // Five largest positions by absolute size, as % of NAV.
        topPositions: [
            { ticker: "BX", side: "Long", pctNav: 11.54 },
            { ticker: "UBER", side: "Long", pctNav: 10.66 },
            { ticker: "ASTS", side: "Long", pctNav: 10.44 },
            { ticker: "NOC", side: "Long", pctNav: 9.94 },
            { ticker: "NVO", side: "Long", pctNav: 9.90 },
        ],

        equityLongCount: 39,
        equityShortCount: 1,
        top5Concentration: 17.53,   // % of gross exposure
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
        long: 4107491.12,
        short: -314874.89,
        net: 3792616.23,
        gross: 4422366.01,
        cash: -2315530.89,
        longPct: 278.08,
        shortPct: -21.32,
        netPct: 256.76,
        grossPct: 299.40,
        cashPct: -156.76,
    },

    // --- Risk, derived from IBKR's own daily time-weighted return series ---
    // IBKR exposes no risk-analytics endpoint; these are standard statistics
    // computed on the `cps` series that IBKR itself reports. See AUTOUPDATE.md.
    risk: {
        maxDrawdown: -27.14,
        annualizedVol: 87.16,
        sharpe: 2.66,
        sharpeRiskFree: 4.0,
        tradingDays: 131,
    },

    // --- The week's commentary, keyed by week-ending date ---
    // Generated by the Saturday refresh from priorPrices below, which costs no
    // extra IBKR calls: the position pull already happening is compared with
    // the prices it recorded a week earlier. Says what moved, never why — the
    // account has no news in it. A hand-written note in js/notes.js wins over
    // anything here. Populates from the first refresh after priorPrices exists.
    weeklyNotes: {
        "2026-10-16": "Down 3.2%, S&P down 2.0%. ASTS -20.2% and JBLU -22.8% led the drag; the AMD short added back about 1.6 points, with NOC +8.0% and LMT +8.2% helping.",
        "2026-10-23": "Down 0.2%, S&P down 0.4%. BX +10.4% and VG +10.6% led the gains, with NOC +6.7% helping; CBRS -12.5%, BE -12.3% and JBLU -11.8% led the drag.",
    },

    // Last refresh's close for each held ticker, so next week has something to
    // measure against. Written every run; read only by the run after it.
    priorPrices: {
        AAOI: 67.31,
        AMZN: 248.78,
        APO: 112.83,
        ASTS: 39.54,
        AVAV: 122.86,
        BE: 192.65,
        BX: 117.60,
        CBRS: 110.84,
        CEG: 253.49,
        COHR: 207.99,
        CRCL: 85.72,
        CRWV: 53.95,
        FSLR: 172.50,
        GEV: 813.00,
        HOOD: 94.90,
        IBKR: 80.65,
        INFQ: 8.71,
        INTC: 86.64,
        IONQ: 31.19,
        IREN: 24.90,
        JBLU: 2.62,
        KKR: 91.43,
        KTOS: 38.75,
        LHX: 253.32,
        LULU: 99.25,
        META: 640.10,
        MP: 38.50,
        NBIS: 158.74,
        NFLX: 65.78,
        NKE: 37.42,
        NOC: 554.00,
        NVO: 39.01,
        OSCR: 31.02,
        RKLB: 52.49,
        UBER: 67.00,
        USAR: 9.31,
        VG: 13.99,
        VST: 140.30,
        WDC: 341.80,
        XE: 10.55,
    },

    // --- Open positions (47) ---
    positions: {
        longs: [
            { ticker: "BX", quantity: 1450, price: 117.60, pctNav: 11.54 },
            { ticker: "UBER", quantity: 2350, price: 67.00, pctNav: 10.66 },
            { ticker: "ASTS", quantity: 3900, price: 39.54, pctNav: 10.44 },
            { ticker: "NOC", quantity: 265, price: 554.00, pctNav: 9.94 },
            { ticker: "NVO", quantity: 3750, price: 39.01, pctNav: 9.90 },
            { ticker: "KKR", quantity: 1500, price: 91.43, pctNav: 9.28 },
            { ticker: "CRCL", quantity: 1500, price: 85.72, pctNav: 8.70 },
            { ticker: "LHX", quantity: 500, price: 253.32, pctNav: 8.58 },
            { ticker: "VG", quantity: 9000, price: 13.99, pctNav: 8.52 },
            { ticker: "FSLR", quantity: 700, price: 172.50, pctNav: 8.17 },
            { ticker: "OSCR", quantity: 3750, price: 31.02, pctNav: 7.88 },
            { ticker: "APO", quantity: 1000, price: 112.83, pctNav: 7.64 },
            { ticker: "NKE", quantity: 3000, price: 37.42, pctNav: 7.60 },
            { ticker: "META", quantity: 175, price: 640.10, pctNav: 7.58 },
            { ticker: "NBIS", quantity: 700, price: 158.74, pctNav: 7.52 },
            { ticker: "RKLB", quantity: 2000, price: 52.49, pctNav: 7.11 },
            { ticker: "COHR", quantity: 500, price: 207.99, pctNav: 7.04 },
            { ticker: "INTC", quantity: 1200, price: 86.64, pctNav: 7.04 },
            { ticker: "KTOS", quantity: 2650, price: 38.75, pctNav: 6.95 },
            { ticker: "WDC", quantity: 300, price: 341.80, pctNav: 6.94 },
            { ticker: "GEV", quantity: 125, price: 813.00, pctNav: 6.88 },
            { ticker: "CBRS", quantity: 900, price: 110.84, pctNav: 6.75 },
            { ticker: "LULU", quantity: 1000, price: 99.25, pctNav: 6.72 },
            { ticker: "NFLX", quantity: 1500, price: 65.78, pctNav: 6.68 },
            { ticker: "BE", quantity: 500, price: 192.65, pctNav: 6.52 },
            { ticker: "HOOD", quantity: 1000, price: 94.90, pctNav: 6.42 },
            { ticker: "IONQ", quantity: 3000, price: 31.19, pctNav: 6.33 },
            { ticker: "JBLU", quantity: 35000, price: 2.62, pctNav: 6.21 },
            { ticker: "IBKR", quantity: 1100, price: 80.65, pctNav: 6.01 },
            { ticker: "MP", quantity: 2300, price: 38.50, pctNav: 5.99 },
            { ticker: "INFQ", quantity: 10000, price: 8.71, pctNav: 5.90 },
            { ticker: "AVAV", quantity: 700, price: 122.86, pctNav: 5.82 },
            { ticker: "AAOI", quantity: 1250, price: 67.31, pctNav: 5.70 },
            { ticker: "CRWV", quantity: 1500, price: 53.95, pctNav: 5.48 },
            { ticker: "CEG", quantity: 300, price: 253.49, pctNav: 5.15 },
            { ticker: "IREN", quantity: 3000, price: 24.90, pctNav: 5.06 },
            { ticker: "USAR", quantity: 7000, price: 9.31, pctNav: 4.41 },
            { ticker: "VST", quantity: 400, price: 140.30, pctNav: 3.80 },
            { ticker: "XE", quantity: 4010, price: 10.55, pctNav: 2.86 },
        ],
        shorts: [
            { ticker: "AMZN", quantity: -400, price: 248.78, pctNav: 6.74 },
        ],
        options: [
            { ticker: "MU", contract: "Dec 18 '26 · 850 Put", quantity: 1, price: 55.60, pctNav: 0.38 },
            { ticker: "DELL", contract: "Dec 18 '26 · 320 Put", quantity: 1, price: 5.49, pctNav: 0.04 },
            { ticker: "IREN", contract: "Nov 27 '26 · 24 Put", quantity: -100, price: 2.81, pctNav: 1.91 },
            { ticker: "HPE", contract: "Nov 27 '26 · 55 Put", quantity: -100, price: 3.38, pctNav: 2.29 },
            { ticker: "DELL", contract: "Dec 18 '26 · 400 Put", quantity: -20, price: 22.60, pctNav: 3.06 },
            { ticker: "NBIS", contract: "Nov 27 '26 · 140 Put", quantity: -50, price: 9.43, pctNav: 3.19 },
            { ticker: "CRWV", contract: "Dec 18 '26 · 50 Put", quantity: -100, price: 5.95, pctNav: 4.03 },
        ],
    },
};
