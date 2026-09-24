import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge, StatusBadge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import { Link } from 'react-router-dom';
import { ArrowRight, DollarSign, Clock } from 'lucide-react';

const candidates = [
  { id: '1', name: 'João Silva', role: 'Senior React Developer', job: 'Senior React Developer', status: 'PENDING', rate: 15000, date: '2 dias atrás' },
  { id: '2', name: 'Maria Santos', role: 'UI/UX Designer', job: 'UI/UX Designer', status: 'ACCEPTED', rate: 12000, date: '5 dias atrás' },
  { id: '3', name: 'Pedro Oliveira', role: 'DevOps Engineer', job: 'DevOps Engineer', status: 'PENDING', rate: 18000, date: '1 semana atrás' },
];

export function EmployerCandidates() {
  return (
    <div className="max-w-7xl mx-auto">
      <ScrollReveal>
        <div className="mb-8">
          <h1 className="font-display font-bold text-3xl text-slate-950 dark:text-white">
            Candidaturas
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Gerencie as candidaturas recebidas nas suas vagas.
          </p>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <div className="space-y-4">
          {candidates.map(candidate => (
            <Link key={candidate.id} to={`/candidatos/${candidate.id}`} className="card-hover">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-5">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <Avatar name={candidate.name} size="lg" />
                    <div>
                      <h3 className="font-display font-bold text-lg text-slate-950 dark:text-white">
                        {candidate.name}
                      </h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        Para: {candidate.job} • {candidate.date}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1 font-medium text-slate-950 dark:text-white">
                      <DollarSign className="h-4 w-4" />
                      R$ {(candidate.rate/100).toFixed(2)}/mês
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 sm:ml-4">
                  <StatusBadge status={candidate.status} />
                  <Button variant="ghost" size="sm" asChild>
                    <Link to={`/candidatos/${candidate.id}`}>
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

import { ArrowRight } from 'lucide-react';