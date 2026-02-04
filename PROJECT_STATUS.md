# PulseSEO Status (Implementation vs Pending)

This document captures what has been implemented and what is still pending so work can resume on another machine.

## Snapshot: What Is Implemented

### Infra & Docker
- `docker-compose.yml` added at repo root with:
  - PostgreSQL (port 5432, db/user/pass = `pulseseo`).
  - Redis (port 6379) for queues/caching.
- Backend envs:
  - `backend/.env` and `backend/.env.example` include `DATABASE_URL`, `REDIS_URL`, `PORT`, `JWT_SECRET`, `JWT_EXPIRES_IN`, `FRONTEND_URL`.
- Frontend envs:
  - `frontend/.env.local` now contains `BACKEND_URL` and `NEXT_PUBLIC_BACKEND_URL`.

### Backend Foundations (NestJS + Prisma)
- NestJS bootstrap added in `backend/src`:
  - `app.module.ts`, `main.ts` (global validation + CORS + logging).
  - Prisma module/service in `backend/src/database`.
  - Health endpoints: `GET /v1/health`, `GET /v1/ready`.
- Prisma schema created in `backend/prisma/schema.prisma` with:
  - Users, orgs, memberships, projects.
  - Domain entities: audit runs/issues/categories, keyword clusters/keywords/serp snapshots, briefs/sections, reports/templates, automations/runs.
  - Integrations, notifications, settings.
- Prisma seed file at `backend/prisma/seed.ts` (creates demo org + admin user).

### Backend Auth
- Auth module implemented in `backend/src/auth`:
  - `POST /v1/auth/login` (email/password, bcrypt).
  - `GET /v1/auth/me` (JWT protected).
  - JWT strategy + guard.
- Uses `JWT_SECRET` + `JWT_EXPIRES_IN`.

### Backend Read APIs (Mock-backed)
All these read from `backend/mock-data/*.json` via `MockDataService`:
- `GET /v1/dashboard`
- `GET /v1/audits`
- `GET /v1/briefs`
- `GET /v1/reports`
- `GET /v1/automations`
- `GET /v1/integrations`
- `GET /v1/team`
- `GET /v1/settings`
- `GET /v1/summary`

### Backend CRUD APIs (Minimal)
- Projects: `GET/POST/PATCH/DELETE /v1/projects`
- Briefs: `POST/PATCH/DELETE /v1/briefs` (create/update/archive)
- Automations: `POST/PATCH/DELETE /v1/automations` + `POST /v1/automations/:id/run`
- Team: `POST/PATCH/DELETE /v1/team` (invite/update role/remove)
- Settings: `PATCH /v1/settings` (upsert org/user setting)
- Reports: `POST /v1/reports`, `POST /v1/reports/:id/generate`, `DELETE /v1/reports/:id`
- Billing: `GET/POST /v1/billing/subscription`, `POST /v1/billing/portal`

### Integrations & Automation Engine (Scaffold)
- Integrations:
  - `POST /v1/integrations` (create)
  - `POST /v1/integrations/:id/sync` (stub)
  - `DELETE /v1/integrations/:id` (disconnect)
  - `POST /v1/integrations/gsc/connect` and `POST /v1/integrations/ga4/connect` (stub)
- Automation queue:
  - BullMQ wired to Redis with `AutomationJobsModule`.
  - `AutomationProcessor` handles `run` jobs (placeholder).

### Frontend Wiring
- NextAuth Credentials now calls backend:
  - `frontend/src/lib/auth.ts` calls `POST /v1/auth/login`, stores org/role/token in JWT/session.
  - `frontend/src/types/next-auth.d.ts` updated to include org fields + accessToken.
- Client data hooks now call backend:
  - `frontend/src/lib/hooks.ts` switched to `/v1/*` endpoints.
  - `frontend/src/lib/client-api.ts` uses `NEXT_PUBLIC_BACKEND_URL`.
- Basic UI actions wired (prompt-driven):
  - `New brief` → `POST /v1/briefs`
  - `New automation` → `POST /v1/automations`
  - `Invite teammate` → `POST /v1/team`
  - `Save changes` (Settings) → `PATCH /v1/settings`

### Testing & Observability
- Backend:
  - Jest setup (`backend/jest.config.ts`) + sample test (`health.service.spec.ts`).
  - Logging interceptor (simple request logs).
- Frontend:
  - Vitest setup (`frontend/vitest.config.ts`, `src/setupTests.ts`, sample test).
  - Playwright config + simple login page test.

## Pending / TODO (Detailed)

### 1. Prisma Migrations + Data Seeding
- Run migrations locally (`npx prisma migrate dev --name init`).
- Seed data (`npm run prisma:seed`).
- Optional: seed mock domain entities (audits, briefs, reports) to align with UI cards.

### 2. Auth Hardening & Access Control
- Add guards for org/project scoping and role checks in NestJS controllers.
- Ensure all mutation endpoints require JWT auth.
- Enforce `organizationId` based on JWT context rather than client-supplied.
- Add `/v1/auth/refresh` if you want token refresh in NextAuth.

### 3. Replace Mock Read APIs with Prisma
Currently all reads for UI come from JSON fixtures. Replace with Prisma queries:
- `/v1/dashboard` should aggregate from real tables.
- `/v1/audits`, `/v1/briefs`, `/v1/reports`, etc. should query database.
- Keep mock fixtures for dev reference if useful.

### 4. Real Integrations (GSC + GA4)
- Implement OAuth flow:
  - Google OAuth credentials setup.
  - Store tokens in `Integration` (encrypt at app layer).
- Create ingestion pipelines for metrics tables (new Prisma models likely required).
- Wire `/v1/integrations/*` endpoints to real connectors.

### 5. Automation Engine (Jobs + Schedulers)
- Expand BullMQ jobs:
  - scheduled audits, alert processing, report generation.
- Add cron/recurring job setup.
- Persist job status in `AutomationRun` table.
- UI for runs history (not yet wired).

### 6. Reporting (Real Exports)
- Replace report generation stub with actual PDF/CSV outputs.
- Decide on file storage (local/S3) + add `fileUrl` storage.
- Wire `/reports` download UI to real file URLs.

### 7. Billing (Stripe)
- Implement Stripe customer creation + webhook handler.
- Store Stripe IDs on organization.
- Add usage quotas if needed.
- Add billing UI inside Settings (currently no page for this).

### 8. Frontend UX Polish
- Replace prompt-based actions with real modal forms.
- Add loading/success/error toasts.
- Implement filtering/sorting/pagination across data tables.

### 9. CI/CD + Env Management
- Add `.env.example` for frontend (currently only local).
- Add deployment scripts / GH Actions.
- Add Dockerfiles for production if desired (only compose for infra exists).

### 10. Additional Tests
- Add tests for auth, CRUD endpoints.
- Add E2E tests for login + dashboard flows.

## How to Run Locally (Current)

1. Start infra:
   - `docker compose up -d`
2. Backend:
   - `cd backend`
   - `npm install`
   - `npx prisma generate`
   - `npx prisma migrate dev --name init`
   - `npm run prisma:seed`
   - `npm run start:dev`
3. Frontend:
   - `cd frontend`
   - `npm install`
   - `npm run dev`

## Notes / Known Caveats
- JWT auth is not yet enforced on all endpoints; add guards before production.
- Integrations and billing are placeholders; use for scaffolding only.
- The Prisma schema is broad; some tables may not be used until reads are wired.
