/* ============================================
   Fund Application Logic
   All Trades: Schwab + IBKR (April 2022–Present)
   ============================================ */

document.addEventListener("DOMContentLoaded", () => {
    initLoader();
    initMtdBanner();
    initNavigation();
    initMobileMenu();
    initTabs();
    initPerfStats();
    initComposition();
    initRealizedTrades();
    initWatchlist();
    initGrowthChart();
    initScrollReveal();
    initContactForm();
});

/* ---- Banner ---- */
function initMtdBanner() {
    if (typeof MTD_STATS === "undefined") return;
    const el = (id) => document.getElementById(id);
    if (el("mtdLabel")) el("mtdLabel").textContent = "YTD Realized Profit";
    if (el("mtdValue")) {
        const prefix = MTD_STATS.realizedProfit >= 0 ? "+$" : "-$";
        el("mtdValue").textContent = prefix + Math.abs(MTD_STATS.realizedProfit).toLocaleString();
    }
    if (el("mtdPct")) {
        el("mtdPct").textContent = "(" + MTD_STATS.returnPct.toFixed(2) + "% QTD annualized)";
    }
}

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
    if (el("totalAUM")) el("totalAUM").textContent = "$" + (PERF_STATS.totalAUM / 1000000).toFixed(1) + "M";
    if (el("qtdReturn")) el("qtdReturn").textContent = "+" + PERF_STATS.qtdAnnualizedReturn.toFixed(2) + "%";
    if (el("ytdProfit")) el("ytdProfit").textContent = "$" + (PERF_STATS.ytdProfit / 1000).toFixed(0) + "K";

    if (el("gsAvgReturn")) el("gsAvgReturn").textContent = "+" + PERF_STATS.avgReturn.toFixed(1) + "%";
    if (el("gsBestTrade")) el("gsBestTrade").textContent = PERF_STATS.bestTrade.ticker + " +" + PERF_STATS.bestTrade.returnPct + "%";
    if (el("gsActiveSince")) el("gsActiveSince").textContent = PERF_STATS.activeSince;
    if (el("gsOpenPositions")) el("gsOpenPositions").textContent = PERF_STATS.openPositions;
    if (el("gsClosedTrades")) el("gsClosedTrades").textContent = PERF_STATS.totalTrades;
}

