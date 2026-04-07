/* ============================================
   Portfolio Data — Aggregated from Schwab + IBKR
   Sensitive data removed. No account IDs or wire details.
   Last updated: April 7, 2026
   ============================================ */

// --- Current Open Positions (combined across brokerages) ---
const POSITIONS = [
    { ticker: "MSFT",  company: "Microsoft Corp.",           sector: "Technology",           shares: 600,   avgCost: 492.98, currentPrice: 492.98, thesis: "Core long-term holding. Cloud (Azure) growth and AI integration via Copilot across enterprise products. Largest position by cost basis." },
    { ticker: "OSCR",  company: "Oscar Health Inc.",          sector: "Healthcare",           shares: 12000, avgCost: 15.34,  currentPrice: 15.34,  thesis: "Health insurance disruptor thesis. High share count position reflecting conviction in membership growth and path to profitability." },
    { ticker: "MELI",  company: "MercadoLibre Inc.",          sector: "Consumer Discretionary", shares: 60, avgCost: 2061.95, currentPrice: 2061.95, thesis: "Dominant Latin American e-commerce and fintech platform. Beneficiary of digital payments adoption and credit penetration across the region." },
    { ticker: "META",  company: "Meta Platforms Inc.",        sector: "Technology",           shares: 130,   avgCost: 713.35, currentPrice: 713.35, thesis: "Monetisation of Reels, WhatsApp Business, and AI-driven ad targeting improvements. Strong FCF generation." },
    { ticker: "GOOG",  company: "Alphabet Inc.",              sector: "Technology",           shares: 300,   avgCost: 253.16, currentPrice: 253.16, thesis: "Search dominance, YouTube monetisation, and Cloud growth. AI integration across product suite via Gemini." },
    { ticker: "IONQ",  company: "IonQ Inc.",                  sector: "Technology",           shares: 1400,  avgCost: 43.64,  currentPrice: 43.64,  thesis: "Quantum computing pure play. Government contracts and enterprise partnerships. High-conviction speculative position." },
    { ticker: "BLDP",  company: "Ballard Power Systems",     sector: "Industrials",          shares: 12000, avgCost: 4.19,   currentPrice: 4.19,   thesis: "Hydrogen fuel cell technology for heavy-duty mobility. Long-term energy transition thesis — accumulated over 4 years." },
    { ticker: "CRMD",  company: "CorMedix Inc.",              sector: "Healthcare",           shares: 3000,  avgCost: 13.13,  currentPrice: 13.13,  thesis: "DefenCath FDA approval catalyst. Targeting catheter-related bloodstream infections market with significant unmet need." },
    { ticker: "RIVN",  company: "Rivian Automotive Inc.",     sector: "Consumer Discretionary", shares: 1400, avgCost: 18.65, currentPrice: 18.65, thesis: "EV manufacturer with Amazon delivery van partnership. Watching for production ramp and margin improvement trajectory." },
    { ticker: "PLUG",  company: "Plug Power Inc.",            sector: "Industrials",          shares: 3200,  avgCost: 10.01,  currentPrice: 10.01,  thesis: "Green hydrogen ecosystem play. Electrolyser and fuel cell deployments. High-risk position accumulated at lower levels." },
    { ticker: "BX",    company: "Blackstone Inc.",            sector: "Financials",           shares: 215,   avgCost: 114.01, currentPrice: 109.37, thesis: "Largest alternative asset manager globally. Positioned for AUM growth as institutional allocators shift toward private markets." },
    { ticker: "UNH",   company: "UnitedHealth Group",        sector: "Healthcare",           shares: 60,    avgCost: 344.35, currentPrice: 344.35, thesis: "Managed care and Optum health services vertical integration. Defensive quality holding." },
    { ticker: "KKR",   company: "KKR & Co Inc.",              sector: "Financials",           shares: 165,   avgCost: 92.54,  currentPrice: 92.50,  thesis: "Alternative asset management with strong fundraising. Beneficiary of private credit expansion and infrastructure cycle." },
    { ticker: "FIG",   company: "Figma Inc.",                 sector: "Technology",           shares: 300,   avgCost: 49.36,  currentPrice: 49.36,  thesis: "Collaborative design platform. Post-Adobe acquisition fallout created entry opportunity. Product-led growth in enterprise design tools." },
    { ticker: "DT",    company: "Dynatrace Inc.",             sector: "Technology",           shares: 400,   avgCost: 37.27,  currentPrice: 37.27,  thesis: "AI-powered observability platform. Beneficiary of cloud complexity and enterprise monitoring needs." },
];

