#!/usr/bin/env python3
"""Turn the Q3 investor letter .docx into the HTML fragment the site serves.

Run:  python3 -I docx2letter.py <letter.docx> <out.html>

Kept in the repo rather than thrown away because the next letter will arrive
in the same shape, and the mapping from Word styles to the site's markup is
the part worth not re-deriving.
"""
import sys, re, zipfile, html
from xml.etree import ElementTree as ET

W = "{http://schemas.openxmlformats.org/wordprocessingml/2006/main}"

# Paragraphs carrying an instruction to the author rather than content. Both
# are highlighted in the source; matched on text so a missed highlight still
# cannot reach the page.
DROP = (
    re.compile(r"^\s*\[\s*PM to add\b", re.I),
    re.compile(r"^\s*\[\s*Editor'?s note\b", re.I),
)

HEADING = {"Heading1": "h2", "Heading2": "h3", "Heading3": "h4"}


def esc(s):
    return html.escape(s, quote=False)


class Converter:
    def __init__(self, path):
        z = zipfile.ZipFile(path)
        self.doc = ET.fromstring(z.read("word/document.xml"))
        self.notes_xml = ET.fromstring(z.read("word/footnotes.xml"))
        self.order = []          # footnote ids, in order of first appearance
        self.notes = {}          # id -> text
        for f in self.notes_xml.iter(W + "footnote"):
            fid = f.get(W + "id")
            if fid in ("-1", "0"):
                continue
            # A footnote can hold several paragraphs, each a separate source.
            # Joining the runs without a separator would weld the end of one
            # citation onto the start of the next.
            paras = []
            for para in f.iter(W + "p"):
                txt = "".join(t.text or "" for t in para.iter(W + "t")).strip()
                if txt:
                    paras.append(txt)
            self.notes[fid] = "  ".join(paras)

    # ---- inline ----

    def runs(self, node):
        """Inline content of a paragraph, keeping bold, italic and footnotes."""
        out = []
        for r in node.iter(W + "r"):
            fr = r.find(W + "footnoteReference")
            if fr is not None:
                fid = fr.get(W + "id")
                if fid in self.notes:
                    if fid not in self.order:
                        self.order.append(fid)
                    n = self.order.index(fid) + 1
                    out.append(
                        f'<sup class="fnref"><a id="fnref-{n}" href="#fn-{n}" '
                        f'aria-label="Footnote {n}">{n}</a></sup>'
                    )
                continue
            text = "".join(t.text or "" for t in r.findall(W + "t"))
            if not text:
                continue
            rPr = r.find(W + "rPr")
            bold = rPr is not None and rPr.find(W + "b") is not None
            ital = rPr is not None and rPr.find(W + "i") is not None
            s = esc(text)
            if bold:
                s = f"<strong>{s}</strong>"
            if ital:
                s = f"<em>{s}</em>"
            out.append(s)
        return "".join(out)

    @staticmethod
    def style(p):
        pPr = p.find(W + "pPr")
        if pPr is None:
            return ""
        st = pPr.find(W + "pStyle")
        return st.get(W + "val") if st is not None else ""

    @staticmethod
    def plain(node):
        return "".join(t.text or "" for t in node.iter(W + "t")).strip()

    # ---- blocks ----

    def table(self, tbl):
        rows = tbl.findall(W + "tr")
        if not rows:
            return ""
        def cells(tr):
            return [self.runs(tc) for tc in tr.findall(W + "tc")]
        head = cells(rows[0])
        body = [cells(tr) for tr in rows[1:]]
        # Numeric-looking columns read right; the label column reads left.
        def align(i, col):
            if i == 0:
                return ""
            sample = [r[i] for r in body if i < len(r) and r[i].strip()]
            numeric = sum(bool(re.match(r"^[−\-+$£€]?[\d.,]+\s*[%x]?$", c.strip())) for c in sample)
            return ' class="num"' if sample and numeric >= len(sample) * 0.6 else ""
        out = ['<div class="exhibit-wrap"><table class="exhibit-table">', "<thead><tr>"]
        for i, c in enumerate(head):
            out.append(f"<th{align(i, c)}>{c}</th>")
        out.append("</tr></thead><tbody>")
        for r in body:
            out.append("<tr>")
            for i, c in enumerate(r):
                out.append(f"<td{align(i, c)}>{c}</td>")
            out.append("</tr>")
        out.append("</tbody></table></div>")
        return "".join(out)

    def convert(self):
        body = self.doc.find(W + "body")
        kids = [el for el in body if el.tag in (W + "p", W + "tbl")]

        # The title block and the contents list are rendered by the page
        # template, so skip them here. They run until the first Heading1.
        start = next(i for i, el in enumerate(kids)
                     if el.tag == W + "p" and self.style(el) == "Heading1")

        meta = {"contents": []}
        for el in kids[:start]:
            txt = self.plain(el)
            if self.style(el) == "ListParagraph" and txt:
                meta["contents"].append(txt)

        out, li_open = [], False
        for el in kids[start:]:
            if el.tag == W + "tbl":
                if li_open:
                    out.append("</ul>"); li_open = False
                out.append(self.table(el))
                continue

            st = self.style(el)
            txt = self.plain(el)
            if not txt:
                continue
            if any(p.match(txt) for p in DROP):
                sys.stderr.write(f"DROPPED (author note): {txt[:90]}…\n")
                continue

            inner = self.runs(el)

            if st == "ListParagraph":
                if not li_open:
                    out.append('<ul class="letter-list">'); li_open = True
                out.append(f"<li>{inner}</li>")
                continue
            if li_open:
                out.append("</ul>"); li_open = False

            if st in HEADING:
                tag = HEADING[st]
                slug = re.sub(r"[^a-z0-9]+", "-", txt.lower()).strip("-")[:60]
                cls = ' class="letter-section"' if st == "Heading1" else ""
                out.append(f'<{tag} id="{slug}"{cls}>{inner}</{tag}>')
                continue

            # Exhibit captions and source lines are furniture, not prose.
            if re.match(r"^Exhibit\s+\d+[:.]", txt):
                out.append(f'<p class="exhibit-caption">{inner}</p>')
            elif re.match(r"^Sources?\s*:", txt):
                out.append(f'<p class="exhibit-source">{inner}</p>')
            else:
                out.append(f"<p>{inner}</p>")

        if li_open:
            out.append("</ul>")

        # Footnotes, renumbered by order of appearance.
        notes = ['<ol class="footnotes">']
        for n, fid in enumerate(self.order, 1):
            notes.append(
                f'<li id="fn-{n}">{esc(self.notes[fid])} '
                f'<a class="fnback" href="#fnref-{n}" aria-label="Back to text">&#8617;</a></li>'
            )
        notes.append("</ol>")

        return meta, "\n".join(out), "\n".join(notes)


def main():
    conv = Converter(sys.argv[1])
    meta, body, notes = conv.convert()
    with open(sys.argv[2], "w", encoding="utf-8") as fh:
        fh.write("<!--CONTENTS-->\n")
        for c in meta["contents"]:
            fh.write(f"<!--  {c}\n-->\n")
        fh.write("<!--/CONTENTS-->\n")
        fh.write(body)
        fh.write('\n<h2 class="letter-section" id="notes">Notes and sources</h2>\n')
        fh.write(notes)
    sys.stderr.write(f"\nfootnotes emitted: {len(conv.order)}\n")


if __name__ == "__main__":
    main()
