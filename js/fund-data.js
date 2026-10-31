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
    asOf: "2026-10-31",
    ibkrLastUpdate: "2026-10-31 11:12:52",

    // Wall-clock time this file was regenerated. Always changes, even when the
    // market data does not — so every refresh leaves a commit and `git log`
    // answers "did the weekly job actually run?". Without it, a healthy run on
    // a quiet week is indistinguishable from a job that never fired.
    generatedAt: "2026-10-31T11:14:12Z",

    // --- Headline figures ---
    portfolioValue: 1508839.09,   // net liquidation value
    cash: -1277652.55,
    grossExposure: 3553621.87,    // long + short notional
    leverage: 2.36,

    // --- Performance (time-weighted return, per IBKR) ---
    // The account's performance history begins at inception below;
    // there is no calendar-YTD figure available before that date.
    inceptionDate: "2026-04-27",
    returnSinceInception: 91.78,

    mtdReturn: 3.04,
    mtdWindow: "30 Sep – 31 Oct 2026",

    // --- Primary benchmark (used in the homepage banner and stat blocks) ---
    benchmark: {
        name: "S&P 500",
        proxy: "SPY",
        sinceInception: 5.85,    // 27 Apr close 713.94 -> 30 Oct 755.72
        calendarYtd: 10.82,      // 31 Dec close 681.92 -> 755.72
    },

    // --- Benchmark panel, all measured over the SAME window as the fund ---
    // ETF closes are used as index proxies. Every figure runs from the
    // account's inception date to `asOf`, so the comparison is like-for-like.
    benchmarks: [
        { name: "S&P 500",      proxy: "SPY", sinceInception: 5.85 },   // 713.94 -> 755.72
        { name: "Nasdaq 100",   proxy: "QQQ", sinceInception: 4.01 },   // 663.88 -> 690.49
        { name: "Russell 2000", proxy: "IWM", sinceInception: 0.97 },  // 276.65 -> 279.33
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
            { name: "Technology", pct: 42.50 },
            { name: "Financials", pct: 16.16 },
            { name: "Industrial", pct: 14.20 },
            { name: "Telecomm", pct: 9.34 },
            { name: "Basic Materials", pct: 4.99 },
            { name: "Healthcare", pct: 4.72 },
            { name: "Utilities", pct: 4.23 },
            { name: "Energy", pct: 3.85 },
        ],

        // Short book by sector, % of short equity exposure.
        sectorsShort: [
            { name: "Technology", pct: 49.21 },
            { name: "Healthcare", pct: 37.72 },
            { name: "Industrial", pct: 13.07 },
        ],

        // Net sector exposure (long minus short) as % of NAV — the actual
        // directional bet. A long-only sector pie hides any offsetting shorts.
        netTilt: [
            { name: "Technology", pct: 76.93 },
            { name: "Financials", pct: 33.97 },
            { name: "Industrial", pct: 26.56 },
            { name: "Telecomm", pct: 19.63 },
            { name: "Basic Materials", pct: 10.49 },
            { name: "Utilities", pct: 8.90 },
            { name: "Energy", pct: 8.09 },
            { name: "Healthcare", pct: 0.40 },
        ],

        // Five largest positions by absolute size, as % of NAV.
        topPositions: [
            { ticker: "BX", side: "Long", pctNav: 11.28 },
            { ticker: "ASTS", side: "Long", pctNav: 10.59 },
            { ticker: "UBER", side: "Long", pctNav: 10.18 },
            { ticker: "NVO", side: "Long", pctNav: 9.94 },
            { ticker: "MRNA", side: "Short", pctNav: 9.54 },
        ],

        equityLongCount: 29,
        equityShortCount: 1,
        top5Concentration: 21.88,   // % of gross exposure
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
        long: 3172342.59,
        short: -381279.28,
        net: 2791063.31,
        gross: 3553621.87,
        cash: -1282224.21,
        longPct: 210.25,
        shortPct: -25.27,
        netPct: 184.98,
        grossPct: 235.52,
        cashPct: -84.98,
    },

    // --- Risk, derived from IBKR's own daily time-weighted return series ---
    // IBKR exposes no risk-analytics endpoint; these are standard statistics
    // computed on the `cps` series that IBKR itself reports. See AUTOUPDATE.md.
    risk: {
        maxDrawdown: -27.14,
        annualizedVol: 90.13,
        sharpe: 2.55,
        sharpeRiskFree: 4.0,
        tradingDays: 136,
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
    },

    // Last refresh's close for each held ticker, so next week has something to
    // measure against. Written every run; read only by the run after it.
    priorPrices: {
        AAOI: 69.39,
        APO: 115.84,
        ASTS: 40.97,
        AVAV: 126.00,
        BX: 117.39,
        CBRS: 108.77,
        CEG: 262.87,
        COIN: 145.22,
        CRCL: 72.96,
        CRWV: 55.16,
        FSLR: 174.69,
        GOOG: 279.68,
        HOOD: 85.41,
        IBKR: 77.20,
        INTC: 64.89,
        IONQ: 30.14,
        IREN: 24.16,
        JBLU: 2.86,
        KKR: 94.39,
        KTOS: 41.20,
        MP: 39.57,
        MRNA: 221.50,
        NBIS: 155.69,
        NFLX: 62.08,
        NOW: 105.35,
        NVO: 40.00,
        UBER: 65.34,
        USAR: 9.62,
        VST: 138.37,
        XE: 10.95,
    },

    // --- Open positions (40) ---
    positions: {
        longs: [
            { ticker: "BX", quantity: 1450, price: 117.39, pctNav: 11.28 },
            { ticker: "ASTS", quantity: 3900, price: 40.97, pctNav: 10.59 },
            { ticker: "UBER", quantity: 2350, price: 65.34, pctNav: 10.18 },
            { ticker: "NVO", quantity: 3750, price: 40.00, pctNav: 9.94 },
            { ticker: "KKR", quantity: 1500, price: 94.39, pctNav: 9.38 },
            { ticker: "GOOG", quantity: 500, price: 279.68, pctNav: 9.27 },
            { ticker: "IONQ", quantity: 4100, price: 30.14, pctNav: 8.19 },
            { ticker: "COIN", quantity: 850, price: 145.22, pctNav: 8.18 },
            { ticker: "FSLR", quantity: 700, price: 174.69, pctNav: 8.10 },
            { ticker: "NOW", quantity: 1100, price: 105.35, pctNav: 7.68 },
            { ticker: "APO", quantity: 1000, price: 115.84, pctNav: 7.68 },
            { ticker: "INTC", quantity: 1700, price: 64.89, pctNav: 7.31 },
            { ticker: "CRCL", quantity: 1500, price: 72.96, pctNav: 7.25 },
            { ticker: "KTOS", quantity: 2650, price: 41.20, pctNav: 7.24 },
            { ticker: "NBIS", quantity: 700, price: 155.69, pctNav: 7.22 },
            { ticker: "JBLU", quantity: 35000, price: 2.86, pctNav: 6.63 },
            { ticker: "CBRS", quantity: 900, price: 108.77, pctNav: 6.49 },
            { ticker: "NFLX", quantity: 1500, price: 62.08, pctNav: 6.17 },
            { ticker: "MP", quantity: 2300, price: 39.57, pctNav: 6.03 },
            { ticker: "AVAV", quantity: 700, price: 126.00, pctNav: 5.85 },
            { ticker: "AAOI", quantity: 1250, price: 69.39, pctNav: 5.75 },
            { ticker: "HOOD", quantity: 1000, price: 85.41, pctNav: 5.66 },
            { ticker: "IBKR", quantity: 1100, price: 77.20, pctNav: 5.63 },
            { ticker: "CRWV", quantity: 1500, price: 55.16, pctNav: 5.48 },
            { ticker: "CEG", quantity: 300, price: 262.87, pctNav: 5.23 },
            { ticker: "IREN", quantity: 3000, price: 24.16, pctNav: 4.80 },
            { ticker: "USAR", quantity: 7000, price: 9.62, pctNav: 4.46 },
            { ticker: "VST", quantity: 400, price: 138.37, pctNav: 3.67 },
            { ticker: "XE", quantity: 4010, price: 10.95, pctNav: 2.91 },
        ],
        shorts: [
            { ticker: "MRNA", quantity: -650, price: 221.50, pctNav: 9.54 },
        ],
        options: [
            { ticker: "GOOG", contract: "Dec 17 '27 · 320 Call", quantity: 20, price: 31.28, pctNav: 4.15 },
            { ticker: "UBER", contract: "Dec 18 '26 · 67.5 Call", quantity: 50, price: 3.01, pctNav: 1.00 },
            { ticker: "INTC", contract: "Mar 19 '27 · 75 Call", quantity: 10, price: 5.94, pctNav: 0.39 },
            { ticker: "MU", contract: "Dec 18 '26 · 850 Put", quantity: 1, price: 53.25, pctNav: 0.35 },
            { ticker: "DELL", contract: "Dec 18 '26 · 320 Put", quantity: 1, price: 8.97, pctNav: 0.06 },
            { ticker: "IREN", contract: "Nov 27 '26 · 24 Put", quantity: -100, price: 3.11, pctNav: 2.06 },
            { ticker: "HPE", contract: "Nov 27 '26 · 55 Put", quantity: -100, price: 3.90, pctNav: 2.58 },
            { ticker: "NBIS", contract: "Nov 27 '26 · 140 Put", quantity: -50, price: 10.48, pctNav: 3.47 },
            { ticker: "CRWV", contract: "Dec 18 '26 · 50 Put", quantity: -100, price: 5.39, pctNav: 3.57 },
            { ticker: "DELL", contract: "Dec 18 '26 · 400 Put", quantity: -20, price: 32.74, pctNav: 4.34 },
        ],
    },
};
