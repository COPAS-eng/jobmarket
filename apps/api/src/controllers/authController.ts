import { Request, Response } from 'express';
import prisma from '@/repositories/prisma';
import { hashPassword, verifyPassword } from '@/utils/password';
import { createTokenPair, verifyRefreshToken } from '@/utils/jwt';
import { setAuthCookies, clearAuthCookies, getRefreshTokenFromCookie } from '@/utils/cookies';
import { AuthenticationError, ConflictError } from '@/utils/errors';
import { RegisterInput, LoginInput } from '@jobmarket/shared/types';

export const authController = {
  async register(req: Request, res: Response) {
    const data: RegisterInput = req.body;
    
    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });
    
    if (existingUser) {
      throw new ConflictError('E-mail já cadastrado');
    }
    
    // Hash password
    const passwordHash = await hashPassword(data.password);
    
    // Create user
    const user = await prisma.user.create({
      data: {
        email: data.email,
        passwordHash,
        role: data.role,
      },
      select: {
        id: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });
    
    // Create empty profile
    await prisma.profile.create({
      data: {
        userId: user.id,
        fullName: data.fullName,
        availability: 'FREELANCE',
        languages: [],
      },
    });
    
    // Generate tokens
    const { accessToken, refreshToken } = createTokenPair(user.id, user.email, user.role);
    
    // Set cookies
    setAuthCookies(res, accessToken, refreshToken);
    
    res.status(201).json({
      success: true,
      data: {
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
        },
      },
    });
  },
  
  async login(req: Request, res: Response) {
    const data: LoginInput = req.body;
    
    // Find user
    const user = await prisma.user.findUnique({
      where: { email: data.email },
    });
    
    if (!user) {
      throw new AuthenticationError('Credenciais inválidas');
    }
    
    // Verify password
    const isValid = await verifyPassword(data.password, user.passwordHash);
    
    if (!isValid) {
      throw new AuthenticationError('Credenciais inválidas');
    }
    
    // Update last login
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });
    
    // Generate tokens
    const { accessToken, refreshToken } = createTokenPair(user.id, user.email, user.role);
    
    // Set cookies
    setAuthCookies(res, accessToken, refreshToken);
    
    res.json({
      success: true,
      data: {
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
        },
      },
    });
  },
  
  async refresh(req: Request, res: Response) {
    const refreshToken = getRefreshTokenFromCookie(req);
    
    if (!refreshToken) {
      throw new AuthenticationError('Refresh token não fornecido');
    }
    
    try {
      const payload = verifyRefreshToken(refreshToken);
      
      // Check if user still exists
      const user = await prisma.user.findUnique({
        where: { id: payload.sub },
        select: { id: true, email: true, role: true },
      });
      
      if (!user) {
        throw new AuthenticationError('Usuário não encontrado');
      }
      
      // Generate new tokens
      const { accessToken, refreshToken: newRefreshToken } = createTokenPair(
        user.id,
        user.email,
        user.role
      );
      
      // Set new cookies
      setAuthCookies(res, accessToken, newRefreshToken);
      
      res.json({
        success: true,
        data: { user },
      });
    } catch {
      clearAuthCookies(res);
      throw new AuthenticationError('Refresh token inválido ou expirado');
    }
  },
  
  async logout(req: Request, res: Response) {
    clearAuthCookies(res);
    res.json({ success: true, data: { message: 'Logout realizado com sucesso' } });
  },
  
  async me(req: Request, res: Response) {
    if (!req.user) {
      throw new AuthenticationError('Não autenticado');
    }
    
    const user = await prisma.user.findUnique({
      where: { id: req.user.sub },
      select: {
        id: true,
        email: true,
        role: true,
        emailVerified: true,
        stripeCustomerId: true,
        stripeAccountId: true,
        createdAt: true,
        profile: true,
        subscription: true,
      },
    });
    
    if (!user) {
      throw new AuthenticationError('Usuário não encontrado');
    }
    
    res.json({
      success: true,
      data: { user },
    });
  },
};