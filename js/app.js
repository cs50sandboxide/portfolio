/* ============================================
   Portfolio App — Main Application Logic
   All Trades: Schwab + IBKR (April 2022–Present)
   ============================================ */

document.addEventListener("DOMContentLoaded", () => {
    initLoader();
    initNavigation();
    initMobileMenu();
    initTabs();
    initPerfStats();
    initRealizedTrades();
    initOpenPositions();
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

/* ---- Performance Stats (Summary Cards) ---- */
function initPerfStats() {
    if (typeof PERF_STATS === "undefined") return;
    const el = (id) => document.getElementById(id);
    if (el("totalProfit")) el("totalProfit").textContent = "$" + PERF_STATS.totalRealizedProfit.toLocaleString() + "+";
    if (el("winRate")) el("winRate").textContent = PERF_STATS.winRate;
    if (el("annualReturn")) el("annualReturn").textContent = "+" + PERF_STATS.annualReturn.toFixed(1) + "%";
    if (el("avgReturn")) el("avgReturn").textContent = "+" + PERF_STATS.avgReturn.toFixed(1) + "%";
    if (el("totalTrades")) el("totalTrades").textContent = PERF_STATS.totalTrades;
    if (el("bestTrade")) el("bestTrade").textContent = PERF_STATS.bestTrade.ticker + " +" + PERF_STATS.bestTrade.returnPct + "%";

    // Growth tab stats
    if (el("gsWinRate")) el("gsWinRate").textContent = PERF_STATS.wins + "/" + PERF_STATS.totalTrades + " (" + PERF_STATS.winRate + ")";
    if (el("gsAvgReturn")) el("gsAvgReturn").textContent = "+" + PERF_STATS.avgReturn.toFixed(1) + "%";
    if (el("gsBestTrade")) el("gsBestTrade").textContent = PERF_STATS.bestTrade.ticker + " +" + PERF_STATS.bestTrade.returnPct + "%";
    if (el("gsActiveSince")) el("gsActiveSince").textContent = PERF_STATS.activeSince;
    if (el("gsOpenPositions")) el("gsOpenPositions").textContent = PERF_STATS.openPositions;
    if (el("gsClosedTrades")) el("gsClosedTrades").textContent = PERF_STATS.totalTrades;
}

/* ---- Realized Trades Table with Hover Chart ---- */
function initRealizedTrades() {
    const tbody = document.getElementById("realizedBody");
    if (!tbody || typeof REALIZED_TRADES === "undefined") return;

    // Sort descending by exit date (most recent first)
    const sorted = [...REALIZED_TRADES].sort((a, b) => b.exitDate.localeCompare(a.exitDate));

    sorted.forEach((trade) => {
        const isPos = trade.returnPct >= 0;
        const returnDisplay = (isPos ? "+" : "") + trade.returnPct.toFixed(1) + "%";
        const returnClass = isPos ? "positive" : "negative";

        const tr = document.createElement("tr");
        tr.className = "trade-row";
        tr.dataset.ticker = trade.ticker;
        tr.dataset.entry = trade.entryDate;
        tr.dataset.exit = trade.exitDate || "";
        tr.dataset.entryPrice = trade.entryPrice;
        tr.dataset.exitPrice = trade.exitPrice || "";
        tr.innerHTML = `
            <td class="ticker">${trade.ticker}</td>
            <td>${trade.company}</td>
            <td>$${trade.entryPrice.toFixed(2)}</td>
            <td>$${trade.exitPrice.toFixed(2)}</td>
            <td class="${returnClass}">${returnDisplay}</td>
            <td>${trade.entryDate}</td>
            <td>${trade.exitDate}</td>
            <td><span class="source-badge source-${trade.source.toLowerCase().replace(/[^a-z]/g, '')}">${trade.source}</span></td>
        `;
        tbody.appendChild(tr);

        // Hover chart
        tr.addEventListener("mouseenter", (e) => showTradeChart(e, trade));
        tr.addEventListener("mouseleave", hideTradeChart);
    });
}

/* ---- Open Positions Table with Live Prices ---- */
function initOpenPositions() {
    const tbody = document.getElementById("openBody");
    if (!tbody || typeof OPEN_POSITIONS === "undefined") return;

    OPEN_POSITIONS.forEach((pos) => {
        const tr = document.createElement("tr");
        tr.className = "trade-row";
        tr.dataset.ticker = pos.ticker;
        tr.innerHTML = `
            <td class="ticker">${pos.ticker}</td>
            <td>${pos.company}</td>
            <td>$${pos.entryPrice.toFixed(2)}</td>
            <td class="live-price" data-ticker="${pos.ticker}">Loading...</td>
            <td class="unrealized" data-ticker="${pos.ticker}" data-entry="${pos.entryPrice}">—</td>
            <td>${pos.entryDate}</td>
            <td><span class="source-badge source-${pos.source.toLowerCase().replace(/[^a-z]/g, '')}">${pos.source}</span></td>
        `;
        tbody.appendChild(tr);

        // Hover chart for open positions too
        tr.addEventListener("mouseenter", (e) => showTradeChart(e, pos));
        tr.addEventListener("mouseleave", hideTradeChart);
    });

    // Fetch live prices immediately, then every 60s
    fetchLivePrices();
    setInterval(fetchLivePrices, 60000);
}

async function fetchLivePrices() {
    if (typeof OPEN_POSITIONS === "undefined") return;
    const tickers = OPEN_POSITIONS.map((p) => p.ticker);

    for (const ticker of tickers) {
        try {
            const price = await fetchCurrentPrice(ticker);
            if (price === null) continue;

            const priceCell = document.querySelector(`.live-price[data-ticker="${ticker}"]`);
            const unrealizedCell = document.querySelector(`.unrealized[data-ticker="${ticker}"]`);
            if (!priceCell || !unrealizedCell) continue;

            priceCell.textContent = "$" + price.toFixed(2);

            const entry = parseFloat(unrealizedCell.dataset.entry);
            const pct = ((price - entry) / entry) * 100;
            const isPos = pct >= 0;
            unrealizedCell.textContent = (isPos ? "+" : "") + pct.toFixed(1) + "%";
            unrealizedCell.className = "unrealized " + (isPos ? "positive" : "negative");
        } catch (e) {
            // silently skip
        }
    }
}

async function fetchCurrentPrice(ticker) {
    const period2 = Math.floor(Date.now() / 1000);
    const period1 = period2 - 7 * 86400;

    const urls = [
        `https://api.allorigins.win/raw?url=${encodeURIComponent(`https://query1.finance.yahoo.com/v8/finance/chart/${ticker}?interval=1d&period1=${period1}&period2=${period2}`)}`,
        `https://corsproxy.io/?${encodeURIComponent(`https://query1.finance.yahoo.com/v8/finance/chart/${ticker}?interval=1d&period1=${period1}&period2=${period2}`)}`,
    ];

    for (const url of urls) {
        try {
            const resp = await fetch(url);
            if (!resp.ok) continue;
            const data = await resp.json();
            const meta = data.chart.result[0].meta;
            return meta.regularMarketPrice;
        } catch (e) {
            continue;
        }
    }
    return null;
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
        const markers = [
            {
                time: findNearestTime(candles, entryTime),
                position: "belowBar",
                color: "#4ade80",
                shape: "arrowUp",
                text: "Entry $" + trade.entryPrice.toFixed(2),
            },
        ];

        // Exit marker (only for realized trades)
        if (trade.exitDate && trade.exitPrice) {
            markers.push({
                time: findNearestTime(candles, dateToTimestamp(trade.exitDate)),
                position: "aboveBar",
                color: "#f87171",
                shape: "arrowDown",
                text: "Exit $" + trade.exitPrice.toFixed(2),
            });
        }

        // Sort markers by time (required by Lightweight Charts)
        markers.sort((a, b) => a.time - b.time);
        candleSeries.setMarkers(markers);

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
    const entryTs = new Date(entryDate).getTime() / 1000;
    const period1 = Math.floor(entryTs - 180 * 86400);
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
        type: "bar",
        data: {
            labels: GROWTH_DATA.labels,
            datasets: [
                {
                    label: "Portfolio",
                    data: GROWTH_DATA.portfolio,
                    backgroundColor: "rgba(245, 240, 235, 0.7)",
                    borderColor: "#f5f0eb",
                    borderWidth: 1,
                    borderRadius: 2,
                },
                {
                    label: "S&P 500",
                    data: GROWTH_DATA.benchmark,
                    backgroundColor: "rgba(85, 85, 85, 0.5)",
                    borderColor: "#555555",
                    borderWidth: 1,
                    borderRadius: 2,
                },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true, position: "top", align: "end",
                    labels: { color: "#777", font: { family: "'Inter'", size: 11 }, boxWidth: 14, boxHeight: 14, padding: 20 },
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
                        label: (ctx) => `${ctx.dataset.label}: ${ctx.parsed.y >= 0 ? "+" : ""}${ctx.parsed.y.toFixed(1)}%`,
                    },
                },
            },
            scales: {
                x: {
                    grid: { color: "rgba(245,240,235,0.04)" },
                    ticks: { color: "#555", font: { family: "'Inter'", size: 11 } },
                },
                y: {
                    grid: { color: "rgba(245,240,235,0.04)" },
                    ticks: {
                        color: "#555",
                        font: { family: "'Inter'", size: 10 },
                        callback: (v) => (v >= 0 ? "+" : "") + v.toFixed(0) + "%",
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
