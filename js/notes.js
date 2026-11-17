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
    "theses": [
        {
            "kind": "stock",
            "subject": "LULU",
            "stance": "long",
            "title": "A new CEO, a brand worth more than its current sales trend, at under 9x earnings",
            "body": "Lululemon is down 49% this year and 53% from its 52-week high, closing at $106.64 on 17 November. The numbers behind the fall are real: second-quarter revenue fell 4% to $2.4 billion, comparable sales were down 9% and 12% in the Americas, and full-year guidance was cut to $10.35-10.50 billion, a 5-7% decline.\n\nWhat has changed is who is running it. Heidi O'Neill, previously president of consumer, product and brand at Nike, took over as CEO on 8 September and has already brought in new product, brand and strategy leadership. At about 9x trailing earnings for a business that is still solidly profitable, the price assumes the decline continues. We think a product and marketing reset under new management is worth more than that.\n\nWhat would prove us wrong: comparable sales still falling at a similar rate by the first quarters of 2027, which would mean the problem is the brand and not the execution.",
            "updated": "2026-11-17"
        },
        {
            "kind": "sector",
            "subject": "Private credit: BX, KKR",
            "stance": "long",
            "title": "AI infrastructure is the biggest new borrower in the market, and these two lend to it first in line",
            "body": "Blackstone and KKR are down 24% and 25% this year, on fears about software loans written in 2021 and redemptions from private credit funds. Neither firm's business has shrunk. Blackstone took in $63 billion in the third quarter and manages about $1.37 trillion, up 10% on the year. KKR raised $25 billion, $14 billion of it in credit, and manages $804 billion, up 11%.\n\nThe new demand is the data centre build-out. Both were named in August as partners in NVIDIA's planned compute-financing platforms, and KKR is building data centres directly through Helix, with more than $10 billion committed. Most of this lending is senior secured: if a borrower fails, they are first in line to be repaid from the assets. Losses so far support that. Fitch put the private credit default rate at a record 6.3% in August, but software, the sector the market is worried about, was the lowest at 0.6%.\n\nWhat would prove us wrong: realised losses on AI or software loans starting to show up in the funds, rather than just markdowns on spreads.",
            "updated": "2026-11-17"
        },
        {
            "kind": "stock",
            "subject": "ASTS",
            "stance": "long",
            "title": "Phone service from space, with the customers already signed",
            "body": "AST SpaceMobile is building satellites that connect directly to ordinary phones, the main rival to SpaceX's direct-to-cell service. The difference is distribution: agreements with more than 60 mobile operators covering over 3 billion subscribers, so the service launches into existing customer bases rather than having to win them.\n\nDeployment is on track. Twelve BlueBird satellites are in orbit and operating, three more are at Cape Canaveral waiting on a SpaceX launch, and three more ship by the end of November. The target is about 45 by the middle of 2027, with launch contracts covering more than 100 through 2028 and production planned at six a month from December. Third-quarter revenue was $42.3 million and the company held $3.2 billion in cash at the end of September.\n\nThe stock is down 60% this year and 78% from its high, at $28.85. What would prove us wrong: launches slipping well past mid-2027, or another capital raise at these prices.",
            "updated": "2026-11-17"
        },
        {
            "kind": "stock",
            "subject": "ADBE",
            "stance": "long",
            "title": "A cash machine priced for disruption that is not showing up in the numbers",
            "body": "Adobe is down 32% this year on the fear that AI image and video tools replace Photoshop. The results do not show it. Third-quarter revenue grew 13% to $6.8 billion, total annual recurring revenue is $27.5 billion, and AI-first products have passed $650 million of recurring revenue, up more than 150%.\n\nThe professional users who make up the core of the business need precise control over their work, which generative tools by design do not give them. Acrobat and Express together reach more than 900 million monthly users. At about 9x forward earnings, with $2.2 billion of buybacks in the last quarter, the market is pricing a business in decline.\n\nAnil Chakravarthy takes over from Shantanu Narayen as CEO on 1 December. What would prove us wrong: subscription growth falling into single digits, which would mean the AI products are replacing revenue rather than adding to it.",
            "updated": "2026-11-17"
        },
        {
            "kind": "stock",
            "subject": "INTC",
            "stance": "long",
            "title": "The only American company making leading-edge chips, back to 20% growth",
            "body": "Intel is the only US company that both designs and manufactures leading-edge processors, which makes it the only domestic alternative to TSMC. The business has turned: third-quarter revenue grew 21% to $16.5 billion, and adjusted earnings of $0.52 a share beat the company's own guidance of $0.38. Data centre revenue was $7.3 billion, up nearly 80% on the year.\n\nThe stock is up 48% this year but has fallen 62% from its 52-week high of $142, to $54.47, mostly on a weak PC outlook. PC revenue fell 5% to $8.1 billion and the CFO expects the slowdown to last through at least the first half of 2027. We see that as a cycle, not a change in Intel's position, and the data centre business is now nearly as large.\n\nWhat would prove us wrong: the foundry business, which lost $1.9 billion in the quarter and earned only $411 million from outside customers, failing to sign larger external clients over the next year.",
            "updated": "2026-11-17"
        },
        {
            "kind": "stock",
            "subject": "MRNA",
            "stance": "short",
            "title": "A sevenfold rally on one trial result that has not yet become a product",
            "body": "Moderna is up 608% this year. The biggest single move came on 19 August, when the stock rose 177% in a day on Phase 3 results for intismeran, its personalised melanoma vaccine with Merck. The trial met its main endpoint on recurrence-free survival. Overall survival data are not yet mature, and the treatment has not been approved anywhere.\n\nThe rest of the business does not support the price on its own. Third-quarter revenue was $1.3 billion, up 29%, and full-year growth guidance is 15-25%, mostly from COVID vaccine sales abroad. A share price seven times where it started the year assumes approval, pricing and a manufacturing scale-up for a personalised therapy, all of which are still ahead.\n\nThe stock is already 26% below its 52-week high, at $208.90. What would prove us wrong: a fast regulatory timeline for intismeran, or overall survival data strong enough to make approval look certain.",
            "updated": "2026-11-17"
        },
        {
            "kind": "stock",
            "subject": "UBER",
            "stance": "long",
            "title": "Priced as if robotaxis replace it, while its delivery business grows 23%",
            "body": "Uber is down 16% this year, at $68.82, on fear that driverless cars cut it out. The scale says otherwise. Uber expects about 700 fully driverless vehicles on its network by the end of the year and more than 2,000 in 2027, against gross bookings of $59.8 billion in the third quarter alone, up 20%. Robotaxi operators need high utilisation to cover the cost of each car, and Uber's network is where that demand is.\n\nDelivery is the second engine. Delivery bookings grew 23% in the quarter, and Uber agreed in July to buy Delivery Hero for about $14.8 billion. Adjusted operating income rose 38% to $2.3 billion. At about 17x forward earnings, that growth is not in the price, and the CEO bought around $10 million of stock in September.\n\nWhat would prove us wrong: an autonomous operator building its own consumer network at scale instead of partnering, which none has yet done.",
            "updated": "2026-11-17"
        },
        {
            "kind": "stock",
            "subject": "NVO",
            "stance": "long",
            "title": "Copies of semaglutide hurt prices abroad, but the US patent and Wegovy growth remain",
            "body": "Novo Nordisk is down 20% this year and 37% from its high, at $40.50, on copies of semaglutide, the drug behind Ozempic and Wegovy. Compounded versions sell in the US, and the core patent expired in March in China and India, where generics launched at large discounts. Canada approved generics in April.\n\nThe US, its largest market, stays protected until at least 2031. Sales returned to growth in the third quarter, up 4% at constant exchange rates, with obesity sales up 22% on the Wegovy pill and the higher 7.2 mg dose. The company raised its 2026 guidance to between a 2% decline and 2% growth, and expects DKK 60-70 billion of free cash flow.\n\nWhat would prove us wrong: US prices falling faster than volume grows, which would show up as sales declining again in 2027 even with the patent intact.",
            "updated": "2026-11-17"
        },
        {
            "kind": "sector",
            "subject": "Crypto infrastructure: CRCL, COIN",
            "stance": "long",
            "title": "Crypto is in a winter, and the businesses built on it are priced as if it lasts",
            "body": "Bitcoin is down 34% from its 52-week high, at about $64,600. Coinbase and Circle have fallen with it, by 58% and 60% from their highs. For Coinbase the downturn is visible: third-quarter revenue fell 35% to $1.2 billion. Its $719 million net income came almost entirely from gains on crypto it holds; operating income was about $62 million.\n\nCircle is less exposed to prices. It earns interest on the reserves backing USDC, with $73.3 billion in circulation on average, up 8%, and on-chain volume up 49% to $13.9 trillion. Reserve income fell 8% because rates were lower, not because usage was. The CLARITY Act, which would set US rules for digital assets, failed a Senate vote 49-50 in September.\n\nWe expect activity and prices to recover through 2027, and comprehensive US legislation to pass in some form. What would prove us wrong: USDC circulation shrinking, which would mean the stablecoin business itself is losing ground.",
            "updated": "2026-11-17"
        },
        {
            "kind": "sector",
            "subject": "Autonomous defence: AVAV, KTOS",
            "stance": "long",
            "title": "Record order books for drones and autonomous aircraft, at three-quarters below their highs",
            "body": "Militaries are moving spending from expensive missiles and crewed aircraft towards cheaper drones and autonomous systems, and these two are among the main US suppliers. The order books show it. AeroVironment's funded backlog reached a record $1.5 billion in its last quarter, up 37%, with about $2.8 billion including unfunded orders. Kratos grew revenue 36% to $472 million in the third quarter and lifted backlog to a record $2.65 billion, with $1 billion of new orders in the quarter alone.\n\nThe stocks have gone the other way: AeroVironment is 74% below its 52-week high and Kratos 76%. Both are guiding to growth, AeroVironment to $2.1-2.2 billion of revenue this fiscal year and Kratos to $2.1-2.2 billion in 2027.\n\nWhat would prove us wrong: the US defence budget for fiscal 2027 coming in late or cutting procurement, which AeroVironment's management has already named as the main uncertainty.",
            "updated": "2026-11-17"
        }
    ],
    "weekly": {}
};
