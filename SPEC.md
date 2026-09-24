# SPEC: JobMarket — Marketplace Híbrido de Empregos & Freelance

**Versão:** 1.0  
**Data:** 2025-01-15  
**Status:** Aprovado para Implementação  
**Autor:** AI Assistant + Human Partner

---

## 1. OBJECTIVE

### 1.1 What We're Building
Uma plataforma web completa (marketplace) conectando **profissionais** (freelancers, devs, designers, marketers, etc.) com **empregadores** (empresas, startups, indivíduos) para dois modelos de contratação:
- **Freelance/Gigs**: Projetos pontuais, pagamento por entrega/milestone
- **Empregos Formais (CLT/PJ)**: Vagas de longo prazo, contratação tradicional

### 1.2 Business Model (Revenue)
- **Assinatura mensal** (3 tiers: Free/Pro/Enterprise) — receita recorrente
- **Comissão por transação** (split payment via Stripe Connect) — receita variável
  - Free: 12% | Pro: 8% | Enterprise: 5%
- **Sua receita**: % automático sobre cada pagamento processado

### 1.3 Target Users
| Persona | Necessidades Principais |
|---------|------------------------|
| **Profissional** | Perfil público, portfólio, skills, propostas, contratos, saques |
| **Empregador** | Postar vagas, filtrar candidatos, chat, contratar, gerenciar pagamentos |
| **Admin (você)** | Dashboard métricas, moderação, configuração comissões/planos |

### 1.4 Success Metrics (KPIs)
- **GMV** (Gross Merchandise Volume) mensal
- **Take Rate** efetiva (comissão média real)
- **LTV/CAC** por segmento (pro vs employer)
- **Time-to-first-deal** (profissional novo → primeiro contrato)
- **Churn** de assinaturas Pro/Enterprise

---

## 2. COMMANDS

```bash
# Desenvolvimento
npm run dev              # Inicia web + api simultaneamente (concurrently)
npm run dev:web          # Apenas frontend (Vite) — porta 5173
npm run dev:api          # Apenas backend (tsx watch) — porta 3001

# Build & Produção
npm run build            # Build completo (web + api)
npm run build:web        # Build frontend para dist/
npm run build:api        # Compila TypeScript → dist/

# Database
npm run db:generate      # Prisma generate
npm run db:push          # Prisma db push (dev)
npm run db:migrate       # Prisma migrate deploy (prod)
npm run db:studio        # Prisma Studio
npm run db:seed          # Seed dados de desenvolvimento

# Qualidade
npm run lint             # ESLint (web + api)
npm run lint:fix         # ESLint --fix
npm run typecheck        # tsc --noEmit (web + api)
npm run format           # Prettier --write
npm run test             # Vitest (unit + integration)
npm run test:ui          # Vitest UI
npm run test:coverage    # Coverage report
npm run test:e2e         # Playwright E2E

# Deploy
docker compose up -d     # Produção local
npm run deploy:railway   # Deploy Railway (configurado)
npm run deploy:render    # Deploy Render (configurado)
```

---

## 3. PROJECT STRUCTURE (Monorepo)

