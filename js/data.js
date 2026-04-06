/* ============================================
   Portfolio Data — Sample positions & watchlist
   Replace with real data when ready
   ============================================ */

const POSITIONS = [
    {
        ticker: "AAPL",
        company: "Apple Inc.",
        sector: "Technology",
        shares: 150,
        avgCost: 142.30,
        currentPrice: 178.50,
    },
    {
        ticker: "MSFT",
        company: "Microsoft Corp.",
        sector: "Technology",
        shares: 80,
        avgCost: 285.60,
        currentPrice: 338.20,
    },
    {
        ticker: "JPM",
        company: "JPMorgan Chase & Co.",
        sector: "Financials",
        shares: 120,
        avgCost: 138.90,
        currentPrice: 162.40,
    },
    {
        ticker: "UNH",
        company: "UnitedHealth Group",
        sector: "Healthcare",
        shares: 30,
        avgCost: 472.15,
        currentPrice: 528.30,
    },
    {
        ticker: "V",
        company: "Visa Inc.",
        sector: "Financials",
        shares: 60,
        avgCost: 228.40,
        currentPrice: 264.80,
    },
    {
        ticker: "AMZN",
        company: "Amazon.com Inc.",
        sector: "Consumer Discretionary",
        shares: 100,
        avgCost: 128.50,
        currentPrice: 152.70,
    },
    {
        ticker: "LLY",
        company: "Eli Lilly and Co.",
        sector: "Healthcare",
        shares: 25,
        avgCost: 520.00,
        currentPrice: 612.40,
    },
    {
        ticker: "BRK.B",
        company: "Berkshire Hathaway",
        sector: "Financials",
        shares: 45,
        avgCost: 342.80,
        currentPrice: 378.60,
    },
];

const WATCHLIST = [
    {
        ticker: "NVDA",
        company: "NVIDIA Corp.",
        currentPrice: 482.30,
        change: "+2.4%",
        changeDirection: "positive",
        signal: "Waiting for a pullback to the 50-day EMA (~$440) with RSI below 45. Looking for confirmation of support at the prior breakout level before initiating a position.",
        status: "waiting",
        statusText: "Awaiting Signal",
    },
    {
        ticker: "COST",
        company: "Costco Wholesale",
        currentPrice: 568.20,
        change: "-0.8%",
        changeDirection: "negative",
        signal: "Monitoring for earnings beat catalyst with same-store sales acceleration. Entry target below $550 on any broad market weakness with intact fundamentals.",
        status: "waiting",
        statusText: "Awaiting Entry",
    },
    {
        ticker: "MA",
        company: "Mastercard Inc.",
        currentPrice: 412.60,
        change: "+1.1%",
        changeDirection: "positive",
        signal: "Cross-border volume recovery thesis. Waiting for quarterly data confirming sustained travel spend growth above pre-pandemic levels. Target entry on consolidation near $400.",
        status: "waiting",
        statusText: "Monitoring Catalyst",
    },
    {
        ticker: "ASML",
        company: "ASML Holding NV",
        currentPrice: 684.50,
        change: "+3.2%",
        changeDirection: "positive",
        signal: "Semiconductor capex cycle thesis. Watching for EUV order book confirmation and China revenue guidance in next earnings call. Willing to pay up for quality if thesis confirmed.",
        status: "waiting",
        statusText: "Pending Earnings",
    },
    {
        ticker: "PANW",
        company: "Palo Alto Networks",
        currentPrice: 298.40,
        change: "-1.5%",
        changeDirection: "negative",
        signal: "Platformization strategy showing billings inflection. Waiting for next-gen security ARR to exceed $3B run rate as entry signal. Prefer buying on negative sentiment around billings transition.",
        status: "waiting",
        statusText: "Tracking Metrics",
    },
    {
        ticker: "TSM",
        company: "Taiwan Semiconductor",
        currentPrice: 108.90,
        change: "+0.6%",
        changeDirection: "positive",
        signal: "Leading-edge node demand from AI accelerators. Monitoring geopolitical risk premium and Arizona fab progress. Target entry below $100 with a macro risk-off event.",
        status: "waiting",
        statusText: "Geopolitical Watch",
    },
];

// Portfolio growth data (monthly, sample)
const GROWTH_DATA = {
    labels: [
        "Jan '25", "Feb '25", "Mar '25", "Apr '25", "May '25", "Jun '25",
        "Jul '25", "Aug '25", "Sep '25", "Oct '25", "Nov '25", "Dec '25",
        "Jan '26", "Feb '26", "Mar '26",
    ],
    portfolio: [
        100000, 102400, 105100, 103800, 107200, 111500,
        114800, 113200, 116900, 121400, 125800, 128600,
        132100, 137400, 142580,
    ],
    benchmark: [
        100000, 101200, 103400, 101900, 104100, 106800,
        108900, 107200, 109800, 113100, 115600, 117800,
        119500, 122100, 124800,
    ],
};
