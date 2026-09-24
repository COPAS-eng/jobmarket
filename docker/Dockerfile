# Base image
FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./
COPY apps/api/package.json apps/api/
COPY apps/web/package.json apps/web/
COPY packages/shared/package.json packages/shared/

# Install dependencies
RUN npm ci

# Generate Prisma client
RUN npm run db:generate --workspace=apps/api

# Build source
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build applications
RUN npm run build

# Production image for API
FROM base AS api-runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/apps/api/dist ./apps/api/dist
COPY --from=builder /app/apps/api/node_modules ./apps/api/node_modules
COPY --from=builder /app/apps/api/package.json ./apps/api/
COPY --from=builder /app/apps/api/prisma ./apps/api/prisma
COPY --from=builder /app/packages/shared ./packages/shared

EXPOSE 3001
CMD ["node", "apps/api/dist/server.js"]

# Production image for Web
FROM base AS web-runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /apps/web/dist ./apps/web/dist
COPY --from=builder /apps/web/package.json ./apps/web/

EXPOSE 5173
CMD ["npx", "serve", "-s", "apps/web/dist", "-l", "5173"]