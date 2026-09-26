import path from 'node:path'
import { defineConfig } from 'vitest/config'

export default defineConfig(async () => {
  const { default: tsconfigPaths } = await import('vite-tsconfig-paths')

  return {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    plugins: [tsconfigPaths({ projects: ['./tsconfig.json'], loose: true })],
    test: {
      environment: 'node',
      globals: true,
      include: ['src/**/*.test.ts', 'src/**/*.spec.ts'],
      coverage: {
        provider: 'v8',
        reporter: ['text', 'json', 'lcov', 'html'],
        reportsDirectory: '../../coverage/api',
        thresholds: {
          statements: 80,
          branches: 70,
          functions: 80,
          lines: 80,
        },
      },
      setupFiles: ['./vitest.setup.ts'],
    },
  }
})
