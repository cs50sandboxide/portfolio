/* ============================================
   Peer hedge funds, drawn as reference levels on the growth-of-$1,000 chart.

   Maintained by hand. Nothing here is generated, and the Saturday refresh
   does not touch this file — it has no source for these figures.

   Every return is the fund's 2026 CALENDAR-YEAR-TO-DATE figure. None of these
   funds publishes returns for this fund's own window (from 24 April), so the
   levels are for scale and are labelled as YTD wherever they appear. They are
   not a like-for-like comparison and the page says so.

   Only Pershing Square Holdings publishes its NAV; the others are as reported
   in the press by people familiar with each fund. A figure goes in only when
   two independent reports agree on it and its date.

   Each entry:
       { name, short, ytd (%), asOf "YYYY-MM-DD", source, official (bool) }
   ============================================ */

const PEERS = {
    funds: [
        {
            name: "Bridgewater Pure Alpha",
            short: "Bridgewater",
            ytd: 18.4,
            asOf: "2026-09-30",
            source: "Reuters, citing people familiar with the fund",
            official: false,
        },
        {
            name: "Citadel Wellington",
            short: "Citadel",
            ytd: 13.4,
            asOf: "2026-09-30",
            source: "Bloomberg and Business Insider, citing a person familiar with the matter",
            official: false,
        },
        {
            name: "Millennium",
            short: "Millennium",
            ytd: 8.1,
            asOf: "2026-09-30",
            source: "Bloomberg and Business Insider, citing people familiar with the results",
            official: false,
        },
        {
            name: "Pershing Square Holdings",
            short: "Pershing Sq.",
            ytd: -9.1,
            asOf: "2026-09-15",
            source: "Pershing Square Holdings weekly NAV release",
            official: true,
        },
    ],
};