```
jobmarket/
├── apps/
│   ├── web/                    # React 18 + Vite + TypeScript
│   │   ├── src/
│   │   │   ├── components/     # Componentes UI reutilizáveis
│   │   │   │   ├── ui/         # Primitivas (Button, Input, Card, Modal...)
│   │   │   │   ├── layout/     # Header, Footer, Sidebar, Container
│   │   │   │   ├── forms/      # Form components com react-hook-form + Zod
│   │   │   │   └── animations/ # Framer Motion wrappers + GSAP hooks
│   │   │   ├── pages/          # Page components (routes)
│   │   │   │   ├── public/     # Landing, Jobs, Profissionais, Auth
│   │   │   │   ├── professional/
│   │   │   │   ├── employer/
│   │   │   │   └── admin/
│   │   │   ├── hooks/          # Custom hooks (useAuth, useJobs, useScroll...)
│   │   │   ├── contexts/       # React Context (AuthContext, ThemeContext)
│   │   │   ├── services/       # API client (axios instance + endpoints)
│   │   │   ├── utils/          # Helpers (formatCurrency, cn, date...)
│   │   │   ├── types/          # TypeScript types (mirror de packages/shared)
│   │   │   ├── styles/         # Tailwind CSS + globals.css
│   │   │   ├── App.tsx
│   │   │   └── main.tsx
│   │   ├── index.html
│   │   ├── vite.config.ts
│   │   ├── tsconfig.json
│   │   └── package.json
│   │
│   └── api/                    # Express + TypeScript
│       ├── src/
│       │   ├── config/         # Env validation (zod), constants
│       │   ├── controllers/    # Route handlers (thin)
│       │   ├── middlewares/    # Auth, validation, error handling, rate limit
│       │   ├── routes/         # Route definitions
│       │   ├── services/       # Business logic (separate from controllers)
│       │   ├── repositories/   # Data access (Prisma wrappers)
│       │   ├── utils/          # Helpers (jwt, password, email, stripe...)
│       │   ├── types/          # Express request extensions, etc.
│       │   ├── app.ts          # Express app factory
│       │   └── server.ts       # Entry point
│       ├── prisma/
│       │   ├── schema.prisma
│       │   ├── migrations/
│       │   └── seed.ts
│       ├── tsconfig.json
│       └── package.json
│
├── packages/
│   └── shared/                 # Types & utilities compartilhados
│       ├── src/
│       │   ├── types/          # Zod schemas + TS types (User, Job, Contract...)
│       │   ├── constants/      # Enums, config values
│       │   └── validators/     # Zod schemas reutilizáveis (web + api)
│       ├── package.json
│       └── tsconfig.json
│
├── docker/
│   ├── Dockerfile.web
│   ├── Dockerfile.api
│   ├── docker-compose.yml
│   └── docker-compose.prod.yml
│
├── docs/
│   ├── api.md                  # API reference (OpenAPI/Swagger)
│   ├── database.md             # ERD + decisões de schema
│   ├── deployment.md
│   └── architecture.md
│
├── .github/
│   └── workflows/
│       ├── ci.yml              # Lint, typecheck, test, build
│       └── deploy.yml          # Deploy production
│
├── .env.example
├── .gitignore
├── package.json                # Root workspace (npm workspaces)
├── turbo.json                  # Turborepo config (opcional)
└── README.md
```

---

## 4. CODE STYLE

### 4.1 TypeScript (Strict Mode)
```typescript
// tsconfig.json base (apps/*/tsconfig.json extends this)
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  }
}
```

### 4.2 Naming Conventions
| Tipo | Convention | Exemplo |
|------|------------|---------|
| Components | PascalCase | `JobCard.tsx`, `ParallaxHero.tsx` |
| Hooks | camelCase + `use` prefix | `useJobs.ts`, `useParallax.ts` |
| Utilities | camelCase | `formatCurrency.ts`, `cn.ts` |
| Types/Interfaces | PascalCase | `User`, `JobResponse`, `ApiError` |
| Zod Schemas | PascalCase + `Schema` suffix | `UserSchema`, `CreateJobSchema` |
| Constants | UPPER_SNAKE_CASE | `MAX_FILE_SIZE`, `JOB_TYPES` |
| CSS Classes | kebab-case (Tailwind) | `job-card`, `btn-primary` |

### 4.3 React Component Pattern
```tsx
// components/ui/Button/Button.tsx
import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cn } from '@/utils/cn';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading, children, disabled, ...props }, ref) => {
    const base = 'inline-flex items-center justify-center font-medium transition-all duration-200 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 disabled:opacity-50 disabled:cursor-not-allowed';
    
    const variants = {
      primary: 'bg-cyan-500 text-slate-950 hover:bg-cyan-400 active:bg-cyan-600 shadow-lg shadow-cyan-500/20',
      secondary: 'bg-slate-800 text-slate-100 hover:bg-slate-700 border border-slate-700',
      ghost: 'text-slate-300 hover:bg-slate-800 hover:text-white',
      danger: 'bg-red-600 text-white hover:bg-red-500 shadow-lg shadow-red-500/20',
    };
    
    const sizes = {
      sm: 'px-3 py-1.5 text-sm gap-1.5',
      md: 'px-5 py-2.5 text-base gap-2',
      lg: 'px-7 py-3.5 text-lg gap-2.5',
    };

    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], sizes[size], className)}
        disabled={disabled || loading}
        {...props}
      >
        {loading && <Spinner className="h-4 w-4" />}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
```

