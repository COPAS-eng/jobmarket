import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge, StatusBadge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import { cn, formatCurrency, formatRelativeTime } from '@/utils/cn';
import { Link } from 'react-router-dom';
import {
  FileText,
  DollarSign,
  Clock,
  ArrowRight,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

const proposals = [
  { id: '1', jobTitle: 'Senior React Developer', company: 'TechCorp', status: 'ACCEPTED', rate: 15000, estimatedDays: 30, date: '2 dias atrás', viewedAt: '1 dia atrás' },
  { id: '2', jobTitle: 'Full Stack Developer', company: 'StartupXYZ', status: 'PENDING', rate: 12000, estimatedDays: 45, date: '5 dias atrás' },
  { id: '3', jobTitle: 'Node.js Specialist', company: 'DevAgency', status: 'REJECTED', rate: 18000, estimatedDays: 20, date: '1 semana atrás' },
  { id: '4', jobTitle: 'React Native Developer', company: 'MobileApp Inc', status: 'PENDING', rate: 14000, estimatedDays: 60, date: '3 dias atrás' },
  { id: '5', jobTitle: 'TypeScript Expert', company: 'CodeLab', status: 'WITHDRAWN', rate: 20000, estimatedDays: 15, date: '2 semanas atrás' },
];

export function ProfessionalProposals() {
  return (
    <div className="max-w-7xl mx-auto">
      <ScrollReveal>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display font-bold text-3xl text-slate-950 dark:text-white">
              Minhas Propostas
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">
              Acompanhe o status de todas as suas propostas enviadas.
            </p>
          </div>
          <Button asChild>
            <Link to="/propostas/nova">
              <Plus className="h-4 w-4 mr-2" />
              Nova proposta
            </Link>
          </Button>
        </div>
      </ScrollReveal>

      {/* Filters */}
      <ScrollReveal delay={0.1}>
        <Card className="mb-6">
          <div className="flex flex-wrap items-center gap-4">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="search"
                placeholder="Buscar por vaga, empresa..."
                className="input pl-10"
              />
            </div>
            <Select
              options={[
                { value: '', label: 'Todos os status' },
                { value: 'PENDING', label: 'Pendentes' },
                { value: 'ACCEPTED', label: 'Aceitas' },
                { value: 'REJECTED', label: 'Recusadas' },
                { value: 'WITHDRAWN', label: 'Retiradas' },
              ]}
              placeholder="Filtrar por status"
              className="w-[180px]"
            />
          </div>
        </Card>
      </ScrollReveal>

      {/* Proposals List */}
      <ScrollReveal delay={0.2}>
        <div className="space-y-4">
          {proposals.map(proposal => (
            <Link key={proposal.id} to={`/propostas/${proposal.id}`} className="card-hover">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-5">
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div>
                      <h3 className="font-display font-bold text-lg text-slate-950 dark:text-white">
                        {proposal.jobTitle}
                      </h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        {proposal.company} • {proposal.date}
                      </p>
                    </div>
                    <StatusBadge status={proposal.status} />
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1 font-medium text-slate-950 dark:text-white">
                      <DollarSign className="h-4 w-4" />
                      {formatCurrency(proposal.rate)}/mês
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {proposal.estimatedDays} dias
                    </span>
                    {proposal.viewedAt && (
                      <span className="flex items-center gap-1 text-cyan-500">
                        <Eye className="h-4 w-4" />
                        Visto {proposal.viewedAt}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 sm:ml-4">
                  <Button variant="ghost" size="sm" asChild>
                    <Link to={`/propostas/${proposal.id}`}>
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

      {/* Pagination */}
      <ScrollReveal delay={0.3}>
        <div className="flex items-center justify-center gap-2 mt-8">
          <Button variant="ghost" size="sm" disabled>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm text-slate-600 dark:text-slate-400 px-4">
            Página 1 de 3
          </span>
          <Button variant="ghost" size="sm">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </ScrollReveal>
    </div>
  );
}