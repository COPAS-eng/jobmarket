import { UserRole, JobType, JobCategory, SkillCategory, JobStatus, ProposalStatus, ContractType, ContractStatus, MilestoneStatus, PaymentStatus, SubscriptionPlan, SubscriptionStatus, Availability } from './enums';
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
    stripeAccountId?: string;
    lastLoginAt?: Date;
}
export interface Profile extends BaseEntity {
    userId: string;
    fullName: string;
    headline?: string;
    bio?: string;
    avatar?: string;
    hourlyRate?: number;
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
    employer?: {
        id: string;
        profile?: Profile;
    };
    title: string;
    description: string;
    type: JobType;
    category: JobCategory;
    budgetMin?: number;
    budgetMax?: number;
    currency: string;
    location?: string;
    remote: boolean;
    status: JobStatus;
    skillIds: string[];
    skills?: Skill[];
    expiresAt?: Date;
    viewsCount: number;
    applicationsCount: number;
}
export interface Proposal extends BaseEntity {
    jobId: string;
    professionalId: string;
    coverLetter: string;
    proposedRate: number;
    estimatedDays?: number;
    status: ProposalStatus;
    viewedAt?: Date;
    respondedAt?: Date;
}
export interface Contract extends BaseEntity {
    jobId: string;
    professionalId: string;
    employerId: string;
    agreedRate: number;
    type: ContractType;
    status: ContractStatus;
    commissionRate: number;
    startedAt?: Date;
    completedAt?: Date;
    cancelledAt?: Date;
    terms?: string;
}
export interface Milestone extends BaseEntity {
    contractId: string;
    title: string;
    description?: string;
    amount: number;
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
    amount: number;
    platformFee: number;
    professionalAmount: number;
    status: PaymentStatus;
    stripePaymentIntentId?: string;
    stripeTransferId?: string;
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
    commissionDiscount: number;
}
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
export interface AuthTokens {
    accessToken: string;
    refreshToken: string;
}
export interface JWTPayload {
    sub: string;
    email: string;
    role: UserRole;
    iat: number;
    exp: number;
}
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
export interface ProfessionalFilters {
    q?: string;
    skills?: string[];
    availability?: Availability[];
    rateMin?: number;
    rateMax?: number;
    location?: string;
    languages?: string[];
}
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
export interface JobQueryParams {
    q?: string;
    type?: JobType[];
    category?: JobCategory[];
    skills?: string[];
    remote?: boolean;
    location?: string;
    budgetMin?: number;
    budgetMax?: number;
    status?: JobStatus[];
    page?: number;
    limit?: number;
    sort?: 'createdAt' | 'budgetMax' | 'viewsCount';
    order?: 'asc' | 'desc';
}
export interface ProfessionalQueryParams {
    q?: string;
    skills?: string[];
    availability?: Availability[];
    rateMin?: number;
    rateMax?: number;
    location?: string;
    languages?: string[];
    page?: number;
    limit?: number;
    sort?: 'hourlyRate' | 'createdAt' | 'rating';
    order?: 'asc' | 'desc';
}
export interface CreatePaymentIntentInput {
    milestoneId?: string;
    amount: number;
}
export interface UpdateContractInput {
    status?: ContractStatus;
    terms?: string;
}
export interface UpdateMilestoneInput {
    title?: string;
    description?: string;
    amount?: number;
    dueDate?: Date;
    status?: MilestoneStatus;
}
export interface SubmitMilestoneInput {
    deliveryNotes?: string;
    attachments?: string[];
}
//# sourceMappingURL=types.d.ts.map