### 4.4 Express Route Pattern
```typescript
// routes/jobs.ts
import { Router } from 'express';
import { validate } from '@/middlewares/validate';
import { authenticate, authorize } from '@/middlewares/auth';
import { jobController } from '@/controllers/jobController';
import { createJobSchema, updateJobSchema, jobQuerySchema } from '@jobmarket/shared/validators';

const router = Router();

// Public
router.get('/', validate({ query: jobQuerySchema }), jobController.list);
router.get('/:id', jobController.getById);

// Protected (Employer)
router.post('/', authenticate, authorize('EMPREGADOR', 'ADMIN'), validate({ body: createJobSchema }), jobController.create);
router.patch('/:id', authenticate, authorize('EMPREGADOR', 'ADMIN'), validate({ body: updateJobSchema }), jobController.update);
router.delete('/:id', authenticate, authorize('EMPREGADOR', 'ADMIN'), jobController.delete);

export default router;
```

### 4.5 Service Layer Pattern
```typescript
// services/jobService.ts
import { prisma } from '@/repositories/prisma';
import { NotFoundError, ForbiddenError } from '@/utils/errors';
import { CreateJobInput, UpdateJobInput, JobFilters } from '@jobmarket/shared/types';

export const jobService = {
  async create(employerId: string, data: CreateJobInput) {
    return prisma.job.create({
      data: {
        ...data,
        employerId,
        skills: { connect: data.skillIds.map(id => ({ id })) },
      },
      include: { skills: true, employer: { select: { id: true, profile: true } } },
    });
  },

  async list(filters: JobFilters, pagination: { page: number; limit: number }) {
    const where = this.buildWhere(filters);
    const [jobs, total] = await Promise.all([
      prisma.job.findMany({
        where,
        include: { skills: true, employer: { select: { profile: true } } },
        orderBy: { createdAt: 'desc' },
        skip: (pagination.page - 1) * pagination.limit,
        take: pagination.limit,
      }),
      prisma.job.count({ where }),
    ]);
    return { jobs, total, page: pagination.page, limit: pagination.limit };
  },

  async update(jobId: string, employerId: string, data: UpdateJobInput) {
    const job = await prisma.job.findUnique({ where: { id: jobId } });
    if (!job) throw new NotFoundError('Vaga não encontrada');
    if (job.employerId !== employerId) throw new ForbiddenError('Não autorizado');
    
    return prisma.job.update({
      where: { id: jobId },
      data: { ...data, skills: data.skillIds ? { set: data.skillIds.map(id => ({ id })) } : undefined },
      include: { skills: true },
    });
  },
  
  private buildWhere(filters: JobFilters) { /* ... */ }
};
```

---

## 5. TESTING STRATEGY

### 5.1 Unit Tests (Vitest)
- **Onde:** `apps/*/src/**/*.test.ts(x)`
- **Coverage alvo:** ≥ 80% (services, utils, validators)
- **Foco:** Business logic isolada, mappers, validators, utils

### 5.2 Integration Tests (Vitest + Testcontainers)
- **Onde:** `apps/api/tests/integration/`
- **Coverage alvo:** ≥ 70% (API endpoints, database operations)
- **Foco:** Controllers + Services + Repository + Prisma (PostgreSQL real)

### 5.3 E2E Tests (Playwright)
- **Onde:** `e2e/`
- **Cenários críticos:**
  - Fluxo completo: Cadastro → Login → Criar vaga → Proposta → Contrato → Pagamento
  - Auth: Login, refresh token, logout, protected routes
  - Stripe Connect onboarding + webhook
  - Admin: métricas, moderação usuários

### 5.4 Visual Regression (Storybook + Chromatic)
- **Onde:** `apps/web/.storybook/`
- **Componentes:** UI primitives, JobCard, ProfileCard, Forms

---

## 6. BOUNDARIES

