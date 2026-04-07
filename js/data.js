/* ============================================
   Portfolio Data — Real trades from IBKR
   Last updated: April 2026
   ============================================ */

// --- Current Open Positions ---
const POSITIONS = [
    {
        ticker: "BX",
        company: "Blackstone Inc.",
        sector: "Financials",
        shares: 215,
        avgCost: 114.00,
        currentPrice: 109.37,
        thesis: "Largest alternative asset manager globally. Positioned for AUM growth as institutional allocators shift toward private markets. Entry during broad market weakness.",
    },
    {
        ticker: "KKR",
        company: "KKR & Co Inc.",
        sector: "Financials",
        shares: 165,
        avgCost: 92.53,
        currentPrice: 92.50,
        thesis: "Alternative asset management with strong fundraising momentum. Beneficiary of private credit expansion and infrastructure spending cycle.",
    },
];

// --- Closed Trades (Recent) ---
const CLOSED_TRADES = [
    {
        ticker: "INTC",
        company: "Intel Corp.",
        sector: "Technology",
        sharesBought: 250,
        avgBuy: 43.11,
        avgSell: 45.00,
        buyDate: "Mar 27, 2026",
        sellDate: "Apr 1, 2026",
        grossPnl: 472.50,
        returnPct: 4.4,
        holdingDays: 5,
        thesis: "Short-term mean reversion trade on oversold bounce. Entered on technical support with macro catalyst (chip policy news).",
    },
    {
        ticker: "TSLA",
        company: "Tesla Inc.",
        sector: "Consumer Discretionary",
        sharesBought: 40,
        avgBuy: 359.99,
        avgSell: 381.50,
        buyDate: "Mar 27, 2026",
        sellDate: "Apr 1, 2026",
        grossPnl: 860.40,
        returnPct: 5.97,
        holdingDays: 5,
        thesis: "Swing trade on delivery numbers anticipation. Bought pre-announcement dip, sold into strength after positive deliveries data.",
    },
    {
        ticker: "GE",
        company: "General Electric",
        sector: "Industrials",
        sharesBought: 35,
        avgBuy: 279.03,
        avgSell: 293.59,
        buyDate: "Mar 31, 2026",
        sellDate: "Apr 1, 2026",
        grossPnl: 509.60,
        returnPct: 5.22,
        holdingDays: 1,
        thesis: "Overnight catalyst trade on GE Aerospace backlog data. Quick entry and exit on confirmed positive print.",
    },
    {
        ticker: "JPM",
        company: "JPMorgan Chase & Co.",
        sector: "Financials",
        sharesBought: 30,
        avgBuy: 289.50,
        avgSell: 297.51,
        buyDate: "Mar 31, 2026",
        sellDate: "Apr 1, 2026",
        grossPnl: 240.30,
        returnPct: 2.77,
        holdingDays: 1,
        thesis: "Pre-earnings positioning on rate environment tailwind thesis. Took profits ahead of quarterly report to de-risk.",
    },
];

// --- Transaction Log (All trades chronologically) ---
const TRADE_LOG = [
    { date: "Mar 27", ticker: "INTC", action: "Buy", shares: 250, price: 43.11, value: -10777.84 },
    { date: "Mar 27", ticker: "TSLA", action: "Buy", shares: 40, price: 359.99, value: -14399.40 },
    { date: "Mar 31", ticker: "GE", action: "Buy", shares: 35, price: 279.03, value: -9766.05 },
    { date: "Mar 31", ticker: "JPM", action: "Buy", shares: 30, price: 289.50, value: -8685.00 },
    { date: "Apr 1", ticker: "INTC", action: "Sell", shares: 250, price: 45.00, value: 11250.00 },
    { date: "Apr 1", ticker: "TSLA", action: "Sell", shares: 40, price: 381.50, value: 15260.00 },
    { date: "Apr 1", ticker: "GE", action: "Sell", shares: 35, price: 293.59, value: 10275.65 },
    { date: "Apr 1", ticker: "JPM", action: "Sell", shares: 30, price: 297.51, value: 8925.30 },
    { date: "Apr 1", ticker: "KKR", action: "Buy", shares: 165, price: 92.53, value: -15267.70 },
    { date: "Apr 1", ticker: "BX", action: "Buy", shares: 155, price: 115.80, value: -17947.93 },
    { date: "Apr 2", ticker: "BX", action: "Buy", shares: 60, price: 109.37, value: -6562.20 },
];

