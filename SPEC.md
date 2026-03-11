# AI Safety Facts — Product Spec

## Mission
Fact-based, source-linked AI safety transparency dashboard. No opinions, no grades — just verifiable facts.

## Domain
aisafetyfacts.org

## Companies to Track (v1)
1. OpenAI
2. Anthropic
3. Google DeepMind
4. Meta
5. DeepSeek
6. Alibaba (Qwen)
7. xAI
8. Mistral

## Data Points Per Company (all must have source links)

### Safety Documents
- Has Responsible Scaling / Safety Policy? (yes/no + link + last updated)
- Has Model Card / System Card published? (yes/no + link)
- Has published safety benchmark results? (yes/no + link)
- Has Acceptable Use Policy? (yes/no + link)

### Testing & Evaluation
- Third-party red-team conducted? (yes/no + who + link)
- CBRN risk evaluation done? (yes/no + link)
- Pre-deployment safety eval published? (yes/no + link)
- Participates in METR / ARC evals? (yes/no + link)

### Governance
- Has independent safety board/team? (yes/no + details)
- Signed Seoul AI Safety Commitment? (yes/no)
- Submitted safety report to government? (yes/no + link)
- Allows third-party audits? (yes/no)
- Published employee safety concern process? (yes/no + link)

### Policy Positions (factual, not judged)
- Military use: Allowed / Restricted / Banned (+ source)
- Surveillance use: Allowed / Restricted / Banned (+ source)
- Open-source models: Yes / No / Partial (+ which models)
- Content filtering: Description + source

### Incident History
- Total reported incidents (from incidentdatabase.ai)
- Most recent incident (date + description + source)
- Company response to incidents (links)

### Timeline
- Chronological safety-related events
- Policy changes with diffs when possible
- Every entry has date + source link

## Tech Stack
- Next.js 14+ (App Router)
- Tailwind CSS
- Deployed on Vercel (free)
- Data stored as JSON/MDX files (no database for v1)
- Static generation — fast, free, SEO-friendly

## Design
- Dark mode default (serious, professional)
- Clean, minimal — think Bloomberg Terminal meets Wikipedia
- Company cards with ✅ ❌ indicators
- Comparison table view
- Timeline view
- Every fact is clickable → goes to source
- Mobile responsive

## Pages
1. / — Homepage with company grid overview
2. /company/[slug] — Detailed company page
3. /compare — Side-by-side comparison table
4. /timeline — Chronological safety events across all companies
5. /about — Mission, methodology, data sources
6. /contribute — How to submit corrections/updates

## SEO Strategy
- Each company page targets "[company] AI safety"
- Comparison page targets "AI safety comparison"
- Timeline targets "AI safety timeline 2024 2025 2026"
- Schema markup for structured data
