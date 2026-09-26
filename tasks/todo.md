# Task List — JobMarket Documentation Suite

> **Legend:** `[ ]` pending · `[~]` in_progress · `[x]` completed  
> Each task has explicit **Acceptance Criteria (AC)** — mark `[x]` only when all ACs verified.

---

## 1. CI/CD Pipeline (`.github/workflows/ci.yml`) — *no deps*

### 1.1 Scaffold workflow file & triggers
- [x] Create `.github/workflows/ci.yml` with `on: [push, pull_request]` targeting `main` branch
- [x] Add `concurrency` group to cancel redundant runs
- **AC:** File exists, valid YAML, triggers on push/PR to main, cancels superseded runs

### 1.2 Define job matrix & toolchain
- [x] `jobs.lint-test-build` matrix: `node-version: ['20', '22']` × `os: [ubuntu-latest]`
- [x] Cache `~/.npm` and Turbo cache (`actions/cache@v4`)
- [x] Install: `npm ci --workspaces --if-present`
- **AC:** Matrix runs on Node 20 & 22, caches restore correctly, `npm ci` succeeds

### 1.3 Lint stage (per-package)
- [x] `npm run lint` in each workspace (web, api) — fail fast on error
- [x] Use `turbo run lint --filter=...` for parallelism
- **AC:** ESLint + Prettier run per package, zero errors required to pass

### 1.4 Type-check stage (per-package)
- [x] `npm run typecheck` (tsc --noEmit) in each workspace
- **AC:** TypeScript compiles without errors in both packages

### 1.5 Unit/Integration test stage
- [x] `npm run test` in each workspace (Vitest frontend, Jest backend)
- [x] Collect coverage; upload `coverage/` as artifact
- [x] Enforce minimum thresholds: statements 80%, branches 70%, functions 80%, lines 80%
- **AC:** Tests pass, coverage artifacts uploaded, thresholds enforced (fail if below)

### 1.6 Build stage
- [x] `npm run build` in each workspace (Vite build, tsc backend)
- [x] Upload build artifacts (`dist/`) for downstream jobs
- **AC:** Both builds succeed, artifacts downloadable

### 1.7 Docker build & smoke test (optional, non-blocking)
- [x] `docker compose -f docker/docker-compose.yml build` (api + web)
- [x] Run containers, hit `/health` endpoints, tear down
- **AC:** Images build, health checks return 200, containers stop cleanly

---

## 2. Testing Infrastructure Setup — *depends on CI/CD (coverage upload)*

### 2.1 Frontend (apps/web) — Vitest + React Testing Library
- [ ] Add devDeps: `vitest`, `@testing-library/react`, `@testing-library/user-event`, `jsdom`, `@vitest/coverage-v8`
- [ ] Create `vitest.config.ts` with coverage thresholds, globals, environment `jsdom`
- [ ] Add `test` script: `vitest run --coverage`
- [ ] Write 3+ component tests (e.g., JobCard, SearchForm, Pagination)
- [ ] Write 1+ hook test (e.g., `useJobs` / `useDebounce`)
- **AC:** `npm run test` passes, coverage ≥ thresholds, tests exercise real components/hooks

### 2.2 Backend (apps/api) — Jest + Supertest + Prisma Test Utils
- [ ] Add devDeps: `jest`, `@types/jest`, `ts-jest`, `supertest`, `@faker-js/faker`
- [ ] Create `jest.config.js` (ts-jest preset, `testEnvironment: node`, coverage thresholds)
- [ ] Add `test` script: `jest --coverage`
- [ ] Create `tests/utils/test-db.ts` — spin up temporary Postgres (Testcontainers or dedicated test DB), run migrations, cleanup
- [ ] Create `tests/utils/factories.ts` — Prisma factories for User, Job, Company, Application
- [ ] Write 5+ integration tests covering: auth register/login, job CRUD, search/filter, apply flow, pagination
- **AC:** `npm run test` passes, coverage ≥ thresholds, tests hit real DB via Prisma, factories reusable

