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
    asOf: "2026-11-21",
    ibkrLastUpdate: "2026-11-21 11:13:01",

    // Wall-clock time this file was regenerated. Always changes, even when the
    // market data does not — so every refresh leaves a commit and `git log`
    // answers "did the weekly job actually run?". Without it, a healthy run on
    // a quiet week is indistinguishable from a job that never fired.
    generatedAt: "2026-11-21T11:14:37Z",

    // --- Headline figures ---
    portfolioValue: 772290.17,   // net liquidation value
    cash: -1809733.30,
    grossExposure: 3333294.86,    // long + short notional
    leverage: 4.32,

    // --- Performance (time-weighted return, per IBKR) ---
    // The account's performance history begins at inception below;
    // there is no calendar-YTD figure available before that date.
    inceptionDate: "2026-04-27",
    returnSinceInception: -1.84,

    mtdReturn: -48.42,
    mtdWindow: "30 Oct – 21 Nov 2026",

    // --- Primary benchmark (used in the homepage banner and stat blocks) ---
    benchmark: {
        name: "S&P 500",
        proxy: "SPY",
        sinceInception: -3.38,    // 27 Apr close 713.94 -> 20 Nov 689.81
        calendarYtd: 1.16,     // 31 Dec close 681.92 -> 689.81
    },

    // --- Benchmark panel, all measured over the SAME window as the fund ---
    // ETF closes are used as index proxies. Every figure runs from the
    // account's inception date to `asOf`, so the comparison is like-for-like.
    benchmarks: [
        { name: "S&P 500",      proxy: "SPY", sinceInception: -3.38 },   // 713.94 -> 689.81
        { name: "Nasdaq 100",   proxy: "QQQ", sinceInception: -8.35 },   // 663.88 -> 608.45
        { name: "Russell 2000", proxy: "IWM", sinceInception: -7.24 },   // 276.65 -> 256.61
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
        { date: "2026-11-20", fund: -10.01, spy: -3.38, qqq: -8.35 },
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
        IBIT:    "iShares Bitcoin Trust ETF",
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
            { name: "Technology", pct: 49.41 },
            { name: "Financials", pct: 16.44 },
            { name: "Industrial", pct: 9.95 },
            { name: "Utilities", pct: 4.86 },
            { name: "Healthcare", pct: 4.79 },
            { name: "Basic Materials", pct: 4.19 },
            { name: "Consumer Cyclicals", pct: 3.91 },
            { name: "Telecomm", pct: 3.63 },
            { name: "Broad", pct: 2.82 },
        ],

        // Short book by sector, % of short equity exposure.
        sectorsShort: [
            { name: "Technology", pct: 62.76 },
            { name: "Healthcare", pct: 37.24 },
        ],

        // Net sector exposure (long minus short) as % of NAV — the actual
        // directional bet. A long-only sector pie hides any offsetting shorts.
        netTilt: [
            { name: "Technology", pct: 158.86 },
            { name: "Financials", pct: 63.00 },
            { name: "Industrial", pct: 38.10 },
            { name: "Utilities", pct: 18.63 },
            { name: "Basic Materials", pct: 16.04 },
            { name: "Consumer Cyclicals", pct: 14.97 },
            { name: "Telecomm", pct: 13.91 },
            { name: "Broad", pct: 10.79 },
            { name: "Healthcare", pct: 0.30 },
        ],

        // Five largest positions by absolute size, as % of NAV.
        topPositions: [
            { ticker: "BX", side: "Long", pctNav: 20.80 },
            { ticker: "UBER", side: "Long", pctNav: 19.60 },
            { ticker: "NVO", side: "Long", pctNav: 18.36 },
            { ticker: "MRNA", side: "Short", pctNav: 18.06 },
            { ticker: "KKR", side: "Long", pctNav: 17.20 },
        ],

        equityLongCount: 34,
        equityShortCount: 1,
        top5Concentration: 21.79,   // % of gross exposure
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
        long: 2958678.80,
        short: -374616.06,
        net: 2584062.75,
        gross: 3333294.86,
        cash: -1811772.58,
        longPct: 383.10,
        shortPct: -48.51,
        netPct: 334.60,
        grossPct: 431.61,
        cashPct: -234.60,
    },

    // --- Risk, derived from IBKR's own daily time-weighted return series ---
    // IBKR exposes no risk-analytics endpoint; these are standard statistics
    // computed on the `cps` series that IBKR itself reports. See AUTOUPDATE.md.
    risk: {
        maxDrawdown: -60.16,
        annualizedVol: 113.87,
        sharpe: -0.06,
        sharpeRiskFree: 4.0,
        tradingDays: 151,
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
        "2026-11-20": "Down 46.7%, S&P down 8.6%. NVDA -19.3%, ASTS -23.9% and COIN -18.9% led the drag, with all 27 longs held through the week lower; the MRNA short (-8.6%) added back about 1.6 points.",
    },

    // Last refresh's close for each held ticker, so next week has something to
    // measure against. Written every run; read only by the run after it.
    priorPrices: {
        AAOI: 33.83,
        ADBE: 217.71,
        APO: 111.16,
        ASTS: 24.11,
        AVAV: 86.79,
        BX: 110.80,
        CBRS: 85.51,
        CEG: 237.41,
        COIN: 102.30,
        CRCL: 48.95,
        CRWV: 40.95,
        GOOG: 268.50,
        HOOD: 64.20,
        HPE: 41.97,
        IBIT: 33.35,
        IBKR: 72.06,
        INTC: 53.03,
        IONQ: 21.59,
        IREN: 12.34,
        JBLU: 3.34,
        KKR: 88.54,
        KTOS: 27.78,
        MP: 34.29,
        MRNA: 199.30,
        MU: 610.60,
        NBIS: 84.53,
        NKE: 33.04,
        NOW: 88.82,
        NVDA: 130.01,
        NVO: 37.82,
        SNDK: 81.40,
        UBER: 64.41,
        USAR: 6.46,
        VST: 117.00,
        XE: 9.01,

    },

    // --- Open positions (38) ---
    positions: {
        longs: [
            { ticker: "BX", quantity: 1450, price: 110.80, pctNav: 20.80 },
            { ticker: "UBER", quantity: 2350, price: 64.41, pctNav: 19.60 },
            { ticker: "NVO", quantity: 3750, price: 37.82, pctNav: 18.36 },
            { ticker: "KKR", quantity: 1500, price: 88.54, pctNav: 17.20 },
            { ticker: "ADBE", quantity: 550, price: 217.71, pctNav: 15.50 },
            { ticker: "NKE", quantity: 3500, price: 33.04, pctNav: 14.97 },
            { ticker: "APO", quantity: 1000, price: 111.16, pctNav: 14.39 },
            { ticker: "GOOG", quantity: 400, price: 268.50, pctNav: 13.91 },
            { ticker: "HPE", quantity: 2500, price: 41.97, pctNav: 13.58 },
            { ticker: "NVDA", quantity: 800, price: 130.01, pctNav: 13.47 },
            { ticker: "NOW", quantity: 1100, price: 88.82, pctNav: 12.65 },
            { ticker: "CEG", quantity: 400, price: 237.41, pctNav: 12.30 },
            { ticker: "MU", quantity: 150, price: 610.60, pctNav: 11.86 },
            { ticker: "INTC", quantity: 1700, price: 53.03, pctNav: 11.67 },
            { ticker: "COIN", quantity: 850, price: 102.30, pctNav: 11.26 },
            { ticker: "HOOD", quantity: 1300, price: 64.20, pctNav: 10.81 },
            { ticker: "IBIT", quantity: 2500, price: 33.35, pctNav: 10.80 },
            { ticker: "ASTS", quantity: 3400, price: 24.11, pctNav: 10.61 },
            { ticker: "SNDK", quantity: 1000, price: 81.40, pctNav: 10.54 },
            { ticker: "IBKR", quantity: 1100, price: 72.06, pctNav: 10.26 },
            { ticker: "MP", quantity: 2300, price: 34.29, pctNav: 10.21 },
            { ticker: "CBRS", quantity: 900, price: 85.51, pctNav: 9.97 },
            { ticker: "KTOS", quantity: 2650, price: 27.78, pctNav: 9.53 },
            { ticker: "CRCL", quantity: 1500, price: 48.95, pctNav: 9.51 },
            { ticker: "IONQ", quantity: 3100, price: 21.59, pctNav: 8.67 },
            { ticker: "JBLU", quantity: 19158, price: 3.34, pctNav: 8.29 },
            { ticker: "CRWV", quantity: 1500, price: 40.95, pctNav: 7.95 },
            { ticker: "AVAV", quantity: 700, price: 86.79, pctNav: 7.87 },
            { ticker: "NBIS", quantity: 700, price: 84.53, pctNav: 7.66 },
            { ticker: "VST", quantity: 400, price: 117.00, pctNav: 6.06 },
            { ticker: "USAR", quantity: 7000, price: 6.46, pctNav: 5.86 },
            { ticker: "AAOI", quantity: 1250, price: 33.83, pctNav: 5.48 },
            { ticker: "IREN", quantity: 3000, price: 12.34, pctNav: 4.79 },
            { ticker: "XE", quantity: 4010, price: 9.01, pctNav: 4.68 },
        ],
        shorts: [
            { ticker: "MRNA", quantity: -700, price: 199.30, pctNav: 18.06 },
        ],
        options: [
            { ticker: "DELL", contract: "Dec 18 '26 · 320 Put", quantity: 1, price: 58.70, pctNav: 0.76 },
            { ticker: "CRWV", contract: "Mar 19 '27 · 70 Call", quantity: 20, price: 2.32, pctNav: 0.60 },
            { ticker: "DELL", contract: "Dec 18 '26 · 400 Put", quantity: -20, price: 125.54, pctNav: 32.51 },
        ],
    },
};
