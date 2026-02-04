# PulseSEO — Next‑Gen SEO Automation SaaS

PulseSEO is a dashboard‑first SEO SaaS built for SEO analysts and growth teams. It automates technical audits, content briefs, and prioritization into a single command center. This repo currently contains a fully designed frontend, a mock backend data layer, and a working auth flow using NextAuth credentials.

## Product Summary

PulseSEO focuses on:
- Continuous technical audits and issue tracking
- Content briefs and SERP intent mapping
- Keyword cluster intelligence
- Opportunity prioritization and lift forecasting
- Workflow automation and collaboration
- Executive‑ready reporting

The UI is designed as a **next‑gen, cinematic SaaS experience** with a cohesive visual system, dashboards, and route‑level structure.

## Repository Structure

- `frontend/` — Next.js app (App Router + Tailwind) with landing page, dashboard suite, API routes, and auth.
- `backend/` — Mock JSON data used by the frontend API routes during early development.

## Frontend Highlights

- **Landing page** with hero, feature grid, workflow, insights, pricing, and CTA.
- **Full SaaS dashboard suite** with pages for:
  - Command center (`/dashboard`)
  - Audits (`/audits`)
  - Content briefs (`/briefs`)
  - Reports (`/reports`)
  - Automations (`/automations`)
  - Integrations (`/integrations`)
  - Team (`/team`)
  - Settings (`/settings`)
  - API status (`/status`)
- **Shared app shell** with sidebar + topbar layout for all app pages.
- **Loading + empty states** for high‑polish UX.
- **Mock API layer** served by Next.js route handlers.

## Backend (Mock)

The `backend/` folder is currently a mock data store. JSON fixtures live at:

```
backend/mock-data/
```

These files power the Next.js API routes located in:

```
frontend/src/app/api/
```

When the real backend is ready, this mock layer can be replaced by a service (Node, Python, Go, serverless, etc.).

## Auth (Working)

The app uses **NextAuth Credentials** with a single demo user.

**Demo credentials**
- Email: `admin@pulseseo.com`
- Password: `demo1234`

Auth is enforced via middleware for all app routes under the SaaS experience.

## Quick Start

From the `frontend/` directory:

```bash
npm install
npm run dev
```

Then open:
- Landing: `http://localhost:3000/`
- Login: `http://localhost:3000/login`
- Dashboard: `http://localhost:3000/dashboard`

## Local Infra (Docker)

To run the shared infrastructure services (PostgreSQL + Redis) locally:

From the repo root:

```bash
docker compose up -d
```

This starts:
- PostgreSQL on `localhost:5432` with database `pulseseo` (user `pulseseo`, password `pulseseo`)
- Redis on `localhost:6379`

The backend NestJS service (once implemented) will read connection details from:

- `backend/.env` (or `backend/.env.example` for defaults)

The frontend can reach the backend via:

- `BACKEND_URL=http://localhost:3001` (already set in `frontend/.env.local`)

## Environment Variables

The frontend uses a local env file:

```
frontend/.env.local
```

Required variables:
- `NEXTAUTH_URL` — typically `http://localhost:3000`
- `NEXTAUTH_SECRET` — any random secret
- `AUTH_EMAIL` — demo email
- `AUTH_PASSWORD` — demo password

## How Analysts Use PulseSEO

PulseSEO is designed to mirror how an SEO analyst actually works each week.

1. **Connect data sources**
   - Link Google Search Console, GA4, and CMS.
   - Set priority domains and target pages.

2. **Review the Command Center**
   - Check visibility score, opportunities, and urgent alerts.
   - Identify the top three pages to fix.

3. **Audit & Fix**
   - Open the Audits page to see critical issues.
   - Assign fixes to engineering or content teams.

4. **Generate Content Briefs**
   - Use Briefs to create SERP‑aligned content plans.
   - Export briefs to writers or Notion.

5. **Monitor Opportunities**
   - Track high‑lift pages and decay risk.
   - Validate impact with forecasting signals.

6. **Automate Recurring Work**
   - Schedule weekly crawls and content refreshes.
   - Set alerts for ranking drops and cannibalization.

7. **Report Progress**
   - Use Reports to deliver executive summaries.
   - Export slides/CSV for stakeholders.

The tool reduces manual spreadsheet work and keeps the analyst focused on decisions, not data gathering.

## User Stories (Expanded)

### Analyst Personas

- **SEO Analyst**
  - As an SEO analyst, I want a single dashboard so I can prioritize high‑impact work quickly.
  - As an SEO analyst, I want automated alerts when rankings drop so I can respond before traffic declines.
  - As an SEO analyst, I want to see technical issues grouped by severity so I can fix what matters most.
  - As an SEO analyst, I want brief templates so writers produce SERP‑aligned content.

