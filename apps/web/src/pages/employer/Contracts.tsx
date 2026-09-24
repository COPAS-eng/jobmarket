import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge, StatusBadge } from '@/components/ui/Badge';
import { Link } from 'react-router-dom';
import { ArrowRight, DollarSign, TrendingUp } from 'lucide-react';

const contracts = [
  { id: '1', jobTitle: 'E-commerce Platform', client: 'TechCorp', type: 'MILESTONE', status: 'ACTIVE', agreedRate: 15000, progress: 65, nextMilestone: 'Backend API', dueDate: '2025-01-20' },
  { id: '2', jobTitle: 'Mobile App', client: 'StartupXYZ', type: 'FIXED', status: 'ACTIVE', agreedRate: 25000, progress: 30, nextMilestone: 'UI Design', dueDate: '2025-01-25' },
  { id: '3', jobTitle: 'API Integration', client: 'DevAgency', type: 'HOURLY', status: 'COMPLETED', agreedRate: 12000, progress: 100, nextMilestone: '—', dueDate: '2025-01-10' },
];

export function EmployerContracts() {
  return (
    <div className="max-w-7xl mx-auto">
      <ScrollReveal>
        <div className="mb-8">
          <h1 className="font-display font-bold text-3xl text-slate-950 dark:text-white">
            Meus Contratos
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Gerencie seus contratos ativos, marcos e entregas.
          </p>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <Card className="p-5">
            <p className="text-sm text-slate-500 dark:text-slate-400">Contratos ativos</p>
            <p className="font-display font-bold text-2xl text-slate-950 dark:text-white">2</p>
          </Card>
          <Card className="p-5">
            <p className="text-sm text-slate-500 dark:text-slate-400">Concluídos este mês</p>
            <p className="font-display font-bold text-2xl text-slate-950 dark:text-white">1</p>
          </Card>
          <Card className="p-5">
            <p className="text-sm text-slate-500 dark:text-slate-400">Pendentes de pagamento</p>
            <p className="font-display font-bold text-2xl text-slate-950 dark:text-white">R$ 12.500</p>
          </Card>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.2}>
        <div className="space-y-4">
          {contracts.map(contract => (
            <Link key={contract.id} to={`/contratos/${contract.id}`} className="card-hover">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-5">
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div>
                      <h3 className="font-display font-bold text-lg text-slate-950 dark:text-white">
                        {contract.jobTitle}
                      </h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        {contract.client} • {contract.type}
                      </p>
                    </div>
                    <StatusBadge status={contract.status} />
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1 font-medium text-slate-950 dark:text-white">
                      <DollarSign className="h-4 w-4" />
                      R$ {(contract.agreedRate/100).toFixed(2)}/mês
                    </span>
                    <span className="flex items-center gap-1 text-cyan-500">
                      <TrendingUp className="h-4 w-4" />
                      {contract.progress}% concluído
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 sm:ml-4">
                  <Button variant="ghost" size="sm" asChild>
                    <Link to={`/contratos/${contract.id}`}>
                      Ver detalhes
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </Link>
                  </Button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </ScrollReveal>
    </div>
  );
}