// --- Watchlist & Signals ---
const WATCHLIST = [
    {
        ticker: "ARES",
        company: "Ares Management Corp.",
        currentPrice: 148.20,
        change: "+1.3%",
        changeDirection: "positive",
        signal: "Complementary alternative asset manager to BX/KKR thesis. Monitoring for pullback below $140 as entry. Strong direct lending and real estate credit growth.",
        status: "waiting",
        statusText: "Awaiting Entry",
    },
    {
        ticker: "APO",
        company: "Apollo Global Management",
        currentPrice: 112.80,
        change: "-0.6%",
        changeDirection: "negative",
        signal: "Third leg of alt-asset manager conviction trade. Waiting for resolution of Athene integration concerns. Target entry below $108 on any negative headline overreaction.",
        status: "waiting",
        statusText: "Monitoring Catalyst",
    },
    {
        ticker: "NVDA",
        company: "NVIDIA Corp.",
        currentPrice: 482.30,
        change: "+2.4%",
        changeDirection: "positive",
        signal: "Waiting for pullback to 50-day EMA. AI infrastructure capex cycle is secular, but valuations stretched at current levels. Looking for a risk-off entry below $440.",
        status: "waiting",
        statusText: "Awaiting Pullback",
    },
    {
        ticker: "ASML",
        company: "ASML Holding NV",
        currentPrice: 684.50,
        change: "+3.2%",
        changeDirection: "positive",
        signal: "Semiconductor capex cycle thesis. Watching for EUV order book confirmation and China revenue guidance clarity in next earnings. Willing to pay up for quality.",
        status: "waiting",
        statusText: "Pending Earnings",
    },
    {
        ticker: "INTC",
        company: "Intel Corp.",
        currentPrice: 45.00,
        change: "+0.8%",
        changeDirection: "positive",
        signal: "Re-entry candidate after successful swing trade. Watching for breakout above $47 with volume confirmation, or pullback to $41 support for mean reversion setup.",
        status: "waiting",
        statusText: "Re-Entry Watch",
    },
    {
        ticker: "TSLA",
        company: "Tesla Inc.",
        currentPrice: 381.50,
        change: "+1.2%",
        changeDirection: "positive",
        signal: "Profitable exit in March. Monitoring for next catalyst: Robotaxi updates, energy storage growth, or margin expansion signal. Would re-enter below $340 on dip.",
        status: "waiting",
        statusText: "Re-Entry Watch",
    },
];

// --- Portfolio Performance Data ---
const GROWTH_DATA = {
    labels: [
        "Mar 27", "Mar 28", "Mar 31", "Apr 1", "Apr 2", "Apr 3", "Apr 4", "Apr 5", "Apr 6",
    ],
    portfolio: [
        250000, 250800, 253200, 255082, 254520, 254900, 255300, 255100, 255400,
    ],
    benchmark: [
        250000, 250200, 251100, 252300, 251800, 252100, 252500, 252200, 252600,
    ],
};

// --- Aggregate Stats ---
const PORTFOLIO_STATS = {
    totalValue: 255400,
    openPositionValue: 24510 + 15262,  // BX + KKR approximate
    cashBalance: 215628,
    recentRealizedPnl: 2082.80,  // Sum of closed trade P&L
    totalGain: 80000,
    tradingWinRate: "4/4",
    avgHoldingDays: 3,
};
