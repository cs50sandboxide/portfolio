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
    asOf: "2026-11-14",
    ibkrLastUpdate: "2026-11-14 11:12:52",

    // Wall-clock time this file was regenerated. Always changes, even when the
    // market data does not — so every refresh leaves a commit and `git log`
    // answers "did the weekly job actually run?". Without it, a healthy run on
    // a quiet week is indistinguishable from a job that never fired.
    generatedAt: "2026-11-14T11:14:21Z",

    // --- Headline figures ---
    portfolioValue: 1300225.71,   // net liquidation value
    cash: -566403.39,
    grossExposure: 3480588.07,    // long + short notional
    leverage: 2.68,

    // --- Performance (time-weighted return, per IBKR) ---
    // The account's performance history begins at inception below;
    // there is no calendar-YTD figure available before that date.
    inceptionDate: "2026-04-27",
    returnSinceInception: 65.26,

    mtdReturn: -13.16,
    mtdWindow: "30 Oct – 14 Nov 2026",

    // --- Primary benchmark (used in the homepage banner and stat blocks) ---
    benchmark: {
        name: "S&P 500",
        proxy: "SPY",
        sinceInception: 5.66,    // 27 Apr close 713.94 -> 13 Nov 754.37
        calendarYtd: 10.62,     // 31 Dec close 681.92 -> 754.37
    },

    // --- Benchmark panel, all measured over the SAME window as the fund ---
    // ETF closes are used as index proxies. Every figure runs from the
    // account's inception date to `asOf`, so the comparison is like-for-like.
    benchmarks: [
        { name: "S&P 500",      proxy: "SPY", sinceInception: 5.66 },   // 713.94 -> 754.37
        { name: "Nasdaq 100",   proxy: "QQQ", sinceInception: 2.41 },   // 663.88 -> 679.89
        { name: "Russell 2000", proxy: "IWM", sinceInception: 0.32 },   // 276.65 -> 277.54
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
        { date: "2026-10-30", fund:  90.31, spy: 5.85, qqq:  4.01 },
        { date: "2026-11-06", fund:   35.16, spy: 2.99, qqq: -1.17 },
        { date: "2026-11-13", fund:  68.95, spy: 5.66, qqq:  2.41 },
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
        DOCN:    "DigitalOcean Holdings",
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
            { name: "Technology", pct: 47.99 },
            { name: "Financials", pct: 19.88 },
            { name: "Industrial", pct: 15.80 },
            { name: "Healthcare", pct: 5.81 },
            { name: "Basic Materials", pct: 5.42 },
            { name: "Utilities", pct: 5.10 },
        ],

        // Short book by sector, % of short equity exposure.
        sectorsShort: [
            { name: "Technology", pct: 82.48 },
            { name: "Healthcare", pct: 17.52 },
        ],

        // Net sector exposure (long minus short) as % of NAV — the actual
        // directional bet. A long-only sector pie hides any offsetting shorts.
        netTilt: [
            { name: "Technology", pct: 47.58 },
            { name: "Financials", pct: 40.89 },
            { name: "Industrial", pct: 32.51 },
            { name: "Basic Materials", pct: 11.15 },
            { name: "Utilities", pct: 10.48 },
            { name: "Healthcare", pct: 1.09 },
        ],

        // Five largest positions by absolute size, as % of NAV.
        topPositions: [
            { ticker: "BX", side: "Long", pctNav: 13.28 },
            { ticker: "UBER", side: "Long", pctNav: 12.52 },
            { ticker: "NVO", side: "Long", pctNav: 11.95 },
            { ticker: "AMD", side: "Short", pctNav: 11.62 },
            { ticker: "KKR", side: "Long", pctNav: 11.31 },
        ],

        equityLongCount: 27,
        equityShortCount: 5,
        top5Concentration: 22.67,   // % of gross exposure
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
            "2026-10": 755.72,
        },
    },

    // --- Exposure, straight from get_pa_allocation (reconciles to NAV) ---
    exposure: {
        long: 2674483.68,
        short: -806104.40,
        net: 1868379.28,
        gross: 3480588.07,
        cash: -568153.57,
        longPct: 205.69,
        shortPct: -62.00,
        netPct: 143.70,
        grossPct: 267.69,
        cashPct: -43.70,
    },

    // --- Risk, derived from IBKR's own daily time-weighted return series ---
    // IBKR exposes no risk-analytics endpoint; these are standard statistics
    // computed on the `cps` series that IBKR itself reports. See AUTOUPDATE.md.
    risk: {
        maxDrawdown: -48.76,
        annualizedVol: 106.80,
        sharpe: 1.25,
        sharpeRiskFree: 4.0,
        tradingDays: 146,
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
        "2026-10-30": "Up 0.9%, S&P down 0.6%. JBLU +9.0% and KTOS +6.3% led the gains, with ASTS +3.6% helping; INTC -25.1%, CRCL -14.9% and HOOD -10.0% led the drag.",
        "2026-11-06": "Down 29.0%, S&P down 2.7%. MRNA short +16.0% and ASTS -20.7% led the drag, with AAOI -27.8% and NBIS -15.9% also lower; JBLU +29.0% and IONQ +7.0% helped.",
        "2026-11-13": "Up 25.0%, S&P up 2.6%. The MRNA short (-15.1%) and CBRS +17.8% led the gains, with CEG +11.2% and CRWV +11.2% helping; NBIS -13.8%, IONQ -11.6% and IREN -18.9% led the drag.",
    },

    // Last refresh's close for each held ticker, so next week has something to
    // measure against. Written every run; read only by the run after it.
    priorPrices: {
        AAOI: 48.62,
        ALAB: 216.35,
        AMD: 521.20,
        APO: 123.47,
        ASTS: 31.70,
        AVAV: 117.00,
        BX: 119.08,
        CBRS: 106.00,
        CEG: 278.20,
        COIN: 126.08,
        CRCL: 61.39,
        CRWV: 51.75,
        DOCN: 85.99,
        HOOD: 76.62,
        IBKR: 81.20,
        INTC: 58.65,
        IONQ: 28.52,
        IREN: 17.68,
        JBLU: 3.65,
        KKR: 98.05,
        KTOS: 33.92,
        MP: 38.72,
        MRNA: 218.00,
        NBIS: 112.80,
        NOW: 101.67,
        NVDA: 161.01,
        NVO: 41.44,
        ORCL: 123.45,
        UBER: 69.28,
        USAR: 8.01,
        VST: 131.00,
        XE: 10.91,
    },

    // --- Open positions (36) ---
    positions: {
        longs: [
            { ticker: "BX", quantity: 1450, price: 119.08, pctNav: 13.28 },
            { ticker: "UBER", quantity: 2350, price: 69.28, pctNav: 12.52 },
            { ticker: "NVO", quantity: 3750, price: 41.44, pctNav: 11.95 },
            { ticker: "KKR", quantity: 1500, price: 98.05, pctNav: 11.31 },
            { ticker: "NVDA", quantity: 800, price: 161.01, pctNav: 9.91 },
            { ticker: "JBLU", quantity: 35000, price: 3.65, pctNav: 9.83 },
            { ticker: "ASTS", quantity: 3900, price: 31.70, pctNav: 9.51 },
            { ticker: "APO", quantity: 1000, price: 123.47, pctNav: 9.50 },
            { ticker: "NOW", quantity: 1100, price: 101.67, pctNav: 8.60 },
            { ticker: "COIN", quantity: 850, price: 126.08, pctNav: 8.24 },
            { ticker: "INTC", quantity: 1700, price: 58.65, pctNav: 7.67 },
            { ticker: "CBRS", quantity: 900, price: 106.00, pctNav: 7.34 },
            { ticker: "CRCL", quantity: 1500, price: 61.39, pctNav: 7.08 },
            { ticker: "KTOS", quantity: 2650, price: 33.92, pctNav: 6.91 },
            { ticker: "IBKR", quantity: 1100, price: 81.20, pctNav: 6.87 },
            { ticker: "MP", quantity: 2300, price: 38.72, pctNav: 6.85 },
            { ticker: "IONQ", quantity: 3100, price: 28.52, pctNav: 6.80 },
            { ticker: "CEG", quantity: 300, price: 278.20, pctNav: 6.42 },
            { ticker: "AVAV", quantity: 700, price: 117.00, pctNav: 6.30 },
            { ticker: "NBIS", quantity: 700, price: 112.80, pctNav: 6.07 },
            { ticker: "CRWV", quantity: 1500, price: 51.75, pctNav: 5.97 },
            { ticker: "HOOD", quantity: 1000, price: 76.62, pctNav: 5.89 },
            { ticker: "AAOI", quantity: 1250, price: 48.62, pctNav: 4.67 },
            { ticker: "USAR", quantity: 7000, price: 8.01, pctNav: 4.31 },
            { ticker: "IREN", quantity: 3000, price: 17.68, pctNav: 4.08 },
            { ticker: "VST", quantity: 400, price: 131.00, pctNav: 4.03 },
            { ticker: "XE", quantity: 4010, price: 10.91, pctNav: 3.36 },
        ],
        shorts: [
            { ticker: "AMD", quantity: -290, price: 521.20, pctNav: 11.62 },
            { ticker: "MRNA", quantity: -650, price: 218.00, pctNav: 10.90 },
            { ticker: "ORCL", quantity: -1000, price: 123.45, pctNav: 9.49 },
            { ticker: "ALAB", quantity: -500, price: 216.35, pctNav: 8.32 },
            { ticker: "DOCN", quantity: -1150, price: 85.99, pctNav: 7.61 },
        ],
        options: [
            { ticker: "IREN", contract: "Dec 24 '26 · 14 Put", quantity: 30, price: 1.05, pctNav: 0.24 },
            { ticker: "DELL", contract: "Dec 18 '26 · 320 Put", quantity: 1, price: 25.59, pctNav: 0.20 },
            { ticker: "IREN", contract: "Nov 27 '26 · 24 Put", quantity: -50, price: 6.11, pctNav: 2.35 },
            { ticker: "DELL", contract: "Dec 18 '26 · 400 Put", quantity: -20, price: 72.43, pctNav: 11.14 },
        ],
    },
};
