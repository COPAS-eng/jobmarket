import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import * as yaml from 'js-yaml';
import * as fs from 'fs';
import * as path from 'path';
import { env } from '@/config/env';
import {
  globalRateLimiter,
  authRateLimiter,
  errorHandler,
  notFoundHandler,
} from '@/middlewares';
import { router as authRouter } from '@/routes/auth';
import { router as jobsRouter } from '@/routes/jobs';
import { router as proposalsRouter } from '@/routes/proposals';
import { router as contractsRouter } from '@/routes/contracts';
import { router as usersRouter } from '@/routes/users';
import { router as stripeRouter } from '@/routes/stripe';

export function createApp() {
  const app = express();

  // Trust proxy for rate limiting behind reverse proxy
  app.set('trust proxy', 1);

  // Security headers
  app.use(helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", 'data:', 'https:'],
        connectSrc: ["'self'", env.FRONTEND_URL],
        fontSrc: ["'self'", 'data:'],
        frameAncestors: ["'none'"],
      },
    },
  }));

  // CORS
  app.use(cors({
    origin: env.FRONTEND_URL,
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }));

  // Body parsing
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));
  app.use(cookieParser());

  // Compression
  app.use(compression());

  // Logging
  if (env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  } else {
    app.use(morgan('combined'));
  }

  // Global rate limiting
  app.use(globalRateLimiter);

  // Health check (no rate limit)
  app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // API routes
  const apiRouter = express.Router();
  
  // Auth routes with stricter rate limiting
  apiRouter.use('/auth', authRateLimiter, authRouter);
  
  // Protected routes
  apiRouter.use('/jobs', jobsRouter);
  apiRouter.use('/proposals', proposalsRouter);
  apiRouter.use('/contracts', contractsRouter);
  apiRouter.use('/users', usersRouter);
  apiRouter.use('/stripe', stripeRouter);

  app.use('/api', apiRouter);

  // API docs (Swagger UI)
  const openapiPath = path.join(__dirname, 'docs', 'openapi.yaml');
  const openapiSpec = yaml.load(fs.readFileSync(openapiPath, 'utf8')) as object;
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(openapiSpec));

  // Stripe webhook (needs raw body)
  app.post('/webhooks/stripe', express.raw({ type: 'application/json' }), stripeRouter);

  // 404 handler
  app.use(notFoundHandler);

  // Error handler
  app.use(errorHandler);

  return app;
}