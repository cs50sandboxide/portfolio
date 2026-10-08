/* ============================================
   Written by hand.

   Nothing here is generated. The Saturday IBKR refresh never touches this
   file — that job writes js/fund-data.js only — so the two can never
   overwrite one another.

   `theses` is the investment theses section on the fund page. Each entry:
       {
           kind:    "sector" | "stock",     // drives the filter buttons
           subject: "Utilities" | "CEG",    // what the thesis is about
           stance:  "long" | "short" | "watch",
           title:   "One line, the argument in a sentence",
           body:    "Prose. Blank lines separate paragraphs.",
           updated: "YYYY-MM-DD"
       }

   `weekly` overrides the generated note against a week's row, keyed by the
   week-ending date. Whatever is written here wins over the generated one.
   ============================================ */

const NOTES = {
    theses: [],
    weekly: {}
};
