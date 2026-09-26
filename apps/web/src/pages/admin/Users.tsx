import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import { Link } from 'react-router-dom';
import { ArrowRight, Eye, MoreVertical, Search, Filter } from 'lucide-react';

const users = [
  { id: '1', name: 'João Silva', email: 'joao@email.com', role: 'PROFISSIONAL', plan: 'PRO', status: 'ACTIVE', date: '2 horas atrás' },
  { id: '2', name: 'Maria Santos', email: 'maria@empresa.com', role: 'EMPREGADOR', plan: 'FREE', status: 'ACTIVE', date: '5 horas atrás' },
  { id: '3', name: 'Pedro Oliveira', email: 'pedro@dev.com', role: 'PROFISSIONAL', plan: 'FREE', status: 'PENDING_VERIFICATION', date: '1 dia atrás' },
  { id: '4', name: 'TechCorp LTDA', email: 'rh@techcorp.com', role: 'EMPREGADOR', plan: 'ENTERPRISE', status: 'ACTIVE', date: '3 dias atrás' },
];

export function AdminUsers() {
  return (
    <div className="max-w-7xl mx-auto">
      <ScrollReveal>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display font-bold text-3xl text-slate-950 dark:text-white">
              Usuários
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">
              Gerencie todos os usuários da plataforma.
            </p>
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <Card className="mb-6">
          <div className="flex flex-wrap items-center gap-4">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="search"
                placeholder="Buscar por nome, email..."
                className="input pl-10"
              />
            </div>
            <select className="input w-[180px]">
              <option value="">Todos os roles</option>
              <option value="PROFISSIONAL">Profissional</option>
              <option value="EMPREGADOR">Empregador</option>
              <option value="ADMIN">Admin</option>
            </select>
            <select className="input w-[180px]">
              <option value="">Todos os planos</option>
              <option value="FREE">Free</option>
              <option value="PRO">Pro</option>
              <option value="ENTERPRISE">Enterprise</option>
            </select>
            <select className="input w-[180px]">
              <option value="">Todos os status</option>
              <option value="ACTIVE">Ativo</option>
              <option value="PENDING_VERIFICATION">Pendente</option>
              <option value="SUSPENDED">Suspenso</option>
            </select>
          </div>
        </Card>
      </ScrollReveal>

      <ScrollReveal delay={0.2}>
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800">
                  <th className="text-left py-3 px-4 font-medium text-slate-500 dark:text-slate-400">Usuário</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-500 dark:text-slate-400">Role</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-500 dark:text-slate-400">Plano</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-500 dark:text-slate-400">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-500 dark:text-slate-400">Cadastro</th>
                  <th className="text-right py-3 px-4 font-medium text-slate-500 dark:text-slate-400">Ações</th>
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u.id} className="border-b border-slate-100 dark:border-slate-800/50">
                    <td className="py-4 px-4">
                      <Link to={`/admin/usuarios/${u.id}`} className="flex items-center gap-3 hover:text-cyan-700">
                        <Avatar name={u.name} size="sm" />
                        <div>
                          <p className="font-medium text-slate-950 dark:text-white">{u.name}</p>
                          <p className="text-sm text-slate-500 dark:text-slate-400">{u.email}</p>
                        </div>
                      </Link>
                    </td>
                    <td className="py-4 px-4">
                      <Badge variant={u.role === 'PROFISSIONAL' ? 'primary' : u.role === 'EMPREGADOR' ? 'secondary' : 'success'} size="sm">
                        {u.role}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <Badge variant={u.plan === 'PRO' ? 'primary' : u.plan === 'ENTERPRISE' ? 'success' : 'neutral'} size="sm">
                        {u.plan}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <Badge variant={u.status === 'ACTIVE' ? 'success' : u.status === 'PENDING_VERIFICATION' ? 'warning' : 'danger'} size="sm" dot>
                        {u.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-4 text-slate-950 dark:text-white">{u.date}</td>
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="sm" asChild>
                          <Link to={`/admin/usuarios/${u.id}`}>
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </ScrollReveal>
    </div>
  );
}