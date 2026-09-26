import { motion } from 'framer-motion';
import { ScrollReveal, StaggerContainer } from '@/components/animations/ScrollReveal';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/utils/cn';
import {
  User,
  Briefcase,
  FileText,
  CheckCircle,
  DollarSign,
  Shield,
  MessageSquare,
  Sparkles,
  ArrowRight,
  ChevronRight,
  Clock,
  TrendingUp,
  Zap,
  Globe,
  Users,
  Building2,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const stepsForProfessionals = [
  {
    number: '01',
    title: 'Crie seu perfil completo',
    description: 'Adicione suas skills, portfólio, taxa horária, disponibilidade e idiomas. Leva menos de 5 minutos.',
    icon: User,
    details: [
      'Skills técnicas e soft skills',
      'Portfolio com imagens e links',
      'Taxa horária ou por projeto',
      'Disponibilidade e preferências',
      'Idiomas e localização',
    ],
  },
  {
    number: '02',
    title: 'Descubra oportunidades ideais',
    description: 'Nosso algoritmo sugere vagas baseadas no seu perfil. Filtre por tipo, categoria, remoto e faixa salarial.',
    icon: Briefcase,
    details: [
      'Match inteligente por skills',
      'Filtros avançados (remoto, CLT, PJ, freelance)',
      'Alertas de novas vagas',
      'Visualizações do seu perfil',
    ],
  },
  {
    number: '03',
    title: 'Envie propostas personalizadas',
    description: 'Apresente-se com uma carta de apresentação, sua taxa proposta e prazo estimado. Destaque-se da concorrência.',
    icon: FileText,
    details: [
      'Carta de apresentação personalizada',
      'Taxa e prazo flexíveis',
      'Acompanhamento de status',
      'Histórico de propostas',
    ],
  },
  {
    number: '04',
    title: 'Feche o deal com segurança',
    description: 'Contrato digital, marcos de pagamento e split automático via Stripe. Você recebe, nós cuidamos da comissão.',
    icon: CheckCircle,
    details: [
      'Contratos digitais assinados',
      'Pagamento por marcos (milestones)',
      'Stripe Connect - split automático',
      'Saques rápidos para sua conta',
    ],
  },
];

const stepsForEmployers = [
  {
    number: '01',
    title: 'Cadastre sua empresa',
    description: 'Crie o perfil da sua empresa, adicione equipe e configure métodos de pagamento. Pronto em minutos.',
    icon: Building2,
    details: [
      'Perfil da empresa com logo e bio',
      'Convite para membros da equipe',
      'Stripe Connect para pagamentos',
      'Configuração de comissões',
    ],
  },
  {
    number: '02',
    title: 'Publique vagas atrativas',
    description: 'Descreva a vaga, defina skills requeridas, tipo de contrato, faixa salarial e modalidade (remoto/presencial).',
    icon: Briefcase,
    details: [
      'Editor rico para descrição',
      'Skills obrigatórias e desejáveis',
      'CLT, PJ, Freelance ou Meio período',
      'Faixa salarial e benefícios',
    ],
  },
  {
    number: '03',
    title: 'Receba propostas qualificadas',
    description: 'Profissionais interessados enviam propostas com taxa, prazo e carta. Filtre, compare e convide para entrevista.',
    icon: FileText,
    details: [
      'Dashboard de candidaturas',
      'Filtros por taxa, experiência, skills',
      'Chat integrado para alinhamento',
      'Convite para entrevista 1-clique',
    ],
  },
  {
    number: '04',
    title: 'Contrate e gerencie com tranquilidade',
    description: 'Aceite a proposta, defina marcos e pague via Stripe. Acompanhe entregas, aprove marcos e gerencie contratos ativos.',
    icon: CheckCircle,
    details: [
      'Contrato digital com termos claros',
      'Gestão de marcos e entregas',
      'Pagamento seguro com split automático',
      'Relatórios e faturas centralizados',
    ],
  },
];

const benefits = [
  {
    icon: Shield,
    title: 'Pagamento Seguro',
    description: 'Stripe Connect com proteção contra fraude. Split payment automático - você recebe sua parte instantaneamente.',
  },
  {
    icon: Zap,
    title: 'Match Inteligente',
    description: 'Algoritmo que aprende com suas preferências e sugere as melhores oportunidades ou candidatos.',
  },
  {
    icon: Globe,
    title: 'Global & Remoto',
    description: 'Trabalhe com talentos de qualquer lugar. Suporte a múltiplas moedas, fusos horários e idiomas.',
  },
  {
    icon: TrendingUp,
    title: 'Cresça Juntos',
    description: 'Planos de assinatura com comissão decrescente. Quanto mais você fatura, menos a plataforma cobra.',
  },
];

export function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V0h4V0h-4z%22 fill=%22%2322d3ee%22 fill-opacity=%220.03%22/%3E%3C/g%3E%3C/svg%22)]" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-sm font-medium mb-6"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
              </span>
              Como funciona o JobMarket
            </motion.span>
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="font-display font-bold text-5xl sm:text-6xl lg:text-7xl leading-[1.1] text-white mb-6"
            >
              Conectamos talentos a oportunidades.<br />
              <span className="text-gradient">Simples, seguro e transparente.</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto mb-10"
            >
              Seja você um profissional buscando projetos ou uma empresa contratando, 
              o JobMarket cuida de todo o processo: do match ao pagamento.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Button size="lg" asChild>
                <Link to="/cadastro?role=professional">
                  <Sparkles className="h-5 w-5 mr-2" />
                  Começar como Profissional
                </Link>
              </Button>
              <Button size="lg" variant="ghost" className="border-white/30 hover:bg-white/10 text-white" asChild>
                <Link to="/cadastro?role=employer">
                  Contratar Talentos
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Professional Journey */}
      <section className="section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="font-display font-bold text-4xl sm:text-5xl text-slate-950 dark:text-white mb-4">
                Para <span className="text-gradient">Profissionais</span>
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-300">
                Do cadastro ao primeiro pagamento em 4 passos simples
              </p>
            </div>
          </ScrollReveal>

          <StaggerContainer stagger={0.15} className="grid lg:grid-cols-4 gap-6">
            {stepsForProfessionals.map((step, i) => (
              <ScrollReveal key={step.number} delay={i * 0.1}>
                <Card className="relative h-full group">
                  <div className="absolute -top-4 left-6">
                    <span className="font-display font-bold text-5xl text-cyan-700/10">{step.number}</span>
                  </div>
                  <div className="pt-10">
                    <div className="h-14 w-14 rounded-xl bg-cyan-500/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                      <step.icon className="h-7 w-7 text-cyan-600 dark:text-cyan-400" />
                    </div>
                    <h3 className="font-display font-bold text-xl text-slate-950 dark:text-white mb-3">
                      {step.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 mb-5 leading-relaxed">
                      {step.description}
                    </p>
                    <ul className="space-y-2">
                      {step.details.map((detail, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                          <CheckCircle className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card>
              </ScrollReveal>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Employer Journey */}
      <section className="section bg-slate-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="font-display font-bold text-4xl sm:text-5xl text-slate-950 dark:text-white mb-4">
                Para <span className="text-gradient">Empresas</span>
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-300">
                Da vaga ao profissional contratado em 4 passos
              </p>
            </div>
          </ScrollReveal>

          <StaggerContainer stagger={0.15} className="grid lg:grid-cols-4 gap-6">
            {stepsForEmployers.map((step, i) => (
              <ScrollReveal key={step.number} delay={i * 0.1}>
                <Card className="relative h-full group">
                  <div className="absolute -top-4 left-6">
                    <span className="font-display font-bold text-5xl text-cyan-700/10">{step.number}</span>
                  </div>
                  <div className="pt-10">
                    <div className="h-14 w-14 rounded-xl bg-cyan-500/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                      <step.icon className="h-7 w-7 text-cyan-600 dark:text-cyan-400" />
                    </div>
                    <h3 className="font-display font-bold text-xl text-slate-950 dark:text-white mb-3">
                      {step.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 mb-5 leading-relaxed">
                      {step.description}
                    </p>
                    <ul className="space-y-2">
                      {step.details.map((detail, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                          <CheckCircle className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card>
              </ScrollReveal>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Benefits */}
      <section className="section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="font-display font-bold text-4xl sm:text-5xl text-slate-950 dark:text-white mb-4">
                Por que escolher o <span className="text-gradient">JobMarket?</span>
              </h2>
            </div>
          </ScrollReveal>

          <StaggerContainer stagger={0.1} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, i) => (
              <ScrollReveal key={benefit.title} delay={i * 0.1}>
                <Card className="h-full hover:border-cyan-500/30 transition-colors">
                  <div className="h-12 w-12 rounded-xl bg-cyan-500/10 flex items-center justify-center mb-5">
                    <benefit.icon className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />
                  </div>
                  <h3 className="font-display font-bold text-xl text-slate-950 dark:text-white mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    {benefit.description}
                  </p>
                </Card>
              </ScrollReveal>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Pricing Teaser */}
      <section className="section bg-slate-950 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="font-display font-bold text-4xl sm:text-5xl text-white mb-4">
                Planos flexíveis para <span className="text-gradient">cada fase</span>
              </h2>
              <p className="text-lg text-slate-300">
                Comece grátis. Upgrade quando precisar. Cancele a qualquer momento.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                name: 'Free',
                price: 0,
                commission: '12%',
                features: ['5 propostas/mês', '1 contrato ativo', 'Perfil básico', 'Suporte comunitário'],
                cta: 'Começar grátis',
                popular: false,
              },
              {
                name: 'Pro',
                price: 49,
                commission: '8%',
                features: ['Propostas ilimitadas', 'Contratos ilimitados', 'Destaque nas buscas', 'Analytics avançado', 'Suporte prioritário'],
                cta: 'Assinar Pro',
                popular: true,
              },
              {
                name: 'Enterprise',
                price: 199,
                commission: '5%',
                features: ['Tudo do Pro', 'Equipe ilimitada', 'API access', 'SLA garantido', 'Gerente dedicado', 'Onboarding personalizado'],
                cta: 'Falar com vendas',
                popular: false,
              },
            ].map((plan, i) => (
              <ScrollReveal key={plan.name} delay={i * 0.1}>
                <Card className={cn(
                  'relative h-full flex flex-col',
                  plan.popular && 'border-cyan-500/50 shadow-xl shadow-cyan-500/10'
                )}>
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge variant="primary">Mais popular</Badge>
                    </div>
                  )}
                  <div className="text-center mb-6">
                    <h3 className="font-display font-bold text-xl text-slate-950 dark:text-white mb-2">{plan.name}</h3>
                    <div className="flex items-baseline justify-center gap-1 mb-2">
                      <span className="font-display font-bold text-4xl text-white">R$ {plan.price}</span>
                      <span className="text-slate-400">/mês</span>
                    </div>
                    <p className="text-cyan-700 font-medium">Comissão: {plan.commission} por deal</p>
                  </div>
                  <ul className="space-y-3 mb-8 flex-1">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                        <CheckCircle className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className="w-full" 
                    variant={plan.popular ? 'primary' : 'outline'}
                    asChild
                  >
                    <Link to={`/cadastro?role=professional&plan=${plan.name.toLowerCase()}`}>
                      {plan.cta}
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="font-display font-bold text-4xl sm:text-5xl text-slate-950 dark:text-white mb-4">
                Perguntas <span className="text-gradient">frequentes</span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="space-y-4">
            {[
              {
                q: 'Como funciona a comissão da plataforma?',
                a: 'A comissão é descontada automaticamente de cada pagamento via Stripe Connect. No plano Free é 12%, Pro 8% e Enterprise 5%. Não há taxas escondidas.'
              },
              {
                q: 'Posso cancelar minha assinatura a qualquer momento?',
                a: 'Sim, você pode cancelar a qualquer momento. O acesso aos benefícios Pro/Enterprise continua até o fim do período pago. Contratos ativos não são afetados.'
              },
              {
                q: 'Como recebo meus pagamentos?',
                a: 'Via Stripe Connect. Configure sua conta bancária uma vez e receba automaticamente a cada pagamento aprovado. Saques levam 1-2 dias úteis.'
              },
              {
                q: 'E se houver disputa entre profissional e empresa?',
                a: 'Temos um processo de mediação. Para contratos com marcos, o pagamento só é liberado após aprovação. Em casos de disputa, nossa equipe analisa as evidências.'
              },
              {
                q: 'Meus dados estão seguros?',
                a: 'Sim. Usamos criptografia TLS 1.3, banco de dados PostgreSQL com criptografia em repouso, e seguimos LGPD. Senhas são hasheadas com bcrypt (12 rounds).'
              },
            ].map((faq, i) => (
              <ScrollReveal key={i} delay={i * 0.05}>
                <details className="group card">
                  <summary className="flex items-center justify-between p-5 cursor-pointer list-none">
                    <span className="font-medium text-slate-950 dark:text-white">{faq.q}</span>
                    <ChevronRight className="h-5 w-5 text-slate-400 group-open:rotate-90 transition-transform" />
                  </summary>
                  <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 animate-slide-down">
                    {faq.a}
                  </div>
                </details>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="section bg-slate-950 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <Card className="relative overflow-hidden bg-gradient-to-br from-slate-900 to-slate-950 border-cyan-500/20 p-12 md:p-16 text-center">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V0h4V0h-4z%22 fill=%22%2222d3ee%22%22 fill-opacity=%220.05%22/%3E%3C/g%3E%3C/svg%22)]" />
              
              <div className="relative max-w-3xl mx-auto">
                <h2 className="font-display font-bold text-4xl sm:text-5xl text-white mb-6">
                  Pronto para <span className="text-gradient">começar?</span>
                </h2>
                <p className="text-lg text-slate-300 mb-8 max-w-xl mx-auto">
                  Junte-se a milhares de profissionais e empresas que já fecharam deals no JobMarket.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button size="lg" className="w-full sm:w-auto" asChild>
                    <Link to="/cadastro?role=professional">
                      <Sparkles className="h-5 w-5 mr-2" />
                      Criar conta gratuita
                    </Link>
                  </Button>
                  <Button size="lg" variant="ghost" className="w-full sm:w-auto border-slate-700 hover:bg-slate-800 text-white" asChild>
                    <Link to="/vagas">
                      Ver oportunidades
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}