# Implementation Plan: JobMarket Documentation Suite

## Deliverables & Dependency Graph

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         DEPENDENCY GRAPH                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   [1] CI/CD Pipeline (.github/workflows/ci.yml)                            │
│        │                                                                    │
│        ├──► [3] Testing Setup (Jest + RTL + Playwright)                    │
│        │                                                                    │
│        ├──► [4] Deployment Guide (DEPLOYMENT.md)                           │
│        │                                                                    │
│        └──► [2] CONTRIBUTING.md (references CI/CD)                         │
│                                                                             │
│   [5] API Documentation (OpenAPI/Swagger) ◄─────────────────────────────┐   │
│        │                                                                 │   │
│        └────────────────────────────────────────────────────────────────┘   │
│                         │                                                   │
│                         ▼                                                   │
│              [4] Deployment Guide (references API docs)                    │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Vertical Slices (Implementation Order)

### Slice 1: Foundation — CI/CD Pipeline
**File:** `.github/workflows/ci.yml`
- **Why first:** All other deliverables depend on CI running
- **Scope:** Lint, typecheck, test, build for both web and api workspaces
- **Triggers:** push to main, PR to main, manual dispatch
- **Artifacts:** test reports, coverage, build outputs

### Slice 2: Testing Infrastructure
**Files:** 
- `apps/web/jest.config.ts`, `apps/web/vitest.config.ts`
- `apps/api/jest.config.ts`
- Playwright config at root or web app
- Test utilities and setup files
- **Why second:** CI needs tests to run; CONTRIBUTING.md references test commands

### Slice 3: CONTRIBUTING.md
**File:** `CONTRIBUTING.md` (root)
- **Why third:** Documents workflow that uses CI/CD and tests
- **Scope:** Branch naming, commit conventions, PR process, local dev setup, test commands

### Slice 4: API Documentation
**Files:**
- `apps/api/src/docs/openapi.ts` (or swagger-jsdoc setup)
- `apps/api/src/routes/docs.ts` (Swagger UI endpoint)
- **Why fourth:** Deployment guide references API docs endpoint

### Slice 5: Deployment Guide
**File:** `DEPLOYMENT.md` (root)
- **Why last:** Aggregates all previous deliverables
- **Scope:** Docker, Vercel (web), Railway/Render (api), DB migrations, env vars, health checks, rollback

## Implementation Sequence

| Order | Deliverable | Est. Effort | Dependencies |
|-------|-------------|-------------|--------------|
| 1 | CI/CD Pipeline | 2-3 hrs | None |
| 2 | Testing Setup | 3-4 hrs | CI/CD (for test runner config) |
| 3 | CONTRIBUTING.md | 1-2 hrs | CI/CD, Testing |
| 4 | API Documentation | 2-3 hrs | None (parallel with 2-3) |
| 5 | Deployment Guide | 2-3 hrs | CI/CD, Testing, API Docs |

## Acceptance Criteria per Deliverable

### 1. CI/CD Pipeline
- [ ] Workflow runs on push/PR to main
- [ ] Runs `npm run lint`, `npm run typecheck`, `npm run test`, `npm run build` for both apps
- [ ] Caches node_modules and Turborepo cache
- [ ] Uploads coverage reports as artifacts
- [ ] Fails fast on lint/typecheck errors
- [ ] Posts PR comment with test summary

### 2. Testing Setup
- [ ] `apps/web`: Vitest + React Testing Library configured
- [ ] `apps/api`: Jest + Supertest configured
- [ ] Playwright E2E tests configured (smoke tests for critical paths)
- [ ] Coverage thresholds enforced (80% lines, 70% branches)
- [ ] Test scripts in package.json: `test`, `test:watch`, `test:coverage`, `test:e2e`
- [ ] CI runs all test suites

### 3. CONTRIBUTING.md
- [ ] Branch naming convention (feat/, fix/, chore/, docs/)
- [ ] Conventional commits format
- [ ] PR template reference
- [ ] Local development setup (docker-compose, env files)
- [ ] Test commands and how to run locally
- [ ] Code style guidelines (ESLint, Prettier)
- [ ] Release process overview

### 4. API Documentation
- [ ] OpenAPI 3.0 spec generated from code (swagger-jsdoc or tsoa)
- [ ] Swagger UI served at `/api/docs` in development
- [ ] All endpoints documented: auth, jobs, companies, applications, users
- [ ] Request/response schemas with examples
- [ ] Authentication schemes documented (JWT)
- [ ] CI validates spec compiles

### 5. Deployment Guide
- [ ] Docker production build (multi-stage)
- [ ] Vercel deployment for web (with env vars)
- [ ] Railway/Render/Fly.io deployment for api
- [ ] PostgreSQL setup (managed or self-hosted)
- [ ] Prisma migrations in CI/CD
- [ ] Environment variable matrix (dev/staging/prod)
- [ ] Health check endpoints
- [ ] Rollback procedure
- [ ] Monitoring/logging basics

## Risk Mitigation

| Risk | Mitigation |
|------|------------|
| Turborepo cache issues in CI | Use `turbo prune` for affected workspaces only |
| Playwright flakiness | Retry 2x, run headed in CI debug mode |
| OpenAPI spec drift | Generate from source, validate in CI |
| Docker build times | Multi-stage, layer caching, .dockerignore |
| Env var secrets in CI | GitHub Environments + Secrets, never in logs |