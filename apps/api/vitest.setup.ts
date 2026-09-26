import { vi } from 'vitest'

// Mock environment variables for testing
process.env.NODE_ENV = 'test'
process.env.DATABASE_URL = 'postgresql://test:test@localhost:5432/jobmarket_test'
process.env.JWT_SECRET = 'test-secret-key-for-testing-only'
process.env.JWT_REFRESH_SECRET = 'test-refresh-secret-key-for-testing-only'
process.env.PORT = '3001'
process.env.STRIPE_SECRET_KEY = 'sk_test_PLACEHOLDER'
process.env.STRIPE_WEBHOOK_SECRET = 'whsec_test_PLACEHOLDER'
process.env.FRONTEND_URL = 'http://localhost:3000'
process.env.EMAIL_FROM = 'test@jobmarket.local'

// Global test timeout
vi.setConfig({ testTimeout: 10000 })