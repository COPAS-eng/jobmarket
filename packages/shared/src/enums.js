export var UserRole;
(function (UserRole) {
    UserRole["PROFISSIONAL"] = "PROFISSIONAL";
    UserRole["EMPREGADOR"] = "EMPREGADOR";
    UserRole["ADMIN"] = "ADMIN";
})(UserRole || (UserRole = {}));
export var JobType;
(function (JobType) {
    JobType["FREELANCE"] = "FREELANCE";
    JobType["FULL_TIME"] = "FULL_TIME";
    JobType["PART_TIME"] = "PART_TIME";
    JobType["CONTRACT"] = "CONTRACT";
})(JobType || (JobType = {}));
export var JobCategory;
(function (JobCategory) {
    JobCategory["DESENVOLVIMENTO"] = "DESENVOLVIMENTO";
    JobCategory["DESIGN"] = "DESIGN";
    JobCategory["MARKETING"] = "MARKETING";
    JobCategory["VENDAS"] = "VENDAS";
    JobCategory["ADMINISTRATIVO"] = "ADMINISTRATIVO";
    JobCategory["FINANCEIRO"] = "FINANCEIRO";
    JobCategory["RECURSOS_HUMANOS"] = "RECURSOS_HUMANOS";
    JobCategory["OPERACOES"] = "OPERACOES";
    JobCategory["PRODUTO"] = "PRODUTO";
    JobCategory["DADOS"] = "DADOS";
    JobCategory["OUTROS"] = "OUTROS";
})(JobCategory || (JobCategory = {}));
export var SkillCategory;
(function (SkillCategory) {
    SkillCategory["PROGRAMACAO"] = "PROGRAMACAO";
    SkillCategory["FRAMEWORKS"] = "FRAMEWORKS";
    SkillCategory["FERRAMENTAS"] = "FERRAMENTAS";
    SkillCategory["DESIGN"] = "DESIGN";
    SkillCategory["MARKETING"] = "MARKETING";
    SkillCategory["VENDAS"] = "VENDAS";
    SkillCategory["GESTAO"] = "GESTAO";
    SkillCategory["IDIOMAS"] = "IDIOMAS";
    SkillCategory["OUTROS"] = "OUTROS";
})(SkillCategory || (SkillCategory = {}));
export var JobStatus;
(function (JobStatus) {
    JobStatus["DRAFT"] = "DRAFT";
    JobStatus["OPEN"] = "OPEN";
    JobStatus["PAUSED"] = "PAUSED";
    JobStatus["FILLED"] = "FILLED";
    JobStatus["CLOSED"] = "CLOSED";
    JobStatus["EXPIRED"] = "EXPIRED";
})(JobStatus || (JobStatus = {}));
export var ProposalStatus;
(function (ProposalStatus) {
    ProposalStatus["PENDING"] = "PENDING";
    ProposalStatus["ACCEPTED"] = "ACCEPTED";
    ProposalStatus["REJECTED"] = "REJECTED";
    ProposalStatus["WITHDRAWN"] = "WITHDRAWN";
})(ProposalStatus || (ProposalStatus = {}));
export var ContractType;
(function (ContractType) {
    ContractType["FIXED"] = "FIXED";
    ContractType["HOURLY"] = "HOURLY";
    ContractType["MILESTONE"] = "MILESTONE";
})(ContractType || (ContractType = {}));
export var ContractStatus;
(function (ContractStatus) {
    ContractStatus["ACTIVE"] = "ACTIVE";
    ContractStatus["COMPLETED"] = "COMPLETED";
    ContractStatus["CANCELLED"] = "CANCELLED";
    ContractStatus["DISPUTED"] = "DISPUTED";
})(ContractStatus || (ContractStatus = {}));
export var MilestoneStatus;
(function (MilestoneStatus) {
    MilestoneStatus["PENDING"] = "PENDING";
    MilestoneStatus["IN_PROGRESS"] = "IN_PROGRESS";
    MilestoneStatus["SUBMITTED"] = "SUBMITTED";
    MilestoneStatus["APPROVED"] = "APPROVED";
    MilestoneStatus["REJECTED"] = "REJECTED";
    MilestoneStatus["PAID"] = "PAID";
})(MilestoneStatus || (MilestoneStatus = {}));
export var PaymentStatus;
(function (PaymentStatus) {
    PaymentStatus["PENDING"] = "PENDING";
    PaymentStatus["PROCESSING"] = "PROCESSING";
    PaymentStatus["SUCCEEDED"] = "SUCCEEDED";
    PaymentStatus["FAILED"] = "FAILED";
    PaymentStatus["REFUNDED"] = "REFUNDED";
    PaymentStatus["DISPUTED"] = "DISPUTED";
})(PaymentStatus || (PaymentStatus = {}));
export var SubscriptionPlan;
(function (SubscriptionPlan) {
    SubscriptionPlan["FREE"] = "FREE";
    SubscriptionPlan["PRO"] = "PRO";
    SubscriptionPlan["ENTERPRISE"] = "ENTERPRISE";
})(SubscriptionPlan || (SubscriptionPlan = {}));
export var SubscriptionStatus;
(function (SubscriptionStatus) {
    SubscriptionStatus["ACTIVE"] = "ACTIVE";
    SubscriptionStatus["CANCELLED"] = "CANCELLED";
    SubscriptionStatus["PAST_DUE"] = "PAST_DUE";
    SubscriptionStatus["TRIALING"] = "TRIALING";
    SubscriptionStatus["INCOMPLETE"] = "INCOMPLETE";
})(SubscriptionStatus || (SubscriptionStatus = {}));
export var Availability;
(function (Availability) {
    Availability["FULL_TIME"] = "FULL_TIME";
    Availability["PART_TIME"] = "PART_TIME";
    Availability["FREELANCE"] = "FREELANCE";
    Availability["UNAVAILABLE"] = "UNAVAILABLE";
})(Availability || (Availability = {}));
