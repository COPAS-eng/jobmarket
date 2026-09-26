import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { cn } from '@/utils/cn';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { AnimatedCounter } from '@/components/animations/AnimatedCounter';
import { Button } from '@/components/ui/Button';
import {
  ArrowRight,
  Users,
  Briefcase,
  DollarSign,
  Shield,
  Zap,
  Globe,
  Code,
  Palette,
  Megaphone,
  TrendingUp,
  CheckCircle,
  User,
  FileText,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 1247, label: 'Profissionais ativos', icon: Users },
  { value: 342, label: 'Vagas abertas', icon: Briefcase },
  { value: 89, label: 'Deals fechados este mês', icon: DollarSign },
  { value: 98, label: 'Taxa de satisfação', suffix: '%', icon: Shield },
];

const features = [
  {
    icon: Zap,
    title: 'Match Inteligente',
    description: 'Algoritmo que conecta profissionais às vagas ideais baseado em skills, taxa e disponibilidade.',
  },
  {
    icon: Globe,
    title: 'Remoto ou Presencial',
    description: 'Filtre por localização, fuso horário ou trabalho 100% remoto. Flexibilidade total.',
  },
  {
    icon: Shield,
    title: 'Pagamento Seguro',
    description: 'Stripe Connect com split payment automático. Você recebe, nós cuidamos da comissão.',
  },
  {
    icon: TrendingUp,
    title: 'Cresça Juntos',
    description: 'Assinaturas com comissão decrescente. Quanto mais você fatura, menos a plataforma cobra.',
  },
];

const categories = [
  { icon: Code, label: 'Desenvolvimento', count: 156 },
  { icon: Palette, label: 'Design & UX', count: 89 },
  { icon: Megaphone, label: 'Marketing', count: 67 },
  { icon: Briefcase, label: 'Vendas', count: 45 },
  { icon: Users, label: 'Admin & RH', count: 34 },
  { icon: DollarSign, label: 'Financeiro', count: 28 },
];

