import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge, StatusBadge } from '@/components/ui/Badge';
import { Link } from 'react-router-dom';
import { Plus, ArrowRight, Search, Filter } from 'lucide-react';

const jobs = [
  { id: '1', title: 'Senior React Developer', type: 'FULL_TIME', status: 'OPEN', applications: 12, views: 156, date: '3 dias atrás' },
  { id: '2', title: 'UI/UX Designer', type: 'FREELANCE', status: 'OPEN', applications: 8, views: 89, date: '1 semana atrás' },
  { id: '3', title: 'DevOps Engineer', type: 'CONTRACT', status: 'PAUSED', applications: 5, views: 67, date: '2 semanas atrás' },
];

export function EmployerJobs() {
  return (
    <div className="max-w-7xl mx-auto">
      <ScrollReveal>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display font-bold text-3xl text-slate-950 dark:text-white">
              Minhas Vagas
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">
              Gerencie suas vagas publicadas e acompanhe candidaturas.
            </p>
          </div>
          <Button asChild>
            <Link to="/vagas/nova">
              <Plus className="h-4 w-4 mr-2" />
              Nova vaga
            </Link>
          </Button>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <Card className="mb-6">
          <div className="flex flex-wrap items-center gap-4">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="search"
                placeholder="Buscar por título..."
                className="input pl-10"
              />
            </div>
            <Select
              options={[
                { value: '', label: 'Todos os status' },
                { value: 'OPEN', label: 'Abertas' },
                { value: 'PAUSED', label: 'Pausadas' },
                { value: 'FILLED', label: 'Preenchidas' },
                { value: 'CLOSED', label: 'Fechadas' },
              ]}
              placeholder="Filtrar por status"
              className="w-[180px]"
            />
          </div>
        </Card>
      </ScrollReveal>

      <ScrollReveal delay={0.2}>
        <div className="space-y-4">
          {jobs.map(job => (
            <Link key={job.id} to={`/vagas/${job.id}`} className="card-hover">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-5">
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div>
                      <h3 className="font-display font-bold text-lg text-slate-950 dark:text-white">
                        {job.title}
                      </h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        {job.applications} candidaturas • {job.views} visualizações • {job.date}
                      </p>
                    </div>
                    <StatusBadge status={job.status} />
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                    <Badge variant="outline" size="sm">{job.type}</Badge>
                  </div>
                </div>
                <div className="flex items-center gap-2 sm:ml-4">
                  <Button variant="ghost" size="sm" asChild>
                    <Link to={`/vagas/${job.id}`}>
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

function Select({ options, placeholder, className }: { options: { value: string; label: string }[]; placeholder: string; className?: string }) {
  return (
    <select className={cn('input appearance-none bg-no-repeat bg-right pr-10', 'bg-[url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 fill=%27none%27 viewBox=%270 0 20 20%27%3E%3Cpath stroke=%27%236b7280%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27 stroke-width=%271.5%27 d=%27M6 8l4 4 4-4%27/%3E%3C/svg%3E")]', className)}>
      <option value="" disabled>{placeholder}</option>
      {options.map(opt => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  );
}