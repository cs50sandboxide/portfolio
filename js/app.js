/* ============================================
   Portfolio App — Main Application Logic
   Portfolio Performance 2026 — IBKR Only
   ============================================ */

document.addEventListener("DOMContentLoaded", () => {
    initLoader();
    initNavigation();
    initMobileMenu();
    initTabs();
    initTradesTable();
    initPerfStats();
    initWatchlist();
    initGrowthChart();
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

/* ---- Performance Stats ---- */
function initPerfStats() {
    if (typeof PERF_STATS_2026 === "undefined") return;
    const el = (id) => document.getElementById(id);
    if (el("winRate")) el("winRate").textContent = PERF_STATS_2026.winRate;
    if (el("avgReturn")) el("avgReturn").textContent = "+" + PERF_STATS_2026.avgReturn.toFixed(1) + "%";
    if (el("avgHold")) el("avgHold").textContent = PERF_STATS_2026.avgHoldDays + " days";
    if (el("bestTrade")) el("bestTrade").textContent = PERF_STATS_2026.bestTrade.ticker + " +" + PERF_STATS_2026.bestTrade.returnPct + "%";
}

/* ---- Trades Table with Hover Chart ---- */
function initTradesTable() {
    const tbody = document.getElementById("tradesBody");
    if (!tbody || typeof TRADES_2026 === "undefined") return;

    // Sort: closed first (by exit date), then open
    const sorted = [...TRADES_2026].sort((a, b) => {
        if (a.status === "open" && b.status !== "open") return 1;
        if (a.status !== "open" && b.status === "open") return -1;
        const dateA = a.exitDate || a.entryDate;
        const dateB = b.exitDate || b.entryDate;
        return dateA.localeCompare(dateB);
    });

    sorted.forEach((trade) => {
        const isClosed = trade.status === "closed";
        const isPartial = trade.status === "partial";
        const isOpen = trade.status === "open";

        let returnDisplay, returnClass;
        if (isClosed || isPartial) {
            const isPos = trade.returnPct >= 0;
            returnDisplay = (isPos ? "+" : "") + trade.returnPct.toFixed(1) + "%";
            returnClass = isPos ? "positive" : "negative";
        } else {
            returnDisplay = "—";
            returnClass = "";
        }

        let statusBadge;
        if (isClosed) {
            statusBadge = '<span class="status-badge status-closed">Closed</span>';
        } else if (isPartial) {
            statusBadge = '<span class="status-badge status-partial">Partial</span>';
        } else {
            statusBadge = '<span class="status-badge status-open">Open</span>';
        }

        const exitCol = trade.exitPrice
            ? "$" + trade.exitPrice.toFixed(2)
            : (trade.currentPrice ? "$" + trade.currentPrice.toFixed(2) + " *" : "—");

        const holdCol = trade.holdDays ? trade.holdDays + "d" : "—";
        const exitDateCol = trade.exitDate || "—";

        const tr = document.createElement("tr");
        tr.className = "trade-row";
        tr.dataset.ticker = trade.ticker;
        tr.dataset.entry = trade.entryDate;
        tr.dataset.exit = trade.exitDate || "";
        tr.dataset.entryPrice = trade.entryPrice;
        tr.dataset.exitPrice = trade.exitPrice || trade.currentPrice || "";
        tr.innerHTML = `
            <td class="ticker">${trade.ticker}</td>
            <td>${trade.company}</td>
            <td>$${trade.entryPrice.toFixed(2)}</td>
            <td>${exitCol}</td>
            <td class="${returnClass}">${returnDisplay}</td>
            <td>${trade.entryDate}</td>
            <td>${exitDateCol}</td>
            <td>${holdCol}</td>
            <td>${statusBadge}</td>
        `;
        tbody.appendChild(tr);

        // Thesis row (hidden by default, toggled on click)
        const thesisTr = document.createElement("tr");
        thesisTr.className = "thesis-row hidden";
        thesisTr.innerHTML = `
            <td colspan="9">
                <div class="thesis-expand">
                    <span class="thesis-label-inline">Thesis:</span> ${trade.thesis}
                </div>
            </td>
        `;
        tbody.appendChild(thesisTr);

        tr.addEventListener("click", () => {
            thesisTr.classList.toggle("hidden");
            tr.classList.toggle("expanded");
        });

        // Hover chart
        tr.addEventListener("mouseenter", (e) => showTradeChart(e, trade));
        tr.addEventListener("mouseleave", hideTradeChart);
    });
}

/* ---- Hover Chart (TradingView Lightweight Charts) ---- */
let chartPopup = null;
let chartInstance = null;

function showTradeChart(event, trade) {
    if (typeof LightweightCharts === "undefined") return;

    // Remove existing
    hideTradeChart();

    chartPopup = document.createElement("div");
    chartPopup.className = "chart-popup";
    chartPopup.innerHTML = `
        <div class="chart-popup-header">
            <span class="chart-popup-ticker">${trade.ticker}</span>
            <span class="chart-popup-company">${trade.company}</span>
        </div>
        <div class="chart-popup-body" id="chartPopupBody"></div>
        <div class="chart-popup-footer">Weekly candles · 20 EMA · Entry/Exit markers</div>
    `;
    document.body.appendChild(chartPopup);

    // Position popup
    const rect = event.currentTarget.getBoundingClientRect();
    const popupWidth = 480;
    const popupHeight = 320;
    let left = rect.right + 16;
    let top = rect.top - 40;

    if (left + popupWidth > window.innerWidth) {
        left = rect.left - popupWidth - 16;
    }
    if (top + popupHeight > window.innerHeight) {
        top = window.innerHeight - popupHeight - 20;
    }
    if (top < 10) top = 10;

    chartPopup.style.left = left + "px";
    chartPopup.style.top = top + "px";

    const container = document.getElementById("chartPopupBody");
    if (!container) return;

    // Fetch candle data
    fetchCandleData(trade.ticker, trade.entryDate, trade.exitDate).then((candles) => {
        if (!chartPopup || !candles || candles.length === 0) return;

        chartInstance = LightweightCharts.createChart(container, {
            width: 460,
            height: 220,
            layout: {
                background: { color: "#111111" },
                textColor: "#888888",
                fontSize: 10,
            },
            grid: {
                vertLines: { color: "rgba(245,240,235,0.04)" },
                horzLines: { color: "rgba(245,240,235,0.04)" },
            },
            crosshair: { mode: 0 },
            timeScale: {
                borderColor: "rgba(245,240,235,0.08)",
                timeVisible: false,
            },
            rightPriceScale: {
                borderColor: "rgba(245,240,235,0.08)",
            },
        });

        // Candlestick series
        const candleSeries = chartInstance.addCandlestickSeries({
            upColor: "#4ade80",
            downColor: "#f87171",
            borderUpColor: "#4ade80",
            borderDownColor: "#f87171",
            wickUpColor: "#4ade80",
            wickDownColor: "#f87171",
        });
        candleSeries.setData(candles);

        // 20-period EMA
        const ema20 = calcEMA(candles.map((c) => c.close), 20);
        const emaData = candles
            .map((c, i) => (ema20[i] !== null ? { time: c.time, value: ema20[i] } : null))
            .filter(Boolean);

        const emaSeries = chartInstance.addLineSeries({
            color: "#c9a96e",
            lineWidth: 1,
            lineStyle: 0,
            priceLineVisible: false,
            lastValueVisible: false,
        });
        emaSeries.setData(emaData);

        // Entry marker
        const entryTime = dateToTimestamp(trade.entryDate);
        candleSeries.setMarkers([
            {
                time: findNearestTime(candles, entryTime),
                position: "belowBar",
                color: "#4ade80",
                shape: "arrowUp",
                text: "Entry $" + trade.entryPrice.toFixed(2),
            },
            ...(trade.exitDate
                ? [{
                    time: findNearestTime(candles, dateToTimestamp(trade.exitDate)),
                    position: "aboveBar",
                    color: "#f87171",
                    shape: "arrowDown",
                    text: "Exit $" + (trade.exitPrice || trade.currentPrice || 0).toFixed(2),
                }]
                : []),
        ]);

        chartInstance.timeScale().fitContent();
    });
}

function hideTradeChart() {
    if (chartInstance) {
        chartInstance.remove();
        chartInstance = null;
    }
    if (chartPopup) {
        chartPopup.remove();
        chartPopup = null;
    }
}

function dateToTimestamp(dateStr) {
    const [y, m, d] = dateStr.split("-").map(Number);
    return Date.UTC(y, m - 1, d) / 1000;
}

function findNearestTime(candles, ts) {
    let closest = candles[0].time;
    let minDiff = Infinity;
    for (const c of candles) {
        const diff = Math.abs(c.time - ts);
        if (diff < minDiff) {
            minDiff = diff;
            closest = c.time;
        }
    }
    return closest;
}

function calcEMA(data, period) {
    const k = 2 / (period + 1);
    const ema = new Array(data.length).fill(null);
    let sum = 0;
    for (let i = 0; i < data.length; i++) {
        if (i < period - 1) {
            sum += data[i];
            continue;
        }
        if (i === period - 1) {
            sum += data[i];
            ema[i] = sum / period;
        } else {
            ema[i] = data[i] * k + ema[i - 1] * (1 - k);
        }
    }
    return ema;
}

async function fetchCandleData(ticker, entryDate, exitDate) {
    // Fetch ~6 months of weekly data ending around now, starting well before entry
    const endDate = exitDate || new Date().toISOString().split("T")[0];
    const entryTs = new Date(entryDate).getTime() / 1000;
    const period1 = Math.floor(entryTs - 180 * 86400); // 6 months before entry
    const period2 = Math.floor(Date.now() / 1000);

    const urls = [
        `https://api.allorigins.win/raw?url=${encodeURIComponent(`https://query1.finance.yahoo.com/v8/finance/chart/${ticker}?interval=1wk&period1=${period1}&period2=${period2}`)}`,
        `https://corsproxy.io/?${encodeURIComponent(`https://query1.finance.yahoo.com/v8/finance/chart/${ticker}?interval=1wk&period1=${period1}&period2=${period2}`)}`,
    ];

    for (const url of urls) {
        try {
            const resp = await fetch(url);
            if (!resp.ok) continue;
            const data = await resp.json();
            const result = data.chart.result[0];
            const timestamps = result.timestamp;
            const quote = result.indicators.quote[0];

            return timestamps.map((t, i) => ({
                time: t,
                open: quote.open[i],
                high: quote.high[i],
                low: quote.low[i],
                close: quote.close[i],
            })).filter((c) => c.open && c.high && c.low && c.close);
        } catch (e) {
            continue;
        }
    }

    return null;
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

    new Chart(canvas.getContext("2d"), {
        type: "line",
        data: {
            labels: GROWTH_DATA.labels,
            datasets: [
                {
                    label: "Portfolio",
                    data: GROWTH_DATA.portfolio,
                    borderColor: "#f5f0eb",
                    borderWidth: 2,
                    pointRadius: 4,
                    pointBackgroundColor: "#f5f0eb",
                    pointHoverRadius: 6,
                    tension: 0.3,
                    fill: { target: "origin", above: "rgba(245, 240, 235, 0.04)" },
                },
                {
                    label: "S&P 500",
                    data: GROWTH_DATA.benchmark,
                    borderColor: "#555555",
                    borderWidth: 1,
                    borderDash: [6, 4],
                    pointRadius: 0,
                    tension: 0.3,
                    fill: false,
                },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true, position: "top", align: "end",
                    labels: { color: "#777", font: { family: "'Inter'", size: 11 }, boxWidth: 20, boxHeight: 1, padding: 20 },
                },
                tooltip: {
                    backgroundColor: "#1a1a1a",
                    titleColor: "#999",
                    bodyColor: "#f5f0eb",
                    borderColor: "rgba(245,240,235,0.1)",
                    borderWidth: 1,
                    padding: 14,
                    displayColors: false,
                    callbacks: {
                        label: (ctx) => `${ctx.dataset.label}: ${ctx.parsed.y.toFixed(1)}%`,
                    },
                },
            },
            scales: {
                x: {
                    grid: { color: "rgba(245,240,235,0.04)" },
                    ticks: { color: "#555", font: { family: "'Inter'", size: 10 } },
                },
                y: {
                    grid: { color: "rgba(245,240,235,0.04)" },
                    ticks: {
                        color: "#555",
                        font: { family: "'Inter'", size: 10 },
                        callback: (v) => (v - 100 >= 0 ? "+" : "") + (v - 100).toFixed(0) + "%",
                    },
                    suggestedMin: 95,
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
        (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
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
        const orig = btn.textContent;
        btn.textContent = "Message Sent";
        setTimeout(() => { btn.textContent = orig; form.reset(); }, 3000);
    });
}
