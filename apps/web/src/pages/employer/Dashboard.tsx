import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge, StatusBadge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import { cn, formatCurrency, formatRelativeTime } from '@/utils/cn';
import {
  LayoutDashboard,
  Briefcase,
  FileText,
  DollarSign,
  Users,
  LogOut,
  Plus,
  ArrowRight,
  TrendingUp,
  Clock,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/vagas', label: 'Minhas Vagas', icon: Briefcase },
  { href: '/contratos', label: 'Contratos', icon: FileText },
  { href: '/pagamentos', label: 'Pagamentos', icon: DollarSign },
  { href: '/equipe', label: 'Equipe', icon: Users },
];

export function EmployerDashboard() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const stats = [
    { label: 'Vagas ativas', value: '5', change: '+2', icon: Briefcase },
    { label: 'Candidaturas', value: '23', change: '+8', icon: FileText },
    { label: 'Contratos ativos', value: '3', change: '+1', icon: Users },
    { label: 'Investido este mês', value: 'R$ 15.000', change: '+25%', icon: DollarSign },
  ];

  const recentJobs = [
    { id: '1', title: 'Senior React Developer', type: 'FULL_TIME', status: 'OPEN', applications: 12, views: 156, date: '3 dias atrás' },
    { id: '2', title: 'UI/UX Designer', type: 'FREELANCE', status: 'OPEN', applications: 8, views: 89, date: '1 semana atrás' },
    { id: '3', title: 'DevOps Engineer', type: 'CONTRACT', status: 'PAUSED', applications: 5, views: 67, date: '2 semanas atrás' },
  ];

  const recentCandidates = [
    { id: '1', name: 'João Silva', role: 'Senior React Developer', job: 'Senior React Developer', status: 'PENDING', rate: 15000, date: '2 dias atrás' },
    { id: '2', name: 'Maria Santos', role: 'UI/UX Designer', job: 'UI/UX Designer', status: 'ACCEPTED', rate: 12000, date: '5 dias atrás' },
    { id: '3', name: 'Pedro Oliveira', role: 'DevOps Engineer', job: 'DevOps Engineer', status: 'PENDING', rate: 18000, date: '1 semana atrás' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <aside className={cn(
        'fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transform transition-transform duration-300 lg:relative lg:translate-x-0',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      )}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between h-16 px-6 border-b border-slate-200 dark:border-slate-800">
            <Link to="/" className="font-display font-bold text-xl text-slate-950 dark:text-white">
              JobMarket
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {navItems.map(item => {
              const isActive = location.pathname === item.href || 
                (item.href !== '/dashboard' && location.pathname.startsWith(item.href));
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200',
                    isActive
                      ? 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400'
                      : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'
                  )}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3 mb-4">
              <Avatar src={user?.profile?.avatar} name={user?.profile?.fullName} size="lg" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-950 dark:text-white truncate">
                  {user?.profile?.fullName || user?.email}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 capitalize">
                  Empregador
                </p>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="w-full" onClick={logout}>
              <LogOut className="h-4 w-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </aside>

      {sidebarOpen && (
        <div className="fixed inset-0 bg-slate-950/80 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 h-16 bg-white/80 dark:bg-slate-950/80 backdrop-blur-lg border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between h-full px-4 sm:px-6 lg:px-8">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            <div className="flex-1 lg:flex lg:justify-end lg:items-center gap-4">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/profissionais">Buscar talentos</Link>
              </Button>
              <Button size="sm" asChild>
                <Link to="/vagas/nova">
                  <Plus className="h-4 w-4 mr-2" />
                  Nova vaga
                </Link>
              </Button>
            </div>
          </div>
        </header>

        <main className="p-4 sm:p-6 lg:p-8">
          <ScrollReveal>
            <div className="mb-8">
              <h1 className="font-display font-bold text-3xl text-slate-950 dark:text-white">
                Painel da Empresa
              </h1>
              <p className="text-slate-500 dark:text-slate-400 mt-1">
                Gerencie suas vagas, candidaturas e contratos.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="card p-5"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">{stat.label}</p>
                      <p className="font-display font-bold text-2xl sm:text-3xl text-slate-950 dark:text-white">{stat.value}</p>
                    </div>
                    <div className="h-12 w-12 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-600 dark:text-cyan-400">
                      <stat.icon className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="mt-3 flex items-center gap-1 text-sm">
                    <TrendingUp className="h-4 w-4 text-emerald-500" />
                    <span className="text-emerald-500 font-medium">{stat.change}</span>
                    <span className="text-slate-400">vs mês anterior</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="flex flex-wrap gap-3 mb-8">
              <Button asChild>
                <Link to="/vagas/nova">
                  <Plus className="h-4 w-4 mr-2" />
                  Nova vaga
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/profissionais">Buscar talentos</Link>
              </Button>
            </div>
          </ScrollReveal>

          <div className="grid lg:grid-cols-2 gap-6">
            <ScrollReveal delay={0.3}>
              <Card>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-display font-bold text-xl text-slate-950 dark:text-white">
                    Minhas vagas recentes
                  </h2>
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/vagas">Ver todas <ArrowRight className="h-4 w-4 ml-1" /></Link>
                  </Button>
                </div>
                <div className="space-y-3">
                  {recentJobs.map(job => (
                    <Link key={job.id} to={`/vagas/${job.id}`} className="card-hover p-4 flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-slate-950 dark:text-white">{job.title}</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          {job.applications} candidaturas • {job.views} visualizações • {job.date}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <StatusBadge status={job.status} />
                        <Badge variant="outline" size="sm">{job.type}</Badge>
                      </div>
                    </Link>
                  ))}
                </div>
              </Card>
            </ScrollReveal>

            <ScrollReveal delay={0.4}>
              <Card>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-display font-bold text-xl text-slate-950 dark:text-white">
                    Candidaturas recentes
                  </h2>
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/candidatos">Ver todas <ArrowRight className="h-4 w-4 ml-1" /></Link>
                  </Button>
                </div>
                <div className="space-y-3">
                  {recentCandidates.map(candidate => (
                    <Link key={candidate.id} to={`/candidatos/${candidate.id}`} className="card-hover p-4 flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Avatar name={candidate.name} size="sm" />
                          <h3 className="font-medium text-slate-950 dark:text-white">{candidate.name}</h3>
                        </div>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          Para: {candidate.job} • {candidate.date}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <StatusBadge status={candidate.status} />
                        <span className="font-medium text-slate-950 dark:text-white">
                          {formatCurrency(candidate.rate)}/mês
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </Card>
            </ScrollReveal>
          </div>
        </main>
      </div>
    </div>
  );
}