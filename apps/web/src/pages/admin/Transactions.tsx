import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { Card } from '@/components/ui/Card';
import { Badge, StatusBadge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import { DollarSign, TrendingUp, Activity, Shield, Clock } from 'lucide-react';

const transactions = [
  { id: '1', type: 'PAYMENT', user: 'João Silva', amount: 500000, fee: 40000, status: 'SUCCEEDED', date: '30 min atrás' },
  { id: '2', type: 'SUBSCRIPTION', user: 'TechCorp LTDA', amount: 19900, fee: 0, status: 'SUCCEEDED', date: '2 horas atrás' },
  { id: '3', type: 'WITHDRAWAL', user: 'Maria Santos', amount: 300000, fee: 0, status: 'PROCESSING', date: '4 horas atrás' },
  { id: '4', type: 'PAYMENT', user: 'Pedro Oliveira', amount: 250000, fee: 20000, status: 'SUCCEEDED', date: '6 horas atrás' },
  { id: '5', type: 'REFUND', user: 'StartupXYZ', amount: 150000, fee: 0, status: 'SUCCEEDED', date: '1 dia atrás' },
];

export function AdminTransactions() {
  return (
    <div className="max-w-7xl mx-auto">
      <ScrollReveal>
        <div className="mb-8">
          <h1 className="font-display font-bold text-3xl text-slate-950 dark:text-white">
            Transações
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Monitore todas as transações financeiras da plataforma.
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
            <p className="text-sm text-slate-500 dark:text-slate-400">Receita plataforma</p>
            <p className="font-display font-bold text-2xl text-slate-950 dark:text-white">R$ 380K</p>
            <p className="text-sm text-emerald-500 mt-1 flex items-center gap-1">
              <TrendingUp className="h-4 w-4" /> +18% vs mês passado
            </p>
          </Card>
          <Card className="p-5">
            <p className="text-sm text-slate-500 dark:text-slate-400">Transações hoje</p>
            <p className="font-display font-bold text-2xl text-slate-950 dark:text-white">142</p>
            <p className="text-sm text-emerald-500 mt-1 flex items-center gap-1">
              <Activity className="h-4 w-4" /> +12% vs ontem
            </p>
          </Card>
          <Card className="p-5">
            <p className="text-sm text-slate-500 dark:text-slate-400">Taxa de sucesso</p>
            <p className="font-display font-bold text-2xl text-slate-950 dark:text-white">99.2%</p>
            <p className="text-sm text-emerald-500 mt-1 flex items-center gap-1">
              <Shield className="h-4 w-4" /> +0.1%
            </p>
          </Card>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.2}>
        <Card>
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <h2 className="font-display font-bold text-xl text-slate-950 dark:text-white">
              Transações recentes
            </h2>
            <div className="flex gap-2">
              <select className="input w-[180px]">
                <option value="">Todos os tipos</option>
                <option value="PAYMENT">Pagamento</option>
                <option value="SUBSCRIPTION">Assinatura</option>
                <option value="WITHDRAWAL">Saque</option>
                <option value="REFUND">Reembolso</option>
              </select>
              <select className="input w-[180px]">
                <option value="">Todos os status</option>
                <option value="SUCCEEDED">Sucesso</option>
                <option value="PROCESSING">Processando</option>
                <option value="FAILED">Falhou</option>
              </select>
            </div>
          </div>
          <div className="space-y-3">
            {transactions.map(t => (
              <div key={t.id} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    'h-8 w-8 rounded-lg flex items-center justify-center',
                    t.type === 'PAYMENT' ? 'bg-emerald-100 text-emerald-600' :
                    t.type === 'SUBSCRIPTION' ? 'bg-cyan-100 text-cyan-600' :
                    t.type === 'WITHDRAWAL' ? 'bg-amber-100 text-amber-600' :
                    'bg-red-100 text-red-600'
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
                    R$ {(t.amount/100).toFixed(2)}
                  </span>
                  {t.fee > 0 && (
                    <span className="text-sm text-slate-500 dark:text-slate-400">
                      Fee: R$ {(t.fee/100).toFixed(2)}
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
  );
}

import { cn } from '@/utils/cn';