# JobMarket — Marketplace Híbrido de Empregos & Freelance

> Plataforma completa conectando profissionais (freelancers, devs, designers, marketers) com empresas para vagas CLT/PJ e projetos freelance. Modelo de receita: assinaturas + comissão por transação via Stripe Connect.

## 🚀 Stack Tecnológica

| Camada | Tecnologia |
|--------|------------|
| **Frontend** | React 18 + Vite + TypeScript + Tailwind CSS v4 |
| **Animações** | Framer Motion (scroll reveal) + GSAP (parallax hero) |
| **Backend** | Node.js + Express + TypeScript |
| **Database** | PostgreSQL 16 + Prisma ORM |
| **Auth** | JWT (access + refresh tokens) + httpOnly cookies |
| **Pagamentos** | Stripe Connect (marketplace) + Stripe Billing (assinaturas) |
| **Deploy** | Docker + Docker Compose + GitHub Actions CI/CD |
| **Monorepo** | npm workspaces + Turborepo |

## 📁 Estrutura do Projeto

```
jobmarket/
├── apps/
│   ├── web/                    # React + Vite + Tailwind
│   │   ├── src/
│   │   │   ├── components/     # UI components (Button, Card, Input, etc.)
│   │   │   ├── pages/          # Page components (public, professional, employer, admin)
│   │   │   ├── animations/     # Framer Motion + GSAP components
│   │   │   ├── hooks/          # Custom hooks
│   │   │   ├── contexts/       # React Context (Auth, Theme)
│   │   │   ├── services/       # API client (axios)
│   │   │   └── utils/          # Helpers (cn, formatCurrency, etc.)
│   │   └── ...
│   │
│   └── api/                    # Express + TypeScript
│       ├── src/
│       │   ├── config/         # Env validation (Zod)
│       │   ├── controllers/    # Route handlers
│       │   ├── middlewares/    # Auth, validation, rate limit, error handling
│       │   ├── routes/         # Route definitions
│       │   ├── services/       # Business logic
│       │   ├── repositories/   # Prisma wrappers
│       │   └── utils/          # JWT, password, cookies, errors
│       ├── prisma/
│       │   ├── schema.prisma   # Database schema
│       │   └── seed.ts         # Development seed data
│       └── ...
│
├── packages/
│   └── shared/                 # Types & validators shared (Zod + TS)
│       ├── enums.ts
│       ├── types.ts
│       └── validators.ts
│
├── docker/
│   ├── Dockerfile              # Multi-stage build
│   ├── docker-compose.yml      # Development
│   ├── docker-compose.prod.yml # Production
│   └── nginx.conf              # Reverse proxy config
│
├── .github/workflows/
│   ├── ci.yml                  # Lint, typecheck, test, build
│   └── deploy.yml              # Deploy to production
│
├── SPEC.md                     # Especificação completa do projeto
├── .env.example                # Variáveis de ambiente
├── package.json                # Root workspace
├── tsconfig.json               # TypeScript base config
├── .eslintrc.cjs               # ESLint config
└── .prettierrc                 # Prettier config
```

## ⚡ Quick Start

### Pré-requisitos
- Node.js 20+
- Docker & Docker Compose
- PostgreSQL 16 (ou use o container)
- Stripe account (para pagamentos)

### Desenvolvimento

```bash
# 1. Clone e instale
git clone <repo>
cd jobmarket
npm install

# 2. Configure variáveis de ambiente
cp .env.example apps/api/.env
cp .env.example apps/web/.env
# Edite os arquivos .env com suas chaves Stripe, etc.

# 3. Suba os containers (PostgreSQL + Redis)
docker-compose -f docker/docker-compose.yml up -d postgres redis

# 4. Configure database
npm run db:generate
npm run db:push
npm run db:seed

# 5. Inicie desenvolvimento
npm run dev
# Frontend: http://localhost:5173
# API: http://localhost:3001
# Health: http://localhost:3001/health
```

### Usuários de teste (após seed)
| Email | Senha | Role |
|-------|-------|------|
| admin@jobmarket.com | admin123 | ADMIN |
| prof@jobmarket.com | prof123 | PROFISSIONAL |
| emp@jobmarket.com | emp123 | EMPREGADOR |

## 🎨 Design System & Animações

### Cores
- **Primary**: Slate 950 → Slate 800 (dark mode first)
- **Accent**: Cyan 400 → Cyan 500
- **Success**: Emerald 500
- **Warning**: Amber 500
- **Danger**: Red 500