### 2.3 Root test orchestration
- [ ] Add root `test` script: `turbo run test`
- [ ] Verify CI coverage artifacts merge correctly
- **AC:** `npm run test` at root runs both packages, CI uploads combined coverage

---

## 3. CONTRIBUTING.md — *depends on CI/CD + Testing (references both)*

### 3.1 Structure & tone
- [ ] Create `CONTRIBUTING.md` at repo root
- [ ] Sections: Code of Conduct link, Getting Started, Development Workflow, Commit Conventions, PR Checklist, Review Guidelines, Release Process
- **AC:** File exists, all sections present, tone welcoming & actionable

### 3.2 Getting Started (dev environment)
- [ ] Document: Node ≥20, npm 10+, Docker (optional), `npm ci`, `npm run dev`
- [ ] Include `docker compose -f docker/docker-compose.yml up -d` for DB
- [ ] Link to `.env.example` files in each app
- **AC:** New contributor can clone & run `npm run dev` successfully following only this guide

### 3.3 Development Workflow
- [ ] Branch naming: `feat/`, `fix/`, `chore/`, `docs/`, `refactor/`
- [ ] Commit message format: Conventional Commits (`type(scope): subject`)
- [ ] Pre-commit hooks: Husky + lint-staged (ESLint, Prettier, typecheck)
- [ ] Local verification: `npm run lint && npm run typecheck && npm run test` before push
- **AC:** Commit lint enforced, hooks documented, local verification commands work

### 3.4 PR Checklist (template)
- [ ] Linked issue, description, screenshots (UI), test coverage, migration notes (DB), breaking changes
- [ ] Checklist renders in PR description via `.github/pull_request_template.md`
- **AC:** Template file exists, checklist items match CONTRIBUTING.md

### 3.5 Review Guidelines
- [ ] Reviewer expectations: scope, performance, security, accessibility, tests
- [ ] SLA: first review ≤24h, follow-up ≤12h
- [ ] Approve requires: CI green, 1+ approval, no unresolved conversations
- **AC:** Guidelines clear, measurable, referenced in PR template

### 3.6 Release Process
- [ ] Versioning: SemVer via Changesets (or manual `npm version`)
- [ ] Changelog: auto-generated from conventional commits
- [ ] Tag & GitHub Release workflow (separate `release.yml`)
- **AC:** Process documented, commands verifiable

---

## 4. API Documentation (OpenAPI/Swagger + Redoc) — *depends on Testing (factories for examples)*

### 4.1 Backend OpenAPI spec generation
- [ ] Add deps: `@anatine/zod-openapi`, `swagger-ui-express`, `yamljs` (or `zod-to-openapi`)
- [ ] Annotate existing routes with Zod schemas + OpenAPI metadata (tags, summaries, responses)
- [ ] Create `docs/openapi.ts` generator script → outputs `apps/api/dist/openapi.json`
- [ ] Add `openapi` script to api package.json
- **AC:** `npm run openapi` produces valid OpenAPI 3.1 JSON, all current endpoints documented

### 4.2 Swagger UI (dev) + Redoc (static)
- [ ] Mount `/docs` Swagger UI in Express (dev only)
- [ ] Generate static Redoc HTML: `npx @redocly/cli build-docs -o docs/api-reference.html`
- [ ] Add `docs:build` script
- **AC:** `/docs` serves interactive UI in dev; `docs/api-reference.html` renders complete reference

### 4.3 Authentication & error schemas
- [ ] Document JWT Bearer auth scheme, 401/403 responses
- [ ] Define standard error envelope: `{ code, message, details? }`
- [ ] Add examples for each endpoint (use factory data)
- **AC:** Auth documented, error format consistent, every endpoint has request/response examples

### 4.4 CI integration
- [ ] Add `openapi:validate` job: `swagger-codegen validate -i openapi.json`
- [ ] Fail build on spec drift (compare committed `openapi.json` vs generated)
- **AC:** CI validates spec, fails if undocumented endpoints added

