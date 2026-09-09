/* ============================================
   Fund Application Logic
   Data source: js/fund-data.js (IBKR snapshot)
   ============================================ */

document.addEventListener("DOMContentLoaded", () => {
    initLoader();
    initNavigation();
    initMobileMenu();
    initSnapshot();
    initBenchmark();
    initWeeklyReturns();
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

    renderGrowth();

    // Each view gets its own footnote — they measure different things.
    const window = fmtDate(FUND_DATA.inceptionDate) + " to " + fmtDate(FUND_DATA.asOf);
    FOOTNOTES.total =
        "Every figure is measured over the same window — " + window + " — so they are " +
        "directly comparable. The account has no performance history before that date, " +
        "which is why the comparison is not run over the calendar year. Indices are " +
        "represented by their tracking ETFs (" + marks.map((m) => m.proxy).join(", ") +
        ") using daily closes.";
    FOOTNOTES.growth =
        "What $1,000 invested at inception would be worth, marked at each Friday close from " +
        window + ". The fund line is pinned to Friday closes, so its final point can sit " +
        "slightly below the headline return above, which uses the most recent mark. One point " +
        "is added per weekly refresh — the series grows with the track record rather than " +
        "being recalculated.";

    initChartToggle();
}

/* ---- Growth of $1,000 (animated) ---- */
const FOOTNOTES = { total: "", growth: "" };

const SERIES = [
    { key: "fund", label: "This Fund", color: "#c9a96e", width: 2.4 },
    { key: "spy",  label: "S&P 500",   color: "#8d8d8d", width: 1.5 },
    { key: "qqq",  label: "Nasdaq 100", color: "#6495ed", width: 1.5 },
];

const GROWTH_BASE = 1000;
const GROWTH_MS = 3500;

function renderGrowth() {
    const wrap = el("benchmarkGrowth");
    if (!wrap || typeof FUND_DATA === "undefined") return;
    const rows = FUND_DATA.history;
    if (!rows || rows.length < 2) {
        const t = el("chartToggle");
        if (t) t.hidden = true;
        return;
    }

    const W = 860, H = 380;
    const M = { top: 30, right: 96, bottom: 44, left: 66 };
    const iw = W - M.left - M.right, ih = H - M.top - M.bottom;
    const val = (r, k) => GROWTH_BASE * (1 + r[k] / 100);

    const all = rows.flatMap((r) => SERIES.map((sr) => val(r, sr.key)));
    let lo = Math.min(...all), hi = Math.max(...all);
    const pad = (hi - lo) * 0.12 || 1;
    lo -= pad; hi += pad;

    const x = (i) => M.left + (i / (rows.length - 1)) * iw;
    const y = (v) => M.top + (1 - (v - lo) / (hi - lo)) * ih;

    // y gridlines on round money values
    const span = hi - lo, rawStep = span / 4;
    const mag = Math.pow(10, Math.floor(Math.log10(rawStep)));
    const step = Math.ceil(rawStep / mag) * mag;
    const ticks = [];
    for (let t = Math.ceil(lo / step) * step; t <= hi; t += step) ticks.push(t);

    const grid = ticks.map((t) => `
        <line x1="${M.left}" y1="${y(t).toFixed(1)}" x2="${W - M.right}" y2="${y(t).toFixed(1)}"
              stroke="rgba(245,240,235,0.05)" stroke-width="1"/>
        <text x="${M.left - 12}" y="${(y(t) + 3.5).toFixed(1)}" text-anchor="end" font-size="9.5"
              fill="#666" font-family="Inter, sans-serif">$${Math.round(t).toLocaleString()}</text>`).join("");

    // the $1,000 starting line, called out
    const baseY = y(GROWTH_BASE);
    const baseLine = `
        <line x1="${M.left}" y1="${baseY.toFixed(1)}" x2="${W - M.right}" y2="${baseY.toFixed(1)}"
              stroke="rgba(245,240,235,0.22)" stroke-width="1" stroke-dasharray="3 3"/>`;

    const MON = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    const every = Math.max(1, Math.ceil(rows.length / 7));
    const xLabels = rows.map((r, i) => {
        if (i !== 0 && i !== rows.length - 1 && i % every !== 0) return "";
        const [, m, d] = r.date.split("-");
        return `<text class="growth-xlab" data-i="${i}" x="${x(i).toFixed(1)}" y="${H - M.bottom + 22}"
                 text-anchor="middle" font-size="9.5" fill="#666" opacity="0"
                 font-family="Inter, sans-serif">${+d} ${MON[+m - 1]}</text>`;
    }).join("");

    const paths = SERIES.map((sr) => {
        const d = rows.map((r, i) => `${i ? "L" : "M"}${x(i).toFixed(1)},${y(val(r, sr.key)).toFixed(1)}`).join(" ");
        return `<path class="growth-line" data-key="${sr.key}" d="${d}" fill="none"
                      stroke="${sr.color}" stroke-width="${sr.width}"
                      stroke-linejoin="round" stroke-linecap="round"/>`;
    }).join("");

    const dots = SERIES.map((sr) => `
        <circle class="growth-dot" data-key="${sr.key}" r="3.5" fill="${sr.color}" opacity="0"/>
        <text class="growth-val" data-key="${sr.key}" font-size="11" font-weight="600"
              fill="${sr.color}" font-family="Inter, sans-serif" opacity="0"></text>`).join("");

    wrap.innerHTML = `
        <svg viewBox="0 0 ${W} ${H}" class="growth-svg" role="img"
             aria-label="Growth of $1,000 since inception: this fund versus the S&amp;P 500 and Nasdaq 100">
            ${grid}${baseLine}${xLabels}${paths}${dots}
        </svg>
        <div class="path-key">
            ${SERIES.map((sr) => `<span class="path-key-item"><span class="path-swatch" style="background:${sr.color}"></span>${sr.label}</span>`).join("")}
        </div>`;

    // --- animation ---
    const svg = wrap.querySelector("svg");
    const lines = [...svg.querySelectorAll(".growth-line")];
    const labels = [...svg.querySelectorAll(".growth-xlab")];
    lines.forEach((p) => {
        const len = p.getTotalLength();
        p.style.strokeDasharray = len;
        p.style.strokeDashoffset = len;
        p._len = len;
    });

    const finals = {};
    SERIES.forEach((sr) => { finals[sr.key] = val(rows[rows.length - 1], sr.key); });

    let started = false;
    const run = () => {
        if (started) return;
        started = true;
        const t0 = performance.now();
        const ease = (t) => 1 - Math.pow(1 - t, 3);   // settles rather than stops dead

        const frame = (now) => {
            const t = Math.min(1, (now - t0) / GROWTH_MS);
            const e = ease(t);

            lines.forEach((p) => { p.style.strokeDashoffset = p._len * (1 - e); });

            // x labels appear as the line reaches them
            labels.forEach((lab) => {
                const frac = +lab.dataset.i / (rows.length - 1);
                lab.setAttribute("opacity", e >= frac ? "1" : "0");
            });

            // endpoint markers ride the line and count up
            SERIES.forEach((sr) => {
                const p = lines.find((l) => l.dataset.key === sr.key);
                const pt = p.getPointAtLength(p._len * e);
                const dot = svg.querySelector(`.growth-dot[data-key="${sr.key}"]`);
                const lbl = svg.querySelector(`.growth-val[data-key="${sr.key}"]`);
                dot.setAttribute("cx", pt.x); dot.setAttribute("cy", pt.y);
                dot.setAttribute("opacity", e > 0.02 ? "1" : "0");
                lbl.setAttribute("x", W - M.right + 10);
                lbl.setAttribute("y", pt.y + 3.5);
                lbl.setAttribute("opacity", e > 0.02 ? "1" : "0");
                const shown = GROWTH_BASE + (finals[sr.key] - GROWTH_BASE) * e;
                lbl.textContent = "$" + Math.round(shown).toLocaleString();
            });

            if (t < 1) requestAnimationFrame(frame);
            else deCollide(svg, W, M);
        };
        requestAnimationFrame(frame);
    };

    // only play once the chart is actually on screen
    if ("IntersectionObserver" in window) {
        new IntersectionObserver((entries, obs) => {
            entries.forEach((en) => { if (en.isIntersecting) { run(); obs.disconnect(); } });
        }, { threshold: 0.35 }).observe(wrap);
    } else {
        run();
    }
    wrap._replayGrowth = () => { started = false; lines.forEach((p) => { p.style.strokeDashoffset = p._len; }); run(); };
}

/* Two benchmarks routinely finish within a few dollars of each other; nudge
   their end labels apart so one does not print on top of the other. */
function deCollide(svg, W, M) {
    const lbls = [...svg.querySelectorAll(".growth-val")]
        .map((n) => ({ n, y: parseFloat(n.getAttribute("y")) }))
        .sort((a, b) => a.y - b.y);
    const GAP = 13;
    for (let i = 1; i < lbls.length; i++) {
        if (lbls[i].y - lbls[i - 1].y < GAP) {
            lbls[i].y = lbls[i - 1].y + GAP;
            lbls[i].n.setAttribute("y", lbls[i].y);
        }
    }
}

function initChartToggle() {
    const toggle = el("chartToggle");
    const bars = el("benchmarkCompare");
    const growth = el("benchmarkGrowth");
    if (!toggle || !bars || !growth) return;

    const note = el("perfFootnote");
    const usable = !toggle.hidden;
    if (!usable) { bars.hidden = false; growth.hidden = true; }
    const startView = usable ? "growth" : "total";
    if (note && FOOTNOTES[startView]) note.textContent = FOOTNOTES[startView];

    toggle.querySelectorAll(".legend-item").forEach((btn) => {
        btn.addEventListener("click", () => {
            toggle.querySelectorAll(".legend-item").forEach((b) => b.classList.remove("active"));
            btn.classList.add("active");
            const view = btn.dataset.view;
            const showGrowth = view === "growth";
            bars.hidden = showGrowth;
            growth.hidden = !showGrowth;
            if (note && FOOTNOTES[view]) note.textContent = FOOTNOTES[view];
            if (showGrowth && growth._replayGrowth) growth._replayGrowth();
        });
    });
}

/* ---- Weekly Returns ---- */
/* Derived from `history` rather than stored separately: those are cumulative
   returns, so each week's figure is the step between consecutive points. Adds
   a row automatically every refresh, with no extra data to maintain. */
function initWeeklyReturns() {
    const body = el("weeklyBody");
    if (!body || typeof FUND_DATA === "undefined" || !FUND_DATA.history) return;
    const rows = FUND_DATA.history;
    if (rows.length < 2) return;

    const MON = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    const stepPct = (cur, prev) => ((1 + cur / 100) / (1 + prev / 100) - 1) * 100;
    const cls = (v) => (v >= 0 ? "positive" : "negative");

    // newest first — the recent weeks are the ones anyone reads
    const weeks = [];
    for (let i = rows.length - 1; i >= 1; i--) {
        const f = stepPct(rows[i].fund, rows[i - 1].fund);
        const b = stepPct(rows[i].spy,  rows[i - 1].spy);
        weeks.push({ date: rows[i].date, fund: f, bench: b, diff: f - b });
    }

    body.innerHTML = weeks.map((w) => {
        const [y, m, d] = w.date.split("-");
        return `
            <tr>
                <td class="month-cell"><span class="month-name">${+d} ${MON[+m - 1]} ${y}</span></td>
                <td class="num ${cls(w.fund)}">${fmtPct(w.fund)}</td>
                <td class="num ${cls(w.bench)}">${fmtPct(w.bench)}</td>
                <td class="num diff-cell">
                    <span class="diff-chip ${cls(w.diff)}">${fmtPct(w.diff)}</span>
                </td>
            </tr>`;
    }).join("");

    const note = el("weeklyFootnote");
    if (note) {
        const ahead = weeks.filter((w) => w.diff > 0).length;
        note.textContent =
            "Time-weighted weekly returns, net of deposits and withdrawals, each measured " +
            "Friday close to Friday close. The fund finished ahead of the S&P 500 in " +
            ahead + " of " + weeks.length + " weeks. A new row is added by every refresh, " +
            "so the record lengthens rather than being restated.";
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

    // Five largest positions — no vs-entry column
    const topBody = el("attrTopBody");
    if (topBody) {
        const nameFor = (t) => (FUND_DATA.tickerNames || {})[t] || "";
        topBody.innerHTML = a.topPositions.map((p) => `
            <tr>
                <td class="pos-name"><span class="pos-ticker">${p.ticker}</span></td>
                <td class="pos-company">${nameFor(p.ticker)}</td>
                <td><span class="side-tag side-${p.side.toLowerCase()}">${p.side}</span></td>
                <td>${p.pctNav.toFixed(2)}%</td>
            </tr>
        `).join("");
    }

    const note = el("attrFootnote");
    if (note) {
        note.textContent =
            "Sector weights come from Interactive Brokers and are shown as a share of long " +
            "equity exposure. The short book is a separate " + a.sectorsShort[0].pct.toFixed(0) +
            "% concentration in " + a.sectorsShort[0].name + ", which is why net sector exposure " +
            "is shown alongside — the long book alone would not describe the actual position.";
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
        const nameFor = (t) => (FUND_DATA.tickerNames || {})[t] || "";
        const rowsHtml = g.rows.map((r) => {
            const name = isOptions
                ? `<span class="pos-ticker">${r.ticker}</span><span class="pos-contract">${r.contract}</span>`
                : `<span class="pos-ticker">${r.ticker}</span>`;
            return `
                <tr>
                    <td class="pos-name">${name}</td>
                    <td class="pos-company">${nameFor(r.ticker)}</td>
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
                            <th>Company</th>
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
    const groups = document.querySelectorAll(
        ".snippet-highlights, .portfolio-preview-stats, .role-grid, .key-metrics, " +
        ".risk-grid, .certs-grid, .edu-cards, .contact-preview-links, .contact-links-centered"
    );
    groups.forEach((g) => g.classList.add("reveal-stagger"));

    const singles = document.querySelectorAll(
        ".section-header, .about-intro-grid, .portfolio-summary, .summary-card, " +
        ".snippet-grid, .snippet-image, .snippet-content, .snippet-content-full, " +
        ".page-intro, .timeline-item, .skills-sections, .awards-list, " +
        ".about-cta-inner, .perf-block, .scope-note, .role-card"
    );
    singles.forEach((e) => e.classList.add("reveal"));

    const watched = [...groups, ...singles];
    watched.forEach((e) => e.classList.add("reveal"));

    const observer = new IntersectionObserver(
        (entries) => entries.forEach((e) => {
            if (e.isIntersecting) {
                e.target.classList.add("visible");
                observer.unobserve(e.target);   // reveal once, then stop watching
            }
        }),
        { threshold: 0.12, rootMargin: "0px 0px -70px 0px" }
    );
    watched.forEach((e) => observer.observe(e));
}
