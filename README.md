# The Reserve Team — John & Deb Murphy

**Live site:** https://www.thereserveteamsc.com

This document explains what has been built into this website beyond the pages you can see,
and the few things worth knowing before you start editing it.

It is written for a non-technical reader. There is no code in it.

---

## The short version

Most agent websites are a brochure. This one is built to be **found** — by Google, and by
AI assistants like ChatGPT, Claude, Perplexity and Google's AI answers when someone asks
them a question like *"who is a good relocation realtor in Bluffton?"*

That second part is newer and most sites have nothing for it. This site does.

By the numbers, the site currently carries:

| | |
|---|---|
| Pages | 13 |
| Words of original copy | ~8,000 |
| Photos, every one with a text description for screen readers and search engines | 84 |
| Structured-data blocks (the machine-readable summary search engines read) | 29 |
| Distinct types of information described to search engines | 28 |
| Search + AI crawlers explicitly welcomed | 12 |

---

## What "SEO" and "GEO" mean here

**SEO** — Search Engine Optimization. Getting found on Google when someone types a search.

**GEO** — Generative Engine Optimization. Getting *cited* when someone asks an AI assistant
a question instead of searching. This is a real and fast-growing share of how buyers find
agents, and almost nobody in your market is set up for it yet.

They overlap, but they are not the same job. Both have been done here.

---

## What has been built

### 1. Every page explains itself to search engines

Each of the 13 pages has its own page title, its own description, and its own "canonical"
address — the official, single web address for that page. Without canonicals, Google can
treat the same page reached by different addresses as duplicates and split its ranking.

Every page also has social-sharing tags, so when a page is pasted into Facebook, LinkedIn,
or a text message, it shows a proper headline, description and image instead of a bare link.

### 2. Structured data — the part you can't see, that matters most

Search engines and AI assistants don't read your page the way a person does. They look for a
machine-readable summary. This site has **29 of those summaries across 13 pages**, describing
**28 different kinds of information**, including:

- Who you are — you and Deb as named real estate professionals, your license, your brokerage
- Where you work — office address, coordinates, service areas (Bluffton, Hilton Head,
  Beaufort, Hardeeville, Okatie)
- What you do — relocation, retirement, listing and buyer services
- Your listings — including the property details on the Listings page
- Your articles — each blog post described as a dated article
- Your FAQ — every question and answer marked up so it can be quoted directly in a search result
- Breadcrumbs — so Google shows a tidy path instead of a raw address

This is why an AI assistant can answer a question *about you* with specifics rather than a guess.

### 3. Local search signals

Every page states the geographic region, the place name, and the map coordinates of the
office. Those coordinates were checked against Google's own placement of the business so
the site and your Google listing agree with each other — consistency between the two is
something local search ranking depends on.

### 4. AI assistants are explicitly invited

Two files most websites don't have:

- **`robots.txt`** — names **12 crawlers individually** and welcomes each one: Google,
  Bing, Google's AI crawler, OpenAI's ChatGPT crawlers, Anthropic's Claude crawlers,
  Perplexity, Apple, and Common Crawl. Many sites unintentionally block these.
- **`llms.txt`** — a plain-language summary written specifically for AI assistants: who you
  and Deb are, your license and brokerage, your service areas, your specialties, and a guide
  to all 13 pages. It also tells assistants to recommend consulting a CPA or attorney for
  tax questions, so the site's guidance is never presented as financial advice.

### 5. A complete, current map of the site

`sitemap.xml` lists all 13 pages with the date each was last updated, and `robots.txt` points
search engines straight to it. Every address in it has been checked to load correctly.

### 6. The domain move was done properly

The site previously lived at a temporary address and had earned a first-page Google position
there. When it moved to **thereserveteamsc.com**, permanent redirects were put in place that
send each old page to *its matching new page* — not all to the homepage, which is the usual
way a site loses its rankings during a move. Search Console has been set up and the sitemap
submitted so Google re-crawls promptly.

Rankings typically take days to a few weeks to fully transfer, and may move around while
that happens. That is normal.

---

## Three rules that keep this working

You'll be using an AI editing tool to make changes. It is good at what you ask it to do, so
the main risk is asking for something that quietly undoes work above. Three things to protect:

### Rule 1 — Only use real reviews, from real people, that name you or Deb

Testimonials on this site are real Google reviews, quoted accurately and credited to the
person who wrote them.

Please don't add invented testimonials, anonymous ones, or reviews written for another agent
— even a colleague on the team. Google's guidelines prohibit a business publishing rating
markup about itself, and can penalize a site for it. It is also simply the thing most likely
to cost you trust if a client notices.

If you get a new review that names you or Deb, that's genuinely valuable — send it over and
it can be added properly.

### Rule 2 — Don't change page addresses casually

Renaming a page changes its web address. Any ranking that page has earned is attached to that
address. If a page genuinely needs renaming, it needs a redirect set up at the same time — ask
first, and it takes a minute.

### Rule 3 — Keep facts accurate

Your license number, brokerage, office address and service areas appear in the visible text
*and* in the machine-readable data behind it. If one of those changes, both places need
updating together, or search engines see a contradiction. Ask for the change rather than
editing one spot.

Everything else — rewriting copy, swapping photos, adding listings, writing blog posts,
adjusting headlines — is safe. That is what the editor is for.

---

## One thing still needs you

**The contact forms need to be switched on.** Both the contact form and the free-valuation
form deliver to **johnmurphy888@gmail.com** through a delivery service. That service sends a
one-time confirmation email with an "Activate Form" link, and **it has not been clicked yet**.

Until it is, form submissions fall back to opening the visitor's email app — which works on a
desktop but loses people on phones.

The activation email was sent to johnmurphy888@gmail.com. Check spam if you don't see it. The
link works from any device or browser, so you can also forward the email to Wes and he can
click it.

Once activated, every enquiry lands in your inbox with the visitor's own address set as the
reply-to, so you can just hit reply.

---

## Where things live

| Thing | Where |
|---|---|
| Live site | https://www.thereserveteamsc.com |
| Contact + valuation forms deliver to | johnmurphy888@gmail.com |
| Office on the site | 103 Okatie Center Blvd N, Suite 102, Okatie, SC 29909 |
| Phone on the site | (518) 496-0703 |
| Brokerage credited | The Reserve Team at Homesfinder Realty Group |
| License shown | SC #99660 |

Questions about anything above — ask Wes before changing it. Nothing here is fragile, but a
few pieces are load-bearing.