---

## 5. Deployment Guide (docs/deployment.md) — *depends on CI/CD + API Docs*

### 5.1 Target environments & architecture
- [ ] Document: staging (render/railway/fly) + production (same, separate projects)
- [ ] Diagram: LB → API (2+ replicas) → Postgres (managed) → Redis (caching) → S3 (uploads)
- [ ] Environment variable matrix (`.env.production` template per app)
- **AC:** Architecture described, env templates complete, secrets vs config distinguished

### 5.2 Docker production images
- [ ] `docker/Dockerfile.api` (multi-stage: builder → runner, non-root, distroless/base)
- [ ] `docker/Dockerfile.web` (Nginx + Vite build, SPA fallback, gzip, CSP headers)
- [ ] `.dockerignore` optimized (node_modules, .git, dist, *.log)
- [ ] `docker-compose.prod.yml` for local prod simulation
- **AC:** Images <200MB each, healthchecks pass, `docker compose -f docker-compose.prod.yml up` works

### 5.3 Database migrations & seeding
- [ ] Document: `prisma migrate deploy` in CI/CD before app start
- [ ] Seed script: `prisma db seed` (idempotent, admin user, sample jobs)
- [ ] Rollback strategy: `prisma migrate resolve --rolled-back`
- **AC:** Migration command documented, seed runs without duplicates, rollback tested

### 5.4 CI/CD deployment jobs
- [ ] Extend `.github/workflows/ci.yml` with `deploy-staging` (on merge to main) & `deploy-production` (on tag `v*`)
- [ ] Use environment secrets (GH Environments: staging, production)
- [ ] Blue/green or rolling deploy via platform CLI (render, flyctl, railway)
- [ ] Post-deploy smoke tests: hit `/health`, `/api/jobs`, `/` (web)
- **AC:** Merging to main deploys staging; tagging deploys prod; smoke tests gate promotion

### 5.5 Observability & runbooks
- [ ] Logging: structured JSON (pino), correlation IDs, log levels per env
- [ ] Metrics: Prometheus `/metrics` (prom-client), key metrics listed
- [ ] Alerting: basic rules (error rate >5%, p95 latency >2s, DB connections >80%)
- [ ] Runbook: common incidents (DB down, migration stuck, OOM, cert expiry)
- **AC:** Logging/metrics endpoints exist, alerts defined, runbook actionable

### 5.6 Security hardening checklist
- [ ] Helmet/CORS/CSP configured, HTTPS only, HSTS, secure cookies
- [ ] Rate limiting (express-rate-limit), input validation (Zod), SQL injection safe (Prisma)
- [ ] Dependency scanning: `npm audit` + `snyk`/`trivy` in CI
- [ ] Secret scanning: `trufflehog`/`git-secrets` pre-commit
- **AC:** Checklist complete, tools configured, CI fails on critical findings

---

## Global Verification

- [ ] **All CI jobs green** on `main` (lint, typecheck, test, build, docker, openapi-validate)
- [ ] **Coverage thresholds met** in both packages
- [ ] **CONTRIBUTING.md** renders correctly on GitHub
- [ ] **API docs** accessible at `/docs` (dev) and `docs/api-reference.html` (static)
- [ ] **Deployment guide** allows fresh deploy to staging from scratch
- [ ] **No broken links** in any generated documentation

---

## Execution Order (respecting dependencies)

1. **1.1 → 1.7** (CI/CD foundation)
2. **2.1 → 2.3** (Testing infra)
3. **3.1 → 3.6** (CONTRIBUTING.md)
4. **4.1 → 4.4** (API docs)
5. **5.1 → 5.6** (Deployment guide)

> **Rule:** Do not start a task until all its dependency tasks are `[x]`.  
> Update this file in real time — mark `[~]` when starting, `[x]` only after AC verified.