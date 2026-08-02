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

    const fund = FUND_DATA.returnSinceInception;
    const bench = FUND_DATA.benchmark.sinceInception;
    const peak = Math.max(Math.abs(fund), Math.abs(bench), 1);

    const rows = [
        { label: "This Fund", value: fund, accent: "#c9a96e" },
        { label: FUND_DATA.benchmark.name + " (" + FUND_DATA.benchmark.proxy + ")", value: bench, accent: "#777777" },
    ];

    rows.forEach((row) => {
        const pct = (Math.abs(row.value) / peak) * 100;
        const bar = document.createElement("div");
        bar.className = "bench-row";
        bar.innerHTML = `
            <span class="bench-label">${row.label}</span>
            <div class="bench-track">
                <div class="bench-fill" style="width:0%; background:${row.accent}"></div>
            </div>
            <span class="bench-value ${row.value >= 0 ? "positive" : "negative"}">${fmtPct(row.value)}</span>
        `;
        wrap.appendChild(bar);
        // Animate on next frame so the transition runs
        requestAnimationFrame(() => {
            bar.querySelector(".bench-fill").style.width = pct + "%";
        });
    });

    if (el("perfFootnote")) {
        el("perfFootnote").textContent =
            "Both figures measured over the same window — " + fmtDate(FUND_DATA.inceptionDate) +
            " to " + fmtDate(FUND_DATA.asOf) + " — so they are directly comparable. " +
            "The account has no performance history before that date. " +
            "For reference, the " + FUND_DATA.benchmark.name + " returned " +
            fmtPct(FUND_DATA.benchmark.calendarYtd) + " over the calendar year to date.";
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
