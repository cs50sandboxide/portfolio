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

    if (el("perfFootnote")) {
        const names = marks.map((m) => m.proxy).join(", ");
        el("perfFootnote").textContent =
            "Every figure is measured over the same window — " + fmtDate(FUND_DATA.inceptionDate) +
            " to " + fmtDate(FUND_DATA.asOf) + " — so they are directly comparable. " +
            "The account has no performance history before that date, which is why the " +
            "comparison is not run over the calendar year. Indices are represented by their " +
            "tracking ETFs (" + names + ") using daily closes.";
    }
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
                ${MONTHS[mo - 1]} ${y}
                ${m.partial ? '<span class="month-partial">partial</span>' : ""}
            </td>
            <td class="num ${cls(m.fund)}">${fmtPct(m.fund)}</td>
            <td class="num ${hasBench ? cls(m.benchmark) : "muted"}">${hasBench ? fmtPct(m.benchmark) : "—"}</td>
            <td class="num ${diff === null ? "muted" : cls(diff)}">${diff === null ? "—" : fmtPct(diff)}</td>
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

        const rowsHtml = g.rows.map((r) => {
            const name = isOptions
                ? `<span class="pos-ticker">${r.ticker}</span><span class="pos-contract">${r.contract}</span>`
                : `<span class="pos-ticker">${r.ticker}</span>`;
            const qty = r.quantity > 0 ? "+" + r.quantity.toLocaleString() : r.quantity.toLocaleString();
            return `
                <tr>
                    <td class="pos-name">${name}</td>
                    <td class="pos-qty">${qty}</td>
                    <td>${fmtPrice(r.price)}</td>
                    <td class="pos-value">${fmtMoney(r.value)}</td>
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
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Market Value</th>
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
