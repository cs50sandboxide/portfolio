/* ============================================
   Portfolio App — Main Application Logic
   Works on both landing page and sub-pages
   ============================================ */

document.addEventListener("DOMContentLoaded", () => {
    initLoader();
    initNavigation();
    initMobileMenu();
    initTabs();
    initPositionsTable();
    initClosedTrades();
    initDividends();
    initWatchlist();
    initGrowthChart();
    initPortfolioStats();
    initScrollReveal();
    initContactForm();
    initLivePrices();
});

/* ---- Loader ---- */
function initLoader() {
    const loader = document.getElementById("loader");
    if (!loader) return;
    window.addEventListener("load", () => {
        setTimeout(() => loader.classList.add("hidden"), 600);
    });
    setTimeout(() => loader.classList.add("hidden"), 2000);
}

/* ---- Navigation ---- */
function initNavigation() {
    const navbar = document.getElementById("navbar");
    if (!navbar) return;

    if (!navbar.classList.contains("scrolled")) {
        window.addEventListener("scroll", () => {
            navbar.classList.toggle("scrolled", window.scrollY > 60);
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", (e) => {
            const href = anchor.getAttribute("href");
            if (href === "#") return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        });
    });
}

/* ---- Mobile Menu ---- */
function initMobileMenu() {
    const btn = document.getElementById("menuBtn");
    const menu = document.getElementById("mobileMenu");
    if (!btn || !menu) return;

    btn.addEventListener("click", () => {
        btn.classList.toggle("open");
        menu.classList.toggle("open");
        document.body.style.overflow = menu.classList.contains("open") ? "hidden" : "";
    });

    menu.querySelectorAll(".mobile-link").forEach((link) => {
        link.addEventListener("click", () => {
            btn.classList.remove("open");
            menu.classList.remove("open");
            document.body.style.overflow = "";
        });
    });
}

/* ---- Tabs ---- */
function initTabs() {
    const tabBtns = document.querySelectorAll(".tab-btn");
    const tabContents = document.querySelectorAll(".tab-content");
    if (tabBtns.length === 0) return;

    tabBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            const tab = btn.dataset.tab;
            tabBtns.forEach((b) => b.classList.remove("active"));
            tabContents.forEach((c) => c.classList.remove("active"));
            btn.classList.add("active");
            document.getElementById(`tab-${tab}`).classList.add("active");
        });
    });
}

/* ---- Portfolio Stats (summary cards) ---- */
function initPortfolioStats() {
    if (typeof PORTFOLIO_STATS === "undefined") return;

    const el = (id) => document.getElementById(id);

    if (el("totalRealizedPnl")) el("totalRealizedPnl").textContent = "+$" + PORTFOLIO_STATS.totalRealizedPnl.toLocaleString("en-US", { minimumFractionDigits: 2 });
    if (el("totalDividends")) el("totalDividends").textContent = "+$" + PORTFOLIO_STATS.totalDividends.toLocaleString("en-US", { minimumFractionDigits: 2 });
    if (el("winRate")) el("winRate").textContent = PORTFOLIO_STATS.winRate;
    if (el("openCount")) el("openCount").textContent = PORTFOLIO_STATS.openPositions;
    if (el("closedCount")) el("closedCount").textContent = PORTFOLIO_STATS.totalPositionsClosed;
}

/* ---- Live Price Fetching via Finnhub (free, no key needed for basic quotes) ---- */
function initLivePrices() {
    if (typeof POSITIONS === "undefined") return;
    const tbody = document.getElementById("positionsBody");
    if (!tbody) return;

    fetchLivePrices();
    setInterval(fetchLivePrices, 60000);
}

