import { Response } from 'express';
import { env } from '@/config/env';

const isProduction = env.NODE_ENV === 'production';

export const cookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: 'strict' as const,
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  path: '/',
};

export const accessCookieOptions = {
  ...cookieOptions,
  maxAge: 15 * 60 * 1000, // 15 minutes
};

export function setAuthCookies(res: Response, accessToken: string, refreshToken: string) {
  res.cookie('accessToken', accessToken, accessCookieOptions);
  res.cookie('refreshToken', refreshToken, cookieOptions);
}

export function clearAuthCookies(res: Response) {
  res.clearCookie('accessToken', { ...accessCookieOptions, maxAge: 0 });
  res.clearCookie('refreshToken', { ...cookieOptions, maxAge: 0 });
}

export function getRefreshTokenFromCookie(req: any): string | undefined {
  return req.cookies?.refreshToken;
}