export function LandingPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Parallax background
      gsap.to('.parallax-bg', {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });

      // Floating particles
      gsap.to('.floating-particle', {
        yPercent: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });

      // Skills floating
      gsap.to('.floating-skill', {
        yPercent: -30,
        rotation: 15,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Hero Section with Parallax */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">
        {/* Parallax Background Layer */}
        <div className="absolute inset-0 -z-20">
          <div className="parallax-bg absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950" />
          
          {/* Animated gradient orbs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
          
          {/* Grid pattern */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V0h4V0h-4z%22 fill=%22%2322d3ee%22 fill-opacity=%220.03%22/%3E%3C/g%3E%3C/svg%3E')] opacity-50" />
        </div>

        {/* Floating Particles Layer */}
        <div ref={particlesRef} className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="floating-particle absolute rounded-full bg-cyan-500/20"
              style={{
                width: `${Math.random() * 8 + 4}px`,
                height: `${Math.random() * 8 + 4}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${Math.random() * 10 + 10}s`,
              }}
              animate={{
                x: [0, Math.random() * 100 - 50, 0],
                y: [0, Math.random() * 100 - 50, 0],
              }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            />
          ))}
        </div>

        {/* Floating Skills Layer */}
        <div className="absolute inset-0 -z-10 pointer-events-none">
          {['React', 'Node.js', 'Python', 'TypeScript', 'AWS', 'React Native', 'Go', 'Rust', 'Figma', 'UI/UX'].map((skill, i) => (
            <motion.div
              key={skill}
              className="floating-skill absolute px-3 py-1 rounded-full text-xs font-medium bg-white/10 dark:bg-slate-900/50 border border-white/10 dark:border-slate-800/50 backdrop-blur-sm text-cyan-400 dark:text-cyan-300"
              style={{
                left: `${10 + (i % 5) * 18}%`,
                top: `${15 + Math.floor(i / 5) * 35}%`,
                animationDelay: `${i * 0.5}s`,
              }}
              animate={{
                y: [0, -20, 0],
                rotate: [0, 5, -5, 0],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            >
              {skill}
            </motion.div>
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left: Copy */}
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-sm font-medium mb-6">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-500 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
                    </span>
                    Novo: Assinaturas Pro com 8% de comissão
                  </span>
                  
                  <h1 className="font-display font-bold text-5xl sm:text-6xl lg:text-7xl leading-[1.1] text-slate-950 dark:text-white mb-6">
                    Encontre o talento certo.<br />
                    <span className="text-gradient">Feche o deal.</span>
                  </h1>
                  
                  <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-xl mb-8 leading-relaxed">
                    Marketplace híbrido para freelancers e vagas CLT/PJ. 
                    Você paga só quando fecha — nós ganhamos junto.
                  </p>
                  
                  <div className="flex flex-wrap items-center gap-4">
                    <Button size="lg" asChild>
                      <Link to="/cadastro?role=professional">
                        <ArrowRight className="h-5 w-5 mr-2" />
                        Começar como Profissional
                      </Link>
                    </Button>
                    <Button size="lg" variant="secondary" asChild>
                      <Link to="/cadastro?role=employer">
                        Contratar Talentos
                      </Link>
                    </Button>
                  </div>
                  
                  {/* Trust indicators */}
                  <div className="mt-10 flex flex-wrap items-center gap-6 text-sm text-slate-500 dark:text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle className="h-4 w-4 text-emerald-500" />
                      <span>Sem taxa de inscrição</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle className="h-4 w-4 text-emerald-500" />
                      <span>Cancelamento a qualquer momento</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle className="h-4 w-4 text-emerald-500" />
                      <span>Suporte prioritário Pro</span>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Right: Visual / Stats */}
              <div className="relative">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="relative"
                >
                  {/* Stats Cards */}
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    {stats.map((stat, i) => (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                        className="card p-5"
                      >
                        <div className="flex items-center gap-3">
                          <div className="h-12 w-12 rounded-xl bg-cyan-500/10 flex items-center justify-center">
                            <stat.icon className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />
                          </div>
                          <div>
                            <div className="flex items-baseline gap-1">
                              <AnimatedCounter from={0} to={stat.value} duration={1.5} className="font-display font-bold text-2xl sm:text-3xl text-slate-950 dark:text-white" />
                              {stat.suffix && <span className="font-display font-bold text-2xl sm:text-3xl text-slate-950 dark:text-white">{stat.suffix}</span>}
                            </div>
                            <p className="text-sm text-slate-500 dark:text-slate-400">{stat.label}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Dashboard Preview */}
                  <div className="card overflow-hidden">
                    <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-200 dark:border-slate-800">
                      <div className="flex gap-1.5">
                        <div className="h-3 w-3 rounded-full bg-red-500" />
                        <div className="h-3 w-3 rounded-full bg-amber-500" />
                        <div className="h-3 w-3 rounded-full bg-emerald-500" />
                      </div>
                      <div className="flex-1 text-center text-xs text-slate-500 dark:text-slate-400 font-mono">
                        dashboard.jobmarket.com
                      </div>
                    </div>
                    <div className="p-4 space-y-3">
                      <div className="grid grid-cols-3 gap-3">
                        {['Vagas Abertas', 'Propostas', 'Contratos'].map((label, i) => (
                          <div key={label} className="text-center p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                            <div className="font-display font-bold text-2xl text-slate-950 dark:text-white">
                              {['12', '5', '3'][i]}
                            </div>
                            <div className="text-xs text-slate-500 dark:text-slate-400">{label}</div>
                          </div>
                        ))}
                      </div>
                      <div className="h-32 bg-gradient-to-r from-cyan-500/10 to-violet-500/10 rounded-xl flex items-end justify-around p-4">
                        {[40, 65, 45, 80, 55, 70, 90, 60].map((height, i) => (
                          <div
                            key={i}
                            className="w-6 rounded-t bg-gradient-to-t from-cyan-500 to-cyan-400"
                            style={{ height: `${height}%` }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-400"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-xs uppercase tracking-wider">Role para explorar</span>
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </section>

      {/* Stats Bar */}
      <section className="bg-slate-950 dark:bg-slate-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Users, value: '2.500+', label: 'Profissionais verificados' },
              { icon: Briefcase, value: '1.200+', label: 'Empresas contratando' },
              { icon: DollarSign, value: 'R$ 4.2M+', label: 'Volume transacionado' },
              { icon: Shield, value: '99.2%', label: 'Taxa de sucesso' },
            ].map((stat, i) => (
              <ScrollReveal key={stat.label} delay={i * 0.1}>
                <div className="text-center">
                  <div className="h-12 w-12 rounded-xl bg-cyan-500/10 flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="h-6 w-6 text-cyan-700" />
                  </div>
                  <div className="font-display font-bold text-3xl sm:text-4xl text-white mb-1">{stat.value}</div>
                  <div className="text-slate-400">{stat.label}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="font-display font-bold text-4xl sm:text-5xl text-slate-950 dark:text-white mb-4">
                Tudo que você precisa para <span className="text-gradient">contratar e ser contratado</span>
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-300">
                Ferramentas poderosas para profissionais e empresas fecharem deals com segurança e velocidade.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <ScrollReveal key={feature.title} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -4, boxShadow: '0 20px 40px -10px rgba(34, 211, 238, 0.15)' }}
                  className="card-hover p-6 h-full"
                >
                  <div className="h-12 w-12 rounded-xl bg-cyan-500/10 flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />
                  </div>
                  <h3 className="font-display font-bold text-xl text-slate-950 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="section bg-slate-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="font-display font-bold text-4xl sm:text-5xl text-slate-950 dark:text-white mb-4">
                Categorias em <span className="text-gradient">alta demanda</span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((cat, i) => (
              <ScrollReveal key={cat.label} delay={i * 0.05}>
                <Link
                  to={`/vagas?category=${cat.label.toUpperCase().replace(' & ', '_').replace(' ', '_')}`}
                  className="card-hover p-5 flex items-center gap-4 group"
                >
                  <div className="h-12 w-12 rounded-xl bg-cyan-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <cat.icon className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-slate-950 dark:text-white">{cat.label}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{cat.count} vagas abertas</p>
                  </div>
                  <span className="ml-auto text-cyan-700 opacity-0 group-hover:opacity-100 transition-opacity">
                    →
                  </span>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="font-display font-bold text-4xl sm:text-5xl text-slate-950 dark:text-white mb-4">
                Como funciona em <span className="text-gradient">3 passos</span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Crie seu perfil',
                description: 'Cadastre suas skills, portfólio, taxa horária e disponibilidade. Leva menos de 5 minutos.',
                icon: User,
              },
              {
                step: '02',
                title: 'Envie propostas / Poste vagas',
                description: 'Profissionais aplicam às vagas. Empregadores recebem propostas qualificadas instantaneamente.',
                icon: FileText,
              },
              {
                step: '03',
                title: 'Feche o deal',
                description: 'Aceite a proposta, defina marcos e pague via Stripe. Comissão automática, saque rápido.',
                icon: CheckCircle,
              },
            ].map((step, i) => (
              <ScrollReveal key={step.step} delay={i * 0.1}>
                <div className="relative card p-8 text-center">
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                    <span className="font-display font-bold text-4xl text-cyan-700/20">{step.step}</span>
                  </div>
                  <div className="h-14 w-14 rounded-xl bg-cyan-500/10 flex items-center justify-center mx-auto mb-6">
                    <step.icon className="h-7 w-7 text-cyan-600 dark:text-cyan-400" />
                  </div>
                  <h3 className="font-display font-bold text-xl text-slate-950 dark:text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-slate-950 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="card relative overflow-hidden bg-gradient-to-br from-slate-900 to-slate-950 border-cyan-500/20 p-12 md:p-16 text-center">
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
                      <ArrowRight className="h-5 w-5 mr-2" />
                      Criar conta gratuita
                    </Link>
                  </Button>
                  <Button size="lg" variant="ghost" className="w-full sm:w-auto border-slate-700 hover:bg-slate-800 text-white" asChild>
                    <Link to="/vagas">
                      Ver vagas abertas
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 dark:bg-slate-900 border-t border-slate-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <Link to="/" className="font-display font-bold text-xl text-white mb-4 block">
                JobMarket
              </Link>
              <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
                Marketplace híbrido conectando talentos a oportunidades. Feche deals com segurança.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-white mb-4">Para Profissionais</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link to="/cadastro?role=professional" className="hover:text-cyan-600 transition-colors">Criar perfil</Link></li>
                <li><Link to="/vagas" className="hover:text-cyan-600 transition-colors">Buscar vagas</Link></li>
                <li><Link to="/profissionais" className="hover:text-cyan-600 transition-colors">Ver comunidade</Link></li>
                <li><Link to="/como-funciona" className="hover:text-cyan-600 transition-colors">Como funciona</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-white mb-4">Para Empresas</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link to="/cadastro?role=employer" className="hover:text-cyan-600 transition-colors">Postar vaga</Link></li>
                <li><Link to="/profissionais" className="hover:text-cyan-600 transition-colors">Buscar talentos</Link></li>
                <li><Link to="/como-funciona" className="hover:text-cyan-600 transition-colors">Como contratar</Link></li>
                <li><Link to="/precos" className="hover:text-cyan-600 transition-colors">Planos e preços</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-white mb-4">Empresa</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link to="/sobre" className="hover:text-cyan-600 transition-colors">Sobre nós</Link></li>
                <li><Link to="/blog" className="hover:text-cyan-600 transition-colors">Blog</Link></li>
                <li><Link to="/carreiras" className="hover:text-cyan-600 transition-colors">Carreiras</Link></li>
                <li><Link to="/contato" className="hover:text-cyan-600 transition-colors">Contato</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-500">
              © 2025 JobMarket. Todos os direitos reservados.
            </p>
            <div className="flex items-center gap-6">
              <Link to="/privacidade" className="text-sm text-slate-500 hover:text-cyan-600">Privacidade</Link>
              <Link to="/termos" className="text-sm text-slate-500 hover:text-cyan-600">Termos</Link>
              <Link to="/cookies" className="text-sm text-slate-500 hover:text-cyan-600">Cookies</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
);
 }