// --- Realized P&L (All Closed Positions — both brokerages) ---
const CLOSED_TRADES = [
    { ticker: "LW",   company: "Lamb Weston Holdings",     pnl: 7139.81,  returnPct: 16.5, dividends: 380.00 },
    { ticker: "VG",   company: "Venture Global Inc.",       pnl: 7014.96,  returnPct: 12.6, dividends: 0 },
    { ticker: "AMD",  company: "Advanced Micro Devices",    pnl: 4503.98,  returnPct: 27.5, dividends: 0 },
    { ticker: "SHOP", company: "Shopify Inc.",              pnl: 3995.84,  returnPct: 12.9, dividends: 0 },
    { ticker: "NVO",  company: "Novo Nordisk",              pnl: 3914.58,  returnPct: 5.6,  dividends: 0 },
    { ticker: "AAL",  company: "American Airlines Group",   pnl: 3063.25,  returnPct: 11.5, dividends: 0 },
    { ticker: "CRM",  company: "Salesforce Inc.",           pnl: 2972.44,  returnPct: 5.0,  dividends: 0 },
    { ticker: "U",    company: "Unity Software Inc.",       pnl: 2591.61,  returnPct: 9.2,  dividends: 0 },
    { ticker: "PINS", company: "Pinterest Inc.",            pnl: 2377.79,  returnPct: 7.4,  dividends: 0 },
    { ticker: "FISV", company: "Fiserv Inc.",               pnl: 2267.88,  returnPct: 4.9,  dividends: 0 },
    { ticker: "F",    company: "Ford Motor Co.",            pnl: 1891.74,  returnPct: 6.4,  dividends: 0 },
    { ticker: "CHPT", company: "ChargePoint Holdings",     pnl: 1609.37,  returnPct: 8.8,  dividends: 0 },
    { ticker: "ADBE", company: "Adobe Inc.",                pnl: 1590.95,  returnPct: 6.4,  dividends: 0 },
    { ticker: "MU",   company: "Micron Technology",         pnl: 1349.68,  returnPct: 14.2, dividends: 0 },
    { ticker: "AAPL", company: "Apple Inc.",                pnl: 1273.48,  returnPct: 4.9,  dividends: 26.00 },
    { ticker: "AZN",  company: "AstraZeneca PLC",           pnl: 1176.26,  returnPct: 17.6, dividends: 98.50 },
    { ticker: "NVDA", company: "NVIDIA Corp.",              pnl: 1126.53,  returnPct: 12.6, dividends: 0.80 },
    { ticker: "RDW",  company: "Redwire Corp.",             pnl: 1063.44,  returnPct: 5.9,  dividends: 0 },
    { ticker: "AMZN", company: "Amazon.com Inc.",           pnl: 520.94,   returnPct: 3.9,  dividends: 0 },
    { ticker: "GE",   company: "General Electric",          pnl: 507.59,   returnPct: 5.2,  dividends: 0 },
    { ticker: "PLTR", company: "Palantir Technologies",     pnl: 358.98,   returnPct: 2.8,  dividends: 0 },
    { ticker: "BE",   company: "Bloom Energy Corp.",        pnl: 252.90,   returnPct: 2.5,  dividends: 0 },
    { ticker: "JPM",  company: "JPMorgan Chase & Co.",      pnl: 238.29,   returnPct: 2.7,  dividends: 0 },
    { ticker: "RBLX", company: "Roblox Corp.",              pnl: 159.10,   returnPct: 21.7, dividends: 0 },
    { ticker: "VOO",  company: "Vanguard S&P 500 ETF",     pnl: 165.42,   returnPct: 4.8,  dividends: 5.80 },
    { ticker: "NET",  company: "Cloudflare Inc.",           pnl: 104.68,   returnPct: 1.0,  dividends: 0 },
    { ticker: "OKTA", company: "Okta Inc.",                 pnl: 65.62,    returnPct: 0.5,  dividends: 0 },
    { ticker: "QCOM", company: "Qualcomm Inc.",             pnl: 52.98,    returnPct: 0.3,  dividends: 0 },
    { ticker: "QQQ",  company: "Invesco QQQ Trust",         pnl: 51.43,    returnPct: 0.7,  dividends: 0 },
    { ticker: "BTC",  company: "Grayscale Bitcoin Mini Trust", pnl: 17.38, returnPct: 51.1, dividends: 0 },
    // Losses
    { ticker: "GFS",  company: "GlobalFoundries Inc.",      pnl: -610.21,  returnPct: -1.6, dividends: 0 },
    { ticker: "COST", company: "Costco Wholesale Corp.",    pnl: -1582.51, returnPct: -17.4, dividends: 11.60 },
];

