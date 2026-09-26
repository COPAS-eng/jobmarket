import { z } from 'zod';
import { UserRole, JobType, JobCategory, SkillCategory, JobStatus, ProposalStatus, ContractType, ContractStatus, MilestoneStatus, PaymentStatus, SubscriptionPlan, SubscriptionStatus, Availability, } from './enums';
// Re-export enums for convenience
export { UserRole, JobType, JobCategory, SkillCategory, JobStatus, ProposalStatus, ContractType, ContractStatus, MilestoneStatus, PaymentStatus, SubscriptionPlan, SubscriptionStatus, Availability, };
// Base schemas
export const uuidSchema = z.string().uuid();
export const emailSchema = z.string().email().toLowerCase().trim();
export const passwordSchema = z.string().min(8).max(128);
export const centsSchema = z.number().int().nonnegative();
export const currencySchema = z.string().length(3).default('BRL');
// Pagination
export const paginationSchema = z.object({
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().max(100).default(20),
});
// Auth validators
export const registerSchema = z.object({
    body: z.object({
        email: emailSchema,
        password: passwordSchema,
        role: z.nativeEnum(UserRole),
        fullName: z.string().min(2).max(100).trim(),
    }),
});
export const loginSchema = z.object({
    body: z.object({
        email: emailSchema,
        password: z.string().min(1), // Don't validate length here, let bcrypt handle it
    }),
});
export const refreshTokenSchema = z.object({
    cookies: z.object({
        refreshToken: z.string().min(1),
    }),
});
// User validators
export const updateProfileSchema = z.object({
    body: z.object({
        fullName: z.string().min(2).max(100).trim().optional(),
        headline: z.string().max(150).trim().optional(),
        bio: z.string().max(2000).trim().optional(),
        avatar: z.string().url().optional().or(z.literal('')),
        hourlyRate: centsSchema.optional().nullable(),
        availability: z.nativeEnum(Availability).optional(),
        location: z.string().max(100).trim().optional(),
        languages: z.array(z.string().min(2).max(50)).max(10).optional(),
        website: z.string().url().optional().or(z.literal('')),
        linkedin: z.string().url().optional().or(z.literal('')),
        github: z.string().url().optional().or(z.literal('')),
        portfolio: z.string().url().optional().or(z.literal('')),
    }),
});
export const updateUserRoleSchema = z.object({
    params: z.object({ id: uuidSchema }),
    body: z.object({ role: z.nativeEnum(UserRole) }),
});
// Skill validators
export const createSkillSchema = z.object({
    body: z.object({
        name: z.string().min(2).max(50).trim(),
        category: z.nativeEnum(SkillCategory),
        description: z.string().max(500).trim().optional(),
    }),
});
export const skillIdSchema = z.object({
    params: z.object({ id: uuidSchema }),
});
// Job validators
export const createJobSchema = z.object({
    body: z.object({
        title: z.string().min(5).max(150).trim(),
        description: z.string().min(50).max(10000).trim(),
        type: z.nativeEnum(JobType),
        category: z.nativeEnum(JobCategory),
        budgetMin: centsSchema.optional().nullable(),
        budgetMax: centsSchema.optional().nullable(),
        currency: currencySchema.optional(),
        location: z.string().max(100).trim().optional(),
        remote: z.boolean().default(true),
        skillIds: z.array(uuidSchema).min(1).max(20),
        expiresAt: z.coerce.date().optional().nullable(),
    }).refine(data => !data.budgetMin || !data.budgetMax || data.budgetMin <= data.budgetMax, {
        message: 'budgetMin deve ser menor ou igual a budgetMax',
        path: ['budgetMin'],
    }),
});
export const updateJobSchema = z.object({
    params: z.object({ id: uuidSchema }),
    body: z.object({
        title: z.string().min(5).max(150).trim().optional(),
        description: z.string().min(50).max(10000).trim().optional(),
        type: z.nativeEnum(JobType).optional(),
        category: z.nativeEnum(JobCategory).optional(),
        budgetMin: centsSchema.optional().nullable(),
        budgetMax: centsSchema.optional().nullable(),
        currency: currencySchema.optional(),
        location: z.string().max(100).trim().optional(),
        remote: z.boolean().optional(),
        skillIds: z.array(uuidSchema).min(1).max(20).optional(),
        expiresAt: z.coerce.date().optional().nullable(),
        status: z.nativeEnum(JobStatus).optional(),
    }).refine(data => !data.budgetMin || !data.budgetMax || data.budgetMin <= data.budgetMax, {
        message: 'budgetMin deve ser menor ou igual a budgetMax',
        path: ['budgetMin'],
    }),
});
export const jobQuerySchema = z.object({
    query: z.object({
        q: z.string().max(100).trim().optional(),
        type: z.array(z.nativeEnum(JobType)).optional(),
        category: z.array(z.nativeEnum(JobCategory)).optional(),
        skills: z.array(uuidSchema).optional(),
        remote: z.coerce.boolean().optional(),
        location: z.string().max(100).trim().optional(),
        budgetMin: z.coerce.number().int().nonnegative().optional(),
        budgetMax: z.coerce.number().int().nonnegative().optional(),
        status: z.array(z.nativeEnum(JobStatus)).optional(),
        page: z.coerce.number().int().positive().default(1),
        limit: z.coerce.number().int().positive().max(50).default(20),
        sort: z.enum(['createdAt', 'budgetMax', 'viewsCount']).default('createdAt'),
        order: z.enum(['asc', 'desc']).default('desc'),
    }),
});
export const jobIdSchema = z.object({
    params: z.object({ id: uuidSchema }),
});
// Proposal validators
export const createProposalSchema = z.object({
    body: z.object({
        jobId: uuidSchema,
        coverLetter: z.string().min(20).max(5000).trim(),
        proposedRate: centsSchema.positive(),
        estimatedDays: z.number().int().positive().max(365).optional(),
    }),
});
export const updateProposalStatusSchema = z.object({
    params: z.object({ id: uuidSchema }),
    body: z.object({
        status: z.enum([ProposalStatus.ACCEPTED, ProposalStatus.REJECTED]),
    }),
});
export const proposalIdSchema = z.object({
    params: z.object({ id: uuidSchema }),
});
// Contract validators
export const createContractSchema = z.object({
    body: z.object({
        proposalId: uuidSchema,
        type: z.nativeEnum(ContractType),
        agreedRate: centsSchema.positive(),
        terms: z.string().max(10000).trim().optional(),
    }),
});
export const updateContractSchema = z.object({
    params: z.object({ id: uuidSchema }),
    body: z.object({
        status: z.nativeEnum(ContractStatus).optional(),
        terms: z.string().max(10000).trim().optional(),
    }),
});
export const contractIdSchema = z.object({
    params: z.object({ id: uuidSchema }),
});
// Milestone validators
export const createMilestoneSchema = z.object({
    params: z.object({ contractId: uuidSchema }),
    body: z.object({
        title: z.string().min(3).max(150).trim(),
        description: z.string().max(2000).trim().optional(),
        amount: centsSchema.positive(),
        dueDate: z.coerce.date().optional().nullable(),
    }),
});
export const updateMilestoneSchema = z.object({
    params: z.object({ contractId: uuidSchema, id: uuidSchema }),
    body: z.object({
        title: z.string().min(3).max(150).trim().optional(),
        description: z.string().max(2000).trim().optional(),
        amount: centsSchema.positive().optional(),
        dueDate: z.coerce.date().optional().nullable(),
        status: z.nativeEnum(MilestoneStatus).optional(),
    }),
});
export const submitMilestoneSchema = z.object({
    params: z.object({ contractId: uuidSchema, id: uuidSchema }),
    body: z.object({
        deliveryNotes: z.string().max(2000).trim().optional(),
        attachments: z.array(z.string().url()).max(5).optional(),
    }),
});
export const reviewMilestoneSchema = z.object({
    params: z.object({ contractId: uuidSchema, id: uuidSchema }),
    body: z.object({
        action: z.enum(['approve', 'reject']),
        feedback: z.string().max(1000).trim().optional(),
    }),
});
// Payment validators
export const createPaymentIntentSchema = z.object({
    params: z.object({ contractId: uuidSchema }),
    body: z.object({
        milestoneId: uuidSchema.optional(),
        amount: centsSchema.positive(),
    }),
});
export const paymentWebhookSchema = z.object({
    body: z.object({
        id: z.string(),
        object: z.string(),
        type: z.string(),
        data: z.object({
            object: z.record(z.unknown()),
        }),
    }),
});
// Subscription validators
export const createSubscriptionSchema = z.object({
    body: z.object({
        plan: z.nativeEnum(SubscriptionPlan),
        paymentMethodId: z.string().optional(), // Stripe payment method ID
    }),
});
export const updateSubscriptionSchema = z.object({
    body: z.object({
        plan: z.nativeEnum(SubscriptionPlan).optional(),
        cancelAtPeriodEnd: z.boolean().optional(),
    }),
});
// Professional filters
export const professionalQuerySchema = z.object({
    query: z.object({
        q: z.string().max(100).trim().optional(),
        skills: z.array(uuidSchema).optional(),
        availability: z.array(z.nativeEnum(Availability)).optional(),
        rateMin: z.coerce.number().int().nonnegative().optional(),
        rateMax: z.coerce.number().int().nonnegative().optional(),
        location: z.string().max(100).trim().optional(),
        languages: z.array(z.string().min(2).max(50)).optional(),
        page: z.coerce.number().int().positive().default(1),
        limit: z.coerce.number().int().positive().max(50).default(20),
        sort: z.enum(['hourlyRate', 'createdAt', 'rating']).default('createdAt'),
        order: z.enum(['asc', 'desc']).default('desc'),
    }),
});
// Admin validators
export const adminUserQuerySchema = z.object({
    query: z.object({
        q: z.string().max(100).trim().optional(),
        role: z.array(z.nativeEnum(UserRole)).optional(),
        status: z.enum(['active', 'inactive', 'suspended']).optional(),
        page: z.coerce.number().int().positive().default(1),
        limit: z.coerce.number().int().positive().max(100).default(50),
    }),
});
export const adminUpdateUserSchema = z.object({
    params: z.object({ id: uuidSchema }),
    body: z.object({
        role: z.nativeEnum(UserRole).optional(),
        emailVerified: z.boolean().optional(),
        suspended: z.boolean().optional(),
        suspensionReason: z.string().max(500).trim().optional(),
    }),
});
// Commission config
export const commissionConfigSchema = z.object({
    body: z.object({
        free: z.number().min(0).max(1),
        pro: z.number().min(0).max(1),
        enterprise: z.number().min(0).max(1),
    }),
});
