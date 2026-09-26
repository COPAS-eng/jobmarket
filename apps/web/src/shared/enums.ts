export const UserRole = {
  PROFISSIONAL: 'PROFISSIONAL',
  EMPREGADOR: 'EMPREGADOR',
  ADMIN: 'ADMIN',
} as const;
export type UserRole = typeof UserRole[keyof typeof UserRole];

export const JobType = {
  CLT: 'CLT',
  PJ: 'PJ',
  CONTRATO: 'CONTRATO',
  ESTAGIO: 'ESTAGIO',
  FREELANCER: 'FREELANCER',
} as const;
export type JobType = typeof JobType[keyof typeof JobType];

export const JobCategory = {
  TECNOLOGIA: 'TECNOLOGIA',
  SAUDE: 'SAUDE',
  EDUCACAO: 'EDUCACAO',
  FINANCAS: 'FINANCAS',
  ENGENHARIA: 'ENGENHARIA',
  MARKETING: 'MARKETING',
  VENDAS: 'VENDAS',
  OUTROS: 'OUTROS',
} as const;
export type JobCategory = typeof JobCategory[keyof typeof JobCategory];

export const SkillCategory = {
  FRONTEND: 'FRONTEND',
  BACKEND: 'BACKEND',
  MOBILE: 'MOBILE',
  DATA_SCIENCE: 'DATA_SCIENCE',
  DEVOPS: 'DEVOPS',
  UI_UX: 'UI_UX',
  OUTROS: 'OUTROS',
} as const;
export type SkillCategory = typeof SkillCategory[keyof typeof SkillCategory];

export const JobStatus = {
  DRAFT: 'RASCUNHO',
  PUBLISHED: 'PUBLICADO',
  IN_SELECTION: 'EM_SELECAO',
  CLOSED: 'ENCERRADO',
  CANCELLED: 'CANCELADO',
} as const;
export type JobStatus = typeof JobStatus[keyof typeof JobStatus];

export const ProposalStatus = {
  PENDING: 'PENDENTE',
  UNDER_REVIEW: 'EM_ANALISE',
  ACCEPTED: 'ACEITA',
  REJECTED: 'REJEITADA',
  CANCELLED: 'CANCELADA',
} as const;
export type ProposalStatus = typeof ProposalStatus[keyof typeof ProposalStatus];

export const ContractType = {
  CLT: 'CLT',
  PJ: 'PJ',
  CONTRATO: 'CONTRATO',
  ESTAGIO: 'ESTAGIO',
  FREELANCER: 'FREELANCER',
} as const;
export type ContractType = typeof ContractType[keyof typeof ContractType];

export const ContractStatus = {
  IN_PROGRESS: 'EM_ANDAMENTO',
  COMPLETED: 'CONCLUIDO',
  CANCELLED: 'CANCELADO',
  SUSPENDED: 'SUSPENSO',
} as const;
export type ContractStatus = typeof ContractStatus[keyof typeof ContractStatus];

export const MilestoneStatus = {
  PENDING: 'PENDENTE',
  IN_PROGRESS: 'EM_ANDAMENTO',
  COMPLETED: 'CONCLUIDO',
  OVERDUE: 'ATRASADO',
} as const;
export type MilestoneStatus = typeof MilestoneStatus[keyof typeof MilestoneStatus];

export const PaymentStatus = {
  PENDING: 'PENDENTE',
  PAID: 'PAGO',
  OVERDUE: 'ATRASADO',
  CANCELLED: 'CANCELADO',
  REFUNDED: 'REEMBOLSADO',
} as const;
export type PaymentStatus = typeof PaymentStatus[keyof typeof PaymentStatus];

export const SubscriptionPlan = {
  FREE: 'FREE',
  PRO: 'PRO',
  ENTERPRISE: 'ENTERPRISE',
} as const;
export type SubscriptionPlan = typeof SubscriptionPlan[keyof typeof SubscriptionPlan];

export const SubscriptionStatus = {
  ACTIVE: 'ATIVA',
  INACTIVE: 'INATIVA',
  SUSPENDED: 'SUSPENSA',
  CANCELLED: 'CANCELADA',
} as const;
export type SubscriptionStatus = typeof SubscriptionStatus[keyof typeof SubscriptionStatus];

export const Availability = {
  FULL_TIME: 'FULL_TIME',
  PART_TIME: 'PART_TIME',
  FREELANCE: 'FREELANCE',
  UNAVAILABLE: 'UNAVAILABLE',
} as const;
export type Availability = typeof Availability[keyof typeof Availability];