| Tier | Ação |
|------|------|
| **ALWAYS DO** | • Run `npm run lint && npm run typecheck && npm run test` antes de commit<br>• Seguir naming conventions acima<br>• Validar inputs com Zod (web + api)<br>• Usar `cn()` para classNames<br>• Manter components < 200 linhas<br>• Escrever testes para nova business logic |
| **ASK FIRST** | • Mudanças no `prisma/schema.prisma` (migrations)<br>• Adicionar dependências (npm install)<br>• Alterar `turbo.json`, `docker-compose.yml`, CI/CD<br>• Mudar estrutura de pastas em `apps/` ou `packages/`<br>• Modificar variáveis de ambiente obrigatórias |
| **NEVER DO** | • Commit secrets (`.env`, keys, tokens)<br>• Editar `node_modules/` ou `.prisma/client/`<br>• Remover testes que falham sem aprovação<br>• Fazer `prisma db push` em produção<br>• Hardcodear URLs, IDs, credenciais<br>• Ignorar TypeScript errors (`@ts-ignore` sem justificativa) |

---

## 7. TECH SPECIFICS

### 7.1 Environment Variables
```bash
# apps/api/.env
DATABASE_URL="postgresql://user:pass@localhost:5432/jobmarket?schema=public"
JWT_SECRET="your-super-secret-jwt-key-min-32-chars"
JWT_REFRESH_SECRET="your-refresh-secret-different-from-above"
JWT_ACCESS_EXPIRY="15m"
JWT_REFRESH_EXPIRY="7d"
BCRYPT_ROUNDS=12

# Stripe
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
STRIPE_CONNECT_CLIENT_ID="ca_..." # OAuth Connect

# Frontend URL (CORS + email links)
FRONTEND_URL="http://localhost:5173"

# Email (Resend/SendGrid)
EMAIL_FROM="noreply@jobmarket.com"
RESEND_API_KEY="re_..."

# Redis (rate limit, sessions)
REDIS_URL="redis://localhost:6379"

# App
NODE_ENV="development"
PORT=3001
```

```bash
# apps/web/.env
VITE_API_URL="http://localhost:3001/api"
VITE_STRIPE_PUBLISHABLE_KEY="pk_test_..."
VITE_APP_NAME="JobMarket"
```

### 7.2 Database Indexes (Performance)
```prisma
// prisma/schema.prisma - indexes críticos
model Job {
  // ... fields
  @@index([employerId])
  @@index([status, type])
  @@index([category, status])
  @@index([createdAt])
  @@index([remote, status])
}

model Proposal {
  // ... fields
  @@index([jobId])
  @@index([professionalId])
  @@index([status])
  @@unique([jobId, professionalId]) // Um profissional = uma proposta por vaga
}

model Contract {
  // ... fields
  @@index([professionalId, status])
  @@index([employerId, status])
  @@index([status])
}

model Payment {
  // ... fields
  @@index([contractId])
  @@index([stripePaymentIntentId])
  @@index([status, createdAt])
}
```

### 7.3 API Response Format
```typescript
// Sucesso
interface ApiSuccess<T> {
  success: true;
  data: T;
  meta?: { page: number; limit: number; total: number };
}

// Erro
interface ApiError {
  success: false;
  error: {
    code: string;        // 'VALIDATION_ERROR', 'NOT_FOUND', 'UNAUTHORIZED', 'FORBIDDEN', 'INTERNAL_ERROR'
    message: string;
    details?: Record<string, string[]>; // Zod errors
  };
}
```

### 7.4 Authentication Flow
```
1. POST /api/auth/login → { accessToken, refreshToken } (httpOnly cookies)
2. Access Token (15min) → Authorization: Bearer <token>
3. 401 + "TOKEN_EXPIRED" → POST /api/auth/refresh (cookie refreshToken) → novo accessToken
4. Logout → DELETE /api/auth/logout → clear cookies
```

### 7.5 Stripe Connect Flow
```
1. Employer/Professional clica "Conectar Stripe"
2. GET /api/stripe/connect/authorize → redirect to Stripe OAuth
3. Stripe callback → GET /api/stripe/connect/callback?code=...
4. Exchange code → stripe.accounts.createToken + accountLink
5. Save stripeAccountId no User/Profile
6. Webhook: account.updated → update onboarding status
7. Payment: create PaymentIntent com `application_fee_amount` (comissão) + `transfer_data.destination` (connected account)
```