async function fetchLivePrices() {
    if (typeof POSITIONS === "undefined") return;

    const tickers = POSITIONS.map((p) => p.ticker);
    let updated = 0;

    // Fetch each ticker individually via Yahoo Finance v8 chart endpoint through a CORS proxy
    const fetches = tickers.map(async (ticker) => {
        const urls = [
            `https://api.allorigins.win/raw?url=${encodeURIComponent(`https://query1.finance.yahoo.com/v8/finance/chart/${ticker}?interval=1d&range=1d`)}`,
            `https://corsproxy.io/?${encodeURIComponent(`https://query1.finance.yahoo.com/v8/finance/chart/${ticker}?interval=1d&range=1d`)}`,
        ];

        for (const url of urls) {
            try {
                const resp = await fetch(url);
                if (!resp.ok) continue;
                const data = await resp.json();
                const meta = data.chart.result[0].meta;
                const price = meta.regularMarketPrice;
                if (price && price > 0) {
                    return { ticker, price };
                }
            } catch (e) {
                continue;
            }
        }
        return null;
    });

    const results = await Promise.allSettled(fetches);

    results.forEach((result) => {
        if (result.status !== "fulfilled" || !result.value) return;
        const { ticker, price } = result.value;
        const pos = POSITIONS.find((p) => p.ticker === ticker);
        if (pos) {
            pos.currentPrice = price;
            updated++;
        }
    });

    if (updated > 0) {
        refreshPositionsTable();
        updateUnrealizedPnlCard();
        updatePortfolioValueCard();
        updateLastRefreshed();
    } else {
        updateLastRefreshed(true);
    }
}

function updateLastRefreshed(failed) {
    const el = document.getElementById("lastRefreshed");
    if (!el) return;
    if (failed) {
        el.textContent = "Live prices unavailable — showing last known prices";
    } else {
        const now = new Date();
        el.textContent = `Prices updated ${now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}`;
    }
}

function updatePortfolioValueCard() {
    const el = document.getElementById("portfolioValue");
    if (!el || typeof POSITIONS === "undefined") return;
    let totalMV = 0;
    POSITIONS.forEach((pos) => { totalMV += pos.shares * pos.currentPrice; });
    el.textContent = "$" + Math.round(totalMV).toLocaleString("en-US");
}

function updateUnrealizedPnlCard() {
    const el = document.getElementById("unrealizedPnl");
    if (!el || typeof POSITIONS === "undefined") return;
    let totalPnl = 0;
    POSITIONS.forEach((pos) => {
        totalPnl += (pos.currentPrice - pos.avgCost) * pos.shares;
    });
    const isPos = totalPnl >= 0;
    el.textContent = `${isPos ? "+" : "-"}$${Math.abs(totalPnl).toLocaleString("en-US", { minimumFractionDigits: 2 })}`;
    el.className = `summary-value ${isPos ? "positive" : "negative"}`;
}

