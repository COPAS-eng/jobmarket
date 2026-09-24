import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge, StatusBadge } from '@/components/ui/Badge';
import { Link } from 'react-router-dom';
import { cn } from '@/utils/cn';
import { ArrowRight, DollarSign, TrendingUp } from 'lucide-react';

const payments = [
  { id: '1', type: 'PAYMENT', professional: 'João Silva', amount: 500000, fee: 40000, status: 'SUCCEEDED', date: '30 min atrás' },
  { id: '2', type: 'SUBSCRIPTION', professional: 'TechCorp LTDA', amount: 19900, fee: 0, status: 'SUCCEEDED', date: '2 horas atrás' },
  { id: '3', type: 'WITHDRAWAL', professional: 'Maria Santos', amount: 300000, fee: 0, status: 'PROCESSING', date: '4 horas atrás' },
  { id: '4', type: 'PAYMENT', professional: 'Pedro Oliveira', amount: 250000, fee: 20000, status: 'SUCCEEDED', date: '6 horas atrás' },
];

export function EmployerPayments() {
  return (
    <div className="max-w-7xl mx-auto">
      <ScrollReveal>
        <div className="mb-8">
          <h1 className="font-display font-bold text-3xl text-slate-950 dark:text-white">
            Pagamentos
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Acompanhe todos os pagamentos, saques e faturas.
          </p>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="p-5">
            <p className="text-sm text-slate-500 dark:text-slate-400">Volume total</p>
            <p className="font-display font-bold text-2xl text-slate-950 dark:text-white">R$ 4.2M</p>
            <p className="text-sm text-emerald-500 mt-1 flex items-center gap-1">
              <TrendingUp className="h-4 w-4" /> +23% vs mês passado
            </p>
          </Card>
          <Card className="p-5">
            <p className="text-sm text-slate-500 dark:text-slate-400">Comissão recebida</p>
            <p className="font-display font-bold text-2xl text-slate-950 dark:text-white">R$ 380K</p>
          </Card>
          <Card className="p-5">
            <p className="text-sm text-slate-500 dark:text-slate-400">Pendentes</p>
            <p className="font-display font-bold text-2xl text-slate-950 dark:text-white">R$ 15.000</p>
          </Card>
          <Card className="p-5">
            <p className="text-sm text-slate-500 dark:text-slate-400">Este mês</p>
            <p className="font-display font-bold text-2xl text-slate-950 dark:text-white">R$ 45.000</p>
          </Card>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.2}>
        <Card>
          <h2 className="font-display font-bold text-xl text-slate-950 dark:text-white mb-6">
            Transações recentes
          </h2>
          <div className="space-y-3">
            {payments.map(p => (
              <div key={p.id} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    'h-8 w-8 rounded-lg flex items-center justify-center',
                    p.type === 'PAYMENT' ? 'bg-emerald-100 text-emerald-600' :
                    p.type === 'SUBSCRIPTION' ? 'bg-cyan-100 text-cyan-600' :
                    'bg-amber-100 text-amber-600'
                  )}>
                    <DollarSign className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-950 dark:text-white">{p.professional}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{p.type}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-right">
                  <span className="font-medium text-slate-950 dark:text-white">
                    R$ {(p.amount/100).toFixed(2)}
                  </span>
                  {p.fee > 0 && (
                    <span className="text-sm text-slate-500 dark:text-slate-400">
                      Fee: R$ {(p.fee/100).toFixed(2)}
                    </span>
                  )}
                  <StatusBadge status={p.status} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </ScrollReveal>
    </div>
  );
}