---

## 8. ANIMATION SPECS (Frontend)

### 8.1 Parallax Hero (GSAP ScrollTrigger)
```typescript
// hooks/useParallaxHero.ts
// Camadas: background (0.3x), floating skills (0.6x), content (1x)
// Trigger: scroll start=top, end=bottom top
// Performance: will-change: transform, GPU layers
```

### 8.2 Scroll Reveal (Framer Motion)
```typescript
// components/animations/ScrollReveal.tsx
<motion.div
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: '-100px' }}
  transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
>
  {children}
</motion.div>
```

### 8.3 Stagger Children
```typescript
// JobList.tsx
<motion.ul
  initial="hidden"
  animate="show"
  variants={{
    hidden: { opacity: 0 },
    show: { transition: { staggerChildren: 0.1 } }
  }}
>
  {jobs.map(job => (
    <motion.li key={job.id} variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}>
      <JobCard job={job} />
    </motion.li>
  ))}
</motion.ul>
```

### 8.4 Animated Counters (Stats)
```typescript
// components/animations/AnimatedCounter.tsx
// useCountUp hook com IntersectionObserver
// Duração: 2s, easing: easeOutExpo
// Formato: Intl.NumberFormat('pt-BR')
```

---

## 9. ACCESSIBILITY (WCAG 2.2 AA)

- **Contraste:** Mínimo 4.5:1 (texto), 3:1 (UI components)
- **Focus visible:** Anel cyan-400 2px + offset 2px em todos interativos
- **Keyboard:** Tab order lógico, skip links, escape fecha modais
- **ARIA:** Labels em inputs, roles em dialogs, live regions para toasts
- **Motion:** `prefers-reduced-motion` desativa parallax/reveal
- **Alt text:** Obrigatório em avatars, imagens de portfolio

---

## 10. SECURITY

- **Passwords:** bcrypt (12 rounds)
- **JWT:** RS256 (assimétrico) ou HS256 com rotação de segredo
- **Rate Limit:** 100 req/min (api), 10 req/min (auth endpoints)
- **CORS:** Apenas `FRONTEND_URL` permitido
- **Helmet:** CSP, HSTS, X-Frame-Options, Referrer-Policy
- **Input Validation:** Zod em TODOS endpoints
- **SQL Injection:** Prisma ORM (parameterized queries)
- **XSS:** React auto-escape + DOMPurify para markdown
- **CSRF:** SameSite=Strict cookies + Double Submit Cookie pattern

---

## 11. DEPLOYMENT

### 11.1 Docker Compose (Dev)
```yaml
services:
  postgres:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: jobmarket
      POSTGRES_USER: jobmarket
      POSTGRES_PASSWORD: devpassword
    ports: ["5432:5432"]
    volumes: ["pgdata:/var/lib/postgresql/data"]
  
  redis:
    image: redis:7-alpine
    ports: ["6379:6379"]
  
  api:
    build: { context: ./apps/api, dockerfile: Dockerfile }
    ports: ["3001:3001"]
    env_file: ./apps/api/.env
    depends_on: [postgres, redis]
  
  web:
    build: { context: ./apps/web, dockerfile: Dockerfile }
    ports: ["5173:5173"]
    env_file: ./apps/web/.env
    depends_on: [api]

volumes: { pgdata: }
```

### 11.2 Production (Railway/Render/VPS)
- **Database:** Managed PostgreSQL (Railway/Render/Neon/Supabase)
- **Redis:** Managed Redis (Upstash/Railway/Render)
- **API:** Container (Railway/Render/Fly.io) — 2+ replicas
- **Web:** Static build → CDN (Vercel/Netlify/Cloudflare Pages) OU container
- **SSL:** Automático (plataforma)
- **Monitoring:** Sentry (errors), PostHog (analytics), UptimeRobot

---

## 12. PHASED IMPLEMENTATION PLAN

### Phase 1: Foundation (Week 1-2)
- [ ] Monorepo setup + npm workspaces + Turborepo
- [ ] Prisma schema + migrations + seed
- [ ] Express API skeleton + JWT auth + middleware
- [ ] React + Vite + Tailwind v4 + TypeScript
- [ ] Shared types package (Zod + TS)
- [ ] CI/CD pipeline (lint, typecheck, test, build)
- [ ] Docker compose dev + prod

