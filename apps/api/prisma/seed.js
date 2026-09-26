import { PrismaClient, SkillCategory, JobCategory, UserRole } from '@prisma/client';
import { hashPassword } from '../src/utils/password';
const prisma = new PrismaClient();
async function main() {
    console.log('🌱 Seeding database...');
    // Create skills
    const skills = [
        // Programação
        { name: 'JavaScript', category: SkillCategory.PROGRAMACAO },
        { name: 'TypeScript', category: SkillCategory.PROGRAMACAO },
        { name: 'Python', category: SkillCategory.PROGRAMACAO },
        { name: 'Go', category: SkillCategory.PROGRAMACAO },
        { name: 'Rust', category: SkillCategory.PROGRAMACAO },
        { name: 'Java', category: SkillCategory.PROGRAMACAO },
        { name: 'C#', category: SkillCategory.PROGRAMACAO },
        { name: 'PHP', category: SkillCategory.PROGRAMACAO },
        { name: 'Ruby', category: SkillCategory.PROGRAMACAO },
        { name: 'Swift', category: SkillCategory.PROGRAMACAO },
        { name: 'Kotlin', category: SkillCategory.PROGRAMACAO },
        // Frameworks
        { name: 'React', category: SkillCategory.FRAMEWORKS },
        { name: 'Next.js', category: SkillCategory.FRAMEWORKS },
        { name: 'Vue.js', category: SkillCategory.FRAMEWORKS },
        { name: 'Nuxt.js', category: SkillCategory.FRAMEWORKS },
        { name: 'Angular', category: SkillCategory.FRAMEWORKS },
        { name: 'Svelte', category: SkillCategory.FRAMEWORKS },
        { name: 'Node.js', category: SkillCategory.FRAMEWORKS },
        { name: 'Express', category: SkillCategory.FRAMEWORKS },
        { name: 'Fastify', category: SkillCategory.FRAMEWORKS },
        { name: 'NestJS', category: SkillCategory.FRAMEWORKS },
        { name: 'Django', category: SkillCategory.FRAMEWORKS },
        { name: 'FastAPI', category: SkillCategory.FRAMEWORKS },
        { name: 'Laravel', category: SkillCategory.FRAMEWORKS },
        { name: 'Spring Boot', category: SkillCategory.FRAMEWORKS },
        { name: '.NET Core', category: SkillCategory.FRAMEWORKS },
        // Ferramentas
        { name: 'Docker', category: SkillCategory.FERRAMENTAS },
        { name: 'Kubernetes', category: SkillCategory.FERRAMENTAS },
        { name: 'AWS', category: SkillCategory.FERRAMENTAS },
        { name: 'GCP', category: SkillCategory.FERRAMENTAS },
        { name: 'Azure', category: SkillCategory.FERRAMENTAS },
        { name: 'Terraform', category: SkillCategory.FERRAMENTAS },
        { name: 'Git', category: SkillCategory.FERRAMENTAS },
        { name: 'CI/CD', category: SkillCategory.FERRAMENTAS },
        { name: 'PostgreSQL', category: SkillCategory.FERRAMENTAS },
        { name: 'MongoDB', category: SkillCategory.FERRAMENTAS },
        { name: 'Redis', category: SkillCategory.FERRAMENTAS },
        { name: 'GraphQL', category: SkillCategory.FERRAMENTAS },
        { name: 'REST APIs', category: SkillCategory.FERRAMENTAS },
        { name: 'WebSockets', category: SkillCategory.FERRAMENTAS },
        { name: 'Microservices', category: SkillCategory.FERRAMENTAS },
        // Design
        { name: 'Figma', category: SkillCategory.DESIGN },
        { name: 'Adobe XD', category: SkillCategory.DESIGN },
        { name: 'Sketch', category: SkillCategory.DESIGN },
        { name: 'Photoshop', category: SkillCategory.DESIGN },
        { name: 'Illustrator', category: SkillCategory.DESIGN },
        { name: 'UI Design', category: SkillCategory.DESIGN },
        { name: 'UX Research', category: SkillCategory.DESIGN },
        { name: 'Design Systems', category: SkillCategory.DESIGN },
        { name: 'Prototyping', category: SkillCategory.DESIGN },
        { name: 'Motion Design', category: SkillCategory.DESIGN },
        // Marketing
        { name: 'SEO', category: SkillCategory.MARKETING },
        { name: 'SEM', category: SkillCategory.MARKETING },
        { name: 'Content Marketing', category: SkillCategory.MARKETING },
        { name: 'Social Media', category: SkillCategory.MARKETING },
        { name: 'Email Marketing', category: SkillCategory.MARKETING },
        { name: 'Growth Hacking', category: SkillCategory.MARKETING },
        { name: 'Analytics', category: SkillCategory.MARKETING },
        { name: 'Copywriting', category: SkillCategory.MARKETING },
        // Vendas
        { name: 'B2B Sales', category: SkillCategory.VENDAS },
        { name: 'Inside Sales', category: SkillCategory.VENDAS },
        { name: 'Account Management', category: SkillCategory.VENDAS },
        { name: 'Lead Generation', category: SkillCategory.VENDAS },
        { name: 'CRM', category: SkillCategory.VENDAS },
        // Gestão
        { name: 'Agile/Scrum', category: SkillCategory.GESTAO },
        { name: 'Product Management', category: SkillCategory.GESTAO },
        { name: 'Project Management', category: SkillCategory.GESTAO },
        { name: 'Team Leadership', category: SkillCategory.GESTAO },
        { name: 'Strategic Planning', category: SkillCategory.GESTAO },
        // Idiomas
        { name: 'Inglês', category: SkillCategory.IDIOMAS },
        { name: 'Espanhol', category: SkillCategory.IDIOMAS },
        { name: 'Francês', category: SkillCategory.IDIOMAS },
        { name: 'Alemão', category: SkillCategory.IDIOMAS },
    ];
    for (const skill of skills) {
        await prisma.skill.upsert({
            where: { name: skill.name },
            update: {},
            create: skill,
        });
    }
    console.log(`✅ Created ${skills.length} skills`);
    // Create admin user
    const adminPassword = await hashPassword('admin123');
    const admin = await prisma.user.upsert({
        where: { email: 'admin@jobmarket.com' },
        update: {},
        create: {
            email: 'admin@jobmarket.com',
            passwordHash: adminPassword,
            role: UserRole.ADMIN,
            emailVerified: true,
        },
    });
    await prisma.profile.upsert({
        where: { userId: admin.id },
        update: {},
        create: {
            userId: admin.id,
            fullName: 'Admin JobMarket',
            headline: 'Administrador da plataforma',
            availability: 'UNAVAILABLE',
            languages: ['Português', 'Inglês'],
        },
    });
    console.log('✅ Created admin user');
    // Create test professional
    const profPassword = await hashPassword('prof123');
    const professional = await prisma.user.upsert({
        where: { email: 'prof@jobmarket.com' },
        update: {},
        create: {
            email: 'prof@jobmarket.com',
            passwordHash: profPassword,
            role: UserRole.PROFISSIONAL,
            emailVerified: true,
        },
    });
    const reactSkill = await prisma.skill.findUnique({ where: { name: 'React' } });
    const nextSkill = await prisma.skill.findUnique({ where: { name: 'Next.js' } });
    const tsSkill = await prisma.skill.findUnique({ where: { name: 'TypeScript' } });
    const nodeSkill = await prisma.skill.findUnique({ where: { name: 'Node.js' } });
    const awsSkill = await prisma.skill.findUnique({ where: { name: 'AWS' } });
    await prisma.profile.upsert({
        where: { userId: professional.id },
        update: {},
        create: {
            userId: professional.id,
            fullName: 'João Silva',
            headline: 'Full Stack Developer | React & Node.js Specialist',
            bio: 'Desenvolvedor full stack com 5+ anos de experiência construindo aplicações web escaláveis. Especialista em React, Next.js, TypeScript e Node.js. Apaixonado por clean code, testes e arquitetura de software.',
            hourlyRate: 15000, // R$ 150/hora
            availability: 'FREELANCE',
            location: 'São Paulo, SP',
            languages: ['Português', 'Inglês'],
            github: 'https://github.com/joaosilva',
            linkedin: 'https://linkedin.com/in/joaosilva',
            skills: {
                connect: [
                    reactSkill,
                    nextSkill,
                    tsSkill,
                    nodeSkill,
                    awsSkill,
                ].filter(Boolean).map(s => ({ id: s.id })),
            },
        },
    });
    console.log('✅ Created test professional');
    // Create test employer
    const empPassword = await hashPassword('emp123');
    const employer = await prisma.user.upsert({
        where: { email: 'emp@jobmarket.com' },
        update: {},
        create: {
            email: 'emp@jobmarket.com',
            passwordHash: empPassword,
            role: UserRole.EMPREGADOR,
            emailVerified: true,
        },
    });
    await prisma.profile.upsert({
        where: { userId: employer.id },
        update: {},
        create: {
            userId: employer.id,
            fullName: 'TechCorp LTDA',
            headline: 'Empresa de tecnologia em crescimento',
            bio: 'Somos uma startup brasileira focada em soluções SaaS para o mercado corporativo. Buscamos talentos para expandir nossa equipe de engenharia.',
            availability: 'UNAVAILABLE',
            location: 'São Paulo, SP',
            languages: ['Português', 'Inglês'],
            website: 'https://techcorp.com.br',
        },
    });
    console.log('✅ Created test employer');
    // Create sample jobs
    const designCategory = await prisma.skill.findUnique({ where: { name: 'Figma' } });
    const uiSkill = await prisma.skill.findUnique({ where: { name: 'UI Design' } });
    const uxSkill = await prisma.skill.findUnique({ where: { name: 'UX Research' } });
    const jobs = [
        {
            employerId: employer.id,
            title: 'Senior Full Stack Developer (React/Node)',
            description: `Estamos buscando um **Senior Full Stack Developer** para se juntar à nossa equipe de engenharia.

## Responsabilidades
- Desenvolver e manter aplicações web usando React, Next.js e Node.js
- Arquitetar soluções escaláveis e performáticas
- Mentorar desenvolvedores júniores
- Participar de code reviews e decisões técnicas
- Colaborar com Product e Design

## Requisitos
- 5+ anos de experiência com React e Node.js
- TypeScript avançado
- Experiência com AWS ou GCP
- Testes automatizados (Jest, Cypress)
- CI/CD e Docker

## Diferenciais
- Experiência com GraphQL
- Conhecimento em Rust ou Go
- Contribuições open source`,
            type: 'FULL_TIME',
            category: JobCategory.DESENVOLVIMENTO,
            budgetMin: 1500000, // R$ 15.000
            budgetMax: 2500000, // R$ 25.000
            currency: 'BRL',
            location: 'São Paulo, SP',
            remote: true,
            status: 'OPEN',
            skillIds: [
                reactSkill.id,
                nextSkill.id,
                tsSkill.id,
                nodeSkill.id,
                awsSkill.id,
            ].filter(Boolean),
        },
        {
            employerId: employer.id,
            title: 'UI/UX Designer - Produto SaaS',
            description: `Procuramos um **UI/UX Designer** para trabalhar no nosso produto principal.

## Responsabilidades
- Design de interfaces para dashboard e ferramentas internas
- Pesquisa com usuários e testes de usabilidade
- Criação e manutenção de Design System
- Colaboração próxima com Product e Engineering
- Prototipagem de novas features

## Requisitos
- 3+ anos em UI/UX para produtos SaaS
- Figma avançado (auto-layout, components, variants)
- Design Systems e acessibilidade
- Portfolio com cases de produtos complexos
- Inglês técnico`,
            type: 'FREELANCE',
            category: JobCategory.DESIGN,
            budgetMin: 800000, // R$ 8.000
            budgetMax: 1200000, // R$ 12.000
            currency: 'BRL',
            location: 'Remoto',
            remote: true,
            status: 'OPEN',
            skillIds: [
                designCategory.id,
                uiSkill.id,
                uxSkill.id,
            ].filter(Boolean),
        },
        {
            employerId: employer.id,
            title: 'DevOps Engineer - Kubernetes & AWS',
            description: `Vaga para **DevOps Engineer** para gerenciar nossa infraestrutura em AWS.

## Responsabilidades
- Gerenciar clusters EKS
- Implementar e manter CI/CD pipelines
- Monitoramento e observabilidade (Prometheus, Grafana, Datadog)
- Infraestrutura como código (Terraform)
- Segurança e compliance`,
            type: 'CONTRACT',
            category: JobCategory.OPERACOES,
            budgetMin: 1200000,
            budgetMax: 1800000,
            currency: 'BRL',
            location: 'Remoto',
            remote: true,
            status: 'OPEN',
            skillIds: [
                (await prisma.skill.findUnique({ where: { name: 'Kubernetes' } })).id,
                (await prisma.skill.findUnique({ where: { name: 'AWS' } })).id,
                (await prisma.skill.findUnique({ where: { name: 'Terraform' } })).id,
                (await prisma.skill.findUnique({ where: { name: 'Docker' } })).id,
            ].filter(Boolean),
        },
    ];
    for (const jobData of jobs) {
        const { skillIds, ...job } = jobData;
        await prisma.job.create({
            data: {
                ...job,
                skills: { connect: skillIds.map(id => ({ id })) },
            },
        });
    }
    console.log(`✅ Created ${jobs.length} sample jobs`);
    console.log('🎉 Seeding completed!');
}
main()
    .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
