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
  User,
  FileText,
  Briefcase,
  DollarSign,
  CreditCard,
  Settings,
  LogOut,
  Plus,
  ArrowRight,
  TrendingUp,
  Clock,
  CheckCircle,
  Activity,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/perfil', label: 'Perfil', icon: User },
  { href: '/propostas', label: 'Propostas', icon: FileText },
  { href: '/contratos', label: 'Contratos', icon: Briefcase },
  { href: '/ganhos', label: 'Ganhos', icon: DollarSign },
  { href: '/assinatura', label: 'Assinatura', icon: CreditCard },
];

export function ProfessionalDashboard() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const stats = [
    { label: 'Propostas enviadas', value: '12', change: '+3', icon: FileText },
    { label: 'Contratos ativos', value: '3', change: '+1', icon: Briefcase },
    { label: 'Ganhos este mês', value: 'R$ 8.450', change: '+12%', icon: DollarSign },
    { label: 'Taxa de resposta', value: '94%', change: '+2%', icon: Activity },
  ];

  const recentProposals = [
    { id: '1', jobTitle: 'Senior React Developer', company: 'TechCorp', status: 'ACCEPTED', date: '2 dias atrás', rate: 15000 },
    { id: '2', jobTitle: 'Full Stack Developer', company: 'StartupXYZ', status: 'PENDING', date: '5 dias atrás', rate: 12000 },
    { id: '3', jobTitle: 'Node.js Specialist', company: 'DevAgency', status: 'REJECTED', date: '1 semana atrás', rate: 18000 },
  ];

  const activeContracts = [
    { id: '1', jobTitle: 'E-commerce Platform', client: 'TechCorp', progress: 65, nextMilestone: 'Backend API', dueDate: '2025-01-20' },
    { id: '2', jobTitle: 'Mobile App', client: 'StartupXYZ', progress: 30, nextMilestone: 'UI Design', dueDate: '2025-01-25' },
    { id: '3', jobTitle: 'API Integration', client: 'DevAgency', progress: 90, nextMilestone: 'Deploy', dueDate: '2025-01-15' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Mobile sidebar */}
      <aside className={cn(
        'fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transform transition-transform duration-300 lg:relative lg:translate-x-0',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      )}>
        <div className="flex flex-col h-full">
          {/* Header */}
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

          {/* Navigation */}
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

          {/* User info */}
          <div className="p-4 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3 mb-4">
              <Avatar src={user?.profile?.avatar} name={user?.profile?.fullName} size="lg" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-950 dark:text-white truncate">
                  {user?.profile?.fullName || user?.email}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 capitalize">
                  Profissional
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

      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-slate-950/80 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
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
                <Link to="/vagas">Ver vagas</Link>
              </Button>
              <Button size="sm" asChild>
                <Link to="/propostas/nova">
                  <Plus className="h-4 w-4 mr-2" />
                  Nova proposta
                </Link>
              </Button>
            </div>
          </div>
        </header>

        {/* Dashboard content */}
        <main className="p-4 sm:p-6 lg:p-8">
          {/* Welcome */}
          <ScrollReveal>
            <div className="mb-8">
              <h1 className="font-display font-bold text-3xl text-slate-950 dark:text-white">
                Olá, {user?.profile?.fullName?.split(' ')[0] || 'Profissional'}! 👋
              </h1>
              <p className="text-slate-500 dark:text-slate-400 mt-1">
                Acompanhe suas métricas e gerencie suas oportunidades.
              </p>
            </div>
          </ScrollReveal>

          {/* Stats */}
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
                    <div className={cn(
                      'h-12 w-12 rounded-xl flex items-center justify-center',
                      'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400'
                    )}>
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

          {/* Quick Actions */}
          <ScrollReveal delay={0.2}>
            <div className="flex flex-wrap gap-3 mb-8">
              <Button asChild>
                <Link to="/propostas/nova">
                  <Plus className="h-4 w-4 mr-2" />
                  Nova proposta
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/perfil">Atualizar perfil</Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link to="/ganhos">Ver ganhos</Link>
              </Button>
            </div>
          </ScrollReveal>

          {/* Recent Proposals & Active Contracts */}
          <div className="grid lg:grid-cols-2 gap-6">
            <ScrollReveal delay={0.3}>
              <Card>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-display font-bold text-xl text-slate-950 dark:text-white">
                    Propostas recentes
                  </h2>
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/propostas">Ver todas <ArrowRight className="h-4 w-4 ml-1" /></Link>
                  </Button>
                </div>
                <div className="space-y-3">
                  {recentProposals.map(prop => (
                    <Link key={prop.id} to={`/propostas/${prop.id}`} className="card-hover p-4 flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-slate-950 dark:text-white">{prop.jobTitle}</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400">{prop.company} • {prop.date}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <StatusBadge status={prop.status} />
                        <span className="font-medium text-slate-950 dark:text-white">
                          {formatCurrency(prop.rate)}/mês
                        </span>
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
                    Contratos ativos
                  </h2>
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/contratos">Ver todos <ArrowRight className="h-4 w-4 ml-1" /></Link>
                  </Button>
                </div>
                <div className="space-y-4">
                  {activeContracts.map(contract => (
                    <div key={contract.id} className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-medium text-slate-950 dark:text-white">{contract.jobTitle}</h3>
                          <p className="text-sm text-slate-500 dark:text-slate-400">{contract.client}</p>
                        </div>
                        <Badge variant="success" dot>Ativo</Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-500 dark:text-slate-400">Progresso</span>
                          <span className="font-medium">{contract.progress}%</span>
                        </div>
                        <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-cyan-500 rounded-full transition-all duration-500"
                            style={{ width: `${contract.progress}%` }}
                          />
                        </div>
                        <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
                          <span>Próximo: {contract.nextMilestone}</span>
                          <span><Clock className="h-4 w-4 inline mr-1" /> {formatRelativeTime(contract.dueDate)}</span>
                        </div>
                      </div>
                    </div>
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