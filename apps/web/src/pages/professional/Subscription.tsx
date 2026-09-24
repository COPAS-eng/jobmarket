import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Link } from 'react-router-dom';
import { Plus, ChevronRight } from 'lucide-react';

const plans = [
  { name: 'Free', price: 0, commission: '12%', features: ['5 propostas/mês', '1 contrato ativo', 'Perfil básico', 'Suporte comunitário'], popular: false },
  { name: 'Pro', price: 49, commission: '8%', features: ['Propostas ilimitadas', 'Contratos ilimitados', 'Destaque nas buscas', 'Analytics avançado', 'Suporte prioritário'], popular: true },
  { name: 'Enterprise', price: 199, commission: '5%', features: ['Tudo do Pro', 'Equipe ilimitada', 'API access', 'SLA garantido', 'Gerente dedicado'], popular: false },
];

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
                  <span className="h-5 w-5 rounded-full bg-emerald-500 flex items-center justify-center text-white text-xs">✓</span>
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
          {plans.map(plan => (
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
                      <span className="h-4 w-4 rounded-full bg-emerald-500 flex items-center justify-center text-white text-xs">✓</span>
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
                    <ChevronRight className="h-4 w-4 ml-2" />
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