- **SEO Manager**
  - As a manager, I want visibility forecasts so I can justify resources and budget.
  - As a manager, I want automated weekly reports so I can update leadership without manual work.
  - As a manager, I want role‑based access so different teams only see what they need.

- **Content Strategist**
  - As a strategist, I want topic clusters so I can plan editorial calendars.
  - As a strategist, I want decay alerts so I can refresh outdated pages before performance drops.

- **Engineering Lead**
  - As an engineering lead, I want SEO tickets formatted clearly so my team can fix issues faster.
  - As an engineering lead, I want issue assignments so accountability is visible.

### Core Workflow Stories

- As a user, I want to connect GSC + GA4 in minutes so I can start seeing insights immediately.
- As a user, I want a weekly automated crawl so I don’t manually run audits.
- As a user, I want a list of top opportunities so I can plan quick wins.
- As a user, I want content brief generation so I don’t manually research SERPs.
- As a user, I want internal link suggestions so I can improve crawl depth and rankings.
- As a user, I want alerts for cannibalization so I can avoid ranking conflicts.
- As a user, I want reporting templates so I can reuse narratives for leadership.
- As a user, I want CSV + PDF exports so I can share results across teams.

### Admin & Org Stories

- As an admin, I want to create multiple workspaces so different brands are separated.
- As an admin, I want to invite team members and assign roles.
- As an admin, I want audit logs so I can track activity changes.
- As an admin, I want billing and usage summaries so I can control cost.

### Automation Stories

- As a user, I want to schedule audits so they run overnight without my involvement.
- As a user, I want content refresh workflows to trigger when traffic drops.
- As a user, I want notification routing (Slack/email) so the right team is alerted.
- As a user, I want automation status and history so I trust the system.

### Reporting Stories

- As a user, I want an executive summary view for leadership.
- As a user, I want snapshots of top wins so I can celebrate impact.
- As a user, I want a reporting cadence setting so I can align with weekly/monthly cycles.

## Frontend Team Plan (To Go‑Live)

### Phase 1 — Stabilize UI (Now)
- Finalize UI layouts for all dashboard pages.
- Normalize spacing and typography across pages.
- Add responsive testing for mobile and tablet.

### Phase 2 — Data Wiring
- Replace mock client hooks with real API contract types.
- Add filtering, sorting, and pagination controls.
- Implement empty, loading, and error patterns globally.

### Phase 3 — Auth + Access
- Replace demo credentials with real user auth.
- Add role‑based access (admin, analyst, viewer).
- Add org switcher for multi‑tenant support.

### Phase 4 — Core UX Polish
- Activity feed and notifications panel.
- Advanced search across pages and keywords.
- Export and download flows (CSV, PDF, Slides).

### Phase 5 — Launch Readiness
- Full QA + cross‑browser testing.
- Analytics events tracking.
- Performance improvements and bundle review.

## Backend Team Plan (To Go‑Live)

### Phase 1 — Core Backend Foundations
- Choose stack (Node/Express, Fastify, or serverless).
- Database (PostgreSQL + Prisma).
- Auth & sessions integrated with NextAuth.

### Phase 2 — Data Layer
- Domain, project, and user models.
- Audit runs + issue tables.
- Keyword clusters + SERP insights.
- Content brief generation pipeline.

### Phase 3 — Integrations
- Google Search Console + GA4 ingestion.
- Optional: Ahrefs/Semrush connectors.
- CMS connectors (WordPress, Webflow, Shopify).

### Phase 4 — Automation Engine
- Job scheduler (queues for crawls & briefs).
- Alerts and notifications (email + Slack).
- Workflow status updates.

### Phase 5 — Reporting & Billing
- Report generation (PDF/Slides/CSV).
- Stripe billing (plans, usage, and quotas).
- Audit logging and compliance checks.

## Go‑Live Plan (End‑to‑End)

### Step 1 — MVP
- Auth + orgs + projects
- Basic audits + briefs + alerts
- Minimal reporting

### Step 2 — Beta
- GSC + GA4 integrations
- Automation scheduling
- Activity feed + notifications

### Step 3 — Production
- Billing + quotas
- Role‑based access
- Reliability + monitoring

### Step 4 — Launch
- Onboarding flow
- Public pricing + signup
- Customer support workflows

## Current Features (MVP UI)

- Landing page
- App shell
- Dashboard suite
- Mock API endpoints
- Auth + protected routes
- Status page for mock API health

## What’s Next

Potential next steps:
- Real database (PostgreSQL + Prisma)
- Multi‑tenant orgs + role‑based access
- Actual SEO crawlers and integrations
- Billing (Stripe)
- Activity logs + audit history
- Notification system

---

If you want to evolve this into a production SaaS, the current structure is ready for backend substitution and real data wiring.
