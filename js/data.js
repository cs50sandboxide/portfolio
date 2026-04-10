/* ============================================
   Portfolio Data — All Realized + Open (Schwab + IBKR)
   Percentages only. No investment dollar values.
   Last updated: April 9, 2026
   ============================================ */

// --- All Realized Trades (chronological by exit date, per-brokerage) ---
const REALIZED_TRADES = [
    { ticker: "BLNK",  company: "Blink Charging Co.",          entryPrice: 14.83,  exitPrice: 20.09,  returnPct: 35.5,  entryDate: "2022-04-18", exitDate: "2022-07-28", source: "Schwab" },
    { ticker: "ICLN",  company: "iShares Global Clean Energy", entryPrice: 17.57,  exitPrice: 21.61,  returnPct: 23.0,  entryDate: "2022-04-18", exitDate: "2022-07-28", source: "Schwab" },
    { ticker: "FRSH",  company: "Freshworks Inc.",             entryPrice: 13.25,  exitPrice: 16.05,  returnPct: 21.1,  entryDate: "2022-06-10", exitDate: "2022-08-10", source: "Schwab" },
    { ticker: "RBLX",  company: "Roblox Corp.",                entryPrice: 36.67,  exitPrice: 44.63,  returnPct: 21.7,  entryDate: "2022-07-06", exitDate: "2022-09-09", source: "Schwab" },
    { ticker: "VOO",   company: "Vanguard S&P 500 ETF",       entryPrice: 341.10, exitPrice: 357.65, returnPct: 4.9,   entryDate: "2022-06-22", exitDate: "2022-11-10", source: "Schwab" },
    { ticker: "AMZN",  company: "Amazon.com Inc.",             entryPrice: 93.17,  exitPrice: 96.82,  returnPct: 3.9,   entryDate: "2022-11-10", exitDate: "2023-01-17", source: "Schwab" },
    { ticker: "CHPT",  company: "ChargePoint Holdings",       entryPrice: 12.29,  exitPrice: 13.36,  returnPct: 8.8,   entryDate: "2022-11-10", exitDate: "2023-01-17", source: "Schwab" },
    { ticker: "GOOG",  company: "Alphabet Inc.",               entryPrice: 91.21,  exitPrice: 97.42,  returnPct: 6.8,   entryDate: "2022-09-23", exitDate: "2023-01-20", source: "Schwab" },
    { ticker: "CRM",   company: "Salesforce Inc.",             entryPrice: 148.42, exitPrice: 154.25, returnPct: 3.9,   entryDate: "2022-12-15", exitDate: "2023-01-23", source: "Schwab" },
    { ticker: "ADBE",  company: "Adobe Inc.",                  entryPrice: 321.68, exitPrice: 342.35, returnPct: 6.4,   entryDate: "2023-01-05", exitDate: "2023-01-24", source: "Schwab" },
    { ticker: "F",     company: "Ford Motor Co.",              entryPrice: 13.47,  exitPrice: 13.93,  returnPct: 3.4,   entryDate: "2022-11-10", exitDate: "2023-02-02", source: "Schwab" },
    { ticker: "HYDR",  company: "Global X Hydrogen ETF",      entryPrice: 11.58,  exitPrice: 14.15,  returnPct: 22.2,  entryDate: "2022-06-10", exitDate: "2023-02-02", source: "Schwab" },
    { ticker: "QQQ",   company: "Invesco QQQ Trust",          entryPrice: 286.22, exitPrice: 287.85, returnPct: 0.6,   entryDate: "2023-03-10", exitDate: "2023-03-15", source: "Schwab" },
    { ticker: "BE",    company: "Bloom Energy Corp.",          entryPrice: 15.57,  exitPrice: 15.96,  returnPct: 2.5,   entryDate: "2023-05-22", exitDate: "2023-06-07", source: "Schwab" },
    { ticker: "BLDP",  company: "Ballard Power Systems",      entryPrice: 4.66,   exitPrice: 5.89,   returnPct: 26.4,  entryDate: "2022-04-28", exitDate: "2023-06-12", source: "Schwab" },
    { ticker: "RIVN",  company: "Rivian Automotive",           entryPrice: 23.16,  exitPrice: 25.31,  returnPct: 9.3,   entryDate: "2023-05-09", exitDate: "2023-07-07", source: "Schwab" },
    { ticker: "PLUG",  company: "Plug Power Inc.",             entryPrice: 10.01,  exitPrice: 10.75,  returnPct: 7.4,   entryDate: "2023-05-09", exitDate: "2023-07-14", source: "Schwab" },
    { ticker: "OKTA",  company: "Okta Inc.",                   entryPrice: 70.86,  exitPrice: 71.20,  returnPct: 0.5,   entryDate: "2023-07-20", exitDate: "2023-08-29", source: "Schwab" },
    { ticker: "AAL",   company: "American Airlines Group",     entryPrice: 13.13,  exitPrice: 14.64,  returnPct: 11.5,  entryDate: "2023-09-25", exitDate: "2023-12-15", source: "Schwab" },
    { ticker: "BWA",   company: "BorgWarner Inc.",             entryPrice: 34.28,  exitPrice: 37.66,  returnPct: 9.9,   entryDate: "2023-10-31", exitDate: "2024-03-27", source: "Schwab" },
    { ticker: "AZN",   company: "AstraZeneca PLC",            entryPrice: 66.88,  exitPrice: 78.64,  returnPct: 17.6,  entryDate: "2023-10-24", exitDate: "2024-05-22", source: "Schwab" },
    { ticker: "MU",    company: "Micron Technology",           entryPrice: 95.10,  exitPrice: 108.60, returnPct: 14.2,  entryDate: "2024-08-05", exitDate: "2024-09-26", source: "Schwab" },
    { ticker: "COST",  company: "Costco Wholesale Corp.",      entryPrice: 907.60, exitPrice: 986.02, returnPct: 8.6,   entryDate: "2024-11-15", exitDate: "2025-01-31", source: "Schwab" },
    { ticker: "IONQ",  company: "IonQ Inc.",                   entryPrice: 21.32,  exitPrice: 24.07,  returnPct: 12.9,  entryDate: "2025-04-03", exitDate: "2025-04-09", source: "Schwab" },
    { ticker: "NET",   company: "Cloudflare Inc.",             entryPrice: 107.42, exitPrice: 108.47, returnPct: 1.0,   entryDate: "2025-02-25", exitDate: "2025-04-09", source: "Schwab" },
    { ticker: "SHOP",  company: "Shopify Inc.",                entryPrice: 47.67,  exitPrice: 53.82,  returnPct: 12.9,  entryDate: "2025-01-31", exitDate: "2025-04-09", source: "Schwab" },
    { ticker: "NVDA",  company: "NVIDIA Corp.",                entryPrice: 127.97, exitPrice: 144.06, returnPct: 12.6,  entryDate: "2025-04-22", exitDate: "2025-06-06", source: "Schwab" },
    { ticker: "TSLA",  company: "Tesla Inc.",                  entryPrice: 253.24, exitPrice: 228.38, returnPct: -9.8,  entryDate: "2022-05-06", exitDate: "2025-06-23", source: "Schwab" },
    { ticker: "BTC",   company: "Grayscale Bitcoin Mini Trust",entryPrice: 34.02,  exitPrice: 51.40,  returnPct: 51.1,  entryDate: "2025-06-23", exitDate: "2025-08-22", source: "Schwab" },
    { ticker: "INTC",  company: "Intel Corp.",                 entryPrice: 22.65,  exitPrice: 26.71,  returnPct: 17.9,  entryDate: "2022-06-10", exitDate: "2025-08-22", source: "Schwab" },
    { ticker: "OSCR",  company: "Oscar Health Inc.",           entryPrice: 15.45,  exitPrice: 19.04,  returnPct: 23.3,  entryDate: "2025-08-15", exitDate: "2025-09-12", source: "Schwab" },
    { ticker: "RIVN",  company: "Rivian Automotive",           entryPrice: 13.12,  exitPrice: 14.89,  returnPct: 13.5,  entryDate: "2025-09-09", exitDate: "2025-09-18", source: "IBKR" },
    { ticker: "U",     company: "Unity Software Inc.",         entryPrice: 38.53,  exitPrice: 42.09,  returnPct: 9.2,   entryDate: "2025-09-09", exitDate: "2025-09-23", source: "Schwab" },
    { ticker: "F",     company: "Ford Motor Co.",              entryPrice: 11.35,  exitPrice: 12.19,  returnPct: 7.4,   entryDate: "2025-09-09", exitDate: "2025-09-30", source: "IBKR" },
    { ticker: "UNH",   company: "UnitedHealth Group",         entryPrice: 340.77, exitPrice: 343.96, returnPct: 0.9,   entryDate: "2025-09-16", exitDate: "2025-09-30", source: "IBKR" },
    { ticker: "AMD",   company: "Advanced Micro Devices",     entryPrice: 164.00, exitPrice: 209.06, returnPct: 27.5,  entryDate: "2025-08-29", exitDate: "2025-10-06", source: "IBKR" },
    { ticker: "RDW",   company: "Redwire Corp.",               entryPrice: 8.97,   exitPrice: 9.51,   returnPct: 6.0,   entryDate: "2025-10-03", exitDate: "2025-10-15", source: "IBKR" },
    { ticker: "QCOM",  company: "Qualcomm Inc.",               entryPrice: 168.45, exitPrice: 169.00, returnPct: 0.3,   entryDate: "2025-10-15", exitDate: "2025-10-23", source: "IBKR" },
    { ticker: "CRM",   company: "Salesforce Inc.",             entryPrice: 243.77, exitPrice: 256.60, returnPct: 5.3,   entryDate: "2025-10-22", exitDate: "2025-10-27", source: "IBKR" },
    { ticker: "MELI",  company: "MercadoLibre Inc.",           entryPrice: 2061.89,exitPrice: 2279.80,returnPct: 10.6,  entryDate: "2025-10-15", exitDate: "2025-10-27", source: "IBKR" },
    { ticker: "PINS",  company: "Pinterest Inc.",              entryPrice: 31.71,  exitPrice: 34.08,  returnPct: 7.5,   entryDate: "2025-10-28", exitDate: "2025-11-11", source: "IBKR" },
    { ticker: "GFS",   company: "GlobalFoundries Inc.",        entryPrice: 37.00,  exitPrice: 36.40,  returnPct: -1.6,  entryDate: "2025-11-11", exitDate: "2025-11-12", source: "IBKR" },
    { ticker: "GOOGL", company: "Alphabet Inc.",               entryPrice: 277.01, exitPrice: 298.26, returnPct: 7.7,   entryDate: "2025-10-29", exitDate: "2025-11-24", source: "IBKR" },
    { ticker: "OSCR",  company: "Oscar Health Inc.",           entryPrice: 15.33,  exitPrice: 17.51,  returnPct: 14.2,  entryDate: "2025-08-29", exitDate: "2025-11-24", source: "IBKR" },
    { ticker: "FISV",  company: "Fiserv Inc.",                 entryPrice: 65.75,  exitPrice: 69.00,  returnPct: 4.9,   entryDate: "2025-12-04", exitDate: "2025-12-22", source: "IBKR" },
    { ticker: "NVO",   company: "Novo Nordisk",                entryPrice: 49.54,  exitPrice: 52.35,  returnPct: 5.7,   entryDate: "2025-12-04", exitDate: "2025-12-23", source: "IBKR" },
    { ticker: "VG",    company: "Venture Global Inc.",         entryPrice: 6.98,   exitPrice: 7.86,   returnPct: 12.6,  entryDate: "2025-12-29", exitDate: "2026-01-13", source: "IBKR" },
    { ticker: "LW",    company: "Lamb Weston Holdings",       entryPrice: 43.33,  exitPrice: 50.48,  returnPct: 16.5,  entryDate: "2025-12-22", exitDate: "2026-02-13", source: "IBKR" },
    { ticker: "PLTR",  company: "Palantir Technologies",      entryPrice: 129.30, exitPrice: 132.91, returnPct: 2.8,   entryDate: "2026-02-12", exitDate: "2026-02-13", source: "IBKR" },
    { ticker: "AAPL",  company: "Apple Inc.",                  entryPrice: 260.48, exitPrice: 273.24, returnPct: 4.9,   entryDate: "2026-01-12", exitDate: "2026-02-25", source: "IBKR" },
    { ticker: "GE",    company: "General Electric",            entryPrice: 279.03, exitPrice: 293.59, returnPct: 5.2,   entryDate: "2026-03-31", exitDate: "2026-04-01", source: "IBKR" },
    { ticker: "INTC",  company: "Intel Corp.",                 entryPrice: 35.75,  exitPrice: 39.76,  returnPct: 11.2,  entryDate: "2025-10-14", exitDate: "2026-04-01", source: "IBKR" },
    { ticker: "JPM",   company: "JPMorgan Chase & Co.",        entryPrice: 289.50, exitPrice: 297.51, returnPct: 2.8,   entryDate: "2026-03-31", exitDate: "2026-04-01", source: "IBKR" },
    { ticker: "TSLA",  company: "Tesla Inc.",                  entryPrice: 384.32, exitPrice: 412.90, returnPct: 7.4,   entryDate: "2026-02-03", exitDate: "2026-04-01", source: "IBKR" },
    { ticker: "DT",    company: "Dynatrace Inc.",              entryPrice: 37.27,  exitPrice: 37.99,  returnPct: 1.9,   entryDate: "2026-04-06", exitDate: "2026-04-08", source: "IBKR" },
    { ticker: "GOOG",  company: "Alphabet Inc.",               entryPrice: 315.78, exitPrice: 316.41, returnPct: 0.2,   entryDate: "2025-12-04", exitDate: "2026-04-08", source: "IBKR" },
    { ticker: "PLUG",  company: "Plug Power Inc.",             entryPrice: 2.50,   exitPrice: 2.67,   returnPct: 7.0,   entryDate: "2026-04-07", exitDate: "2026-04-08", source: "IBKR" },
];

