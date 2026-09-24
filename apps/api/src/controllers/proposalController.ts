import { Request, Response } from 'express';
import prisma from '@/repositories/prisma';
import { NotFoundError, ForbiddenError } from '@/utils/errors';
import { CreateProposalInput } from '@jobmarket/shared/types';

export const proposalController = {
  async create(req: Request, res: Response) {
    const data: CreateProposalInput = req.body;
    const professionalId = req.user!.sub;
    
    // Check if job exists and is open
    const job = await prisma.job.findUnique({
      where: { id: data.jobId },
      select: { id: true, status: true, employerId: true },
    });
    
    if (!job) throw new NotFoundError('Vaga não encontrada');
    if (job.status !== 'OPEN') throw new ForbiddenError('Vaga não está aberta para propostas');
    if (job.employerId === professionalId) throw new ForbiddenError('Não pode se candidatar à própria vaga');
    
    // Check if already proposed
    const existing = await prisma.proposal.findUnique({
      where: { jobId_professionalId: { jobId: data.jobId, professionalId } },
    });
    
    if (existing) throw new ForbiddenError('Você já enviou proposta para esta vaga');
    
    const proposal = await prisma.proposal.create({
      data: {
        ...data,
        professionalId,
      },
      include: {
        job: { select: { title: true, employerId: true } },
        professional: { select: { profile: { select: { fullName: true, avatar: true, headline: true } } } },
      },
    });
    
    // Increment applications count
    await prisma.job.update({
      where: { id: data.jobId },
      data: { applicationsCount: { increment: 1 } },
    });
    
    res.status(201).json({ success: true, data: proposal });
  },
  
  async getById(req: Request, res: Response) {
    const proposal = await prisma.proposal.findUnique({
      where: { id: req.params.id },
      include: {
        job: { include: { skills: true } },
        professional: { include: { profile: true } },
      },
    });
    
    if (!proposal) throw new NotFoundError('Proposta não encontrada');
    
    // Check permissions
    const isOwner = proposal.professionalId === req.user!.sub;
    const isEmployer = proposal.job.employerId === req.user!.sub;
    const isAdmin = req.user!.role === 'ADMIN';
    
    if (!isOwner && !isEmployer && !isAdmin) {
      throw new ForbiddenError('Não autorizado');
    }
    
    res.json({ success: true, data: proposal });
  },
  
  async listMine(req: Request, res: Response) {
    const proposals = await prisma.proposal.findMany({
      where: { professionalId: req.user!.sub },
      include: {
        job: { include: { skills: true, employer: { select: { profile: { select: { fullName: true, avatar: true } } } } } },
      },
      orderBy: { createdAt: 'desc' },
    });
    
    res.json({ success: true, data: proposals });
  },
  
  async updateStatus(req: Request, res: Response) {
    const { id } = req.params;
    const { status } = req.body;
    
    const proposal = await prisma.proposal.findUnique({
      where: { id },
      include: { job: true },
    });
    
    if (!proposal) throw new NotFoundError('Proposta não encontrada');
    if (proposal.job.employerId !== req.user!.sub && req.user!.role !== 'ADMIN') {
      throw new ForbiddenError('Não autorizado');
    }
    if (proposal.status !== 'PENDING') throw new ForbiddenError('Proposta já foi respondida');
    
    const updated = await prisma.proposal.update({
      where: { id },
      data: { status, respondedAt: new Date() },
      include: { job: true, professional: { include: { profile: true } } },
    });
    
    // If accepted, create contract draft
    if (status === 'ACCEPTED') {
      // This would be handled by contract creation endpoint
    }
    
    res.json({ success: true, data: updated });
  },
};