import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import { createApp } from '@/app';
import http from 'node:http';
import { AddressInfo } from 'node:net';
import { prisma } from '@/repositories/prisma';
import { hashPassword } from '@/utils/password';
import { createTokenPair } from '@/utils/jwt';

let server: http.Server;
let baseUrl: string;
let cookieJar: string[] = [];

function request(
  method: string,
  path: string,
  body?: object,
  cookies: string[] = []
): Promise<{ statusCode: number; body: any; headers: http.IncomingHttpHeaders }> {
  return new Promise((resolve, reject) => {
    const url = new URL(path, baseUrl);
    const data = body ? JSON.stringify(body) : undefined;
    const req = http.request(
      {
        hostname: url.hostname,
        port: url.port,
        path: url.pathname + url.search,
        method,
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': data ? Buffer.byteLength(data) : 0,
          Cookie: cookies.join('; '),
        },
      },
      (res) => {
        let raw = '';
        res.on('data', (chunk) => (raw += chunk));
        res.on('end', () => {
          let parsed: any;
          try {
            parsed = raw ? JSON.parse(raw) : {};
          } catch {
            parsed = raw;
          }
          const setCookie = res.headers['set-cookie'] || [];
          resolve({ statusCode: res.statusCode!, body: parsed, headers: res.headers });
        });
      }
    );
    req.on('error', reject);
    if (data) req.write(data);
    req.end();
  });
}

function getCookie(res: { headers: http.IncomingHttpHeaders }, name: string): string | null {
  const setCookie = res.headers['set-cookie'] as string[] | undefined;
  if (!setCookie) return null;
  for (const c of setCookie) {
    if (c.startsWith(`${name}=`)) {
      return c.split(';')[0];
    }
  }
  return null;
}

beforeAll(async () => {
  const app = createApp();
  server = http.createServer(app);
  await new Promise<void>((resolve) => server.listen(0, resolve));
  const addr = server.address() as AddressInfo;
  baseUrl = `http://localhost:${addr.port}`;
});

afterAll(async () => {
  await prisma.user.deleteMany({ where: { email: { endsWith: '@test.com' } } });
  await new Promise<void>((resolve) => server.close(resolve));
});

beforeEach(() => {
  cookieJar = [];
});

