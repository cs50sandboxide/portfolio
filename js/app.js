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
    initTradeLog();
    initWatchlist();
    initGrowthChart();
    initPortfolioStats();
    initScrollReveal();
    initContactForm();
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

/* ---- Portfolio Stats ---- */
function initPortfolioStats() {
    if (typeof PORTFOLIO_STATS === "undefined") return;

    const el = (id) => document.getElementById(id);
    const fmt = (n) => "$" + n.toLocaleString("en-US");

    if (el("portfolioValue")) el("portfolioValue").textContent = fmt(PORTFOLIO_STATS.totalValue);
    if (el("recentPnl")) el("recentPnl").textContent = "+$" + PORTFOLIO_STATS.recentRealizedPnl.toLocaleString("en-US");
    if (el("winRate")) el("winRate").textContent = PORTFOLIO_STATS.tradingWinRate;
}

/* ---- Positions Table ---- */
function initPositionsTable() {
    const tbody = document.getElementById("positionsBody");
    if (!tbody || typeof POSITIONS === "undefined") return;

    POSITIONS.forEach((pos) => {
        const marketValue = pos.shares * pos.currentPrice;
        const costBasis = pos.shares * pos.avgCost;
        const pnl = marketValue - costBasis;
        const returnPct = ((pnl / costBasis) * 100).toFixed(1);
        const isPositive = pnl >= 0;

        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td class="ticker">${pos.ticker}</td>
            <td>${pos.company}</td>
            <td>${pos.sector}</td>
            <td>${pos.shares}</td>
            <td>$${pos.avgCost.toFixed(2)}</td>
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

/* ---- Closed Trades ---- */
function initClosedTrades() {
    const grid = document.getElementById("closedTradesGrid");
    const summaryEl = document.getElementById("closedSummary");
    if (!grid || typeof CLOSED_TRADES === "undefined") return;

    let totalPnl = 0;
    let totalInvested = 0;

    CLOSED_TRADES.forEach((trade) => {
        totalPnl += trade.grossPnl;
        totalInvested += trade.sharesBought * trade.avgBuy;

        const card = document.createElement("div");
        card.className = "closed-card";
        card.innerHTML = `
            <div class="closed-card-header">
                <div>
                    <div class="closed-card-ticker">${trade.ticker}</div>
                    <div class="closed-card-company">${trade.company}</div>
                </div>
                <div class="closed-card-return">
                    <div class="closed-card-pnl positive">+$${trade.grossPnl.toFixed(2)}</div>
                    <span class="closed-card-pct positive">+${trade.returnPct}%</span>
                </div>
            </div>
            <div class="closed-card-details">
                <div>
                    <span class="closed-detail-label">Bought</span>
                    <span class="closed-detail-value">${trade.sharesBought} @ $${trade.avgBuy.toFixed(2)}</span>
                </div>
                <div>
                    <span class="closed-detail-label">Sold</span>
                    <span class="closed-detail-value">${trade.sharesBought} @ $${trade.avgSell.toFixed(2)}</span>
                </div>
                <div>
                    <span class="closed-detail-label">Entry</span>
                    <span class="closed-detail-value">${trade.buyDate}</span>
                </div>
                <div>
                    <span class="closed-detail-label">Exit</span>
                    <span class="closed-detail-value">${trade.sellDate}</span>
                </div>
            </div>
            <div class="closed-card-thesis">
                <div class="thesis-label">Trade Rationale</div>
                <p class="thesis-text">${trade.thesis}</p>
            </div>
        `;
        grid.appendChild(card);
    });

    // Summary bar
    if (summaryEl) {
        const avgReturn = CLOSED_TRADES.reduce((s, t) => s + t.returnPct, 0) / CLOSED_TRADES.length;
        const avgHold = CLOSED_TRADES.reduce((s, t) => s + t.holdingDays, 0) / CLOSED_TRADES.length;
        summaryEl.innerHTML = `
            <div class="closed-summary-stat">
                <span class="closed-summary-label">Total Realized P&L</span>
                <span class="closed-summary-value positive">+$${totalPnl.toFixed(2)}</span>
            </div>
            <div class="closed-summary-stat">
                <span class="closed-summary-label">Win Rate</span>
                <span class="closed-summary-value">${CLOSED_TRADES.length} / ${CLOSED_TRADES.length}</span>
            </div>
            <div class="closed-summary-stat">
                <span class="closed-summary-label">Avg Return</span>
                <span class="closed-summary-value positive">+${avgReturn.toFixed(1)}%</span>
            </div>
            <div class="closed-summary-stat">
                <span class="closed-summary-label">Avg Hold Period</span>
                <span class="closed-summary-value">${avgHold.toFixed(0)} days</span>
            </div>
        `;
    }
}

/* ---- Trade Log ---- */
function initTradeLog() {
    const tbody = document.getElementById("tradeLogBody");
    if (!tbody || typeof TRADE_LOG === "undefined") return;

    TRADE_LOG.forEach((t) => {
        const isBuy = t.action === "Buy";
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${t.date}</td>
            <td class="ticker">${t.ticker}</td>
            <td class="${isBuy ? "action-buy" : "action-sell"}">${t.action}</td>
            <td>${t.shares}</td>
            <td>$${t.price.toFixed(2)}</td>
            <td class="${t.value >= 0 ? "value-positive" : "value-negative"}">
                ${t.value >= 0 ? "+" : ""}$${t.value.toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </td>
        `;
        tbody.appendChild(tr);
    });
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
