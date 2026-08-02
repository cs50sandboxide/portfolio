/* ============================================
   FUND DATA — Live snapshot from Interactive Brokers
   ============================================
   AUTO-GENERATED. Do not hand-edit.
   Regenerated weekly (Fridays after US market close)
   by the routine described in AUTOUPDATE.md.

   Source: IBKR account summary, balances, positions,
           and performance endpoints + SPY daily closes.
   ============================================ */

const FUND_DATA = {
    // --- Snapshot metadata ---
    asOf: "2026-08-02",
    ibkrLastUpdate: "2026-08-02 11:28:44",

    // --- Headline figures ---
    portfolioValue: 994975.73,   // net liquidation value
    cash: 245624.50,
    grossExposure: 2498810.75,   // long + short notional
    leverage: 2.51,

    // --- Performance (time-weighted return, per IBKR) ---
    // The account's performance history begins at inception below;
    // there is no calendar-YTD figure available before that date.
    inceptionDate: "2026-04-24",
    returnSinceInception: 44.12,

    mtdReturn: 90.10,
    mtdWindow: "30 Jun – 2 Aug 2026",

    // --- Benchmark: SPDR S&P 500 ETF (SPY) daily closes ---
    benchmark: {
        name: "S&P 500",
        proxy: "SPY",
        sinceInception: 4.64,    // 24 Apr close 713.94 -> 747.03
        calendarYtd: 9.55,       // 31 Dec close 681.92 -> 747.03
    },

    // --- Open positions (34) ---
    positions: {
        longs: [
            { ticker: "CEG",  quantity: 600,  price: 264.00,  value: 158400.00 },
            { ticker: "DT",   quantity: 3000, price: 44.32,   value: 132960.00 },
            { ticker: "META", quantity: 200,  price: 553.80,  value: 110760.00 },
            { ticker: "UBER", quantity: 1550, price: 70.45,   value: 109197.50 },
            { ticker: "PLTR", quantity: 850,  price: 122.77,  value: 104354.50 },
            { ticker: "HOOD", quantity: 1100, price: 86.23,   value: 94853.00  },
            { ticker: "CRM",  quantity: 500,  price: 183.38,  value: 91690.00  },
            { ticker: "CRCL", quantity: 1450, price: 61.59,   value: 89305.50  },
            { ticker: "IBIT", quantity: 2200, price: 35.59,   value: 78291.18  },
            { ticker: "WMT",  quantity: 700,  price: 111.33,  value: 77927.50  },
            { ticker: "MXL",  quantity: 1150, price: 66.06,   value: 75969.00  },
            { ticker: "USAR", quantity: 5000, price: 14.92,   value: 74600.00  },
            { ticker: "COIN", quantity: 500,  price: 146.26,  value: 73130.00  },
            { ticker: "COST", quantity: 75,   price: 951.88,  value: 71391.00  },
            { ticker: "NOW",  quantity: 600,  price: 111.23,  value: 66738.00  },
            { ticker: "XE",   quantity: 4010, price: 16.31,   value: 65403.10  },
            { ticker: "ASTS", quantity: 1050, price: 58.35,   value: 61267.50  },
            { ticker: "IONQ", quantity: 1600, price: 36.44,   value: 58304.00  },
        ],
        shorts: [
            { ticker: "NBIS", quantity: -725,  price: 186.70,  value: -135357.50 },
            { ticker: "BE",   quantity: -550,  price: 201.50,  value: -110825.00 },
            { ticker: "CIFR", quantity: -4500, price: 22.18,   value: -99810.00  },
            { ticker: "SNDK", quantity: -80,   price: 1205.00, value: -96400.00  },
            { ticker: "ADBE", quantity: -350,  price: 250.00,  value: -87500.00  },
            { ticker: "DELL", quantity: -200,  price: 402.20,  value: -80440.00  },
            { ticker: "COHR", quantity: -300,  price: 262.89,  value: -78867.00  },
            { ticker: "DOCN", quantity: -600,  price: 117.50,  value: -70500.00  },
            { ticker: "CBRS", quantity: -350,  price: 198.71,  value: -69548.50  },
        ],
        options: [
            { ticker: "MU",   contract: "Dec 18 '26 · 850 Put",  quantity: 1,   price: 179.16, value: 17916.20  },
            { ticker: "SPCE", contract: "Oct 16 '26 · 3 Put",    quantity: 100, price: 0.76,   value: 7606.32   },
            { ticker: "DELL", contract: "Dec 18 '26 · 320 Put",  quantity: 1,   price: 39.01,  value: 3900.96   },
            { ticker: "ARM",  contract: "Aug 21 '26 · 180 Put",  quantity: 5,   price: 2.43,   value: 1215.58   },
            { ticker: "DELL", contract: "Sep 18 '26 · 510 Call", quantity: -1,  price: 20.94,  value: -2094.26  },
            { ticker: "XE",   contract: "Oct 16 '26 · 20 Put",   quantity: -30, price: 5.44,   value: -16316.16 },
            { ticker: "XE",   contract: "Oct 16 '26 · 30 Put",   quantity: -20, price: 14.09,  value: -28179.40 },
        ],
    },
};
