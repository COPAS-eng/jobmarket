# Contributing to JobMarket

Thank you for your interest in contributing to JobMarket! This guide will help you set up your development environment, understand our workflow, and make your first contribution.

## Table of Contents

- [Project Overview](#project-overview)
- [Prerequisites](#prerequisites)
- [Development Environment Setup](#development-environment-setup)
- [Project Structure](#project-structure)
- [Branching & Commit Conventions](#branching--commit-conventions)
- [Development Workflow](#development-workflow)
- [Pull Request Checklist](#pull-request-checklist)
- [Code Review Guidelines](#code-review-guidelines)
- [Release Process](#release-process)
- [Getting Help](#getting-help)

## Project Overview

JobMarket is a full-stack job board platform built as a monorepo with npm workspaces and Turborepo:

- **apps/web** — React 18 + Vite + TypeScript frontend with Radix UI, Tailwind CSS, React Query, Axios
- **apps/api** — Express 4 + TypeScript backend with Prisma ORM, PostgreSQL, Zod validation
- **packages/shared** — Shared TypeScript types and Zod validators (e.g., `registerSchema`, `loginSchema`)

Key conventions:
- API routes mounted at `/api` (no `/v1` prefix)
- UserRole enum: `PROFISSIONAL` | `EMPREGADOR` | `ADMIN`
- CJS output for API (`"type": "module"` **not** set)
- Path aliases: `@/*` → `src/*`, `@jobmarket/shared` → `../../packages/shared/src`

## Prerequisites

| Tool | Version | Purpose |
|------|---------|---------|
| Node.js | 20.x (LTS) | Runtime |
| npm | 10.x | Package manager (workspaces) |
| PostgreSQL | 16.x | Primary database |
| Docker | Latest | Test database (postgres:16-alpine) |
| Git | 2.40+ | Version control |

**Windows users:** Use PowerShell 5.1+. Path separators are backslashes; commands separated by `;` not `&&`.

## Development Environment Setup

### 1. Clone & Install

```powershell
git clone <repository-url>
cd "D:\IA SERVERS\site de procurar empregos"
npm install
```

### 2. Configure Environment Variables

```powershell
# API environment
Copy-Item apps/api/.env.example apps/api/.env
# Edit apps/api/.env with your values (see .env.example for required keys)
# Required: DATABASE_URL, JWT_SECRET, STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET, FRONTEND_URL, EMAIL_FROM

# Web environment (if needed)
Copy-Item apps/web/.env.example apps/web/.env
```

### 3. Database Setup

**Development Database (local PostgreSQL):**

```powershell
# Ensure PostgreSQL 16 is running on localhost:5432
# Create database and user matching .env DATABASE_URL
npx turbo run db:generate --filter=api
npx turbo run db:migrate --filter=api
npx turbo run db:seed --filter=api  # optional
```

**Test Database (Docker):**

```powershell
# Start test database container
docker run -d --name jobmarket-test-db `
  -e POSTGRES_USER=test `
  -e POSTGRES_PASSWORD=test `
  -e POSTGRES_DB=jobmarket_test `
  -p 5432:5432 `
  postgres:16-alpine

# Run migrations against test DB
$env:DATABASE_URL = "postgresql://test:test@localhost:5432/jobmarket_test"
npx turbo run db:migrate --filter=api
```

### 4. Start Development Servers

```powershell
# Terminal 1: API (port 3001)
npm run dev --filter=api

# Terminal 2: Web (port 5173)
npm run dev --filter=web
```

- API: http://localhost:3001
- Web: http://localhost:5173
- API health: http://localhost:3001/health

### 5. Verify Setup

```powershell
# Run all tests
npm test

# Run linting
npm run lint

# Type check
npm run typecheck

# Format check
npm run format:check
```

## Project Structure

```
jobmarket/
├── apps/
│   ├── api/                 # Express + Prisma backend
│   │   ├── src/
│   │   │   ├── controllers/ # Route handlers
│   │   │   ├── middlewares/ # Auth, validation, errors
│   │   │   ├── routes/      # API route definitions
│   │   │   ├── services/    # Business logic
│   │   │   ├── utils/       # Helpers
│   │   │   ├── config/      # Env validation
│   │   │   └── app.ts       # Express setup
│   │   ├── prisma/
│   │   │   └── schema.prisma
│   │   ├── vitest.config.ts
│   │   └── package.json
│   │
│   └── web/                 # React + Vite frontend
│       ├── src/
│       │   ├── components/  # UI components (Button, etc.)
│       │   ├── pages/       # Route pages
│       │   ├── hooks/       # Custom hooks
│       │   ├── stores/      # Zustand/Context state
│       │   ├── services/    # API clients (axios)
│       │   └── main.tsx
│       ├── vitest.config.ts
│       └── package.json
│
├── packages/
│   └── shared/              # Shared types & validators
│       ├── src/
│       │   ├── validators.ts
│       │   └── index.ts
│       └── package.json
│
├── .github/
│   └── workflows/ci.yml     # CI pipeline
├── turbo.json               # Turborepo config
├── package.json             # Root workspace config
├── tsconfig.json            # Root TypeScript config
├── .prettierrc              # Prettier config
├── .eslintrc.cjs            # ESLint config
├── .env.example             # Environment template
└── README.md
```

## Branching & Commit Conventions

### Branch Naming

| Type | Pattern | Example |
|------|---------|---------|
| Feature | `feat/<short-description>` | `feat/add-job-filters` |
| Fix | `fix/<short-description>` | `fix/login-validation-error` |
| Chore | `chore/<short-description>` | `chore/update-dependencies` |
| Docs | `docs/<short-description>` | `docs/update-api-docs` |
| Refactor | `refactor/<short-description>` | `refactor/auth-service` |
| Test | `test/<short-description>` | `test/add-auth-integration-tests` |

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

**Types:** `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`, `build`, `ci`

**Examples:**

```
feat(api): add password reset endpoint

fix(web): resolve button focus outline issue

docs: update CONTRIBUTING.md with branching guide

test(api): add integration tests for auth refresh flow
```

### Husky Pre-commit Hooks

Configured in root `package.json` via `husky` + `lint-staged`:

- Runs `prettier --write` on staged files
- Runs `eslint --fix` on staged `.ts/.tsx` files
- Runs `typecheck` on staged files
- **Commits blocked** if any check fails

## Development Workflow

### 1. Create a Feature Branch

```powershell
git checkout main
git pull origin main
git checkout -b feat/your-feature-name
```

### 2. Develop & Test Locally

```powershell
# Make changes
# Run tests frequently
npm run test:watch --filter=api   # API unit/integration tests
npm run test:watch --filter=web   # Web component tests

# Run linting & type checking
npm run lint
npm run typecheck
```

### 3. Write Tests

- **API**: Place integration tests in `apps/api/src/routes/__tests__/`
- **Web**: Place component tests in `apps/web/src/components/__tests__/`
- **E2E**: Place Playwright tests in `e2e/`
- **Coverage thresholds**: statements 80%, branches 70%, functions 80%, lines 80%

### 4. Commit Changes

```powershell
git add .
git commit -m "feat(api): add new endpoint for job search"
```

### 5. Push & Open PR

```powershell
git push origin feat/your-feature-name
# Open PR via GitHub UI targeting main branch
```

## Pull Request Checklist

Before submitting a PR, ensure:

- [ ] **Branch** follows naming convention (`feat/`, `fix/`, etc.)
- [ ] **Commits** follow Conventional Commits format
- [ ] **Tests pass** locally (`npm test`)
- [ ] **Coverage** meets thresholds (80/70/80/80)
- [ ] **Linting** passes (`npm run lint`)
- [ ] **Type checking** passes (`npm run typecheck`)
- [ ] **Formatting** passes (`npm run format:check`)
- [ ] **No console.log/debugger** left in code
- [ ] **Environment variables** documented in `.env.example` if new ones added
- [ ] **Database migrations** included if schema changed (`npx prisma migrate dev`)
- [ ] **Shared package** version bumped if types/validators changed
- [ ] **Documentation** updated (README, API docs, CHANGELOG if applicable)
- [ ] **PR description** explains *what* and *why*, links related issues

## Code Review Guidelines

### For Reviewers

1. **Read the PR description** first — understand the problem being solved
2. **Check CI status** — all checks must pass before review
3. **Review for:**
   - Correctness: Does it solve the stated problem?
   - Security: Input validation, auth checks, no secrets exposed
   - Performance: N+1 queries, unnecessary re-renders, bundle size
   - Maintainability: Clear naming, DRY, no premature abstractions
   - Tests: Coverage for new logic, edge cases covered
   - Types: No `any`, proper generics, shared types reused
4. **Leave constructive comments** — suggest improvements, ask questions
5. **Approve** when confident; **Request changes** if blockers exist

### For Authors

- Respond to all comments (resolve or discuss)
- Push fixes as new commits (don't force-push after review starts unless requested)
- Keep PRs focused — one logical change per PR
- Split large PRs if review becomes unwieldy

## Release Process

### Versioning

Follows [Semantic Versioning](https://semver.org/):

- **MAJOR** — Breaking API changes
- **MINOR** — New features, backward compatible
- **PATCH** — Bug fixes, backward compatible

### Release Steps

1. **Update version** in root `package.json` and affected workspace `package.json` files
2. **Update CHANGELOG.md** with release notes (grouped by type: Added, Changed, Fixed, etc.)
3. **Create release branch**: `release/vX.Y.Z`
4. **Run full CI** on release branch
5. **Tag release**: `git tag vX.Y.Z`
6. **Merge to main** via PR
7. **Deploy** (see DEPLOYMENT.md)
8. **Publish packages** if applicable (`npm publish` from workspace)

### Automated Releases

GitHub Actions workflow (`.github/workflows/release.yml`) can automate:
- Version bump on merge to main (via conventional commits)
- Changelog generation
- Docker image build & push
- Deployment trigger

## Getting Help

- **Documentation**: Check `README.md`, `DEPLOYMENT.md`, API docs (Swagger at `/api/docs` when running)
- **Issues**: Search existing GitHub issues before creating new ones
- **Discussions**: Use GitHub Discussions for questions/ideas
- **Code questions**: Tag relevant maintainers in PR reviews

---

## Quick Reference Commands

```powershell
# Install all dependencies
npm install

# Run all tests
npm test

# Run tests in watch mode
npm run test:watch --filter=api
npm run test:watch --filter=web

# Lint all packages
npm run lint

# Type check all packages
npm run typecheck

# Format all packages
npm run format

# Check formatting
npm run format:check

# Build all packages
npm run build

# Generate Prisma client
npx turbo run db:generate --filter=api

# Run migrations (dev)
npx turbo run db:migrate --filter=api

# Run migrations (test DB)
$env:DATABASE_URL = "postgresql://test:test@localhost:5432/jobmarket_test"
npx turbo run db:migrate --filter=api

# Start dev servers
npm run dev --filter=api
npm run dev --filter=web

# Run E2E tests
npm run test:e2e --filter=api
npm run test:e2e --filter=web
```

---

*Last updated: 2025-09-25*