### Phase 2: Core Domain (Week 2-3)
- [ ] Auth: Register, Login, Refresh, Logout, Me
- [ ] User roles + Profile CRUD (Professional/Employer)
- [ ] Skills taxonomy (categorias, busca, tags)
- [ ] Jobs: CRUD (Employer), List/Detail (Public)
- [ ] Proposals: Create, List, Accept/Reject
- [ ] Contracts: Create from accepted proposal, status machine

### Phase 3: Payments & Monetization (Week 3-4)
- [ ] Stripe Connect onboarding (Professional + Employer)
- [ ] Subscription plans (Stripe Billing + webhooks)
- [ ] Payment flow: Milestone → PaymentIntent → Webhook → Split
- [ ] Commission calculation + platform fee tracking
- [ ] Professional: Earnings dashboard + Withdrawal (Stripe Payouts)
- [ ] Employer: Invoices + Payment history

### Phase 4: Dashboards & UX (Week 4-5)
- [ ] Professional Dashboard: Perfil, Propostas, Contratos, Ganhos, Assinatura
- [ ] Employer Dashboard: Minhas Vagas, Candidatos, Contratos, Pagamentos, Equipe
- [ ] Admin Panel: Usuários, Transações, Métricas, Configurações
- [ ] Real-time: Notificações (Socket.io), Chat básico

### Phase 5: Landing & Animations (Week 5-6)
- [ ] Landing Page: Hero Parallax (GSAP), Stats, Features, CTA
- [ ] Public Pages: Jobs list (filtros, infinite scroll), Profissionais directory
- [ ] Scroll Reveal (Framer Motion) em todas páginas públicas
- [ ] Micro-interactions: Hover cards, button states, form feedback
- [ ] Performance: LCP < 2.5s, INP < 200ms, CLS < 0.1

### Phase 6: Polish & Launch (Week 6-7)
- [ ] Accessibility audit + fixes
- [ ] Cross-browser testing (Chrome, Firefox, Safari)
- [ ] Load testing (k6) — 1000 concurrent users
- [ ] Security audit (OWASP Top 10)
- [ ] Documentation: API (Swagger), Database, Deployment
- [ ] Production deploy + smoke tests
- [ ] Launch! 🚀

---

## 13. RISKS & MITIGATION

| Risco | Probabilidade | Impacto | Mitigação |
|-------|---------------|---------|-----------|
| Stripe Connect complexidade | Alta | Alto | Começar cedo, usar Stripe CLI para testar webhooks local |
| Performance animações mobile | Média | Médio | `prefers-reduced-motion`, testar em dispositivos reais |
| Moderação de conteúdo | Média | Alto | Admin tools desde Phase 1, reporting system |
| Chargebacks/disputas | Baixa | Alto | Stripe Radar, termos claros, evidence collection |
| Escalabilidade database | Baixa | Alto | Índices certos, connection pooling (PgBouncer), read replicas |

---

## 14. APPROVAL CHECKLIST

- [x] **Objective** claro e métricas definidas
- [x] **Commands** documentados e testáveis
- [x] **Project Structure** monorepo com separação clara
- [x] **Code Style** com exemplos reais
- [x] **Testing Strategy** em 3 níveis + visual regression
- [x] **Boundaries** explícitos (Always/Ask/Never)
- [x] **Tech Specs**: Env, DB indexes, API format, Auth, Stripe
- [x] **Animation Specs**: Parallax, Scroll Reveal, Stagger, Counters
- [x] **Accessibility**: WCAG 2.2 AA
- [x] **Security**: OWASP basics + specifics
- [x] **Deployment**: Dev + Prod arquitetura
- [x] **Phased Plan**: 7 semanas com milestones
- [x] **Risks**: Identificados com mitigação

---

**Próximo passo:** Iniciar **Phase 1: Foundation** — criar monorepo, configurar tooling, Prisma schema, Express + React skeleton.

---

*Este SPEC é o "source of truth". Qualquer mudança de escopo deve ser discutida e documentada aqui antes da implementação.*