// --- Portfolio Summary Stats ---
const PORTFOLIO_STATS = {
    totalRealizedPnl: 51226.18,
    totalDividends: 2008.95,
    totalOpenCostBasis: 1071953,
    closedWins: 30,
    closedLosses: 2,
    winRate: "93.8%",
    totalPositionsClosed: 32,
    openPositions: 15,
    activeSince: "April 2022",
};

// --- Dividend Income Breakdown ---
const DIVIDENDS = [
    { ticker: "MSFT",  amount: 728.00,  source: "IBKR" },
    { ticker: "LW",    amount: 380.00,  source: "IBKR" },
    { ticker: "UNH",   amount: 265.20,  source: "Schwab + IBKR" },
    { ticker: "META",  amount: 157.50,  source: "IBKR" },
    { ticker: "GOOG",  amount: 105.00,  source: "IBKR" },
    { ticker: "AZN",   amount: 98.50,   source: "Schwab" },
    { ticker: "INTC",  amount: 112.17,  source: "Schwab" },
    { ticker: "AAPL",  amount: 26.00,   source: "IBKR" },
    { ticker: "COST",  amount: 11.60,   source: "Schwab" },
    { ticker: "BWA",   amount: 61.80,   source: "Schwab" },
    { ticker: "VOOG",  amount: 22.68,   source: "Schwab" },
    { ticker: "ICLN",  amount: 14.03,   source: "Schwab" },
    { ticker: "VOO",   amount: 5.80,    source: "Schwab" },
    { ticker: "NVDA",  amount: 0.80,    source: "Schwab + IBKR" },
];

// --- Watchlist ---
const WATCHLIST = [
    { ticker: "ARES", company: "Ares Management Corp.", currentPrice: 148.20, change: "+1.3%", changeDirection: "positive", signal: "Complementary alternative asset manager to BX/KKR thesis. Monitoring for pullback below $140. Strong direct lending and real estate credit growth.", status: "waiting", statusText: "Awaiting Entry" },
    { ticker: "APO", company: "Apollo Global Management", currentPrice: 112.80, change: "-0.6%", changeDirection: "negative", signal: "Third leg of alt-asset manager conviction trade. Waiting for Athene integration clarity. Target entry below $108.", status: "waiting", statusText: "Monitoring Catalyst" },
    { ticker: "NVDA", company: "NVIDIA Corp.", currentPrice: 482.30, change: "+2.4%", changeDirection: "positive", signal: "AI infrastructure capex cycle is secular. Waiting for pullback to 50-day EMA. Valuations stretched at current levels — target entry below $440.", status: "waiting", statusText: "Awaiting Pullback" },
    { ticker: "ASML", company: "ASML Holding NV", currentPrice: 684.50, change: "+3.2%", changeDirection: "positive", signal: "Semiconductor capex cycle thesis. Watching EUV order book and China revenue guidance. Willing to pay up for quality.", status: "waiting", statusText: "Pending Earnings" },
    { ticker: "INTC", company: "Intel Corp.", currentPrice: 45.00, change: "+0.8%", changeDirection: "positive", signal: "Previously traded profitably 3 times. Watching for breakout above $47 or pullback to $41 for re-entry.", status: "waiting", statusText: "Re-Entry Watch" },
    { ticker: "TSLA", company: "Tesla Inc.", currentPrice: 381.50, change: "+1.2%", changeDirection: "positive", signal: "Profitable exits across both brokerages. Monitoring for Robotaxi updates or margin expansion. Re-enter below $340.", status: "waiting", statusText: "Re-Entry Watch" },
];

// --- Portfolio Growth (simplified monthly) ---
const GROWTH_DATA = {
    labels: ["May '22", "Aug '22", "Nov '22", "Feb '23", "May '23", "Aug '23", "Nov '23", "Feb '24", "May '24", "Aug '24", "Nov '24", "Feb '25", "May '25", "Aug '25", "Nov '25", "Feb '26", "Apr '26"],
    portfolio: [70000, 68000, 103000, 111000, 108000, 155000, 152000, 162000, 168000, 172000, 185000, 210000, 220000, 235000, 248000, 260000, 275000],
    benchmark: [70000, 66500, 74000, 80000, 82000, 88000, 90000, 102000, 108000, 114000, 122000, 128000, 135000, 140000, 152000, 158000, 162000],
};
