/* ============================================
   Editing, on the site

   The site is static: there is no server to check who you are, so there is no
   way to hide an edit button from anybody. The honest arrangement is that
   editing is open to anyone who finds it, and *publishing* is not.

   Edit mode is reached at #edit. Anything typed there lives in the browser and
   changes nothing for anyone else. Publishing writes js/notes.js to GitHub,
   which needs a fine-grained token with Contents: write on this repository and
   nothing else. The token is kept in this browser's localStorage, is never
   committed, and is only ever sent to api.github.com. Without it the editor
   still works and will hand back the file to commit by hand.

   A visitor who opens #edit sees their own edits and cannot publish them.
   ============================================ */

(function () {
    "use strict";

    const REPO = "cs50sandboxide/portfolio";
    const BRANCH = "main";
    const FILE = "js/notes.js";
    const TOKEN_KEY = "akv.gh.token";
    const DRAFT_KEY = "akv.notes.draft";

    const store = {
        get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
        set(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* private mode */ } },
        drop(k) { try { localStorage.removeItem(k); } catch (e) { /* private mode */ } },
    };

    // Working copy. Starts from the published file, or from an unpublished
    // draft if one was left behind.
    let data = { theses: [], weekly: {} };
    let dirty = false;

    function load() {
        const published = (typeof NOTES !== "undefined" && NOTES) ? NOTES : {};
        data = {
            theses: Array.isArray(published.theses) ? JSON.parse(JSON.stringify(published.theses)) : [],
            weekly: published.weekly ? JSON.parse(JSON.stringify(published.weekly)) : {},
        };
        const draft = store.get(DRAFT_KEY);
        if (draft) {
            try {
                const d = JSON.parse(draft);
                if (d && Array.isArray(d.theses)) { data = d; dirty = true; }
            } catch (e) { store.drop(DRAFT_KEY); }
        }
    }

    function touch() {
        dirty = true;
        store.set(DRAFT_KEY, JSON.stringify(data));
        renderAll();
        updateBar();
    }

    /* ---- Rendering the live page from the working copy ---- */

    function renderAll() {
        window.AKV_NOTES = data;
        if (typeof window.renderTheses === "function") window.renderTheses(data.theses, editing);
        if (typeof window.renderWeeklyNotes === "function") window.renderWeeklyNotes(data.weekly, editing);
    }

    /* ---- Edit mode ---- */

    let editing = false;

    function enterEdit() {
        if (editing) return;
        editing = true;
        document.body.classList.add("is-editing");
        buildBar();
        renderAll();
        updateBar();
    }

    function exitEdit() {
        editing = false;
        document.body.classList.remove("is-editing");
        const bar = document.getElementById("editBar");
        if (bar) bar.remove();
        renderAll();
    }

    /* ---- The publish bar ---- */

    function buildBar() {
        if (document.getElementById("editBar")) return;
        const bar = document.createElement("div");
        bar.id = "editBar";
        bar.className = "edit-bar";
        bar.innerHTML = `
            <span class="edit-bar-state" id="editState">Editing</span>
            <div class="edit-bar-actions">
                <button type="button" class="edit-btn" id="editAddThesis">Add thesis</button>
                <button type="button" class="edit-btn" id="editDownload">Download file</button>
                <button type="button" class="edit-btn edit-btn-primary" id="editPublish">Publish</button>
                <button type="button" class="edit-btn" id="editDone">Done</button>
            </div>`;
        document.body.appendChild(bar);

        document.getElementById("editAddThesis").addEventListener("click", addThesis);
        document.getElementById("editDownload").addEventListener("click", download);
        document.getElementById("editPublish").addEventListener("click", publish);
        document.getElementById("editDone").addEventListener("click", () => {
            if (dirty && !confirm("You have unpublished changes. They stay saved in this browser. Leave edit mode?")) return;
            exitEdit();
            history.replaceState(null, "", location.pathname + location.search);
        });
    }

    function updateBar() {
        const state = document.getElementById("editState");
        if (!state) return;
        state.textContent = dirty ? "Unpublished changes" : "Editing";
        state.classList.toggle("is-dirty", dirty);
    }

    function say(msg, bad) {
        const state = document.getElementById("editState");
        if (!state) return;
        state.textContent = msg;
        state.classList.toggle("is-bad", !!bad);
        state.classList.toggle("is-dirty", false);
    }

    /* ---- Theses ---- */

    function addThesis() {
        data.theses.unshift({
            id: "t" + Date.now().toString(36),
            kind: "sector",
            subject: "New sector",
            stance: "long",
            title: "Untitled thesis",
            body: "",
            updated: new Date().toISOString().slice(0, 10),
        });
        touch();
        const first = document.querySelector(".thesis [data-field='title']");
        if (first) { first.focus(); document.execCommand && document.getSelection().selectAllChildren(first); }
    }

    function fieldEdited(id, field, value) {
        const t = data.theses.find((x) => x.id === id);
        if (!t) return;
        if (t[field] === value) return;
        t[field] = value;
        t.updated = new Date().toISOString().slice(0, 10);
        touch();
    }

    function deleteThesis(id) {
        const t = data.theses.find((x) => x.id === id);
        if (!t) return;
        if (!confirm(`Delete the thesis "${t.title}"?`)) return;
        data.theses = data.theses.filter((x) => x.id !== id);
        touch();
    }

    function weeklyEdited(date, value) {
        const v = value.trim();
        if (v) data.weekly[date] = v;
        else delete data.weekly[date];
        touch();
    }

    /* ---- Writing the file ---- */

    function serialise() {
        const header = [
            "/* ============================================",
            "   Written by hand, through the editor on the site.",
            "",
            "   Nothing in this file is generated. The Saturday IBKR refresh never touches",
            "   it — that job writes js/fund-data.js only — so the two can never overwrite",
            "   one another.",
            "",
            "   `theses` is the investment theses section on the fund page.",
            "   `weekly`  overrides the auto-generated note against a week's row, keyed by",
            "             the week-ending date. Whatever is written here wins over the",
            "             generated one.",
            "   ============================================ */",
            "",
        ].join("\n");
        return header + "\nconst NOTES = " + JSON.stringify(data, null, 4) + ";\n";
    }

    function download() {
        const blob = new Blob([serialise()], { type: "text/javascript" });
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = "notes.js";
        document.body.appendChild(a);
        a.click();
        a.remove();
        setTimeout(() => URL.revokeObjectURL(a.href), 1000);
        say("Downloaded. Commit it to " + FILE + ".");
    }

    // btoa works on bytes, not characters: an em dash would throw without this.
    function toBase64(str) {
        const bytes = new TextEncoder().encode(str);
        let bin = "";
        for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
        return btoa(bin);
    }

    function askForToken() {
        const t = prompt(
            "GitHub token to publish with.\n\n" +
            "Make a fine-grained personal access token with Contents: write on " +
            REPO + " and nothing else. It is kept in this browser only and is " +
            "never committed.\n\n" +
            "Leave blank to cancel."
        );
        if (!t) return null;
        const clean = t.trim();
        store.set(TOKEN_KEY, clean);
        return clean;
    }

    async function publish() {
        if (!dirty) { say("Nothing to publish."); return; }
        let token = store.get(TOKEN_KEY) || askForToken();
        if (!token) return;

        const btn = document.getElementById("editPublish");
        btn.disabled = true;
        say("Publishing…");

        const api = "https://api.github.com/repos/" + REPO + "/contents/" + FILE;
        const headers = {
            "Authorization": "Bearer " + token,
            "Accept": "application/vnd.github+json",
            "X-GitHub-Api-Version": "2022-11-28",
        };

        try {
            // The current file's sha, so the write refuses rather than clobbers
            // if the file moved under us.
            let sha = null;
            const cur = await fetch(api + "?ref=" + BRANCH, { headers });
            if (cur.ok) {
                sha = (await cur.json()).sha;
            } else if (cur.status === 401 || cur.status === 403) {
                store.drop(TOKEN_KEY);
                throw new Error("That token was rejected. It needs Contents: write on " + REPO + ".");
            } else if (cur.status !== 404) {
                throw new Error("GitHub returned " + cur.status + " reading the file.");
            }

            const payload = {
                message: "Update investment theses and weekly notes",
                content: toBase64(serialise()),
                branch: BRANCH,
            };
            if (sha) payload.sha = sha;

            const res = await fetch(api, { method: "PUT", headers, body: JSON.stringify(payload) });
            if (res.status === 409) throw new Error("The file changed on GitHub since this page loaded. Reload and redo the edit.");
            if (!res.ok) {
                let detail = "";
                try { detail = " " + ((await res.json()).message || ""); } catch (e) { /* no body */ }
                throw new Error("GitHub returned " + res.status + "." + detail);
            }

            dirty = false;
            store.drop(DRAFT_KEY);
            say("Published. The site rebuilds in a minute or so.");
        } catch (err) {
            say(err.message, true);
        } finally {
            btn.disabled = false;
        }
    }

    /* ---- Hooks the page calls back into ---- */

    window.AKV_EDIT = {
        get editing() { return editing; },
        fieldEdited,
        deleteThesis,
        weeklyEdited,
    };

    /* ---- Start ---- */

    function start() {
        load();
        renderAll();
        if (location.hash === "#edit") enterEdit();
        window.addEventListener("hashchange", () => {
            if (location.hash === "#edit") enterEdit();
        });
        window.addEventListener("beforeunload", (e) => {
            if (editing && dirty) { e.preventDefault(); e.returnValue = ""; }
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", start);
    } else {
        start();
    }
})();