/* ---- Portfolio Composition (Interactive Constellation) ---- */
function initComposition() {
    const vizContainer = document.getElementById("compositionViz");
    const gridContainer = document.getElementById("compositionGrid");
    if (!vizContainer || typeof PORTFOLIO_COMPOSITION === "undefined") return;

    const categories = [
        { key: "longs",       label: "Longs",        color: "#4ade80", positions: PORTFOLIO_COMPOSITION.longs },
        { key: "shorts",      label: "Shorts",       color: "#f87171", positions: PORTFOLIO_COMPOSITION.shorts },
        { key: "putOptions",  label: "Put Options",   color: "#c9a96e", positions: PORTFOLIO_COMPOSITION.putOptions },
        { key: "callOptions", label: "Call Options",   color: "#6495ed", positions: PORTFOLIO_COMPOSITION.callOptions },
    ];

    const totalPositions = categories.reduce((s, c) => s + c.positions.length, 0);

    // --- SVG Constellation ---
    const W = 960, H = 580;
    const cx = W / 2, cy = H / 2;

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
    svg.setAttribute("class", "constellation-svg");
    vizContainer.appendChild(svg);

    const hubRadius = 155;
    const hubAngles = [-Math.PI / 2, 0, Math.PI / 2, Math.PI];
    const tickerRadii = [120, 95, 95, 80];
    const arcSpreads = [Math.PI * 0.95, Math.PI * 0.65, Math.PI * 0.6, Math.PI * 0.4];

    const allNodes = [];

    categories.forEach((cat, ci) => {
        const angle = hubAngles[ci];
        cat.hubX = cx + hubRadius * Math.cos(angle);
        cat.hubY = cy + hubRadius * Math.sin(angle);

        const count = cat.positions.length;
        const spread = arcSpreads[ci];
        const tRadius = tickerRadii[ci];

        cat.positions.forEach((pos, j) => {
            const t = count === 1 ? 0 : (j / (count - 1) - 0.5);
            const a = angle + t * spread;
            pos._x = cat.hubX + tRadius * Math.cos(a);
            pos._y = cat.hubY + tRadius * Math.sin(a);
            pos._catKey = cat.key;
            pos._color = cat.color;
            allNodes.push(pos);
        });
    });

    // Draw connection lines (center → hubs → tickers)
    const linesGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
    linesGroup.setAttribute("class", "constellation-lines");
    svg.appendChild(linesGroup);

    categories.forEach((cat) => {
        const hubLine = createSVGLine(cx, cy, cat.hubX, cat.hubY, cat.color, 1.5, 0.25);
        hubLine.setAttribute("data-category", cat.key);
        linesGroup.appendChild(hubLine);

        cat.positions.forEach((pos) => {
            const tickerLine = createSVGLine(cat.hubX, cat.hubY, pos._x, pos._y, cat.color, 0.75, 0.12);
            tickerLine.setAttribute("data-category", cat.key);
            linesGroup.appendChild(tickerLine);
        });
    });

    // Center node
    const centerGroup = createNodeGroup(cx, cy, 42, "#1a1a1a", "#c9a96e", 2);
    const centerText1 = createSVGText(cx, cy - 6, "$2.2M", 13, "#c9a96e", 600);
    const centerText2 = createSVGText(cx, cy + 12, totalPositions + " positions", 8, "#777", 400);
    centerGroup.appendChild(centerText1);
    centerGroup.appendChild(centerText2);
    svg.appendChild(centerGroup);

    // Category hub nodes
    categories.forEach((cat) => {
        const hubGroup = createNodeGroup(cat.hubX, cat.hubY, 26, cat.color + "18", cat.color, 1.5);
        hubGroup.setAttribute("data-category", cat.key);
        hubGroup.classList.add("constellation-hub");

        const hubLabel = createSVGText(cat.hubX, cat.hubY - 4, cat.label, 8, cat.color, 600);
        const hubCount = createSVGText(cat.hubX, cat.hubY + 10, cat.positions.length.toString(), 9, "#f5f0eb", 500);
        hubGroup.appendChild(hubLabel);
        hubGroup.appendChild(hubCount);
        svg.appendChild(hubGroup);
    });

    // Ticker nodes
    const tooltip = document.createElement("div");
    tooltip.className = "constellation-tooltip";
    vizContainer.appendChild(tooltip);

    allNodes.forEach((pos, i) => {
        const nodeGroup = createNodeGroup(pos._x, pos._y, 16, "#1a1a1a", pos._color + "55", 1);
        nodeGroup.setAttribute("data-category", pos._catKey);
        nodeGroup.setAttribute("data-index", i);
        nodeGroup.classList.add("constellation-ticker");
        nodeGroup.style.animationDelay = (i * 20) + "ms";

        const label = createSVGText(pos._x, pos._y + 1, pos.ticker, 7, "#f5f0eb", 500);
        label.style.pointerEvents = "none";
        nodeGroup.appendChild(label);
        svg.appendChild(nodeGroup);

        nodeGroup.addEventListener("mouseenter", (e) => {
            nodeGroup.querySelector("circle").style.stroke = pos._color;
            nodeGroup.querySelector("circle").style.strokeWidth = "2";
            const priceText = pos.entryPrice ? "$" + pos.entryPrice.toFixed(2) : "Options";
            tooltip.innerHTML = `
                <div class="tooltip-ticker">${pos.ticker}</div>
                <div class="tooltip-company">${pos.company}</div>
                <div class="tooltip-detail">Entry: ${priceText}</div>
                <div class="tooltip-detail">${pos.entryDate} · ${pos.source}</div>
            `;
            tooltip.classList.add("visible");
            const rect = vizContainer.getBoundingClientRect();
            const svgRect = svg.getBoundingClientRect();
            const scaleX = svgRect.width / W;
            const scaleY = svgRect.height / H;
            tooltip.style.left = (pos._x * scaleX + svgRect.left - rect.left - tooltip.offsetWidth / 2) + "px";
            tooltip.style.top = (pos._y * scaleY + svgRect.top - rect.top - tooltip.offsetHeight - 20) + "px";
        });

        nodeGroup.addEventListener("mouseleave", () => {
            nodeGroup.querySelector("circle").style.stroke = pos._color + "55";
            nodeGroup.querySelector("circle").style.strokeWidth = "1";
            tooltip.classList.remove("visible");
        });
    });

    // Legend filtering
    const legendItems = document.querySelectorAll(".legend-item");
    legendItems.forEach((item) => {
        item.addEventListener("click", () => {
            legendItems.forEach((l) => l.classList.remove("active"));
            item.classList.add("active");
            const cat = item.dataset.category;
            filterComposition(cat, svg, gridContainer);
        });
    });

    // --- Position Cards Grid ---
    renderCompositionGrid(categories, gridContainer);
}

function filterComposition(category, svg, gridContainer) {
    const lines = svg.querySelectorAll("[data-category]");
    const cards = gridContainer.querySelectorAll(".comp-category");

    lines.forEach((el) => {
        if (category === "all") {
            el.style.opacity = "";
        } else {
            el.style.opacity = el.getAttribute("data-category") === category ? "" : "0.08";
        }
    });

    cards.forEach((el) => {
        if (category === "all") {
            el.style.display = "";
        } else {
            el.style.display = el.getAttribute("data-category") === category ? "" : "none";
        }
    });
}

