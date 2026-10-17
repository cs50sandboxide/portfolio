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
    asOf: "2026-10-17",
    ibkrLastUpdate: "2026-10-17 10:13:03",

    // Wall-clock time this file was regenerated. Always changes, even when the
    // market data does not — so every refresh leaves a commit and `git log`
    // answers "did the weekly job actually run?". Without it, a healthy run on
    // a quiet week is indistinguishable from a job that never fired.
    generatedAt: "2026-10-17T10:15:19Z",

    // --- Headline figures ---
    portfolioValue: 1471273.59,   // net liquidation value
    cash: -2459509.20,
    grossExposure: 4720136.19,    // long + short notional
    leverage: 3.21,

    // --- Performance (time-weighted return, per IBKR) ---
    // The account's performance history begins at inception below;
    // there is no calendar-YTD figure available before that date.
    inceptionDate: "2026-04-27",
    returnSinceInception: 87.00,

    mtdReturn: 0.48,
    mtdWindow: "30 Sep – 17 Oct 2026",

    // --- Primary benchmark (used in the homepage banner and stat blocks) ---
    benchmark: {
        name: "S&P 500",
        proxy: "SPY",
        sinceInception: 6.91,    // 27 Apr close 713.94 -> 16 Oct 763.25
        calendarYtd: 11.93,      // 31 Dec close 681.92 -> 763.25
    },

    // --- Benchmark panel, all measured over the SAME window as the fund ---
    // ETF closes are used as index proxies. Every figure runs from the
    // account's inception date to `asOf`, so the comparison is like-for-like.
    benchmarks: [
        { name: "S&P 500",      proxy: "SPY", sinceInception: 6.91 },   // 713.94 -> 763.25
        { name: "Nasdaq 100",   proxy: "QQQ", sinceInception: 6.92 },   // 663.88 -> 709.80
        { name: "Russell 2000", proxy: "IWM", sinceInception: -2.24 },  // 276.65 -> 270.44
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
            { name: "Technology",        pct: 39.67 },
            { name: "Industrial",        pct: 24.52 },
            { name: "Financials",        pct: 14.00 },
            { name: "Healthcare",        pct: 6.83 },
            { name: "Energy",            pct: 5.42 },
            { name: "Basic Materials",   pct: 3.83 },
            { name: "Consumer Cyclicals", pct: 3.08 },
            { name: "Utilities",         pct: 2.64 },
        ],

        // Short book by sector, % of short equity exposure.
        sectorsShort: [
            { name: "Technology",        pct: 88.27 },
            { name: "Industrial",        pct: 11.73 },
        ],

        // Net sector exposure (long minus short) as % of NAV — the actual
        // directional bet. A long-only sector pie hides any offsetting shorts.
        netTilt: [
            { name: "Technology",        pct: 93.03 },
            { name: "Industrial",        pct: 68.96 },
            { name: "Financials",        pct: 41.16 },
            { name: "Healthcare",        pct: 20.09 },
            { name: "Energy",            pct: 15.95 },
            { name: "Basic Materials",   pct: 11.25 },
            { name: "Consumer Cyclicals", pct: 9.06 },
            { name: "Utilities",         pct: 7.77 },
        ],

        // Five largest positions by absolute size, as % of NAV.
        topPositions: [
            { ticker: "AMD", side: "Short", pctNav: 12.19 },
            { ticker: "UBER", side: "Long", pctNav: 11.18 },
            { ticker: "ASTS", side: "Long", pctNav: 10.77 },
            { ticker: "SPOT", side: "Long", pctNav: 10.75 },
            { ticker: "BX", side: "Long", pctNav: 10.50 },
        ],

        equityLongCount: 39,
        equityShortCount: 1,
        top5Concentration: 17.26,   // % of gross exposure
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
        long: 4326261.15,
        short: -393875.04,
        net: 3932386.11,
        gross: 4720136.19,
        cash: -2461112.52,
        longPct: 294.05,
        shortPct: -26.77,
        netPct: 267.28,
        grossPct: 320.82,
        cashPct: -167.28,
    },

    // --- Risk, derived from IBKR's own daily time-weighted return series ---
    // IBKR exposes no risk-analytics endpoint; these are standard statistics
    // computed on the `cps` series that IBKR itself reports. See AUTOUPDATE.md.
    risk: {
        maxDrawdown: -27.14,
        annualizedVol: 88.34,
        sharpe: 2.78,
        sharpeRiskFree: 4.0,
        tradingDays: 126,
    },

    // --- The week's commentary, keyed by week-ending date ---
    // Generated by the Saturday refresh from priorPrices below, which costs no
    // extra IBKR calls: the position pull already happening is compared with
    // the prices it recorded a week earlier. Says what moved, never why — the
    // account has no news in it. A hand-written note in js/notes.js wins over
    // anything here. Populates from the first refresh after priorPrices exists.
    weeklyNotes: {
        "2026-10-16": "Down 3.2%, S&P down 2.0%. ASTS -20.2% and JBLU -22.8% led the drag; the AMD short added back about 1.6 points, with NOC +8.0% and LMT +8.2% helping.",
    },

    // Last refresh's close for each held ticker, so next week has something to
    // measure against. Written every run; read only by the run after it.
    priorPrices: {
        AAOI: 75.50,
        ADBE: 243.42,
        AMD: 527.35,
        APO: 110.80,
        ASTS: 40.65,
        AVAV: 121.50,
        BE: 219.69,
        BX: 106.49,
        CBRS: 126.70,
        CEG: 269.76,
        COST: 987.22,
        CRCL: 82.15,
        CRWD: 225.87,
        CRWV: 60.98,
        FSLR: 172.87,
        HOOD: 98.55,
        IBKR: 82.66,
        INFQ: 8.60,
        INTC: 89.33,
        IONQ: 31.49,
        IREN: 26.96,
        JBLU: 2.97,
        KKR: 86.20,
        KTOS: 40.16,
        LHX: 247.97,
        LMT: 551.99,
        MP: 40.07,
        NBIS: 165.44,
        NOC: 519.25,
        NVO: 38.73,
        OSCR: 31.81,
        RKLB: 50.95,
        SNOW: 304.53,
        SPOT: 527.00,
        UBER: 69.97,
        UNH: 400.80,
        USAR: 10.50,
        VG: 12.65,
        VST: 151.01,
        XE: 10.37,
    },

    // --- Open positions (47) ---
    positions: {
        longs: [
            { ticker: "UBER", quantity: 2350, price: 69.97, pctNav: 11.18 },
            { ticker: "ASTS", quantity: 3900, price: 40.65, pctNav: 10.77 },
            { ticker: "SPOT", quantity: 300, price: 527.00, pctNav: 10.75 },
            { ticker: "BX", quantity: 1450, price: 106.49, pctNav: 10.50 },
            { ticker: "UNH", quantity: 375, price: 400.80, pctNav: 10.22 },
            { ticker: "NVO", quantity: 3750, price: 38.73, pctNav: 9.87 },
            { ticker: "NOC", quantity: 265, price: 519.25, pctNav: 9.35 },
            { ticker: "LMT", quantity: 245, price: 551.99, pctNav: 9.19 },
            { ticker: "ADBE", quantity: 550, price: 243.42, pctNav: 9.10 },
            { ticker: "COST", quantity: 135, price: 987.22, pctNav: 9.06 },
            { ticker: "KKR", quantity: 1500, price: 86.20, pctNav: 8.79 },
            { ticker: "LHX", quantity: 500, price: 247.97, pctNav: 8.43 },
            { ticker: "CRCL", quantity: 1500, price: 82.15, pctNav: 8.38 },
            { ticker: "FSLR", quantity: 700, price: 172.87, pctNav: 8.22 },
            { ticker: "OSCR", quantity: 3750, price: 31.81, pctNav: 8.11 },
            { ticker: "NBIS", quantity: 700, price: 165.44, pctNav: 7.87 },
            { ticker: "CBRS", quantity: 900, price: 126.70, pctNav: 7.75 },
            { ticker: "VG", quantity: 9000, price: 12.65, pctNav: 7.74 },
            { ticker: "CRWD", quantity: 500, price: 225.87, pctNav: 7.68 },
            { ticker: "APO", quantity: 1000, price: 110.80, pctNav: 7.53 },
            { ticker: "BE", quantity: 500, price: 219.69, pctNav: 7.47 },
            { ticker: "INTC", quantity: 1200, price: 89.33, pctNav: 7.29 },
            { ticker: "KTOS", quantity: 2650, price: 40.16, pctNav: 7.23 },
            { ticker: "JBLU", quantity: 35000, price: 2.97, pctNav: 7.07 },
            { ticker: "RKLB", quantity: 2000, price: 50.95, pctNav: 6.93 },
            { ticker: "HOOD", quantity: 1000, price: 98.55, pctNav: 6.70 },
            { ticker: "IONQ", quantity: 3000, price: 31.49, pctNav: 6.42 },
            { ticker: "AAOI", quantity: 1250, price: 75.50, pctNav: 6.41 },
            { ticker: "MP", quantity: 2300, price: 40.07, pctNav: 6.26 },
            { ticker: "CRWV", quantity: 1500, price: 60.98, pctNav: 6.22 },
            { ticker: "SNOW", quantity: 300, price: 304.53, pctNav: 6.21 },
            { ticker: "IBKR", quantity: 1100, price: 82.66, pctNav: 6.18 },
            { ticker: "INFQ", quantity: 10000, price: 8.60, pctNav: 5.85 },
            { ticker: "AVAV", quantity: 700, price: 121.50, pctNav: 5.78 },
            { ticker: "IREN", quantity: 3000, price: 26.96, pctNav: 5.50 },
            { ticker: "USAR", quantity: 7000, price: 10.50, pctNav: 5.00 },
            { ticker: "VST", quantity: 400, price: 151.01, pctNav: 4.11 },
            { ticker: "CEG", quantity: 200, price: 269.76, pctNav: 3.67 },
            { ticker: "XE", quantity: 4010, price: 10.37, pctNav: 2.83 },
        ],
        shorts: [
            { ticker: "AMD", quantity: -340, price: 527.35, pctNav: 12.19 },
        ],
        options: [
            { ticker: "MU", contract: "Dec 18 '26 · 850 Put", quantity: 1, price: 57.46, pctNav: 0.39 },
            { ticker: "DELL", contract: "Dec 18 '26 · 320 Put", quantity: 1, price: 6.64, pctNav: 0.05 },
            { ticker: "IREN", contract: "Nov 27 '26 · 24 Put", quantity: -100, price: 2.26, pctNav: 1.54 },
            { ticker: "CRWV", contract: "Dec 18 '26 · 50 Put", quantity: -100, price: 4.25, pctNav: 2.89 },
            { ticker: "HPE", contract: "Nov 27 '26 · 55 Put", quantity: -100, price: 4.46, pctNav: 3.03 },
            { ticker: "NBIS", contract: "Nov 27 '26 · 140 Put", quantity: -50, price: 9.21, pctNav: 3.13 },
            { ticker: "DELL", contract: "Dec 18 '26 · 400 Put", quantity: -20, price: 25.77, pctNav: 3.50 },
        ],
    },
};
