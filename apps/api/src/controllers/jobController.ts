import { Request, Response } from 'express';
import prisma from '@/repositories/prisma';
import { NotFoundError, ForbiddenError } from '@/utils/errors';
import { CreateJobInput, UpdateJobInput, JobFilters } from '@jobmarket/shared/types';

export const jobController = {
  async list(req: Request, res: Response) {
    const { page = 1, limit = 20, ...filters } = req.query as unknown as JobFilters & { page: number; limit: number };
    
    const where = buildWhere(filters);
    
    const [jobs, total] = await Promise.all([
      prisma.job.findMany({
        where,
        include: {
          skills: true,
          employer: {
            select: { profile: { select: { fullName: true, avatar: true, headline: true } } },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.job.count({ where }),
    ]);
    
    res.json({
      success: true,
      data: jobs,
      meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
    });
  },
  
  async getById(req: Request, res: Response) {
    const job = await prisma.job.findUnique({
      where: { id: req.params.id },
      include: {
        skills: true,
        employer: {
          select: { profile: { select: { fullName: true, avatar: true, headline: true, bio: true } } },
        },
      },
    });
    
    if (!job) throw new NotFoundError('Vaga não encontrada');
    
    // Increment views
    await prisma.job.update({
      where: { id: job.id },
      data: { viewsCount: { increment: 1 } },
    });
    
    res.json({ success: true, data: job });
  },
  
  async create(req: Request, res: Response) {
    const data: CreateJobInput = req.body;
    const employerId = req.user!.sub;
    
    const job = await prisma.job.create({
      data: {
        ...data,
        employerId,
        skillIds: undefined,
        skills: { connect: data.skillIds.map(id => ({ id })) },
      },
      include: { skills: true },
    });
    
    res.status(201).json({ success: true, data: job });
  },
  
  async update(req: Request, res: Response) {
    const { id } = req.params;
    const data: UpdateJobInput = req.body;
    const employerId = req.user!.sub;
    
    const job = await prisma.job.findUnique({ where: { id } });
    if (!job) throw new NotFoundError('Vaga não encontrada');
    if (job.employerId !== employerId && req.user!.role !== 'ADMIN') {
      throw new ForbiddenError('Não autorizado');
    }
    
    const updated = await prisma.job.update({
      where: { id },
      data: {
        ...data,
        skillIds: undefined,
        skills: data.skillIds ? { set: data.skillIds.map(id => ({ id })) } : undefined,
      },
      include: { skills: true },
    });
    
    res.json({ success: true, data: updated });
  },
  
  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const employerId = req.user!.sub;
    
    const job = await prisma.job.findUnique({ where: { id } });
    if (!job) throw new NotFoundError('Vaga não encontrada');
    if (job.employerId !== employerId && req.user!.role !== 'ADMIN') {
      throw new ForbiddenError('Não autorizado');
    }
    
    await prisma.job.delete({ where: { id } });
    res.json({ success: true, data: { message: 'Vaga excluída' } });
  },
};

function buildWhere(filters: JobFilters) {
  const where: any = { status: 'OPEN' };
  
  if (filters.q) {
    where.OR = [
      { title: { contains: filters.q, mode: 'insensitive' } },
      { description: { contains: filters.q, mode: 'insensitive' } },
    ];
  }
  if (filters.type?.length) where.type = { in: filters.type };
  if (filters.category?.length) where.category = { in: filters.category };
  if (filters.skills?.length) where.skills = { some: { id: { in: filters.skills } } };
  if (filters.remote !== undefined) where.remote = filters.remote;
  if (filters.location) where.location = { contains: filters.location, mode: 'insensitive' };
  if (filters.budgetMin !== undefined || filters.budgetMax !== undefined) {
    where.budgetMax = {};
    if (filters.budgetMin !== undefined) where.budgetMax.gte = filters.budgetMin;
    if (filters.budgetMax !== undefined) where.budgetMax.lte = filters.budgetMax;
  }
  
  return where;
}