function renderCompositionGrid(categories, container) {
    if (!container) return;

    categories.forEach((cat) => {
        const section = document.createElement("div");
        section.className = "comp-category";
        section.setAttribute("data-category", cat.key);

        const header = document.createElement("div");
        header.className = "comp-category-header";
        header.innerHTML = `
            <span class="comp-category-dot" style="background:${cat.color}"></span>
            <span class="comp-category-label">${cat.label}</span>
            <span class="comp-category-count">${cat.positions.length}</span>
        `;
        section.appendChild(header);

        const grid = document.createElement("div");
        grid.className = "comp-positions";

        cat.positions.forEach((pos) => {
            const card = document.createElement("div");
            card.className = "comp-card";
            card.style.borderColor = cat.color + "33";

            const priceHtml = pos.entryPrice
                ? `<span class="comp-card-price">$${pos.entryPrice.toFixed(2)}</span>`
                : `<span class="comp-card-price comp-card-options">Options</span>`;

            card.innerHTML = `
                <div class="comp-card-top">
                    <span class="comp-card-ticker" style="color:${cat.color}">${pos.ticker}</span>
                    ${priceHtml}
                </div>
                <span class="comp-card-company">${pos.company}</span>
            `;
            grid.appendChild(card);
        });

        section.appendChild(grid);
        container.appendChild(section);
    });
}

function createSVGLine(x1, y1, x2, y2, color, width, opacity) {
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", x1);
    line.setAttribute("y1", y1);
    line.setAttribute("x2", x2);
    line.setAttribute("y2", y2);
    line.setAttribute("stroke", color);
    line.setAttribute("stroke-width", width);
    line.setAttribute("opacity", opacity);
    return line;
}

function createNodeGroup(cx, cy, r, fill, stroke, strokeWidth) {
    const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", cx);
    circle.setAttribute("cy", cy);
    circle.setAttribute("r", r);
    circle.setAttribute("fill", fill);
    circle.setAttribute("stroke", stroke);
    circle.setAttribute("stroke-width", strokeWidth);
    g.appendChild(circle);
    return g;
}

function createSVGText(x, y, text, size, fill, weight) {
    const t = document.createElementNS("http://www.w3.org/2000/svg", "text");
    t.setAttribute("x", x);
    t.setAttribute("y", y);
    t.setAttribute("text-anchor", "middle");
    t.setAttribute("dominant-baseline", "middle");
    t.setAttribute("fill", fill);
    t.setAttribute("font-size", size);
    t.setAttribute("font-weight", weight);
    t.setAttribute("font-family", "'Inter', sans-serif");
    t.textContent = text;
    return t;
}

/* ---- Realized Trades Table with Hover Chart ---- */
function initRealizedTrades() {
    const tbody = document.getElementById("realizedBody");
    if (!tbody || typeof REALIZED_TRADES === "undefined") return;

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

        tr.addEventListener("mouseenter", (e) => showTradeChart(e, trade));
        tr.addEventListener("mouseleave", hideTradeChart);
    });
}

/* ---- Hover Chart (TradingView Lightweight Charts) ---- */
let chartPopup = null;
let chartInstance = null;

function showTradeChart(event, trade) {
    if (typeof LightweightCharts === "undefined") return;

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

    const rect = event.currentTarget.getBoundingClientRect();
    const popupWidth = 480;
    const popupHeight = 320;

    let left = rect.left + (rect.width - popupWidth) / 2;
    let top = rect.top - popupHeight - 8;

    if (top < 10) top = rect.bottom + 8;
    if (left < 10) left = 10;
    if (left + popupWidth > window.innerWidth - 10) left = window.innerWidth - popupWidth - 10;
    if (top + popupHeight > window.innerHeight - 10) top = window.innerHeight - popupHeight - 10;

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

        const candleSeries = chartInstance.addCandlestickSeries({
            upColor: "#4ade80",
            downColor: "#f87171",
            borderUpColor: "#4ade80",
            borderDownColor: "#f87171",
            wickUpColor: "#4ade80",
            wickDownColor: "#f87171",
        });
        candleSeries.setData(candles);

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

        if (trade.exitDate && trade.exitPrice) {
            markers.push({
                time: findNearestTime(candles, dateToTimestamp(trade.exitDate)),
                position: "aboveBar",
                color: "#f87171",
                shape: "arrowDown",
                text: "Exit $" + trade.exitPrice.toFixed(2),
            });
        }

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
                    label: "Fund Return",
                    data: GROWTH_DATA.portfolio,
                    backgroundColor: "rgba(201, 169, 110, 0.7)",
                    borderColor: "#c9a96e",
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
        ".certs-grid, .awards-list, .about-cta-inner, .key-metrics, " +
        ".composition-viz, .composition-legend, .composition-grid"
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
