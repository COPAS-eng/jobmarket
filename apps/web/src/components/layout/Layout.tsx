import { ReactNode, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/utils/cn';
import { UserRole } from '@/shared/types';
import { useAuth } from '@/contexts/AuthContext';
import {
  LayoutDashboard,
  Briefcase,
  FileText,
  DollarSign,
  CreditCard,
  Settings,
  Users,
  BarChart3,
  LogOut,
  Menu,
  X,
  ChevronDown,
  User,
  Building2,
} from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

const navItems: Record<UserRole, { label: string; href: string; icon: React.ComponentType<{ className?: string }> }[]> = {
  PROFISSIONAL: [
    { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { label: 'Perfil', href: '/perfil', icon: User },
    { label: 'Propostas', href: '/propostas', icon: FileText },
    { label: 'Contratos', href: '/contratos', icon: Briefcase },
    { label: 'Ganhos', href: '/ganhos', icon: DollarSign },
    { label: 'Assinatura', href: '/assinatura', icon: CreditCard },
  ],
  EMPREGADOR: [
    { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { label: 'Minhas Vagas', href: '/vagas', icon: Briefcase },
    { label: 'Contratos', href: '/contratos', icon: FileText },
    { label: 'Pagamentos', href: '/pagamentos', icon: DollarSign },
    { label: 'Equipe', href: '/equipe', icon: Users },
  ],
  ADMIN: [
    { label: 'Dashboard', href: '/admin', icon: BarChart3 },
    { label: 'Usuários', href: '/admin/usuarios', icon: Users },
    { label: 'Transações', href: '/admin/transacoes', icon: DollarSign },
    { label: 'Configurações', href: '/admin/configuracoes', icon: Settings },
  ],
};

export function Layout({ children }: LayoutProps) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  if (!user) return null;

  const items = navItems[user.role] || [];
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Mobile sidebar backdrop */}
      <AnimatePresence>
        {sidebarOpen && isMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/80 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        <motion.aside
          initial={{ x: -300 }}
          animate={{ x: sidebarOpen || !isMobile ? 0 : -300 }}
          exit={{ x: -300 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className={cn(
            'fixed lg:relative z-50 h-full w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col',
            isMobile ? 'transform' : ''
          )}
        >
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-6 border-b border-slate-200 dark:border-slate-800">
            <Link to="/" className="font-display font-bold text-xl text-slate-900 dark:text-white">
              JobMarket
            </Link>
            {isMobile && (
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                aria-label="Fechar menu"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {items.map(item => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href || 
                (item.href !== '/dashboard' && location.pathname.startsWith(item.href));
              
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
                  <Icon className="h-5 w-5" aria-hidden="true" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* User info */}
          <div className="p-4 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <div className={cn('h-10 w-10 rounded-xl flex items-center justify-center text-white font-medium', user.profile?.avatar ? '' : 'bg-cyan-500')}>
                {user.profile?.avatar ? (
                  <img src={user.profile.avatar} alt="" className="h-10 w-10 rounded-xl" />
                ) : (
                  user.profile?.fullName?.charAt(0).toUpperCase()
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-900 dark:text-white truncate">
                  {user.profile?.fullName || user.email}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 capitalize">
                  {user.role.toLowerCase().replace('_', ' ')}
                </p>
              </div>
            </div>
          </div>
        </motion.aside>
      </AnimatePresence>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <header className="sticky top-0 z-30 h-16 bg-white/80 dark:bg-slate-950/80 backdrop-blur-lg border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between h-full px-4 sm:px-6 lg:px-8">
            {/* Mobile menu button */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Abrir menu"
            >
              <Menu className="h-6 w-6 text-slate-600 dark:text-slate-400" />
            </button>

            {/* Search (desktop) */}
            <div className="hidden lg:flex-1 max-w-md mx-8">
              <div className="relative">
                <input
                  type="search"
                  placeholder="Buscar vagas, profissionais..."
                  className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border-none text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* User menu */}
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-expanded={userMenuOpen}
                aria-haspopup="true"
              >
                <div className={cn('h-8 w-8 rounded-xl flex items-center justify-center text-white font-medium', 'bg-cyan-500')}>
                  {user.profile?.avatar ? (
                    <img src={user.profile.avatar} alt="" className="h-8 w-8 rounded-xl" />
                  ) : (
                    user.profile?.fullName?.charAt(0).toUpperCase()
                  )}
                </div>
                <span className="hidden sm:block text-sm font-medium text-slate-700 dark:text-slate-300">
                  {user.profile?.fullName || user.email}
                </span>
                <ChevronDown className={cn('h-4 w-4 text-slate-400 transition-transform', userMenuOpen && 'rotate-180')} />
              </button>

              <AnimatePresence>
                {userMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-lg py-2 z-50"
                  >
                    <div className="px-4 py-2 border-b border-slate-200 dark:border-slate-800">
                      <p className="text-sm font-medium text-slate-900 dark:text-white">
                        {user.profile?.fullName || user.email}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 capitalize">
                        {user.role.toLowerCase().replace('_', ' ')}
                      </p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                      <LogOut className="h-4 w-4" />
                      Sair
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}