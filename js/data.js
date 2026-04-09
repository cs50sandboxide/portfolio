/* ============================================
   Portfolio Performance 2026 — IBKR Only
   No dollar values shown. Percentages and prices only.
   Last updated: April 9, 2026
   ============================================ */

// --- 2026 Trades (IBKR) ---
const TRADES_2026 = [
    {
        ticker: "INTC",
        company: "Intel Corp.",
        status: "closed",
        entryPrice: 43.11,
        exitPrice: 45.00,
        returnPct: 4.4,
        entryDate: "2026-03-27",
        exitDate: "2026-04-01",
        holdDays: 5,
        thesis: "Short-term swing on technical breakout above $43. Sold into strength at $45 resistance."
    },
    {
        ticker: "PLUG",
        company: "Plug Power Inc.",
        status: "closed",
        entryPrice: 2.50,
        exitPrice: 2.67,
        returnPct: 7.0,
        entryDate: "2026-04-07",
        exitDate: "2026-04-08",
        holdDays: 1,
        thesis: "Overnight momentum trade. Green hydrogen sentiment spike — entered at $2.50 and flipped next day at $2.67."
    },
    {
        ticker: "TSLA",
        company: "Tesla Inc.",
        status: "partial",
        entryPrice: 384.32,
        exitPrice: 412.90,
        returnPct: 7.4,
        entryDate: "2026-02-03",
        exitDate: "2026-04-01",
        holdDays: 57,
        sharesRemaining: 100,
        currentPrice: 343.48,
        thesis: "Scaled into position across Feb. Took profit on 200 shares at +7.4%. Holding remaining 100 shares — re-entered at $343.48 on Apr 8 dip."
    },
    {
        ticker: "GE",
        company: "General Electric",
        status: "closed",
        entryPrice: 279.03,
        exitPrice: 293.59,
        returnPct: 5.2,
        entryDate: "2026-03-31",
        exitDate: "2026-04-01",
        holdDays: 1,
        thesis: "Overnight swing trade on GE Vernova separation catalyst. Quick +5.2% return."
    },
    {
        ticker: "COIN",
        company: "Coinbase Global Inc.",
        status: "open",
        entryPrice: 174.64,
        currentPrice: 174.64,
        entryDate: "2026-04-08",
        thesis: "Crypto infrastructure play. Entered on Bitcoin pullback — positioned for regulatory clarity catalyst."
    },
    {
        ticker: "JPM",
        company: "JPMorgan Chase & Co.",
        status: "closed",
        entryPrice: 289.50,
        exitPrice: 297.51,
        returnPct: 2.8,
        entryDate: "2026-03-31",
        exitDate: "2026-04-01",
        holdDays: 1,
        thesis: "Quick swing on quarter-end rebalancing momentum. Exited next day for +2.8%."
    },
    {
        ticker: "KKR",
        company: "KKR & Co Inc.",
        status: "open",
        entryPrice: 92.53,
        currentPrice: 92.53,
        entryDate: "2026-04-01",
        thesis: "Alternative asset management conviction trade. Beneficiary of private credit expansion and infrastructure cycle."
    },
    {
        ticker: "BX",
        company: "Blackstone Inc.",
        status: "open",
        entryPrice: 114.00,
        currentPrice: 109.37,
        entryDate: "2026-04-01",
        thesis: "Largest alt-asset manager globally. Scaling into position across multiple entries. Positioned for AUM growth."
    },
    {
        ticker: "DT",
        company: "Dynatrace Inc.",
        status: "closed",
        entryPrice: 37.27,
        exitPrice: 37.99,
        returnPct: 1.9,
        entryDate: "2026-04-06",
        exitDate: "2026-04-08",
        holdDays: 2,
        thesis: "Quick trade on AI-powered observability momentum. Modest +1.9% return in 2 days."
    },
];

// --- 2026 Performance Stats ---
const PERF_STATS_2026 = {
    closedTrades: 6,
    winRate: "100%",
    wins: 6,
    losses: 0,
    avgReturn: 4.8,
    bestTrade: { ticker: "TSLA", returnPct: 7.4 },
    avgHoldDays: 11,
    openPositions: 4,
    activeSince: "January 2026",
};

// --- Watchlist ---
const WATCHLIST = [
    { ticker: "ARES", company: "Ares Management Corp.", currentPrice: 148.20, change: "+1.3%", changeDirection: "positive", signal: "Complementary alternative asset manager to BX/KKR thesis. Monitoring for pullback below $140.", status: "waiting", statusText: "Awaiting Entry" },
    { ticker: "APO", company: "Apollo Global Management", currentPrice: 112.80, change: "-0.6%", changeDirection: "negative", signal: "Third leg of alt-asset manager conviction trade. Target entry below $108.", status: "waiting", statusText: "Monitoring Catalyst" },
    { ticker: "NVDA", company: "NVIDIA Corp.", currentPrice: 482.30, change: "+2.4%", changeDirection: "positive", signal: "AI infrastructure capex cycle. Waiting for pullback to 50-day EMA. Target entry below $440.", status: "waiting", statusText: "Awaiting Pullback" },
    { ticker: "ASML", company: "ASML Holding NV", currentPrice: 684.50, change: "+3.2%", changeDirection: "positive", signal: "Semiconductor capex cycle. Watching EUV order book and China revenue guidance.", status: "waiting", statusText: "Pending Earnings" },
];

// --- Portfolio Growth (simplified monthly) ---
const GROWTH_DATA = {
    labels: ["Jan '26", "Feb '26", "Mar '26", "Apr '26"],
    portfolio: [100, 106.2, 109.8, 114.5],
    benchmark: [100, 97.1, 99.3, 101.8],
};
