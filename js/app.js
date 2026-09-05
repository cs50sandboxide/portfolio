/* ============================================
   Fund Application Logic
   Data source: js/fund-data.js (IBKR snapshot)
   ============================================ */

document.addEventListener("DOMContentLoaded", () => {
    initLoader();
    initBanner();
    initNavigation();
    initMobileMenu();
    initSnapshot();
    initBenchmark();
    initMonthlyReturns();
    initRisk();
    initAttribution();
    initPositions();
    initScrollReveal();
});

/* ---- Helpers ---- */
const el = (id) => document.getElementById(id);

function fmtMoney(v) {
    const abs = Math.abs(v);
    const sign = v < 0 ? "-" : "";
    if (abs >= 1000000) return sign + "$" + (abs / 1000000).toFixed(2) + "M";
    if (abs >= 1000) return sign + "$" + Math.round(abs / 1000).toLocaleString() + "K";
    return sign + "$" + abs.toFixed(0);
}

function fmtPrice(v) {
    return "$" + v.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function fmtPct(v) {
    return (v >= 0 ? "+" : "") + v.toFixed(2) + "%";
}

function fmtDate(iso) {
    const [y, m, d] = iso.split("-").map(Number);
    const months = ["January", "February", "March", "April", "May", "June",
                    "July", "August", "September", "October", "November", "December"];
    return d + " " + months[m - 1] + " " + y;
}

/* ---- Top Banner (homepage) ---- */
function initBanner() {
    if (typeof FUND_DATA === "undefined") return;
    if (el("mtdLabel")) el("mtdLabel").textContent = "Return Since Inception";
    if (el("mtdValue")) el("mtdValue").textContent = fmtPct(FUND_DATA.returnSinceInception);
    if (el("mtdPct")) {
        el("mtdPct").textContent =
            "(S&P 500 " + fmtPct(FUND_DATA.benchmark.sinceInception) + " over the same window)";
    }
}

/* ---- Loader ---- */
function initLoader() {
    const loader = el("loader");
    if (!loader) return;
    window.addEventListener("load", () => {
        setTimeout(() => loader.classList.add("hidden"), 600);
    });
    setTimeout(() => loader.classList.add("hidden"), 2000);
}

/* ---- Navigation ---- */
function initNavigation() {
    const navbar = el("navbar");
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
    const btn = el("menuBtn");
    const menu = el("mobileMenu");
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

/* ---- Headline Figures ---- */
function initSnapshot() {
    if (typeof FUND_DATA === "undefined") return;

    if (el("asOfDate")) el("asOfDate").textContent = fmtDate(FUND_DATA.asOf);
    if (el("portfolioValue")) el("portfolioValue").textContent = fmtMoney(FUND_DATA.portfolioValue);

    if (el("returnSinceInception")) {
        const v = FUND_DATA.returnSinceInception;
        const node = el("returnSinceInception");
        node.textContent = fmtPct(v);
        node.className = "summary-value " + (v >= 0 ? "positive" : "negative");
    }
    if (el("inceptionNote")) {
        el("inceptionNote").textContent = "Since " + fmtDate(FUND_DATA.inceptionDate) + " · time-weighted";
    }

    if (el("mtdReturn")) {
        const v = FUND_DATA.mtdReturn;
        const node = el("mtdReturn");
        node.textContent = fmtPct(v);
        node.className = "summary-value " + (v >= 0 ? "positive" : "negative");
    }
    if (el("mtdNote")) el("mtdNote").textContent = FUND_DATA.mtdWindow;

    // Homepage preview stats — may appear in more than one block
    const p = FUND_DATA.positions;
    const values = {
        value: fmtMoney(FUND_DATA.portfolioValue),
        return: fmtPct(FUND_DATA.returnSinceInception),
        benchmark: fmtPct(FUND_DATA.benchmark.sinceInception),
        positions: String(p.longs.length + p.shorts.length + p.options.length),
    };
    document.querySelectorAll("[data-fund]").forEach((node) => {
        const key = node.dataset.fund;
        if (values[key] !== undefined) node.textContent = values[key];
    });
}

/* ---- Benchmark Comparison ---- */
function initBenchmark() {
    const wrap = el("benchmarkCompare");
    if (!wrap || typeof FUND_DATA === "undefined") return;

    const marks = FUND_DATA.benchmarks || [{
        name: FUND_DATA.benchmark.name,
        proxy: FUND_DATA.benchmark.proxy,
        sinceInception: FUND_DATA.benchmark.sinceInception,
    }];

    const cols = [
        { label: "This Fund", value: FUND_DATA.returnSinceInception, accent: "#c9a96e" },
        ...marks.map((m) => ({
            label: m.name, sub: m.proxy, value: m.sinceInception, accent: "#777777",
        })),
    ];

    // Scale so the zero line sits correctly even if a return goes negative.
    // Pad whichever ends actually extend, so value labels always have room
    // outside the bar without colliding with the category labels below.
    const vals = cols.map((c) => c.value);
    const maxV = Math.max(...vals, 0);
    const minV = Math.min(...vals, 0);
    const range = (maxV - minV) || 1;
    const pad = range * 0.14;
    const top = maxV + (maxV > 0 ? pad : 0);
    const bottomBound = minV - (minV < 0 ? pad : 0);
    const span = (top - bottomBound) || 1;
    const zeroPct = (-bottomBound / span) * 100;

    // Plot row: bars + axis. Labels sit in a separate row so the axis
    // line never runs through them.
    const barsHtml = cols.map((c) => {
        const magnitude = (Math.abs(c.value) / span) * 100;
        const isNeg = c.value < 0;
        const bottom = isNeg ? zeroPct - magnitude : zeroPct;
        return `
            <div class="bench-col">
                <div class="bench-bar${isNeg ? " bench-bar-neg" : ""}"
                     data-target="${magnitude}"
                     style="bottom:${bottom}%; height:0%; background:${c.accent}">
                    <span class="bench-bar-value ${isNeg ? "negative" : "positive"}">${fmtPct(c.value)}</span>
                </div>
            </div>`;
    }).join("");

    const labelsHtml = cols.map((c) => `
        <div class="bench-col bench-col-label">
            <span class="bench-col-name">${c.label}</span>
            ${c.sub ? `<span class="bench-col-sub">${c.sub}</span>` : ""}
        </div>`).join("");

    const chart = document.createElement("div");
    chart.className = "bench-chart";
    chart.innerHTML = `
        <div class="bench-plot-row">
            <div class="bench-axis" style="bottom:${zeroPct}%"></div>
            <div class="bench-cols">${barsHtml}</div>
        </div>
        <div class="bench-cols bench-label-row">${labelsHtml}</div>
    `;
    wrap.appendChild(chart);

    requestAnimationFrame(() => {
        chart.querySelectorAll(".bench-bar").forEach((bar) => {
            bar.style.height = bar.dataset.target + "%";
        });
    });

    renderReturnPath();

    // Each view gets its own footnote — they measure different things.
    const window = fmtDate(FUND_DATA.inceptionDate) + " to " + fmtDate(FUND_DATA.asOf);
    FOOTNOTES.total =
        "Every figure is measured over the same window — " + window + " — so they are " +
        "directly comparable. The account has no performance history before that date, " +
        "which is why the comparison is not run over the calendar year. Indices are " +
        "represented by their tracking ETFs (" + marks.map((m) => m.proxy).join(", ") +
        ") using daily closes.";
    FOOTNOTES.path =
        "Cumulative return since inception, marked at each Friday close from " + window +
        ". The fund's final point can sit slightly below the headline figure above, " +
        "because this line is pinned to Friday closes while the headline uses the most " +
        "recent mark. One point is added per weekly refresh — the line grows with the " +
        "track record rather than being recalculated.";

    initChartToggle();
}

/* ---- Weekly Return Path (line chart) ---- */
const FOOTNOTES = { total: "", path: "" };

const SERIES = [
    { key: "fund", label: "This Fund", color: "#c9a96e", width: 2 },
    { key: "spy",  label: "S&P 500",   color: "#8d8d8d", width: 1.4 },
    { key: "qqq",  label: "Nasdaq 100", color: "#6495ed", width: 1.4 },
];

function renderReturnPath() {
    const wrap = el("benchmarkPath");
    if (!wrap || typeof FUND_DATA === "undefined") return;
    const rows = FUND_DATA.history;
    if (!rows || rows.length < 2) {
        // Not enough points to draw a line — hide the toggle rather than
        // show a chart with one dot on it.
        const t = el("chartToggle");
        if (t) t.hidden = true;
        return;
    }

    const W = 760, H = 340;
    const M = { top: 24, right: 56, bottom: 40, left: 52 };
    const iw = W - M.left - M.right;
    const ih = H - M.top - M.bottom;

    const vals = rows.flatMap((r) => SERIES.map((s) => r[s.key]));
    let lo = Math.min(...vals, 0);
    let hi = Math.max(...vals, 0);
    const pad = (hi - lo) * 0.12 || 1;
    lo -= pad; hi += pad;

    const x = (i) => M.left + (i / (rows.length - 1)) * iw;
    const y = (v) => M.top + (1 - (v - lo) / (hi - lo)) * ih;

    // Y gridlines on rounded values
    const span = hi - lo;
    const stepRaw = span / 5;
    const mag = Math.pow(10, Math.floor(Math.log10(stepRaw)));
    const step = Math.ceil(stepRaw / mag) * mag;
    const ticks = [];
    for (let t = Math.ceil(lo / step) * step; t <= hi; t += step) ticks.push(t);

    const gridHtml = ticks.map((t) => `
        <line x1="${M.left}" y1="${y(t).toFixed(1)}" x2="${W - M.right}" y2="${y(t).toFixed(1)}"
              stroke="${Math.abs(t) < 1e-9 ? "rgba(245,240,235,0.18)" : "rgba(245,240,235,0.05)"}"
              stroke-width="1"/>
        <text x="${M.left - 10}" y="${(y(t) + 3.5).toFixed(1)}" text-anchor="end"
              font-size="9" fill="#666" font-family="Inter, sans-serif">${t > 0 ? "+" : ""}${Math.round(t)}%</text>
    `).join("");

    // X labels — first, last, and a few between, without crowding
    const every = Math.max(1, Math.ceil(rows.length / 6));
    const xLabels = rows.map((r, i) => {
        if (i !== 0 && i !== rows.length - 1 && i % every !== 0) return "";
        const [, m, d] = r.date.split("-");
        const mon = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][+m - 1];
        return `<text x="${x(i).toFixed(1)}" y="${H - M.bottom + 20}" text-anchor="middle"
                 font-size="9" fill="#666" font-family="Inter, sans-serif">${+d} ${mon}</text>`;
    }).join("");

    // End-of-line value labels. Series that finish close together would print
    // on top of each other (SPY and QQQ routinely land within a point of one
    // another), so nudge them apart before drawing.
    const MIN_GAP = 12;
    const labels = SERIES.map((s) => {
        const v = rows[rows.length - 1][s.key];
        return { color: s.color, value: v, yAnchor: y(v), yText: y(v) };
    }).sort((a, b) => a.yText - b.yText);

    for (let i = 1; i < labels.length; i++) {
        const gap = labels[i].yText - labels[i - 1].yText;
        if (gap < MIN_GAP) labels[i].yText = labels[i - 1].yText + MIN_GAP;
    }
    // Keep the nudged stack inside the plot
    const overflow = labels[labels.length - 1].yText - (H - M.bottom);
    if (overflow > 0) labels.forEach((l) => { l.yText -= overflow; });

    const linesHtml = SERIES.map((s) => {
        const d = rows.map((r, i) => `${i ? "L" : "M"}${x(i).toFixed(1)},${y(r[s.key]).toFixed(1)}`).join(" ");
        const last = rows[rows.length - 1][s.key];
        return `
            <path d="${d}" fill="none" stroke="${s.color}" stroke-width="${s.width}"
                  stroke-linejoin="round" stroke-linecap="round"/>
            <circle cx="${x(rows.length - 1).toFixed(1)}" cy="${y(last).toFixed(1)}" r="3" fill="${s.color}"/>
        `;
    }).join("");

    const labelsHtml = labels.map((l) => {
        // If the label was moved, draw a short leader so it still reads as
        // belonging to its line.
        const moved = Math.abs(l.yText - l.yAnchor) > 1;
        const leader = moved
            ? `<line x1="${(W - M.right + 3).toFixed(1)}" y1="${l.yAnchor.toFixed(1)}"
                     x2="${(W - M.right + 7).toFixed(1)}" y2="${l.yText.toFixed(1)}"
                     stroke="${l.color}" stroke-width="1" opacity="0.5"/>`
            : "";
        return `${leader}
            <text x="${W - M.right + 9}" y="${(l.yText + 3.5).toFixed(1)}"
                  font-size="10" font-weight="600" fill="${l.color}"
                  font-family="Inter, sans-serif">${l.value > 0 ? "+" : ""}${l.value.toFixed(1)}%</text>`;
    }).join("");

    const pathsHtml = linesHtml + labelsHtml;

    wrap.innerHTML = `
        <svg viewBox="0 0 ${W} ${H}" class="path-svg" role="img"
             aria-label="Cumulative return since inception: fund versus S&amp;P 500 and Nasdaq 100, weekly">
            ${gridHtml}${xLabels}${pathsHtml}
        </svg>
        <div class="path-key">
            ${SERIES.map((s) => `<span class="path-key-item"><span class="path-swatch" style="background:${s.color}"></span>${s.label}</span>`).join("")}
        </div>
    `;
}

function initChartToggle() {
    const toggle = el("chartToggle");
    const bars = el("benchmarkCompare");
    const path = el("benchmarkPath");
    if (!toggle || !bars || !path) return;

    // The weekly path is the default view — it shows the shape of the track
    // record, not just its endpoint. If there are too few points to draw a
    // line, renderReturnPath hides the toggle and we fall back to the bars.
    const note = el("perfFootnote");
    const pathUsable = !toggle.hidden;
    if (!pathUsable) {
        bars.hidden = false;
        path.hidden = true;
    }
    const startView = pathUsable ? "path" : "total";
    if (note && FOOTNOTES[startView]) note.textContent = FOOTNOTES[startView];

    toggle.querySelectorAll(".legend-item").forEach((btn) => {
        btn.addEventListener("click", () => {
            toggle.querySelectorAll(".legend-item").forEach((b) => b.classList.remove("active"));
            btn.classList.add("active");
            const view = btn.dataset.view;
            const showPath = view === "path";
            bars.hidden = showPath;
            path.hidden = !showPath;
            if (note && FOOTNOTES[view]) note.textContent = FOOTNOTES[view];
        });
    });
}

/* ---- Monthly Returns ---- */
function initMonthlyReturns() {
    const body = el("monthlyBody");
    if (!body || typeof FUND_DATA === "undefined" || !FUND_DATA.monthlyReturns) return;

    const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    FUND_DATA.monthlyReturns.forEach((m) => {
        const [y, mo] = m.month.split("-").map(Number);
        const hasBench = m.benchmark !== null && m.benchmark !== undefined;
        const diff = hasBench ? m.fund - m.benchmark : null;

        const cls = (v) => (v >= 0 ? "positive" : "negative");
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td class="month-cell">
                <span class="month-name">${MONTHS[mo - 1]} ${y}</span>
                ${m.partial ? '<span class="month-partial">partial</span>' : ""}
            </td>
            <td class="num ${cls(m.fund)}">${fmtPct(m.fund)}</td>
            <td class="num ${hasBench ? cls(m.benchmark) : "muted"}">${hasBench ? fmtPct(m.benchmark) : "—"}</td>
            <td class="num diff-cell">
                <span class="diff-chip ${diff === null ? "muted" : cls(diff)}">${diff === null ? "—" : fmtPct(diff)}</span>
            </td>
        `;
        body.appendChild(tr);
    });

    const note = el("monthlyFootnote");
    if (note) {
        const full = FUND_DATA.monthlyReturns.filter((m) => !m.partial);
        const down = full.filter((m) => m.fund < 0).length;
        note.textContent =
            "Time-weighted monthly returns, net of deposits and withdrawals. " +
            "April and August are partial periods — the account opened " +
            fmtDate(FUND_DATA.inceptionDate) + ". Of " + full.length +
            " complete months, " + down + " were negative; the cumulative return " +
            "is concentrated in a single month, which the table is here to make visible " +
            "rather than obscure.";
    }
}

/* ---- Risk & Exposure ---- */
function initRisk() {
    if (typeof FUND_DATA === "undefined" || !FUND_DATA.risk) return;
    const r = FUND_DATA.risk;
    const x = FUND_DATA.exposure;

    if (el("riskDrawdown")) el("riskDrawdown").textContent = fmtPct(r.maxDrawdown);
    if (el("riskSharpe")) el("riskSharpe").textContent = r.sharpe.toFixed(2);
    if (el("riskSharpeNote")) {
        el("riskSharpeNote").textContent =
            "Over " + r.tradingDays + " trading days · " + r.sharpeRiskFree.toFixed(0) + "% risk-free";
    }
    if (el("riskGross")) el("riskGross").textContent = x.grossPct.toFixed(0) + "%";
    if (el("riskNet")) el("riskNet").textContent = "+" + x.netPct.toFixed(0) + "%";

    // Long / short / cash composition bar, scaled to gross + cash
    const bar = el("exposureBar");
    if (bar) {
        const segs = [
            { label: "Long", pct: x.longPct, color: "#4ade80" },
            { label: "Short", pct: Math.abs(x.shortPct), color: "#f87171" },
            { label: "Cash", pct: x.cashPct, color: "#777777" },
        ];
        const total = segs.reduce((s, g) => s + g.pct, 0) || 1;
        bar.innerHTML = `
            <div class="exposure-track">
                ${segs.map((g) => `<div class="exposure-seg" style="width:${(g.pct / total) * 100}%; background:${g.color}"></div>`).join("")}
            </div>
            <div class="exposure-key">
                ${segs.map((g) => `<span class="exposure-key-item"><span class="legend-dot" style="background:${g.color}"></span>${g.label} ${g.pct.toFixed(0)}% of NAV</span>`).join("")}
            </div>
        `;
    }

    if (el("riskFootnote")) {
        el("riskFootnote").textContent =
            "Exposure is reported by Interactive Brokers and reconciles exactly to net liquidation value. " +
            "Drawdown and Sharpe are standard statistics computed on IBKR's own daily time-weighted return " +
            "series, measured over " + r.tradingDays + " trading days since inception — a short sample, so " +
            "they describe the period rather than predict future results. Annualised volatility over the same " +
            "window is " + r.annualizedVol.toFixed(0) + "%, reflecting " + FUND_DATA.leverage +
            "x gross leverage. No return figure on this site is annualised or extrapolated.";
    }
}

/* ---- Attribution ---- */
const SECTOR_COLORS = [
    "#c9a96e", "#6495ed", "#4ade80", "#d98b6a", "#9d7fd4",
    "#5eb8b3", "#b8a05e", "#7f8fa6", "#c47f9c", "#8d8d8d",
];

function initAttribution() {
    if (typeof FUND_DATA === "undefined" || !FUND_DATA.attribution) return;
    const a = FUND_DATA.attribution;

    renderSectorDonut(a.sectorsLong);
    renderNetTilt(a.netTilt);

    // Five largest positions
    const topBody = el("attrTopBody");
    if (topBody) {
        topBody.innerHTML = a.topPositions.map((p) => `
            <tr>
                <td class="pos-name"><span class="pos-ticker">${p.ticker}</span></td>
                <td><span class="side-tag side-${p.side.toLowerCase()}">${p.side}</span></td>
                <td class="num">${p.pctNav.toFixed(1)}%</td>
                <td class="num ${p.move >= 0 ? "positive" : "negative"}">${fmtPct(p.move)}</td>
            </tr>
        `).join("");
    }

    // Contributors then detractors, in one table split by a divider row
    const cBody = el("attrContribBody");
    if (cBody) {
        const row = (p) => `
            <tr>
                <td class="pos-name"><span class="pos-ticker">${p.ticker}</span></td>
                <td><span class="side-tag side-${p.side.toLowerCase()}">${p.side}</span></td>
                <td class="num ${p.pp >= 0 ? "positive" : "negative"}">${p.pp >= 0 ? "+" : ""}${p.pp.toFixed(2)}pp</td>
                <td class="num ${p.move >= 0 ? "positive" : "negative"}">${fmtPct(p.move)}</td>
            </tr>`;
        cBody.innerHTML =
            a.contributors.map(row).join("") +
            `<tr class="attr-divider"><td colspan="4"></td></tr>` +
            a.detractors.map(row).join("");
    }

    const note = el("attrFootnote");
    if (note) {
        note.textContent =
            "Sector weights come from Interactive Brokers and are shown as a share of long " +
            "equity exposure; the short book is a separate " + a.sectorsShort[0].pct.toFixed(0) +
            "% concentration in " + a.sectorsShort[0].name + ", which is why net sector exposure " +
            "is shown alongside. Contribution figures are unrealised moves on positions open " +
            "today, measured against their average entry price, and sum to " +
            a.openContribTotal.toFixed(1) + "pp. They do not reconcile to the " +
            fmtPct(FUND_DATA.returnSinceInception) + " since inception, which came predominantly " +
            "from closed trades this panel cannot see — it describes how the book is positioned " +
            "now, not what produced the return. Options are excluded from the contribution " +
            "ranking: they are small in dollar terms and would otherwise dominate on percentage.";
    }
}

function renderSectorDonut(sectors) {
    const wrap = el("attrDonut");
    if (!wrap || !sectors) return;

    const S = 200, R = 82, r = 50, cx = S / 2, cy = S / 2;
    let angle = -Math.PI / 2;

    const arcs = sectors.map((s, i) => {
        const sweep = (s.pct / 100) * Math.PI * 2;
        const a0 = angle, a1 = angle + sweep;
        angle = a1;
        const large = sweep > Math.PI ? 1 : 0;
        const p = (rad, ang) => `${(cx + rad * Math.cos(ang)).toFixed(2)},${(cy + rad * Math.sin(ang)).toFixed(2)}`;
        const d = `M${p(R, a0)} A${R},${R} 0 ${large} 1 ${p(R, a1)} L${p(r, a1)} A${r},${r} 0 ${large} 0 ${p(r, a0)} Z`;
        return `<path d="${d}" fill="${SECTOR_COLORS[i % SECTOR_COLORS.length]}" opacity="0.85"><title>${s.name}: ${s.pct.toFixed(1)}%</title></path>`;
    }).join("");

    wrap.innerHTML = `
        <svg viewBox="0 0 ${S} ${S}" class="donut-svg" role="img"
             aria-label="Long book by sector">${arcs}</svg>
        <ul class="donut-key">
            ${sectors.map((s, i) => `
                <li><span class="donut-swatch" style="background:${SECTOR_COLORS[i % SECTOR_COLORS.length]}"></span>
                    <span class="donut-name">${s.name}</span>
                    <span class="donut-pct">${s.pct.toFixed(1)}%</span></li>`).join("")}
        </ul>`;
}

function renderNetTilt(tilt) {
    const wrap = el("attrTilt");
    if (!wrap || !tilt) return;

    const max = Math.max(...tilt.map((t) => Math.abs(t.pct))) || 1;
    wrap.innerHTML = tilt.map((t) => {
        const width = (Math.abs(t.pct) / max) * 50;   // half-width each side of centre
        const neg = t.pct < 0;
        return `
            <div class="tilt-row">
                <span class="tilt-name">${t.name}</span>
                <div class="tilt-track">
                    <div class="tilt-axis"></div>
                    <div class="tilt-bar ${neg ? "tilt-neg" : "tilt-pos"}"
                         style="${neg ? `right:50%` : `left:50%`}; width:${width.toFixed(1)}%"></div>
                </div>
                <span class="tilt-val ${neg ? "negative" : "positive"}">${neg ? "−" : "+"}${Math.abs(t.pct).toFixed(0)}%</span>
            </div>`;
    }).join("");
}

/* ---- Open Positions ---- */
function initPositions() {
    const wrap = el("positionsWrap");
    if (!wrap || typeof FUND_DATA === "undefined") return;

    const p = FUND_DATA.positions;
    if (el("positionCount")) {
        el("positionCount").textContent = p.longs.length + p.shorts.length + p.options.length;
    }

    const groups = [
        { key: "longs",   label: "Long Equity",   accent: "#4ade80", rows: p.longs },
        { key: "shorts",  label: "Short Equity",  accent: "#f87171", rows: p.shorts },
        { key: "options", label: "Options",       accent: "#c9a96e", rows: p.options },
    ];

    groups.forEach((g) => {
        const section = document.createElement("div");
        section.className = "pos-group";
        section.setAttribute("data-group", g.key);

        const isOptions = g.key === "options";

        // Position sizes are shown as a share of NAV, never in dollars.
        // Quantity is omitted deliberately: quantity x price reconstructs the
        // dollar value exactly, so printing both would undo the choice.
        const rowsHtml = g.rows.map((r) => {
            const name = isOptions
                ? `<span class="pos-ticker">${r.ticker}</span><span class="pos-contract">${r.contract}</span>`
                : `<span class="pos-ticker">${r.ticker}</span>`;
            return `
                <tr>
                    <td class="pos-name">${name}</td>
                    <td>${fmtPrice(r.price)}</td>
                    <td class="pos-value">${r.pctNav.toFixed(2)}%</td>
                </tr>
            `;
        }).join("");

        section.innerHTML = `
            <div class="pos-group-header">
                <span class="pos-group-dot" style="background:${g.accent}"></span>
                <span class="pos-group-label">${g.label}</span>
                <span class="pos-group-count">${g.rows.length}</span>
            </div>
            <div class="positions-table-wrap">
                <table class="positions-table">
                    <thead>
                        <tr>
                            <th>${isOptions ? "Contract" : "Ticker"}</th>
                            <th>Price</th>
                            <th>% of NAV</th>
                        </tr>
                    </thead>
                    <tbody>${rowsHtml}</tbody>
                </table>
            </div>
        `;
        wrap.appendChild(section);
    });

    // Filter buttons
    const buttons = document.querySelectorAll("#positionsFilter .legend-item");
    buttons.forEach((btn) => {
        btn.addEventListener("click", () => {
            buttons.forEach((b) => b.classList.remove("active"));
            btn.classList.add("active");
            const group = btn.dataset.group;
            wrap.querySelectorAll(".pos-group").forEach((sec) => {
                sec.style.display =
                    group === "all" || sec.getAttribute("data-group") === group ? "" : "none";
            });
        });
    });
}

/* ---- Scroll Reveal ---- */
function initScrollReveal() {
    const revealElements = document.querySelectorAll(
        ".section-header, .about-intro-grid, .portfolio-summary, " +
        ".summary-card, .snippet-grid, .snippet-content-full, .snippet-highlights, " +
        ".portfolio-preview-stats, .contact-preview-links, " +
        ".page-intro, .timeline, .edu-cards, .skills-sections, " +
        ".certs-grid, .awards-list, .about-cta-inner, .key-metrics, " +
        ".perf-block"
    );
    revealElements.forEach((e) => e.classList.add("reveal"));
    const observer = new IntersectionObserver(
        (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
        { threshold: 0.1, rootMargin: "0px 0px -60px 0px" }
    );
    revealElements.forEach((e) => observer.observe(e));
}
