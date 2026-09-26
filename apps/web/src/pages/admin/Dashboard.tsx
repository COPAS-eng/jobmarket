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
  Users,
  DollarSign,
  Settings,
  LogOut,
  TrendingUp,
  BarChart3,
  Activity,
  Shield,
  Eye,
  MoreVertical,
  ArrowRight,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/usuarios', label: 'Usuários', icon: Users },
  { href: '/admin/transacoes', label: 'Transações', icon: DollarSign },
  { href: '/admin/configuracoes', label: 'Configurações', icon: Settings },
];

export function AdminDashboard() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const stats = [
    { label: 'Usuários totais', value: '2.847', change: '+156', icon: Users },
    { label: 'Volume transacionado', value: 'R$ 4.2M', change: '+23%', icon: DollarSign },
    { label: 'Receita plataforma', value: 'R$ 380K', change: '+18%', icon: TrendingUp },
    { label: 'Taxa de conversão', value: '12.4%', change: '+1.2%', icon: Activity },
  ];

  const recentUsers = [
    { id: '1', name: 'João Silva', email: 'joao@email.com', role: 'PROFISSIONAL', plan: 'PRO', status: 'ACTIVE', date: '2 horas atrás' },
    { id: '2', name: 'Maria Santos', email: 'maria@empresa.com', role: 'EMPREGADOR', plan: 'FREE', status: 'ACTIVE', date: '5 horas atrás' },
    { id: '3', name: 'Pedro Oliveira', email: 'pedro@dev.com', role: 'PROFISSIONAL', plan: 'FREE', status: 'PENDING_VERIFICATION', date: '1 dia atrás' },
    { id: '4', name: 'TechCorp LTDA', email: 'rh@techcorp.com', role: 'EMPREGADOR', plan: 'ENTERPRISE', status: 'ACTIVE', date: '3 dias atrás' },
  ];

  const recentTransactions = [
    { id: '1', type: 'PAYMENT', user: 'João Silva', amount: 500000, fee: 40000, status: 'SUCCEEDED', date: '30 min atrás' },
    { id: '2', type: 'SUBSCRIPTION', user: 'TechCorp LTDA', amount: 19900, fee: 0, status: 'SUCCEEDED', date: '2 horas atrás' },
    { id: '3', type: 'WITHDRAWAL', user: 'Maria Santos', amount: 300000, fee: 0, status: 'PROCESSING', date: '4 horas atrás' },
    { id: '4', type: 'PAYMENT', user: 'Pedro Oliveira', amount: 250000, fee: 20000, status: 'SUCCEEDED', date: '6 horas atrás' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <aside className={cn(
        'fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transform transition-transform duration-300 lg:relative lg:translate-x-0',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      )}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between h-16 px-6 border-b border-slate-200 dark:border-slate-800">
            <Link to="/admin" className="font-display font-bold text-xl text-cyan-700">
              JobMarket Admin
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
                (item.href !== '/admin' && location.pathname.startsWith(item.href));
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
              <Avatar name="Admin" size="lg" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-950 dark:text-white truncate">
                  Administrador
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Acesso total
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
              <span className="hidden lg:block text-sm text-slate-500 dark:text-slate-400">
                Painel de Administração
              </span>
            </div>
          </div>
        </header>

        <main className="p-4 sm:p-6 lg:p-8">
          <ScrollReveal>
            <div className="mb-8">
              <h1 className="font-display font-bold text-3xl text-slate-950 dark:text-white">
                Dashboard Admin
              </h1>
              <p className="text-slate-500 dark:text-slate-400 mt-1">
                Visão geral da plataforma e métricas principais.
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

          <div className="grid lg:grid-cols-2 gap-6">
            <ScrollReveal delay={0.2}>
              <Card>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-display font-bold text-xl text-slate-950 dark:text-white">
                    Usuários recentes
                  </h2>
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/admin/usuarios">Ver todos <ArrowRight className="h-4 w-4 ml-1" /></Link>
                  </Button>
                </div>
                <div className="space-y-3">
                  {recentUsers.map(u => (
                    <div key={u.id} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <Avatar name={u.name} size="sm" />
                        <div>
                          <p className="font-medium text-slate-950 dark:text-white">{u.name}</p>
                          <p className="text-sm text-slate-500 dark:text-slate-400">{u.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant={u.role === 'PROFISSIONAL' ? 'primary' : 'secondary'} size="sm">{u.role}</Badge>
                        <Badge variant={u.plan === 'PRO' ? 'primary' : u.plan === 'ENTERPRISE' ? 'success' : 'neutral'} size="sm">{u.plan}</Badge>
                        <Badge variant={u.status === 'ACTIVE' ? 'success' : 'warning'} size="sm" dot>{u.status}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <Card>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-display font-bold text-xl text-slate-950 dark:text-white">
                    Transações recentes
                  </h2>
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/admin/transacoes">Ver todas</Link>
                  </Button>
                </div>
                <div className="space-y-3">
                  {recentTransactions.map(t => (
                    <div key={t.id} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          'h-8 w-8 rounded-lg flex items-center justify-center',
                          t.type === 'PAYMENT' ? 'bg-emerald-100 text-emerald-600' :
                          t.type === 'SUBSCRIPTION' ? 'bg-cyan-100 text-cyan-600' :
                          'bg-amber-100 text-amber-600'
                        )}>
                          <DollarSign className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-medium text-slate-950 dark:text-white">{t.user}</p>
                          <p className="text-sm text-slate-500 dark:text-slate-400">{t.type}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-right">
                        <span className="font-medium text-slate-950 dark:text-white">
                          {formatCurrency(t.amount)}
                        </span>
                        {t.fee > 0 && (
                          <span className="text-sm text-slate-500 dark:text-slate-400">
                            Fee: {formatCurrency(t.fee)}
                          </span>
                        )}
                        <StatusBadge status={t.status} />
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