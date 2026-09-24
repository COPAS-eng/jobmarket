import { Request, Response } from 'express';
import prisma from '@/repositories/prisma';
import { NotFoundError, ForbiddenError, ConflictError } from '@/utils/errors';
import { CreateContractInput, ContractType } from '@jobmarket/shared/types';

export const contractController = {
  async create(req: Request, res: Response) {
    const data: CreateContractInput = req.body;
    const employerId = req.user!.sub;
    
    // Verify proposal exists and is accepted
    const proposal = await prisma.proposal.findUnique({
      where: { id: data.proposalId },
      include: { job: true, professional: true },
    });
    
    if (!proposal) throw new NotFoundError('Proposta não encontrada');
    if (proposal.status !== 'ACCEPTED') throw new ConflictError('Proposta não foi aceita');
    if (proposal.job.employerId !== employerId) throw new ForbiddenError('Não autorizado');
    
    // Check if contract already exists
    const existing = await prisma.contract.findFirst({
      where: { jobId: proposal.jobId, professionalId: proposal.professionalId },
    });
    
    if (existing) throw new ConflictError('Contrato já existe para esta proposta');
    
    // Determine commission rate based on professional's subscription
    const subscription = await prisma.subscription.findUnique({
      where: { userId: proposal.professionalId },
    });
    
    let commissionRate = 0.12; // Free tier default
    if (subscription?.plan === 'PRO') commissionRate = 0.08;
    if (subscription?.plan === 'ENTERPRISE') commissionRate = 0.05;
    if (subscription?.commissionDiscount) commissionRate -= subscription.commissionDiscount;
    
    const contract = await prisma.contract.create({
      data: {
        jobId: proposal.jobId,
        professionalId: proposal.professionalId,
        employerId,
        agreedRate: data.agreedRate,
        type: data.type,
        commissionRate,
        terms: data.terms,
        status: 'ACTIVE',
        startedAt: new Date(),
      },
      include: {
        professional: { select: { profile: { select: { fullName: true, avatar: true } } } },
        employer: { select: { profile: { select: { fullName: true, avatar: true } } } },
        job: { select: { title: true } },
      },
    });
    
    res.status(201).json({ success: true, data: contract });
  },
  
  async getById(req: Request, res: Response) {
    const contract = await prisma.contract.findUnique({
      where: { id: req.params.id },
      include: {
        professional: { include: { profile: true } },
        employer: { include: { profile: true } },
        job: { include: { skills: true } },
        milestones: { orderBy: { order: 'asc' } },
        payments: { orderBy: { createdAt: 'desc' } },
      },
    });
    
    if (!contract) throw new NotFoundError('Contrato não encontrado');
    
    const isParty = contract.professionalId === req.user!.sub || contract.employerId === req.user!.sub;
    if (!isParty && req.user!.role !== 'ADMIN') throw new ForbiddenError('Não autorizado');
    
    res.json({ success: true, data: contract });
  },
  
  async list(req: Request, res: Response) {
    const where: any = {};
    
    if (req.user!.role === 'PROFISSIONAL') {
      where.professionalId = req.user!.sub;
    } else if (req.user!.role === 'EMPREGADOR') {
      where.employerId = req.user!.sub;
    }
    
    const contracts = await prisma.contract.findMany({
      where,
      include: {
        professional: { select: { profile: { select: { fullName: true, avatar: true } } } },
        employer: { select: { profile: { select: { fullName: true, avatar: true } } } },
        job: { select: { title: true } },
        milestones: { orderBy: { order: 'asc' } },
      },
      orderBy: { createdAt: 'desc' },
    });
    
    res.json({ success: true, data: contracts });
  },
  
  async update(req: Request, res: Response) {
    const { id } = req.params;
    const data = req.body;
    
    const contract = await prisma.contract.findUnique({ where: { id } });
    if (!contract) throw new NotFoundError('Contrato não encontrado');
    if (contract.employerId !== req.user!.sub && req.user!.role !== 'ADMIN') {
      throw new ForbiddenError('Não autorizado');
    }
    
    const updated = await prisma.contract.update({
      where: { id },
      data,
      include: { milestones: true },
    });
    
    res.json({ success: true, data: updated });
  },
  
  async createMilestone(req: Request, res: Response) {
    const { contractId } = req.params;
    const { title, description, amount, dueDate } = req.body;
    const employerId = req.user!.sub;
    
    const contract = await prisma.contract.findUnique({
      where: { id: contractId },
    });
    
    if (!contract) throw new NotFoundError('Contrato não encontrado');
    if (contract.employerId !== employerId && req.user!.role !== 'ADMIN') {
      throw new ForbiddenError('Não autorizado');
    }
    
    const lastMilestone = await prisma.milestone.findFirst({
      where: { contractId },
      orderBy: { order: 'desc' },
    });
    
    const milestone = await prisma.milestone.create({
      data: {
        contractId,
        title,
        description,
        amount,
        dueDate: dueDate ? new Date(dueDate) : null,
        order: (lastMilestone?.order ?? 0) + 1,
      },
    });
    
    res.status(201).json({ success: true, data: milestone });
  },
  
  async updateMilestone(req: Request, res: Response) {
    const { contractId, id } = req.params;
    const data = req.body;
    
    const milestone = await prisma.milestone.findUnique({
      where: { id },
      include: { contract: true },
    });
    
    if (!milestone || milestone.contractId !== contractId) throw new NotFoundError('Milestone não encontrado');
    if (milestone.contract.employerId !== req.user!.sub && req.user!.role !== 'ADMIN') {
      throw new ForbiddenError('Não autorizado');
    }
    
    const updated = await prisma.milestone.update({
      where: { id },
      data,
    });
    
    res.json({ success: true, data: updated });
  },
  
  async submitMilestone(req: Request, res: Response) {
    const { contractId, id } = req.params;
    const professionalId = req.user!.sub;
    
    const milestone = await prisma.milestone.findUnique({
      where: { id },
      include: { contract: true },
    });
    
    if (!milestone || milestone.contractId !== contractId) throw new NotFoundError('Milestone não encontrado');
    if (milestone.contract.professionalId !== professionalId) throw new ForbiddenError('Não autorizado');
    if (milestone.status !== 'PENDING' && milestone.status !== 'IN_PROGRESS') {
      throw new ConflictError('Milestone não pode ser submetido');
    }
    
    const updated = await prisma.milestone.update({
      where: { id },
      data: { status: 'SUBMITTED', submittedAt: new Date() },
    });
    
    res.json({ success: true, data: updated });
  },
  
  async reviewMilestone(req: Request, res: Response) {
    const { contractId, id } = req.params;
    const { action, feedback } = req.body;
    const employerId = req.user!.sub;
    
    const milestone = await prisma.milestone.findUnique({
      where: { id },
      include: { contract: true },
    });
    
    if (!milestone || milestone.contractId !== contractId) throw new NotFoundError('Milestone não encontrado');
    if (milestone.contract.employerId !== employerId && req.user!.role !== 'ADMIN') {
      throw new ForbiddenError('Não autorizado');
    }
    if (milestone.status !== 'SUBMITTED') throw new ConflictError('Milestone não foi submetido');
    
    const newStatus = action === 'approve' ? 'APPROVED' : 'REJECTED';
    const updated = await prisma.milestone.update({
      where: { id },
      data: {
        status: newStatus,
        approvedAt: action === 'approve' ? new Date() : null,
      },
    });
    
    // If approved, could trigger payment creation here
    
    res.json({ success: true, data: updated });
  },
};