function refreshPositionsTable() {
    const tbody = document.getElementById("positionsBody");
    const tfoot = document.getElementById("positionsTotals");
    if (!tbody || typeof POSITIONS === "undefined") return;

    tbody.innerHTML = "";

    let totalCostBasis = 0;
    let totalMarketValue = 0;

    POSITIONS.forEach((pos) => {
        const marketValue = pos.shares * pos.currentPrice;
        const costBasis = pos.shares * pos.avgCost;
        const pnl = marketValue - costBasis;
        const returnPct = costBasis > 0 ? ((pnl / costBasis) * 100).toFixed(1) : "0.0";
        const isPositive = pnl >= 0;

        totalCostBasis += costBasis;
        totalMarketValue += marketValue;

        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td class="ticker">${pos.ticker}</td>
            <td>${pos.company}</td>
            <td>${pos.shares.toLocaleString()}</td>
            <td>$${pos.currentPrice.toFixed(2)}</td>
            <td>$${marketValue.toLocaleString("en-US", { minimumFractionDigits: 2 })}</td>
            <td class="${isPositive ? "positive" : "negative"}">
                ${isPositive ? "+" : "-"}$${Math.abs(pnl).toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </td>
            <td class="${isPositive ? "positive" : "negative"}">
                ${isPositive ? "+" : ""}${returnPct}%
            </td>
        `;
        tbody.appendChild(tr);
    });

    // Totals row
    if (tfoot) {
        const totalPnl = totalMarketValue - totalCostBasis;
        const totalReturnPct = totalCostBasis > 0 ? ((totalPnl / totalCostBasis) * 100).toFixed(1) : "0.0";
        const isPos = totalPnl >= 0;
        tfoot.innerHTML = `
            <tr class="totals-row">
                <td colspan="2"><strong>TOTAL (${POSITIONS.length} positions)</strong></td>
                <td></td>
                <td></td>
                <td><strong>$${totalMarketValue.toLocaleString("en-US", { minimumFractionDigits: 2 })}</strong></td>
                <td class="${isPos ? "positive" : "negative"}">
                    <strong>${isPos ? "+" : "-"}$${Math.abs(totalPnl).toLocaleString("en-US", { minimumFractionDigits: 2 })}</strong>
                </td>
                <td class="${isPos ? "positive" : "negative"}">
                    <strong>${isPos ? "+" : ""}${totalReturnPct}%</strong>
                </td>
            </tr>
        `;
    }
}

/* ---- Positions Table (Unrealized P&L) — Initial Render ---- */
function initPositionsTable() {
    const tbody = document.getElementById("positionsBody");
    if (!tbody || typeof POSITIONS === "undefined") return;

    let totalCostBasis = 0;
    let totalMarketValue = 0;

    POSITIONS.forEach((pos) => {
        const marketValue = pos.shares * pos.currentPrice;
        const costBasis = pos.shares * pos.avgCost;
        const pnl = marketValue - costBasis;
        const returnPct = costBasis > 0 ? ((pnl / costBasis) * 100).toFixed(1) : "0.0";
        const isPositive = pnl >= 0;

        totalCostBasis += costBasis;
        totalMarketValue += marketValue;

        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td class="ticker">${pos.ticker}</td>
            <td>${pos.company}</td>
            <td>${pos.shares.toLocaleString()}</td>
            <td>$${pos.currentPrice.toFixed(2)}</td>
            <td>$${marketValue.toLocaleString("en-US", { minimumFractionDigits: 2 })}</td>
            <td class="${isPositive ? "positive" : "negative"}">
                ${isPositive ? "+" : "-"}$${Math.abs(pnl).toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </td>
            <td class="${isPositive ? "positive" : "negative"}">
                ${isPositive ? "+" : ""}${returnPct}%
            </td>
        `;
        tbody.appendChild(tr);
    });

    // Totals row
    const totalPnl = totalMarketValue - totalCostBasis;
    const totalReturnPct = totalCostBasis > 0 ? ((totalPnl / totalCostBasis) * 100).toFixed(1) : "0.0";
    const isPos = totalPnl >= 0;
    const tfoot = document.getElementById("positionsTotals");
    if (tfoot) {
        tfoot.innerHTML = `
            <tr class="totals-row">
                <td colspan="2"><strong>TOTAL (${POSITIONS.length} positions)</strong></td>
                <td></td>
                <td></td>
                <td><strong>$${totalMarketValue.toLocaleString("en-US", { minimumFractionDigits: 2 })}</strong></td>
                <td class="${isPos ? "positive" : "negative"}">
                    <strong>${isPos ? "+" : "-"}$${Math.abs(totalPnl).toLocaleString("en-US", { minimumFractionDigits: 2 })}</strong>
                </td>
                <td class="${isPos ? "positive" : "negative"}">
                    <strong>${isPos ? "+" : ""}${totalReturnPct}%</strong>
                </td>
            </tr>
        `;
    }

    // Initial portfolio value + unrealized P&L cards
    updatePortfolioValueCard();
    updateUnrealizedPnlCard();

    // Investment theses
    const thesesContainer = document.getElementById("positionTheses");
    if (!thesesContainer) return;

    POSITIONS.forEach((pos) => {
        if (!pos.thesis) return;
        const card = document.createElement("div");
        card.className = "thesis-card";
        card.innerHTML = `
            <div class="thesis-header">
                <span class="thesis-ticker">${pos.ticker}</span>
                <span class="thesis-company">${pos.company}</span>
            </div>
            <div class="thesis-label">Investment Thesis</div>
            <p class="thesis-text">${pos.thesis}</p>
        `;
        thesesContainer.appendChild(card);
    });
}

/* ---- Closed Trades (Realized P&L) — Chronological Table ---- */
function initClosedTrades() {
    const tbody = document.getElementById("closedTradesBody");
    const summaryEl = document.getElementById("closedSummary");
    if (!tbody || typeof CLOSED_TRADES === "undefined") return;

    // Already in chronological order in data.js (sorted by pnl desc, but we want the table order)
    CLOSED_TRADES.forEach((trade, i) => {
        const isPositive = trade.pnl >= 0;
        const pnlClass = isPositive ? "positive" : "negative";
        const pnlSign = isPositive ? "+" : "-";
        const dividendCell = trade.dividends > 0
            ? `$${trade.dividends.toFixed(2)}`
            : "—";

        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td class="ticker">${trade.ticker}</td>
            <td>${trade.company}</td>
            <td class="${pnlClass}">
                ${pnlSign}$${Math.abs(trade.pnl).toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </td>
            <td class="${pnlClass}">${isPositive ? "+" : ""}${trade.returnPct}%</td>
            <td>${dividendCell}</td>
        `;
        tbody.appendChild(tr);
    });

    // Summary bar
    if (summaryEl) {
        const totalPnl = CLOSED_TRADES.reduce((s, t) => s + t.pnl, 0);
        const totalDiv = CLOSED_TRADES.reduce((s, t) => s + t.dividends, 0);
        const avgReturn = CLOSED_TRADES.reduce((s, t) => s + t.returnPct, 0) / CLOSED_TRADES.length;
        const wins = CLOSED_TRADES.filter((t) => t.pnl >= 0).length;
        const losses = CLOSED_TRADES.filter((t) => t.pnl < 0).length;

        summaryEl.innerHTML = `
            <div class="closed-summary-stat">
                <span class="closed-summary-label">Total Realized P&L</span>
                <span class="closed-summary-value positive">+$${totalPnl.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
            </div>
            <div class="closed-summary-stat">
                <span class="closed-summary-label">Win Rate</span>
                <span class="closed-summary-value">${wins}W / ${losses}L (${((wins / (wins + losses)) * 100).toFixed(1)}%)</span>
            </div>
            <div class="closed-summary-stat">
                <span class="closed-summary-label">Avg Return</span>
                <span class="closed-summary-value positive">+${avgReturn.toFixed(1)}%</span>
            </div>
            <div class="closed-summary-stat">
                <span class="closed-summary-label">Dividends from Closed</span>
                <span class="closed-summary-value positive">+$${totalDiv.toFixed(2)}</span>
            </div>
        `;
    }
}

/* ---- Dividends Breakdown ---- */
function initDividends() {
    const tbody = document.getElementById("dividendsBody");
    if (!tbody || typeof DIVIDENDS === "undefined") return;

    let totalDiv = 0;
    DIVIDENDS.forEach((d) => {
        totalDiv += d.amount;
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td class="ticker">${d.ticker}</td>
            <td>$${d.amount.toFixed(2)}</td>
            <td>${d.source}</td>
        `;
        tbody.appendChild(tr);
    });

    const tfoot = document.getElementById("dividendsTotals");
    if (tfoot) {
        tfoot.innerHTML = `
            <tr class="totals-row">
                <td><strong>TOTAL</strong></td>
                <td><strong class="positive">$${totalDiv.toFixed(2)}</strong></td>
                <td></td>
            </tr>
        `;
    }
}

/* ---- Watchlist ---- */
function initWatchlist() {
    const grid = document.getElementById("watchlistGrid");
    if (!grid || typeof WATCHLIST === "undefined") return;

    WATCHLIST.forEach((item) => {
        const card = document.createElement("div");
        card.className = "watchlist-card";
        card.innerHTML = `
            <div class="watchlist-header">
                <div>
                    <div class="watchlist-ticker">${item.ticker}</div>
                    <div class="watchlist-company">${item.company}</div>
                </div>
                <div class="watchlist-price">
                    <div class="watchlist-price-value">$${item.currentPrice.toFixed(2)}</div>
                    <div class="watchlist-change ${item.changeDirection}">${item.change}</div>
                </div>
            </div>
            <div class="watchlist-signal">
                <div class="signal-label">Entry Signal</div>
                <div class="signal-text">${item.signal}</div>
                <div class="signal-status ${item.status}">
                    <span class="signal-dot"></span>
                    <span>${item.statusText}</span>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

/* ---- Growth Chart ---- */
function initGrowthChart() {
    const canvas = document.getElementById("growthChart");
    if (!canvas || typeof Chart === "undefined" || typeof GROWTH_DATA === "undefined") return;

    const ctx = canvas.getContext("2d");

    new Chart(ctx, {
        type: "line",
        data: {
            labels: GROWTH_DATA.labels,
            datasets: [
                {
                    label: "Portfolio",
                    data: GROWTH_DATA.portfolio,
                    borderColor: "#f5f0eb",
                    borderWidth: 2,
                    pointRadius: 3,
                    pointBackgroundColor: "#f5f0eb",
                    pointHoverRadius: 6,
                    pointHoverBackgroundColor: "#f5f0eb",
                    tension: 0.3,
                    fill: {
                        target: "origin",
                        above: "rgba(245, 240, 235, 0.04)",
                    },
                },
                {
                    label: "S&P 500 Benchmark",
                    data: GROWTH_DATA.benchmark,
                    borderColor: "#555555",
                    borderWidth: 1,
                    borderDash: [6, 4],
                    pointRadius: 0,
                    pointHoverRadius: 4,
                    pointHoverBackgroundColor: "#555555",
                    tension: 0.3,
                    fill: false,
                },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: "index",
                intersect: false,
            },
            plugins: {
                legend: {
                    display: true,
                    position: "top",
                    align: "end",
                    labels: {
                        color: "#777777",
                        font: { family: "'Inter'", size: 11, weight: "400" },
                        boxWidth: 20,
                        boxHeight: 1,
                        padding: 20,
                        usePointStyle: false,
                    },
                },
                tooltip: {
                    backgroundColor: "#1a1a1a",
                    titleColor: "#999999",
                    bodyColor: "#f5f0eb",
                    titleFont: { family: "'Inter'", size: 11, weight: "400" },
                    bodyFont: { family: "'Inter'", size: 13, weight: "500" },
                    borderColor: "rgba(245, 240, 235, 0.1)",
                    borderWidth: 1,
                    padding: 14,
                    displayColors: false,
                    callbacks: {
                        label: (context) => {
                            const value = context.parsed.y;
                            return `${context.dataset.label}: $${value.toLocaleString("en-US")}`;
                        },
                    },
                },
            },
            scales: {
                x: {
                    grid: {
                        color: "rgba(245, 240, 235, 0.04)",
                        drawBorder: false,
                    },
                    ticks: {
                        color: "#555555",
                        font: { family: "'Inter'", size: 10, weight: "400" },
                        maxRotation: 0,
                    },
                },
                y: {
                    grid: {
                        color: "rgba(245, 240, 235, 0.04)",
                        drawBorder: false,
                    },
                    ticks: {
                        color: "#555555",
                        font: { family: "'Inter'", size: 10, weight: "400" },
                        callback: (value) => `$${(value / 1000).toFixed(0)}k`,
                    },
                },
            },
        },
    });
}

/* ---- Scroll Reveal ---- */
function initScrollReveal() {
    const revealElements = document.querySelectorAll(
        ".section-header, .about-grid, .about-intro-grid, .portfolio-summary, .portfolio-tabs, " +
        ".tab-content, .model-card, .contact-grid, .summary-card, " +
        ".snippet-grid, .snippet-content-full, .snippet-highlights, " +
        ".portfolio-preview-stats, .models-preview-grid, .contact-preview-links, " +
        ".page-intro, .models-grid, .timeline, .edu-cards, .skills-sections, " +
        ".certs-grid, .awards-list, .about-cta-inner, .key-metrics"
    );

    revealElements.forEach((el) => el.classList.add("reveal"));

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                }
            });
        },
        { threshold: 0.1, rootMargin: "0px 0px -60px 0px" }
    );

    revealElements.forEach((el) => observer.observe(el));
}

/* ---- Contact Form ---- */
function initContactForm() {
    const form = document.getElementById("contactForm");
    if (!form) return;

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const btn = form.querySelector(".form-submit span");
        const originalText = btn.textContent;
        btn.textContent = "Message Sent";
        setTimeout(() => {
            btn.textContent = originalText;
            form.reset();
        }, 3000);
    });
}
