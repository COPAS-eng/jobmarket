import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { Layout } from '@/components/layout/Layout';
import { LandingPage } from '@/pages/public/LandingPage';
import { JobsPage } from '@/pages/public/JobsPage';
import { JobDetailPage } from '@/pages/public/JobDetailPage';
import { ProfessionalsPage } from '@/pages/public/ProfessionalsPage';
import { ProfessionalProfilePage } from '@/pages/public/ProfessionalProfilePage';
import { LoginPage } from '@/pages/public/LoginPage';
import { RegisterPage } from '@/pages/public/RegisterPage';
import { HowItWorksPage } from '@/pages/public/HowItWorksPage';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { ProfessionalDashboard } from '@/pages/professional/Dashboard';
import { ProfessionalProfile } from '@/pages/professional/Profile';
import { ProfessionalProposals } from '@/pages/professional/Proposals';
import { ProfessionalContracts } from '@/pages/professional/Contracts';
import { ProfessionalEarnings } from '@/pages/professional/Earnings';
import { ProfessionalSubscription } from '@/pages/professional/Subscription';
import { EmployerDashboard } from '@/pages/employer/Dashboard';
import { EmployerJobs } from '@/pages/employer/Jobs';
import { EmployerCandidates } from '@/pages/employer/Candidates';
import { EmployerContracts } from '@/pages/employer/Contracts';
import { EmployerPayments } from '@/pages/employer/Payments';
import { AdminDashboard } from '@/pages/admin/Dashboard';
import { AdminUsers } from '@/pages/admin/Users';
import { AdminTransactions } from '@/pages/admin/Transactions';
import { AdminSettings } from '@/pages/admin/Settings';

function PublicRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/vagas" element={<JobsPage />} />
      <Route path="/vagas/:id" element={<JobDetailPage />} />
      <Route path="/profissionais" element={<ProfessionalsPage />} />
      <Route path="/profissionais/:id" element={<ProfessionalProfilePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/cadastro" element={<RegisterPage />} />
      <Route path="/como-funciona" element={<HowItWorksPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function ProfessionalRoutes() {
  return (
    <Routes>
      <Route path="/dashboard" element={<ProfessionalDashboard />} />
      <Route path="/perfil" element={<ProfessionalProfile />} />
      <Route path="/propostas" element={<ProfessionalProposals />} />
      <Route path="/contratos" element={<ProfessionalContracts />} />
      <Route path="/ganhos" element={<ProfessionalEarnings />} />
      <Route path="/assinatura" element={<ProfessionalSubscription />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

function EmployerRoutes() {
  return (
    <Routes>
      <Route path="/dashboard" element={<EmployerDashboard />} />
      <Route path="/vagas" element={<EmployerJobs />} />
      <Route path="/candidatos/:jobId" element={<EmployerCandidates />} />
      <Route path="/contratos" element={<EmployerContracts />} />
      <Route path="/pagamentos" element={<EmployerPayments />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

function AdminRoutes() {
  return (
    <Routes>
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/usuarios" element={<AdminUsers />} />
      <Route path="/admin/transacoes" element={<AdminTransactions />} />
      <Route path="/admin/configuracoes" element={<AdminSettings />} />
      <Route path="*" element={<Navigate to="/admin" replace />} />
    </Routes>
  );
}

function AuthenticatedRoutes() {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-cyan-500 border-t-transparent" />
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return (
    <Layout>
      {user.role === 'PROFISSIONAL' && <ProfessionalRoutes />}
      {user.role === 'EMPREGADOR' && <EmployerRoutes />}
      {user.role === 'ADMIN' && <AdminRoutes />}
    </Layout>
  );
}

export function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cadastro" element={<RegisterPage />} />
        <Route path="/*" element={<AuthenticatedRoutes />} />
        <Route path="/" element={<PublicRoutes />} />
      </Routes>
    </AuthProvider>
  );
}