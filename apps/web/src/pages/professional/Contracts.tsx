import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge, StatusBadge } from '@/components/ui/Badge';
import { cn, formatCurrency, formatRelativeTime } from '@/utils/cn';
import { Link } from 'react-router-dom';
import {
  FileText,
  DollarSign,
  Clock,
  ArrowRight,
  CheckCircle,
  TrendingUp,
  Activity,
} from 'lucide-react';

const contracts = [
  { id: '1', jobTitle: 'E-commerce Platform', client: 'TechCorp', type: 'MILESTONE', status: 'ACTIVE', agreedRate: 15000, progress: 65, nextMilestone: 'Backend API', dueDate: '2025-01-20', startedAt: '2024-12-01' },
  { id: '2', jobTitle: 'Mobile App', client: 'StartupXYZ', type: 'FIXED', status: 'ACTIVE', agreedRate: 25000, progress: 30, nextMilestone: 'UI Design', dueDate: '2025-01-25', startedAt: '2024-12-15' },
  { id: '3', jobTitle: 'API Integration', client: 'DevAgency', type: 'HOURLY', status: 'COMPLETED', agreedRate: 12000, progress: 100, nextMilestone: '—', dueDate: '2025-01-10', startedAt: '2024-11-01', completedAt: '2025-01-10' },
];

const earnings = [
  { month: 'Jan 2025', gross: 45000, fee: 36000, net: 41400 },
  { month: 'Dez 2024', gross: 52000, fee: 41600, net: 47840 },
  { month: 'Nov 2024', gross: 38000, fee: 30400, net: 34960 },
  { month: 'Out 2024', gross: 41000, fee: 32800, net: 37720 },
];