// --- Open Positions (current holdings) ---
const OPEN_POSITIONS = [
    { ticker: "BLDP",  company: "Ballard Power Systems",  entryPrice: 3.78,   entryDate: "2022-04-28", source: "Schwab + IBKR" },
    { ticker: "BX",    company: "Blackstone Inc.",         entryPrice: 114.00, entryDate: "2026-04-01", source: "IBKR" },
    { ticker: "COIN",  company: "Coinbase Global Inc.",    entryPrice: 174.63, entryDate: "2026-04-08", source: "IBKR" },
    { ticker: "GOOG",  company: "Alphabet Inc.",           entryPrice: 315.78, entryDate: "2025-12-04", source: "IBKR" },
    { ticker: "INTC",  company: "Intel Corp.",             entryPrice: 35.75,  entryDate: "2025-10-14", source: "IBKR" },
    { ticker: "IONQ",  company: "IonQ Inc.",               entryPrice: 62.20,  entryDate: "2025-10-14", source: "IBKR" },
    { ticker: "KKR",   company: "KKR & Co Inc.",           entryPrice: 92.53,  entryDate: "2026-04-01", source: "IBKR" },
    { ticker: "META",  company: "Meta Platforms Inc.",      entryPrice: 713.33, entryDate: "2025-10-29", source: "IBKR" },
    { ticker: "OSCR",  company: "Oscar Health Inc.",        entryPrice: 15.33,  entryDate: "2025-08-29", source: "IBKR" },
    { ticker: "TSLA",  company: "Tesla Inc.",               entryPrice: 384.32, entryDate: "2026-02-03", source: "IBKR" },
    { ticker: "UNH",   company: "UnitedHealth Group",      entryPrice: 353.28, entryDate: "2025-10-10", source: "Schwab" },
];

