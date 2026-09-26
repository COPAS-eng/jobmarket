import { z } from 'zod';
import { UserRole, JobType, JobCategory, SkillCategory, JobStatus, ProposalStatus, ContractType, ContractStatus, MilestoneStatus, PaymentStatus, SubscriptionPlan, SubscriptionStatus, Availability } from './enums';
export { UserRole, JobType, JobCategory, SkillCategory, JobStatus, ProposalStatus, ContractType, ContractStatus, MilestoneStatus, PaymentStatus, SubscriptionPlan, SubscriptionStatus, Availability, };
export declare const uuidSchema: z.ZodString;
export declare const emailSchema: z.ZodString;
export declare const passwordSchema: z.ZodString;
export declare const centsSchema: z.ZodNumber;
export declare const currencySchema: z.ZodDefault<z.ZodString>;
export declare const paginationSchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    page: number;
    limit: number;
}, {
    page?: number | undefined;
    limit?: number | undefined;
}>;
export type PaginationInput = z.infer<typeof paginationSchema>;
export declare const registerSchema: z.ZodObject<{
    body: z.ZodObject<{
        email: z.ZodString;
        password: z.ZodString;
        role: z.ZodNativeEnum<typeof UserRole>;
        fullName: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        email: string;
        password: string;
        role: UserRole;
        fullName: string;
    }, {
        email: string;
        password: string;
        role: UserRole;
        fullName: string;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        email: string;
        password: string;
        role: UserRole;
        fullName: string;
    };
}, {
    body: {
        email: string;
        password: string;
        role: UserRole;
        fullName: string;
    };
}>;
export declare const loginSchema: z.ZodObject<{
    body: z.ZodObject<{
        email: z.ZodString;
        password: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        email: string;
        password: string;
    }, {
        email: string;
        password: string;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        email: string;
        password: string;
    };
}, {
    body: {
        email: string;
        password: string;
    };
}>;
export declare const refreshTokenSchema: z.ZodObject<{
    cookies: z.ZodObject<{
        refreshToken: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        refreshToken: string;
    }, {
        refreshToken: string;
    }>;
}, "strip", z.ZodTypeAny, {
    cookies: {
        refreshToken: string;
    };
}, {
    cookies: {
        refreshToken: string;
    };
}>;
export declare const updateProfileSchema: z.ZodObject<{
    body: z.ZodObject<{
        fullName: z.ZodOptional<z.ZodString>;
        headline: z.ZodOptional<z.ZodString>;
        bio: z.ZodOptional<z.ZodString>;
        avatar: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
        hourlyRate: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
        availability: z.ZodOptional<z.ZodNativeEnum<typeof Availability>>;
        location: z.ZodOptional<z.ZodString>;
        languages: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        website: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
        linkedin: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
        github: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
        portfolio: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
    }, "strip", z.ZodTypeAny, {
        hourlyRate?: number | null | undefined;
        fullName?: string | undefined;
        headline?: string | undefined;
        bio?: string | undefined;
        avatar?: string | undefined;
        availability?: Availability | undefined;
        location?: string | undefined;
        languages?: string[] | undefined;
        website?: string | undefined;
        linkedin?: string | undefined;
        github?: string | undefined;
        portfolio?: string | undefined;
    }, {
        hourlyRate?: number | null | undefined;
        fullName?: string | undefined;
        headline?: string | undefined;
        bio?: string | undefined;
        avatar?: string | undefined;
        availability?: Availability | undefined;
        location?: string | undefined;
        languages?: string[] | undefined;
        website?: string | undefined;
        linkedin?: string | undefined;
        github?: string | undefined;
        portfolio?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        hourlyRate?: number | null | undefined;
        fullName?: string | undefined;
        headline?: string | undefined;
        bio?: string | undefined;
        avatar?: string | undefined;
        availability?: Availability | undefined;
        location?: string | undefined;
        languages?: string[] | undefined;
        website?: string | undefined;
        linkedin?: string | undefined;
        github?: string | undefined;
        portfolio?: string | undefined;
    };
}, {
    body: {
        hourlyRate?: number | null | undefined;
        fullName?: string | undefined;
        headline?: string | undefined;
        bio?: string | undefined;
        avatar?: string | undefined;
        availability?: Availability | undefined;
        location?: string | undefined;
        languages?: string[] | undefined;
        website?: string | undefined;
        linkedin?: string | undefined;
        github?: string | undefined;
        portfolio?: string | undefined;
    };
}>;
export declare const updateUserRoleSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
    }, {
        id: string;
    }>;
    body: z.ZodObject<{
        role: z.ZodNativeEnum<typeof UserRole>;
    }, "strip", z.ZodTypeAny, {
        role: UserRole;
    }, {
        role: UserRole;
    }>;
}, "strip", z.ZodTypeAny, {
    params: {
        id: string;
    };
    body: {
        role: UserRole;
    };
}, {
    params: {
        id: string;
    };
    body: {
        role: UserRole;
    };
}>;
export declare const createSkillSchema: z.ZodObject<{
    body: z.ZodObject<{
        name: z.ZodString;
        category: z.ZodNativeEnum<typeof SkillCategory>;
        description: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        category: SkillCategory;
        description?: string | undefined;
    }, {
        name: string;
        category: SkillCategory;
        description?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        name: string;
        category: SkillCategory;
        description?: string | undefined;
    };
}, {
    body: {
        name: string;
        category: SkillCategory;
        description?: string | undefined;
    };
}>;
export declare const skillIdSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
    }, {
        id: string;
    }>;
}, "strip", z.ZodTypeAny, {
    params: {
        id: string;
    };
}, {
    params: {
        id: string;
    };
}>;
export declare const createJobSchema: z.ZodObject<{
    body: z.ZodEffects<z.ZodObject<{
        title: z.ZodString;
        description: z.ZodString;
        type: z.ZodNativeEnum<typeof JobType>;
        category: z.ZodNativeEnum<typeof JobCategory>;
        budgetMin: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
        budgetMax: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
        currency: z.ZodOptional<z.ZodDefault<z.ZodString>>;
        location: z.ZodOptional<z.ZodString>;
        remote: z.ZodDefault<z.ZodBoolean>;
        skillIds: z.ZodArray<z.ZodString, "many">;
        expiresAt: z.ZodNullable<z.ZodOptional<z.ZodDate>>;
    }, "strip", z.ZodTypeAny, {
        type: JobType;
        category: JobCategory;
        description: string;
        title: string;
        remote: boolean;
        skillIds: string[];
        budgetMax?: number | null | undefined;
        location?: string | undefined;
        budgetMin?: number | null | undefined;
        currency?: string | undefined;
        expiresAt?: Date | null | undefined;
    }, {
        type: JobType;
        category: JobCategory;
        description: string;
        title: string;
        skillIds: string[];
        budgetMax?: number | null | undefined;
        location?: string | undefined;
        budgetMin?: number | null | undefined;
        currency?: string | undefined;
        remote?: boolean | undefined;
        expiresAt?: Date | null | undefined;
    }>, {
        type: JobType;
        category: JobCategory;
        description: string;
        title: string;
        remote: boolean;
        skillIds: string[];
        budgetMax?: number | null | undefined;
        location?: string | undefined;
        budgetMin?: number | null | undefined;
        currency?: string | undefined;
        expiresAt?: Date | null | undefined;
    }, {
        type: JobType;
        category: JobCategory;
        description: string;
        title: string;
        skillIds: string[];
        budgetMax?: number | null | undefined;
        location?: string | undefined;
        budgetMin?: number | null | undefined;
        currency?: string | undefined;
        remote?: boolean | undefined;
        expiresAt?: Date | null | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        type: JobType;
        category: JobCategory;
        description: string;
        title: string;
        remote: boolean;
        skillIds: string[];
        budgetMax?: number | null | undefined;
        location?: string | undefined;
        budgetMin?: number | null | undefined;
        currency?: string | undefined;
        expiresAt?: Date | null | undefined;
    };
}, {
    body: {
        type: JobType;
        category: JobCategory;
        description: string;
        title: string;
        skillIds: string[];
        budgetMax?: number | null | undefined;
        location?: string | undefined;
        budgetMin?: number | null | undefined;
        currency?: string | undefined;
        remote?: boolean | undefined;
        expiresAt?: Date | null | undefined;
    };
}>;
export declare const updateJobSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
    }, {
        id: string;
    }>;
    body: z.ZodEffects<z.ZodObject<{
        title: z.ZodOptional<z.ZodString>;
        description: z.ZodOptional<z.ZodString>;
        type: z.ZodOptional<z.ZodNativeEnum<typeof JobType>>;
        category: z.ZodOptional<z.ZodNativeEnum<typeof JobCategory>>;
        budgetMin: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
        budgetMax: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
        currency: z.ZodOptional<z.ZodDefault<z.ZodString>>;
        location: z.ZodOptional<z.ZodString>;
        remote: z.ZodOptional<z.ZodBoolean>;
        skillIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        expiresAt: z.ZodNullable<z.ZodOptional<z.ZodDate>>;
        status: z.ZodOptional<z.ZodNativeEnum<typeof JobStatus>>;
    }, "strip", z.ZodTypeAny, {
        type?: JobType | undefined;
        status?: JobStatus | undefined;
        budgetMax?: number | null | undefined;
        location?: string | undefined;
        category?: JobCategory | undefined;
        description?: string | undefined;
        title?: string | undefined;
        budgetMin?: number | null | undefined;
        currency?: string | undefined;
        remote?: boolean | undefined;
        skillIds?: string[] | undefined;
        expiresAt?: Date | null | undefined;
    }, {
        type?: JobType | undefined;
        status?: JobStatus | undefined;
        budgetMax?: number | null | undefined;
        location?: string | undefined;
        category?: JobCategory | undefined;
        description?: string | undefined;
        title?: string | undefined;
        budgetMin?: number | null | undefined;
        currency?: string | undefined;
        remote?: boolean | undefined;
        skillIds?: string[] | undefined;
        expiresAt?: Date | null | undefined;
    }>, {
        type?: JobType | undefined;
        status?: JobStatus | undefined;
        budgetMax?: number | null | undefined;
        location?: string | undefined;
        category?: JobCategory | undefined;
        description?: string | undefined;
        title?: string | undefined;
        budgetMin?: number | null | undefined;
        currency?: string | undefined;
        remote?: boolean | undefined;
        skillIds?: string[] | undefined;
        expiresAt?: Date | null | undefined;
    }, {
        type?: JobType | undefined;
        status?: JobStatus | undefined;
        budgetMax?: number | null | undefined;
        location?: string | undefined;
        category?: JobCategory | undefined;
        description?: string | undefined;
        title?: string | undefined;
        budgetMin?: number | null | undefined;
        currency?: string | undefined;
        remote?: boolean | undefined;
        skillIds?: string[] | undefined;
        expiresAt?: Date | null | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    params: {
        id: string;
    };
    body: {
        type?: JobType | undefined;
        status?: JobStatus | undefined;
        budgetMax?: number | null | undefined;
        location?: string | undefined;
        category?: JobCategory | undefined;
        description?: string | undefined;
        title?: string | undefined;
        budgetMin?: number | null | undefined;
        currency?: string | undefined;
        remote?: boolean | undefined;
        skillIds?: string[] | undefined;
        expiresAt?: Date | null | undefined;
    };
}, {
    params: {
        id: string;
    };
    body: {
        type?: JobType | undefined;
        status?: JobStatus | undefined;
        budgetMax?: number | null | undefined;
        location?: string | undefined;
        category?: JobCategory | undefined;
        description?: string | undefined;
        title?: string | undefined;
        budgetMin?: number | null | undefined;
        currency?: string | undefined;
        remote?: boolean | undefined;
        skillIds?: string[] | undefined;
        expiresAt?: Date | null | undefined;
    };
}>;
export declare const jobQuerySchema: z.ZodObject<{
    query: z.ZodObject<{
        q: z.ZodOptional<z.ZodString>;
        type: z.ZodOptional<z.ZodArray<z.ZodNativeEnum<typeof JobType>, "many">>;
        category: z.ZodOptional<z.ZodArray<z.ZodNativeEnum<typeof JobCategory>, "many">>;
        skills: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        remote: z.ZodOptional<z.ZodBoolean>;
        location: z.ZodOptional<z.ZodString>;
        budgetMin: z.ZodOptional<z.ZodNumber>;
        budgetMax: z.ZodOptional<z.ZodNumber>;
        status: z.ZodOptional<z.ZodArray<z.ZodNativeEnum<typeof JobStatus>, "many">>;
        page: z.ZodDefault<z.ZodNumber>;
        limit: z.ZodDefault<z.ZodNumber>;
        sort: z.ZodDefault<z.ZodEnum<["createdAt", "budgetMax", "viewsCount"]>>;
        order: z.ZodDefault<z.ZodEnum<["asc", "desc"]>>;
    }, "strip", z.ZodTypeAny, {
        sort: "createdAt" | "budgetMax" | "viewsCount";
        page: number;
        limit: number;
        order: "asc" | "desc";
        type?: JobType[] | undefined;
        status?: JobStatus[] | undefined;
        budgetMax?: number | undefined;
        location?: string | undefined;
        category?: JobCategory[] | undefined;
        budgetMin?: number | undefined;
        remote?: boolean | undefined;
        q?: string | undefined;
        skills?: string[] | undefined;
    }, {
        type?: JobType[] | undefined;
        sort?: "createdAt" | "budgetMax" | "viewsCount" | undefined;
        status?: JobStatus[] | undefined;
        budgetMax?: number | undefined;
        page?: number | undefined;
        limit?: number | undefined;
        location?: string | undefined;
        category?: JobCategory[] | undefined;
        budgetMin?: number | undefined;
        remote?: boolean | undefined;
        q?: string | undefined;
        skills?: string[] | undefined;
        order?: "asc" | "desc" | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    query: {
        sort: "createdAt" | "budgetMax" | "viewsCount";
        page: number;
        limit: number;
        order: "asc" | "desc";
        type?: JobType[] | undefined;
        status?: JobStatus[] | undefined;
        budgetMax?: number | undefined;
        location?: string | undefined;
        category?: JobCategory[] | undefined;
        budgetMin?: number | undefined;
        remote?: boolean | undefined;
        q?: string | undefined;
        skills?: string[] | undefined;
    };
}, {
    query: {
        type?: JobType[] | undefined;
        sort?: "createdAt" | "budgetMax" | "viewsCount" | undefined;
        status?: JobStatus[] | undefined;
        budgetMax?: number | undefined;
        page?: number | undefined;
        limit?: number | undefined;
        location?: string | undefined;
        category?: JobCategory[] | undefined;
        budgetMin?: number | undefined;
        remote?: boolean | undefined;
        q?: string | undefined;
        skills?: string[] | undefined;
        order?: "asc" | "desc" | undefined;
    };
}>;
export declare const jobIdSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
    }, {
        id: string;
    }>;
}, "strip", z.ZodTypeAny, {
    params: {
        id: string;
    };
}, {
    params: {
        id: string;
    };
}>;
export declare const createProposalSchema: z.ZodObject<{
    body: z.ZodObject<{
        jobId: z.ZodString;
        coverLetter: z.ZodString;
        proposedRate: z.ZodNumber;
        estimatedDays: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        jobId: string;
        coverLetter: string;
        proposedRate: number;
        estimatedDays?: number | undefined;
    }, {
        jobId: string;
        coverLetter: string;
        proposedRate: number;
        estimatedDays?: number | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        jobId: string;
        coverLetter: string;
        proposedRate: number;
        estimatedDays?: number | undefined;
    };
}, {
    body: {
        jobId: string;
        coverLetter: string;
        proposedRate: number;
        estimatedDays?: number | undefined;
    };
}>;
export declare const updateProposalStatusSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
    }, {
        id: string;
    }>;
    body: z.ZodObject<{
        status: z.ZodEnum<[ProposalStatus.ACCEPTED, ProposalStatus.REJECTED]>;
    }, "strip", z.ZodTypeAny, {
        status: ProposalStatus.ACCEPTED | ProposalStatus.REJECTED;
    }, {
        status: ProposalStatus.ACCEPTED | ProposalStatus.REJECTED;
    }>;
}, "strip", z.ZodTypeAny, {
    params: {
        id: string;
    };
    body: {
        status: ProposalStatus.ACCEPTED | ProposalStatus.REJECTED;
    };
}, {
    params: {
        id: string;
    };
    body: {
        status: ProposalStatus.ACCEPTED | ProposalStatus.REJECTED;
    };
}>;
export declare const proposalIdSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
    }, {
        id: string;
    }>;
}, "strip", z.ZodTypeAny, {
    params: {
        id: string;
    };
}, {
    params: {
        id: string;
    };
}>;
export declare const createContractSchema: z.ZodObject<{
    body: z.ZodObject<{
        proposalId: z.ZodString;
        type: z.ZodNativeEnum<typeof ContractType>;
        agreedRate: z.ZodNumber;
        terms: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        type: ContractType;
        proposalId: string;
        agreedRate: number;
        terms?: string | undefined;
    }, {
        type: ContractType;
        proposalId: string;
        agreedRate: number;
        terms?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        type: ContractType;
        proposalId: string;
        agreedRate: number;
        terms?: string | undefined;
    };
}, {
    body: {
        type: ContractType;
        proposalId: string;
        agreedRate: number;
        terms?: string | undefined;
    };
}>;
export declare const updateContractSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
    }, {
        id: string;
    }>;
    body: z.ZodObject<{
        status: z.ZodOptional<z.ZodNativeEnum<typeof ContractStatus>>;
        terms: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        status?: ContractStatus | undefined;
        terms?: string | undefined;
    }, {
        status?: ContractStatus | undefined;
        terms?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    params: {
        id: string;
    };
    body: {
        status?: ContractStatus | undefined;
        terms?: string | undefined;
    };
}, {
    params: {
        id: string;
    };
    body: {
        status?: ContractStatus | undefined;
        terms?: string | undefined;
    };
}>;
export declare const contractIdSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
    }, {
        id: string;
    }>;
}, "strip", z.ZodTypeAny, {
    params: {
        id: string;
    };
}, {
    params: {
        id: string;
    };
}>;
export declare const createMilestoneSchema: z.ZodObject<{
    params: z.ZodObject<{
        contractId: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        contractId: string;
    }, {
        contractId: string;
    }>;
    body: z.ZodObject<{
        title: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
        amount: z.ZodNumber;
        dueDate: z.ZodNullable<z.ZodOptional<z.ZodDate>>;
    }, "strip", z.ZodTypeAny, {
        title: string;
        amount: number;
        description?: string | undefined;
        dueDate?: Date | null | undefined;
    }, {
        title: string;
        amount: number;
        description?: string | undefined;
        dueDate?: Date | null | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    params: {
        contractId: string;
    };
    body: {
        title: string;
        amount: number;
        description?: string | undefined;
        dueDate?: Date | null | undefined;
    };
}, {
    params: {
        contractId: string;
    };
    body: {
        title: string;
        amount: number;
        description?: string | undefined;
        dueDate?: Date | null | undefined;
    };
}>;
export declare const updateMilestoneSchema: z.ZodObject<{
    params: z.ZodObject<{
        contractId: z.ZodString;
        id: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
        contractId: string;
    }, {
        id: string;
        contractId: string;
    }>;
    body: z.ZodObject<{
        title: z.ZodOptional<z.ZodString>;
        description: z.ZodOptional<z.ZodString>;
        amount: z.ZodOptional<z.ZodNumber>;
        dueDate: z.ZodNullable<z.ZodOptional<z.ZodDate>>;
        status: z.ZodOptional<z.ZodNativeEnum<typeof MilestoneStatus>>;
    }, "strip", z.ZodTypeAny, {
        status?: MilestoneStatus | undefined;
        description?: string | undefined;
        title?: string | undefined;
        amount?: number | undefined;
        dueDate?: Date | null | undefined;
    }, {
        status?: MilestoneStatus | undefined;
        description?: string | undefined;
        title?: string | undefined;
        amount?: number | undefined;
        dueDate?: Date | null | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    params: {
        id: string;
        contractId: string;
    };
    body: {
        status?: MilestoneStatus | undefined;
        description?: string | undefined;
        title?: string | undefined;
        amount?: number | undefined;
        dueDate?: Date | null | undefined;
    };
}, {
    params: {
        id: string;
        contractId: string;
    };
    body: {
        status?: MilestoneStatus | undefined;
        description?: string | undefined;
        title?: string | undefined;
        amount?: number | undefined;
        dueDate?: Date | null | undefined;
    };
}>;
export declare const submitMilestoneSchema: z.ZodObject<{
    params: z.ZodObject<{
        contractId: z.ZodString;
        id: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
        contractId: string;
    }, {
        id: string;
        contractId: string;
    }>;
    body: z.ZodObject<{
        deliveryNotes: z.ZodOptional<z.ZodString>;
        attachments: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        deliveryNotes?: string | undefined;
        attachments?: string[] | undefined;
    }, {
        deliveryNotes?: string | undefined;
        attachments?: string[] | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    params: {
        id: string;
        contractId: string;
    };
    body: {
        deliveryNotes?: string | undefined;
        attachments?: string[] | undefined;
    };
}, {
    params: {
        id: string;
        contractId: string;
    };
    body: {
        deliveryNotes?: string | undefined;
        attachments?: string[] | undefined;
    };
}>;
export declare const reviewMilestoneSchema: z.ZodObject<{
    params: z.ZodObject<{
        contractId: z.ZodString;
        id: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
        contractId: string;
    }, {
        id: string;
        contractId: string;
    }>;
    body: z.ZodObject<{
        action: z.ZodEnum<["approve", "reject"]>;
        feedback: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        action: "approve" | "reject";
        feedback?: string | undefined;
    }, {
        action: "approve" | "reject";
        feedback?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    params: {
        id: string;
        contractId: string;
    };
    body: {
        action: "approve" | "reject";
        feedback?: string | undefined;
    };
}, {
    params: {
        id: string;
        contractId: string;
    };
    body: {
        action: "approve" | "reject";
        feedback?: string | undefined;
    };
}>;
export declare const createPaymentIntentSchema: z.ZodObject<{
    params: z.ZodObject<{
        contractId: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        contractId: string;
    }, {
        contractId: string;
    }>;
    body: z.ZodObject<{
        milestoneId: z.ZodOptional<z.ZodString>;
        amount: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        amount: number;
        milestoneId?: string | undefined;
    }, {
        amount: number;
        milestoneId?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    params: {
        contractId: string;
    };
    body: {
        amount: number;
        milestoneId?: string | undefined;
    };
}, {
    params: {
        contractId: string;
    };
    body: {
        amount: number;
        milestoneId?: string | undefined;
    };
}>;
export declare const paymentWebhookSchema: z.ZodObject<{
    body: z.ZodObject<{
        id: z.ZodString;
        object: z.ZodString;
        type: z.ZodString;
        data: z.ZodObject<{
            object: z.ZodRecord<z.ZodString, z.ZodUnknown>;
        }, "strip", z.ZodTypeAny, {
            object: Record<string, unknown>;
        }, {
            object: Record<string, unknown>;
        }>;
    }, "strip", z.ZodTypeAny, {
        object: string;
        type: string;
        id: string;
        data: {
            object: Record<string, unknown>;
        };
    }, {
        object: string;
        type: string;
        id: string;
        data: {
            object: Record<string, unknown>;
        };
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        object: string;
        type: string;
        id: string;
        data: {
            object: Record<string, unknown>;
        };
    };
}, {
    body: {
        object: string;
        type: string;
        id: string;
        data: {
            object: Record<string, unknown>;
        };
    };
}>;
export declare const createSubscriptionSchema: z.ZodObject<{
    body: z.ZodObject<{
        plan: z.ZodNativeEnum<typeof SubscriptionPlan>;
        paymentMethodId: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        plan: SubscriptionPlan;
        paymentMethodId?: string | undefined;
    }, {
        plan: SubscriptionPlan;
        paymentMethodId?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        plan: SubscriptionPlan;
        paymentMethodId?: string | undefined;
    };
}, {
    body: {
        plan: SubscriptionPlan;
        paymentMethodId?: string | undefined;
    };
}>;
export declare const updateSubscriptionSchema: z.ZodObject<{
    body: z.ZodObject<{
        plan: z.ZodOptional<z.ZodNativeEnum<typeof SubscriptionPlan>>;
        cancelAtPeriodEnd: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        plan?: SubscriptionPlan | undefined;
        cancelAtPeriodEnd?: boolean | undefined;
    }, {
        plan?: SubscriptionPlan | undefined;
        cancelAtPeriodEnd?: boolean | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        plan?: SubscriptionPlan | undefined;
        cancelAtPeriodEnd?: boolean | undefined;
    };
}, {
    body: {
        plan?: SubscriptionPlan | undefined;
        cancelAtPeriodEnd?: boolean | undefined;
    };
}>;
export declare const professionalQuerySchema: z.ZodObject<{
    query: z.ZodObject<{
        q: z.ZodOptional<z.ZodString>;
        skills: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        availability: z.ZodOptional<z.ZodArray<z.ZodNativeEnum<typeof Availability>, "many">>;
        rateMin: z.ZodOptional<z.ZodNumber>;
        rateMax: z.ZodOptional<z.ZodNumber>;
        location: z.ZodOptional<z.ZodString>;
        languages: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        page: z.ZodDefault<z.ZodNumber>;
        limit: z.ZodDefault<z.ZodNumber>;
        sort: z.ZodDefault<z.ZodEnum<["hourlyRate", "createdAt", "rating"]>>;
        order: z.ZodDefault<z.ZodEnum<["asc", "desc"]>>;
    }, "strip", z.ZodTypeAny, {
        sort: "createdAt" | "hourlyRate" | "rating";
        page: number;
        limit: number;
        order: "asc" | "desc";
        availability?: Availability[] | undefined;
        location?: string | undefined;
        languages?: string[] | undefined;
        q?: string | undefined;
        skills?: string[] | undefined;
        rateMin?: number | undefined;
        rateMax?: number | undefined;
    }, {
        sort?: "createdAt" | "hourlyRate" | "rating" | undefined;
        page?: number | undefined;
        limit?: number | undefined;
        availability?: Availability[] | undefined;
        location?: string | undefined;
        languages?: string[] | undefined;
        q?: string | undefined;
        skills?: string[] | undefined;
        order?: "asc" | "desc" | undefined;
        rateMin?: number | undefined;
        rateMax?: number | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    query: {
        sort: "createdAt" | "hourlyRate" | "rating";
        page: number;
        limit: number;
        order: "asc" | "desc";
        availability?: Availability[] | undefined;
        location?: string | undefined;
        languages?: string[] | undefined;
        q?: string | undefined;
        skills?: string[] | undefined;
        rateMin?: number | undefined;
        rateMax?: number | undefined;
    };
}, {
    query: {
        sort?: "createdAt" | "hourlyRate" | "rating" | undefined;
        page?: number | undefined;
        limit?: number | undefined;
        availability?: Availability[] | undefined;
        location?: string | undefined;
        languages?: string[] | undefined;
        q?: string | undefined;
        skills?: string[] | undefined;
        order?: "asc" | "desc" | undefined;
        rateMin?: number | undefined;
        rateMax?: number | undefined;
    };
}>;
export declare const adminUserQuerySchema: z.ZodObject<{
    query: z.ZodObject<{
        q: z.ZodOptional<z.ZodString>;
        role: z.ZodOptional<z.ZodArray<z.ZodNativeEnum<typeof UserRole>, "many">>;
        status: z.ZodOptional<z.ZodEnum<["active", "inactive", "suspended"]>>;
        page: z.ZodDefault<z.ZodNumber>;
        limit: z.ZodDefault<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        page: number;
        limit: number;
        status?: "active" | "inactive" | "suspended" | undefined;
        role?: UserRole[] | undefined;
        q?: string | undefined;
    }, {
        status?: "active" | "inactive" | "suspended" | undefined;
        page?: number | undefined;
        limit?: number | undefined;
        role?: UserRole[] | undefined;
        q?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    query: {
        page: number;
        limit: number;
        status?: "active" | "inactive" | "suspended" | undefined;
        role?: UserRole[] | undefined;
        q?: string | undefined;
    };
}, {
    query: {
        status?: "active" | "inactive" | "suspended" | undefined;
        page?: number | undefined;
        limit?: number | undefined;
        role?: UserRole[] | undefined;
        q?: string | undefined;
    };
}>;
export declare const adminUpdateUserSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
    }, {
        id: string;
    }>;
    body: z.ZodObject<{
        role: z.ZodOptional<z.ZodNativeEnum<typeof UserRole>>;
        emailVerified: z.ZodOptional<z.ZodBoolean>;
        suspended: z.ZodOptional<z.ZodBoolean>;
        suspensionReason: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        role?: UserRole | undefined;
        suspended?: boolean | undefined;
        emailVerified?: boolean | undefined;
        suspensionReason?: string | undefined;
    }, {
        role?: UserRole | undefined;
        suspended?: boolean | undefined;
        emailVerified?: boolean | undefined;
        suspensionReason?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    params: {
        id: string;
    };
    body: {
        role?: UserRole | undefined;
        suspended?: boolean | undefined;
        emailVerified?: boolean | undefined;
        suspensionReason?: string | undefined;
    };
}, {
    params: {
        id: string;
    };
    body: {
        role?: UserRole | undefined;
        suspended?: boolean | undefined;
        emailVerified?: boolean | undefined;
        suspensionReason?: string | undefined;
    };
}>;
export declare const commissionConfigSchema: z.ZodObject<{
    body: z.ZodObject<{
        free: z.ZodNumber;
        pro: z.ZodNumber;
        enterprise: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        free: number;
        pro: number;
        enterprise: number;
    }, {
        free: number;
        pro: number;
        enterprise: number;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        free: number;
        pro: number;
        enterprise: number;
    };
}, {
    body: {
        free: number;
        pro: number;
        enterprise: number;
    };
}>;
export type RegisterInput = z.infer<typeof registerSchema>['body'];
export type LoginInput = z.infer<typeof loginSchema>['body'];
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>['body'];
export type CreateJobInput = z.infer<typeof createJobSchema>['body'];
export type UpdateJobInput = z.infer<typeof updateJobSchema>['body'];
export type JobQueryInput = z.infer<typeof jobQuerySchema>['query'];
export type CreateProposalInput = z.infer<typeof createProposalSchema>['body'];
export type CreateContractInput = z.infer<typeof createContractSchema>['body'];
export type CreateMilestoneInput = z.infer<typeof createMilestoneSchema>['body'];
export type ProfessionalQueryInput = z.infer<typeof professionalQuerySchema>['query'];
//# sourceMappingURL=validators.d.ts.map