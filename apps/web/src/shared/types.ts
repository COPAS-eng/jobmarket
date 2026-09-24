import type { z } from 'zod';
import {
  UserRole,
  JobType,
  JobCategory,
  SkillCategory,
  JobStatus,
  ProposalStatus,
  ContractType,
  ContractStatus,
  MilestoneStatus,
  PaymentStatus,
  SubscriptionPlan,
  SubscriptionStatus,
  Availability,
} from './enums';

// Base entity types
export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface User extends BaseEntity {
  email: string;
  passwordHash: string;
  role: UserRole;
  emailVerified: boolean;
  stripeCustomerId?: string;
  stripeAccountId?: string; // Stripe Connect account
  lastLoginAt?: Date;
}

export interface Profile extends BaseEntity {
  userId: string;
  fullName: string;
  headline?: string;
  bio?: string;
  avatar?: string;
  hourlyRate?: number; // in cents
  availability: Availability;
  location?: string;
  languages: string[];
  website?: string;
  linkedin?: string;
  github?: string;
  portfolio?: string;
}

export interface Skill extends BaseEntity {
  name: string;
  category: SkillCategory;
  description?: string;
}

export interface Job extends BaseEntity {
  employerId: string;
  title: string;
  description: string; // Markdown
  type: JobType;
  category: JobCategory;
  budgetMin?: number; // in cents
  budgetMax?: number; // in cents
  currency: string;
  location?: string;
  remote: boolean;
  status: JobStatus;
  skillIds: string[];
  expiresAt?: Date;
  viewsCount: number;
  applicationsCount: number;
}

export interface Proposal extends BaseEntity {
  jobId: string;
  professionalId: string;
  coverLetter: string;
  proposedRate: number; // in cents
  estimatedDays?: number;
  status: ProposalStatus;
  viewedAt?: Date;
  respondedAt?: Date;
}

export interface Contract extends BaseEntity {
  jobId: string;
  professionalId: string;
  employerId: string;
  agreedRate: number; // in cents
  type: ContractType;
  status: ContractStatus;
  commissionRate: number; // platform fee (e.g., 0.08 = 8%)
  startedAt?: Date;
  completedAt?: Date;
  cancelledAt?: Date;
  terms?: string; // Markdown
}

export interface Milestone extends BaseEntity {
  contractId: string;
  title: string;
  description?: string;
  amount: number; // in cents
  dueDate?: Date;
  status: MilestoneStatus;
  submittedAt?: Date;
  approvedAt?: Date;
  paidAt?: Date;
  order: number;
}

export interface Payment extends BaseEntity {
  contractId: string;
  milestoneId?: string;
  amount: number; // in cents (total)
  platformFee: number; // in cents (commission)
  professionalAmount: number; // in cents (net to professional)
  status: PaymentStatus;
  stripePaymentIntentId?: string;
  stripeTransferId?: string; // to connected account
  paidAt?: Date;
  failedAt?: Date;
  failureReason?: string;
}

export interface Subscription extends BaseEntity {
  userId: string;
  plan: SubscriptionPlan;
  status: SubscriptionStatus;
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  cancelAtPeriodEnd: boolean;
  commissionDiscount: number; // discount on platform fee (e.g., 0.02 = 2% off)
}

// API Request/Response types
export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ApiSuccess<T> {
  success: true;
  data: T;
  meta?: PaginatedResponse<T>['meta'];
}

export interface ApiError {
  success: false;
  error: {
    code: string;
    message: string;
    details?: Record<string, string[]>;
  };
}

export type ApiResponse<T> = ApiSuccess<T> | ApiError;

// Auth types
export interface RegisterInput {
  email: string;
  password: string;
  role: UserRole;
  fullName: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface JWTPayload {
  sub: string; // user id
  email: string;
  role: UserRole;
  iat: number;
  exp: number;
}

// Job filters
export interface JobFilters {
  q?: string;
  type?: JobType[];
  category?: JobCategory[];
  skills?: string[];
  remote?: boolean;
  location?: string;
  budgetMin?: number;
  budgetMax?: number;
  status?: JobStatus[];
}

// Professional filters
export interface ProfessionalFilters {
  q?: string;
  skills?: string[];
  availability?: Availability[];
  rateMin?: number;
  rateMax?: number;
  location?: string;
  languages?: string[];
}

// Stripe types
export interface StripeConnectAccount {
  id: string;
  chargesEnabled: boolean;
  payoutsEnabled: boolean;
  detailsSubmitted: boolean;
  requirements: {
    currentlyDue: string[];
    eventuallyDue: string[];
    pastDue: string[];
  };
}