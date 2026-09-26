# JobMarket — Monorepo Tutorial

> Full-stack job board: React/Vite frontend + Express/TypeScript backend + Prisma/PostgreSQL

---

## Quick Start

```bash
# Prerequisites
# - Node.js ≥ 20 (npm ≥ 10.5.0)
# - Docker & Docker Compose (for PostgreSQL)
# - Git

# 1. Clone & install
git clone <repo-url>
cd jobmarket
npm install

# 2. Start database
docker compose -f docker/docker-compose.yml up -d postgres

# 3. Configure environment
cp apps/api/.env.example apps/api/.env  # then edit DATABASE_URL if needed

# 4. Initialize database
npm run db:generate   # generates Prisma Client
npm run db:push       # pushes schema to database
npm run db:seed       # (optional) seeds sample data

# 5. Start development servers
npm run dev           # runs both web (port 5173) + api (port 3000)
```

**URLs in dev:**
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000
- API Health: http://localhost:3000/health
- Prisma Studio: `npm run db:studio` → http://localhost:5555

---

## Project Structure

```
jobmarket/
├── apps/
│   ├── web/                 # React 18 + Vite + TypeScript
│   │   ├── src/
│   │   │   ├── components/  # Reusable UI components
│   │   │   ├── pages/       # Route-level components
│   │   │   ├── hooks/       # Custom React hooks
│   │   │   ├── services/    # API clients (Axios/Fetch wrappers)
│   │   │   ├── store/       # State management (Zustand/Context)
│   │   │   ├── types/       # Shared TypeScript types
│   │   │   └── utils/       # Helpers, constants
│   │   ├── index.html
│   │   ├── vite.config.ts
│   │   └── package.json
│   │
│   └── api/                 # Express + TypeScript
│       ├── src/
│       │   ├── config/      # Env validation, constants
│       │   ├── controllers/ # Route handlers
│       │   ├── middleware/  # Auth, validation, error handling
│       │   ├── routes/      # Route definitions
│       │   ├── services/    # Business logic
│       │   ├── utils/       # Helpers
│       │   └── app.ts       # Express app factory
│       ├── prisma/
│       │   ├── schema.prisma    # Database schema
│       │   └── seed.ts          # Seed script
│       ├── docker/
│       │   └── Dockerfile
│       └── package.json
│
├── packages/                # Shared packages (optional)
│   ├── eslint-config/       # Shared ESLint config
│   ├── tsconfig/            # Shared TypeScript configs
│   └── ui/                  # Shared UI components (future)
│
├── docker/
│   └── docker-compose.yml   # PostgreSQL, Redis, etc.
│
├── turbo.json               # Turborepo pipeline config
├── package.json             # Root workspace config
├── .env.example             # Root env template
└── README.md                # This file
```

---

## Available Commands

### Root (run from monorepo root)

| Command | Description |
|---------|-------------|
| `npm run dev` | Start all apps in dev mode (web + api) |
| `npm run build` | Build all apps for production |
| `npm run lint` | Lint all packages |
| `npm run typecheck` | Type-check all packages |
| `npm run test` | Run all tests |
| `npm run format` | Format with Prettier |
| `npm run db:generate` | Generate Prisma Client |
| `npm run db:push` | Push schema changes to DB (dev) |
| `npm run db:migrate` | Create & run migrations (prod) |
| `npm run db:studio` | Open Prisma Studio |
| `npm run db:seed` | Seed database with sample data |
| `npm run docker:up` | Start Docker services |
| `npm run docker:down` | Stop Docker services |

### Frontend (`apps/web`)

```bash
cd apps/web
npm run dev          # Vite dev server (port 5173)
npm run build        # Production build → dist/
npm run preview      # Preview production build
npm run lint         # ESLint
npm run typecheck    # tsc --noEmit
```

### Backend (`apps/api`)

```bash
cd apps/api
npm run dev          # tsx watch (port 3000)
npm run build        # tsc → dist/
npm run start        # Run production build
npm run lint         # ESLint
npm run typecheck    # tsc --noEmit
npm run test         # Vitest
npm run db:generate  # prisma generate
npm run db:push      # prisma db push
npm run db:migrate   # prisma migrate dev
npm run db:studio    # prisma studio
npm run db:seed      # tsx prisma/seed.ts
```

---

## Environment Configuration

### Backend (`apps/api/.env`)

```env
# Database
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/jobmarket?schema=public"

# Server
PORT=3000
NODE_ENV=development
CORS_ORIGIN="http://localhost:5173"

# Auth (add when implementing)
JWT_SECRET="your-super-secret-key-min-32-chars"
JWT_EXPIRES_IN="7d"

# External APIs (add as needed)
# LINKEDIN_CLIENT_ID=""
# LINKEDIN_CLIENT_SECRET=""
# GITHUB_CLIENT_ID=""
# GITHUB_CLIENT_SECRET=""
```