// --- Performance Stats ---
const PERF_STATS = {
    totalTrades: 57,
    wins: 55,
    losses: 2,
    winRate: "96.5%",
    avgReturn: 10.1,
    bestTrade: { ticker: "BTC", returnPct: 51.1 },
    openPositions: 11,
    activeSince: "April 2022",
};

// --- Watchlist ---
const WATCHLIST = [
    { ticker: "ARES", company: "Ares Management Corp.", currentPrice: 148.20, change: "+1.3%", changeDirection: "positive", signal: "Complementary alt-asset manager to BX/KKR thesis. Monitoring for pullback below $140.", status: "waiting", statusText: "Awaiting Entry" },
    { ticker: "APO", company: "Apollo Global Management", currentPrice: 112.80, change: "-0.6%", changeDirection: "negative", signal: "Third leg of alt-asset manager conviction trade. Target entry below $108.", status: "waiting", statusText: "Monitoring Catalyst" },
    { ticker: "NVDA", company: "NVIDIA Corp.", currentPrice: 482.30, change: "+2.4%", changeDirection: "positive", signal: "AI infrastructure capex cycle. Waiting for pullback to 50-day EMA. Target below $440.", status: "waiting", statusText: "Awaiting Pullback" },
    { ticker: "ASML", company: "ASML Holding NV", currentPrice: 684.50, change: "+3.2%", changeDirection: "positive", signal: "Semiconductor capex cycle. Watching EUV order book and China revenue guidance.", status: "waiting", statusText: "Pending Earnings" },
];

// --- Portfolio Growth (indexed to 100, monthly) ---
const GROWTH_DATA = {
    labels: ["May '22","Aug '22","Nov '22","Feb '23","May '23","Aug '23","Nov '23","Feb '24","May '24","Aug '24","Nov '24","Feb '25","May '25","Aug '25","Nov '25","Feb '26","Apr '26"],
    portfolio: [100, 97.1, 147.1, 158.6, 154.3, 221.4, 217.1, 231.4, 240.0, 245.7, 264.3, 300.0, 314.3, 335.7, 354.3, 371.4, 392.9],
    benchmark: [100, 95.0, 105.7, 114.3, 117.1, 125.7, 128.6, 145.7, 154.3, 162.9, 174.3, 182.9, 192.9, 200.0, 217.1, 225.7, 231.4],
};