### Tipografia
- **Display**: Space Grotesk (variable)
- **Body**: DM Sans (variable)

### Animações
- **Hero Parallax**: GSAP ScrollTrigger (3 camadas: 0.3x, 0.6x, 1x)
- **Scroll Reveal**: Framer Motion `whileInView` (fade up, stagger)
- **Micro-interactions**: Hover states, button press, form focus
- **Contadores animados**: IntersectionObserver + easeOutExpo

## 🔐 Autenticação

```
POST /api/auth/register     # Registro (email, password, role, fullName)
POST /api/auth/login        # Login (email, password) → cookies httpOnly
POST /api/auth/refresh      # Refresh token (cookie) → novo access token
POST /api/auth/logout       # Logout → clear cookies
GET  /api/auth/me           # Usuário atual (protected)
```

- Access Token: 15min (JWT HS256)
- Refresh Token: 7d (httpOnly cookie, rotation)
- Roles: PROFISSIONAL, EMPREGADOR, ADMIN

## 💰 Modelo de Negócio

| Plano | Mensalidade | Comissão | Limites |
|-------|-------------|----------|---------|
| **Free** | R$ 0 | **12%** | 5 propostas/mês, 1 contrato ativo |
| **Pro** | R$ 49 | **8%** | Ilimitado, destaque, analytics |
| **Enterprise** | R$ 199 | **5%** | Equipe, API, SLA, gerente dedicado |

**Sua receita**: % automático sobre cada pagamento via Stripe Connect (split payment).

## 📦 Scripts Principais

```bash
# Desenvolvimento
npm run dev              # Web + API simultâneo
npm run dev:web          # Apenas frontend
npm run dev:api          # Apenas backend

# Database
npm run db:generate      # Prisma generate
npm run db:push          # Push schema (dev)
npm run db:migrate       # Migrations (prod)
npm run db:studio        # Prisma Studio
npm run db:seed          # Seed data

# Qualidade
npm run lint             # ESLint
npm run lint:fix         # ESLint --fix
npm run typecheck        # tsc --noEmit
npm run format           # Prettier
npm run test             # Vitest (unit + integration)
npm run test:e2e         # Playwright E2E

# Build & Deploy
npm run build            # Build all
docker-compose -f docker/docker-compose.yml up -d  # Dev containers
docker-compose -f docker/docker-compose.prod.yml up -d  # Prod
```

## 🧪 Testes

```bash
# Unit + Integration (Vitest)
npm run test
npm run test:coverage

# E2E (Playwright)
npm run test:e2e

# Visual Regression (Storybook)
npm run storybook
```

## 🚀 Deploy Produção

### Opção 1: Docker Compose (VPS)
```bash
# No servidor
docker-compose -f docker/docker-compose.prod.yml up -d
```

### Opção 2: Railway/Render/Fly.io
- Conecte o repo
- Configure variáveis de ambiente
- Deploy automático via GitHub Actions

### Variáveis de Produção Obrigatórias
```env
NODE_ENV=production
DATABASE_URL=postgresql://...
JWT_SECRET=openssl rand -base64 32
JWT_REFRESH_SECRET=openssl rand -base64 32
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
FRONTEND_URL=https://seudominio.com
REDIS_URL=redis://...
```

## 📚 Documentação

- **SPEC.md** - Especificação completa (arquitetura, API, DB, animações, segurança)
- **docs/api.md** - Referência da API (OpenAPI/Swagger)
- **docs/database.md** - ERD + decisões de schema
- **docs/deployment.md** - Guia de deploy detalhado

## 🔒 Segurança

- ✅ bcrypt (12 rounds) para senhas
- ✅ JWT HS256 com rotação de segredo
- ✅ Rate limiting (100 req/min API, 10 req/min auth)
- ✅ Helmet (CSP, HSTS, X-Frame-Options)
- ✅ CORS restrito ao FRONTEND_URL
- ✅ Validação Zod em TODOS endpoints
- ✅ Prisma ORM (prepared statements)
- ✅ httpOnly + SameSite=Strict cookies
- ✅ Stripe webhook signature verification

## 🤝 Contribuindo

1. Fork o projeto
2. Crie branch (`git checkout -b feature/nova-funcionalidade`)
3. Commit (`git commit -m 'feat: nova funcionalidade'`)
4. Push (`git push origin feature/nova-funcionalidade`)
5. Abra Pull Request

## 📄 Licença

MIT License - veja [LICENSE](LICENSE) para detalhes.

---

**Desenvolvido com ❤️ usando React, Node.js, PostgreSQL e Stripe**