### Frontend (`apps/web/.env`)

```env
VITE_API_URL=http://localhost:3000
VITE_APP_NAME=JobMarket
```

### Docker Compose (`docker/docker-compose.yml`)

```yaml
services:
  postgres:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: jobmarket
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 5s
      timeout: 5s
      retries: 5

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data

volumes:
  postgres_data:
  redis_data:
```

---

## Development Workflow

### 1. Feature Development

```bash
# 1. Create feature branch
git checkout -b feat/job-search-filters

# 2. Make changes
# - Frontend: apps/web/src/
# - Backend: apps/api/src/
# - Database: apps/api/prisma/schema.prisma

# 3. Run quality checks
npm run lint
npm run typecheck
npm run test

# 4. If schema changed
npm run db:generate
npm run db:migrate  # creates migration file

# 5. Commit with conventional commits
git add .
git commit -m "feat(job-search): add salary range filter"

# 6. Push & create PR
git push origin feat/job-search-filters
```

### 2. Database Changes

```bash
# Option A: Development (push directly)
# Edit schema.prisma →
npm run db:generate
npm run db:push

# Option B: Production-ready (migrations)
# Edit schema.prisma →
npm run db:generate
npm run db:migrate  # prompts for migration name
# Review generated migration in prisma/migrations/
npm run db:seed     # if seed data needs update
```

### 3. Adding a New Shared Package

```bash
# 1. Create package
mkdir -p packages/my-package/src
# Add package.json, tsconfig.json, source files

# 2. Add to root package.json workspaces
# "workspaces": ["apps/*", "packages/*"]

# 3. Install
npm install

# 4. Import in apps
# In apps/web/package.json or apps/api/package.json:
# "dependencies": { "my-package": "workspace:*" }
```

### 4. Code Style & Conventions

| Area | Convention |
|------|------------|
| **Commits** | Conventional Commits: `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, `test:` |
| **Branches** | `feat/`, `fix/`, `chore/`, `docs/`, `refactor/` |
| **TypeScript** | Strict mode, explicit return types for public APIs |
| **React** | Functional components, hooks, TypeScript interfaces for props |
| **Express** | Controllers → Services → Prisma, async/await, proper error handling |
| **Database** | snake_case tables/columns, UUID primary keys, indexes on FKs |
| **API** | RESTful, plural nouns, proper HTTP status codes |
| **Env** | Never commit `.env` files, use `.env.example` |

---

## Testing

```bash
# Run all tests
npm run test

# Frontend only
cd apps/web && npm run test

# Backend only
cd apps/api && npm run test

# Watch mode
npm run test -- --watch

# Coverage
npm run test -- --coverage
```

**Test Structure:**
- Unit: `*.test.ts` / `*.test.tsx` alongside source
- Integration: `__tests__/` directories
- E2E: (add Playwright/Cypress later)

---

## Deployment

### Docker Production Build

```bash
# Build images
docker compose -f docker/docker-compose.prod.yml build

# Run
docker compose -f docker/docker-compose.prod.yml up -d
```

### Environment Variables (Production)

```env
# Required
DATABASE_URL="postgresql://user:pass@host:5432/db?schema=public"
JWT_SECRET="production-secret-64-chars-minimum"
NODE_ENV=production
CORS_ORIGIN="https://yourdomain.com"

# Optional
REDIS_URL="redis://host:6379"
LOG_LEVEL="info"
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=100
```

### Database Migrations (Production)

```bash
# On deploy
npm run db:migrate deploy  # runs pending migrations
```

---

## Troubleshooting

### Port Already in Use
```bash
# Find & kill process
lsof -ti:5173 | xargs kill -9
lsof -ti:3000 | xargs kill -9
```

### Database Connection Failed
```bash
# Check Docker
docker compose -f docker/docker-compose.yml ps
docker compose -f docker/docker-compose.yml logs postgres

# Reset database
docker compose -f docker/docker-compose.yml down -v
docker compose -f docker/docker-compose.yml up -d postgres
npm run db:push
```

### Prisma Client Out of Sync
```bash
npm run db:generate
# If still failing:
rm -rf node_modules/.prisma
npm run db:generate
```

### Type Errors After Schema Change
```bash
npm run db:generate
# Restart TypeScript server in IDE (Cmd+Shift+P → "TypeScript: Restart TS Server")
```

### Turbo Cache Issues
```bash
npm run clean  # if defined, or:
rm -rf node_modules/.turbo
rm -rf apps/*/node_modules/.turbo
```

---

## Useful Links

- [Turborepo Docs](https://turbo.build/repo/docs)
- [Prisma Docs](https://www.prisma.io/docs)
- [Vite Docs](https://vitejs.dev/guide/)
- [Express Docs](https://expressjs.com/)
- [React Docs](https://react.dev/)
- [TypeScript Docs](https://www.typescriptlang.org/docs/)

---

## License

MIT — see LICENSE file for details.