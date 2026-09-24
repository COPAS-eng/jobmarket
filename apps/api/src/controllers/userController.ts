import { Request, Response } from 'express';
import prisma from '@/repositories/prisma';
import { NotFoundError, ForbiddenError } from '@/utils/errors';
import { UpdateProfileInput } from '@jobmarket/shared/types';

export const userController = {
  async getProfile(req: Request, res: Response) {
    const profile = await prisma.profile.findUnique({
      where: { userId: req.user!.sub },
      include: { skills: true },
    });
    
    if (!profile) throw new NotFoundError('Perfil não encontrado');
    
    res.json({ success: true, data: profile });
  },
  
  async updateProfile(req: Request, res: Response) {
    const data: UpdateProfileInput = req.body;
    const userId = req.user!.sub;
    
    const profile = await prisma.profile.upsert({
      where: { userId },
      update: data,
      create: { userId, ...data, availability: data.availability ?? 'FREELANCE', languages: data.languages ?? [] },
      include: { skills: true },
    });
    
    res.json({ success: true, data: profile });
  },
  
  async listProfessionals(req: Request, res: Response) {
    const { page = 1, limit = 20, ...filters } = req.query as any;
    
    const where: any = {
      user: { role: 'PROFISSIONAL' },
    };
    
    if (filters.q) {
      where.OR = [
        { fullName: { contains: filters.q, mode: 'insensitive' } },
        { headline: { contains: filters.q, mode: 'insensitive' } },
        { bio: { contains: filters.q, mode: 'insensitive' } },
      ];
    }
    if (filters.skills?.length) where.skills = { some: { id: { in: filters.skills } } };
    if (filters.availability?.length) where.availability = { in: filters.availability };
    if (filters.rateMin !== undefined || filters.rateMax !== undefined) {
      where.hourlyRate = {};
      if (filters.rateMin !== undefined) where.hourlyRate.gte = filters.rateMin;
      if (filters.rateMax !== undefined) where.hourlyRate.lte = filters.rateMax;
    }
    if (filters.location) where.location = { contains: filters.location, mode: 'insensitive' };
    if (filters.languages?.length) where.languages = { hasSome: filters.languages };
    
    const [professionals, total] = await Promise.all([
      prisma.profile.findMany({
        where,
        include: { skills: true, user: { select: { id: true, createdAt: true } } },
        orderBy: { [filters.sort || 'createdAt']: filters.order || 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.profile.count({ where }),
    ]);
    
    res.json({
      success: true,
      data: professionals,
      meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
    });
  },
  
  async getProfessionalPublic(req: Request, res: Response) {
    const profile = await prisma.profile.findUnique({
      where: { userId: req.params.id },
      include: {
        skills: true,
        portfolio: true,
        user: { select: { id: true, createdAt: true, subscription: { select: { plan: true } } } },
      },
    });
    
    if (!profile) throw new NotFoundError('Profissional não encontrado');
    if (profile.user.role !== 'PROFISSIONAL') throw new NotFoundError('Profissional não encontrado');
    
    res.json({ success: true, data: profile });
  },
  
  async adminListUsers(req: Request, res: Response) {
    const { page = 1, limit = 50, ...filters } = req.query as any;
    
    const where: any = {};
    if (filters.q) {
      where.OR = [
        { email: { contains: filters.q, mode: 'insensitive' } },
        { profile: { fullName: { contains: filters.q, mode: 'insensitive' } } },
      ];
    }
    if (filters.role?.length) where.role = { in: filters.role };
    
    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        include: { profile: true, subscription: true },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.user.count({ where }),
    ]);
    
    res.json({
      success: true,
      data: users,
      meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
    });
  },
  
  async adminUpdateUser(req: Request, res: Response) {
    const { id } = req.params;
    const data = req.body;
    
    const user = await prisma.user.update({
      where: { id },
      data,
      include: { profile: true, subscription: true },
    });
    
    res.json({ success: true, data: user });
  },
};