describe('Auth Routes Integration', () => {
  describe('POST /api/auth/register', () => {
    it('registers a new user successfully', async () => {
      const res = await request('POST', '/api/auth/register', {
        email: `register-${Date.now()}@test.com`,
        password: 'Password123!',
        role: 'PROFISSIONAL',
        fullName: 'Test User',
      });

      expect(res.statusCode).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.user).toMatchObject({
        email: expect.any(String),
        role: 'PROFISSIONAL',
      });
      expect(res.body.data.accessToken).toBeDefined();

      const accessCookie = getCookie(res, 'accessToken');
      const refreshCookie = getCookie(res, 'refreshToken');
      expect(accessCookie).toBeTruthy();
      expect(refreshCookie).toBeTruthy();
      expect(accessCookie).toContain('HttpOnly');
      expect(refreshCookie).toContain('HttpOnly');
      expect(refreshCookie).toContain('SameSite=Strict');
    });

    it('rejects duplicate email with 409', async () => {
      const email = `duplicate-${Date.now()}@test.com`;
      await request('POST', '/api/auth/register', { email, password: 'Password123!', role: 'PROFISSIONAL', fullName: 'User 1' });
      const res = await request('POST', '/api/auth/register', { email, password: 'Password123!', role: 'PROFISSIONAL', fullName: 'User 2' });

      expect(res.statusCode).toBe(409);
      expect(res.body.success).toBe(false);
      expect(res.body.error.code).toBe('CONFLICT');
      expect(res.body.error.message).toBe('E-mail já cadastrado');
    });

    it('validates required fields', async () => {
      const res = await request('POST', '/api/auth/register', {});

      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.error.code).toBe('VALIDATION_ERROR');
    });

    it('validates email format', async () => {
      const res = await request('POST', '/api/auth/register', {
        email: 'invalid-email',
        password: 'Password123!',
        role: 'PROFISSIONAL',
        fullName: 'Test',
      });

      expect(res.statusCode).toBe(400);
      expect(res.body.error.code).toBe('VALIDATION_ERROR');
    });

    it('validates password strength', async () => {
      const res = await request('POST', '/api/auth/register', {
        email: `weak-${Date.now()}@test.com`,
        password: 'weak',
        role: 'PROFISSIONAL',
        fullName: 'Test',
      });

      expect(res.statusCode).toBe(400);
      expect(res.body.error.code).toBe('VALIDATION_ERROR');
    });

    it('validates name length', async () => {
      const res = await request('POST', '/api/auth/register', {
        email: `name-${Date.now()}@test.com`,
        password: 'Password123!',
        role: 'PROFISSIONAL',
        fullName: '',
      });

      expect(res.statusCode).toBe(400);
      expect(res.body.error.code).toBe('VALIDATION_ERROR');
    });
  });

  describe('POST /api/auth/login', () => {
    let testEmail: string;
    let testPassword: string;

    beforeEach(async () => {
      testEmail = `login-${Date.now()}@test.com`;
      testPassword = 'Password123!';
      await request('POST', '/api/auth/register', { email: testEmail, password: testPassword, role: 'PROFISSIONAL', fullName: 'Login User' });
    });

    it('logs in with valid credentials', async () => {
      const res = await request('POST', '/api/auth/login', { email: testEmail, password: testPassword });

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.user.email).toBe(testEmail);
      expect(res.body.data.accessToken).toBeDefined();

      const accessCookie = getCookie(res, 'accessToken');
      const refreshCookie = getCookie(res, 'refreshToken');
      expect(accessCookie).toBeTruthy();
      expect(refreshCookie).toBeTruthy();
    });

    it('rejects wrong password with 401', async () => {
      const res = await request('POST', '/api/auth/login', { email: testEmail, password: 'WrongPass123!' });

      expect(res.statusCode).toBe(401);
      expect(res.body.success).toBe(false);
      expect(res.body.error.code).toBe('UNAUTHORIZED');
    });

    it('rejects non-existent user with 401', async () => {
      const res = await request('POST', '/api/auth/login', { email: 'nonexistent@test.com', password: testPassword });

      expect(res.statusCode).toBe(401);
      expect(res.body.success).toBe(false);
      expect(res.body.error.code).toBe('UNAUTHORIZED');
    });

    it('validates required fields', async () => {
      const res = await request('POST', '/api/auth/login', {});

      expect(res.statusCode).toBe(400);
      expect(res.body.error.code).toBe('VALIDATION_ERROR');
    });
  });

  describe('POST /api/auth/refresh', () => {
    let refreshCookie: string;

    beforeEach(async () => {
      const email = `refresh-${Date.now()}@test.com`;
      const password = 'Password123!';
      const registerRes = await request('POST', '/api/auth/register', { email, password, role: 'PROFISSIONAL', fullName: 'Refresh User' });
      refreshCookie = getCookie(registerRes, 'refreshToken')!;
      expect(refreshCookie).toBeTruthy();
    });

    it('refreshes access token with valid refresh token', async () => {
      const res = await request('POST', '/api/auth/refresh', undefined, [refreshCookie]);

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.accessToken).toBeDefined();

      const newAccessCookie = getCookie(res, 'accessToken');
      const newRefreshCookie = getCookie(res, 'refreshToken');
      expect(newAccessCookie).toBeTruthy();
      expect(newRefreshCookie).toBeTruthy();
    });

    it('rejects missing refresh token with 401', async () => {
      const res = await request('POST', '/api/auth/refresh');

      expect(res.statusCode).toBe(401);
      expect(res.body.success).toBe(false);
      expect(res.body.error.code).toBe('UNAUTHORIZED');
    });

    it('rejects invalid refresh token with 401', async () => {
      const res = await request('POST', '/api/auth/refresh', undefined, ['refreshToken=invalid']);

      expect(res.statusCode).toBe(401);
      expect(res.body.success).toBe(false);
      expect(res.body.error.code).toBe('UNAUTHORIZED');
    });
  });

  describe('POST /api/auth/logout', () => {
    it('clears auth cookies', async () => {
      const email = `logout-${Date.now()}@test.com`;
      const registerRes = await request('POST', '/api/auth/register', { email, password: 'Password123!', role: 'PROFISSIONAL', fullName: 'Logout User' });
      const cookies = [getCookie(registerRes, 'accessToken')!, getCookie(registerRes, 'refreshToken')!].filter(Boolean);

      const res = await request('POST', '/api/auth/logout', undefined, cookies);

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.message).toBe('Logout realizado');

      const accessCookie = getCookie(res, 'accessToken');
      const refreshCookie = getCookie(res, 'refreshToken');
      expect(accessCookie).toContain('Max-Age=0');
      expect(refreshCookie).toContain('Max-Age=0');
    });
  });

  describe('GET /api/auth/me', () => {
    let accessCookie: string;

    beforeEach(async () => {
      const email = `me-${Date.now()}@test.com`;
      const registerRes = await request('POST', '/api/auth/register', { email, password: 'Password123!', role: 'PROFISSIONAL', fullName: 'Me User' });
      accessCookie = getCookie(registerRes, 'accessToken')!;
      expect(accessCookie).toBeTruthy();
    });

    it('returns current user with valid access token', async () => {
      const res = await request('GET', '/api/auth/me', undefined, [accessCookie]);

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.user).toMatchObject({
        email: expect.any(String),
        role: 'PROFISSIONAL',
      });
    });

    it('rejects missing access token with 401', async () => {
      const res = await request('GET', '/api/auth/me');

      expect(res.statusCode).toBe(401);
      expect(res.body.success).toBe(false);
      expect(res.body.error.code).toBe('UNAUTHORIZED');
    });

    it('rejects invalid access token with 401', async () => {
      const res = await request('GET', '/api/auth/me', undefined, ['accessToken=invalid']);

      expect(res.statusCode).toBe(401);
      expect(res.body.success).toBe(false);
      expect(res.body.error.code).toBe('UNAUTHORIZED');
    });
  });
});