export function ProfessionalContracts() {
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
                        {contract.client} • Iniciado em {formatRelativeTime(contract.startedAt)}
                      </p>
                    </div>
                    <StatusBadge status={contract.status} />
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1 font-medium text-slate-950 dark:text-white">
                      <DollarSign className="h-4 w-4" />
                      {formatCurrency(contract.agreedRate)}/mês
                    </span>
                    <span className="flex items-center gap-1">
                      <FileText className="h-4 w-4" />
                      {contract.type}
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

export function ProfessionalEarnings() {
  return (
    <div className="max-w-7xl mx-auto">
      <ScrollReveal>
        <div className="mb-8">
          <h1 className="font-display font-bold text-3xl text-slate-950 dark:text-white">
            Ganhos & Saques
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Acompanhe seus rendimentos, comissões e histórico de saques.
          </p>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="p-5">
            <p className="text-sm text-slate-500 dark:text-slate-400">Ganhos totais</p>
            <p className="font-display font-bold text-2xl text-slate-950 dark:text-white">R$ 124.500</p>
            <p className="text-sm text-emerald-500 mt-1 flex items-center gap-1">
              <TrendingUp className="h-4 w-4" /> +18% vs mês passado
            </p>
          </Card>
          <Card className="p-5">
            <p className="text-sm text-slate-500 dark:text-slate-400">Disponível para saque</p>
            <p className="font-display font-bold text-2xl text-slate-950 dark:text-white">R$ 8.450</p>
          </Card>
          <Card className="p-5">
            <p className="text-sm text-slate-500 dark:text-slate-400">Em processamento</p>
            <p className="font-display font-bold text-2xl text-slate-950 dark:text-white">R$ 3.200</p>
          </Card>
          <Card className="p-5">
            <p className="text-sm text-slate-500 dark:text-slate-400">Comissão paga (mês)</p>
            <p className="font-display font-bold text-2xl text-slate-950 dark:text-white">R$ 1.200</p>
          </Card>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.2}>
        <div className="flex flex-wrap gap-3 mb-8">
          <Button asChild>
            <Link to="/ganhos/sacar">
              Solicitar saque
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/ganhos/extrato">Ver extrato completo</Link>
          </Button>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.3}>
        <Card>
          <h2 className="font-display font-bold text-xl text-slate-950 dark:text-white mb-6">
            Histórico de ganhos mensais
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800">
                  <th className="text-left py-3 px-4 font-medium text-slate-500 dark:text-slate-400">Mês</th>
                  <th className="text-right py-3 px-4 font-medium text-slate-500 dark:text-slate-400">Bruto</th>
                  <th className="text-right py-3 px-4 font-medium text-slate-500 dark:text-slate-400">Comissão</th>
                  <th className="text-right py-3 px-4 font-medium text-slate-500 dark:text-slate-400">Líquido</th>
                </tr>
              </thead>
              <tbody>
                {earnings.map(e => (
                  <tr key={e.month} className="border-b border-slate-100 dark:border-slate-800/50">
                    <td className="py-4 px-4 font-medium text-slate-950 dark:text-white">{e.month}</td>
                    <td className="py-4 px-4 text-right text-slate-950 dark:text-white">{formatCurrency(e.gross)}</td>
                    <td className="py-4 px-4 text-right text-slate-500 dark:text-slate-400">-{formatCurrency(e.fee)}</td>
                    <td className="py-4 px-4 text-right font-medium text-emerald-600 dark:text-emerald-400">{formatCurrency(e.net)}</td>
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

export function ProfessionalSubscription() {
  return (
    <div className="max-w-3xl mx-auto">
      <ScrollReveal>
        <div className="mb-8">
          <h1 className="font-display font-bold text-3xl text-slate-950 dark:text-white">
            Minha Assinatura
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Gerencie seu plano e benefícios.
          </p>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <Card className="relative overflow-hidden bg-gradient-to-br from-slate-900 to-slate-950 border-cyan-500/20">
          <div className="absolute -top-4 right-4">
            <Badge variant="primary">Plano Atual: Pro</Badge>
          </div>
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="font-display font-bold text-2xl text-white">Pro</h2>
                <p className="text-cyan-400 mt-1">R$ 49/mês • Comissão 8%</p>
              </div>
              <Badge variant="primary">Ativo</Badge>
            </div>
            <ul className="space-y-3 mb-6">
              {[
                'Propostas ilimitadas por mês',
                'Contratos ilimitados simultâneos',
                'Destaque nas buscas (badge Pro)',
                'Analytics avançado de visualizações',
                'Suporte prioritário por email',
                'Comissão reduzida: 8% (vs 12% Free)',
              ].map((feature, i) => (
                <li key={i} className="flex items-center gap-3 text-white/90">
                  <CheckCircle className="h-5 w-5 text-emerald-400 flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-3">
              <Button variant="ghost" className="border-slate-700 hover:bg-slate-800 text-white" asChild>
                <Link to="/assinatura/portal">Gerenciar no Stripe</Link>
              </Button>
              <Button variant="outline" className="border-slate-700 hover:bg-slate-800 text-white" asChild>
                <Link to="/assinatura/cancelar">Cancelar assinatura</Link>
              </Button>
            </div>
          </div>
        </Card>
      </ScrollReveal>

      <ScrollReveal delay={0.2}>
        <h2 className="font-display font-bold text-xl text-slate-950 dark:text-white mb-4">
          Planos disponíveis
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { name: 'Free', price: 0, commission: '12%', features: ['5 propostas/mês', '1 contrato ativo', 'Perfil básico', 'Suporte comunitário'], popular: false },
            { name: 'Pro', price: 49, commission: '8%', features: ['Propostas ilimitadas', 'Contratos ilimitados', 'Destaque nas buscas', 'Analytics avançado', 'Suporte prioritário'], popular: true },
            { name: 'Enterprise', price: 199, commission: '5%', features: ['Tudo do Pro', 'Equipe ilimitada', 'API access', 'SLA garantido', 'Gerente dedicado'], popular: false },
          ].map(plan => (
            <ScrollReveal key={plan.name} delay={0.2}>
              <Card className={cn('relative h-full flex flex-col', plan.popular && 'border-cyan-500/50 shadow-xl shadow-cyan-500/10')}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge variant="primary">Recomendado</Badge>
                  </div>
                )}
                <div className="text-center mb-6">
                  <h3 className="font-display font-bold text-xl text-slate-950 dark:text-white mb-2">{plan.name}</h3>
                  <div className="flex items-baseline justify-center gap-1 mb-2">
                    <span className="font-display font-bold text-4xl text-slate-950 dark:text-white">R$ {plan.price}</span>
                    <span className="text-slate-400">/mês</span>
                  </div>
                  <p className="text-cyan-500 font-medium">Comissão: {plan.commission}</p>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                      <CheckCircle className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button 
                  className="w-full" 
                  variant={plan.popular ? 'primary' : 'outline'}
                  asChild
                >
                  <Link href={`/cadastro?plan=${plan.name.toLowerCase()}`}>
                    {plan.name === 'Free' ? 'Começar grátis' : 'Assinar agora'}
                  </Link>
                </Button>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </ScrollReveal>
    </div>
  );
}