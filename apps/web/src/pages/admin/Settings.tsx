import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input, Select } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { DollarSign, Shield, Globe, CreditCard, Settings as SettingsIcon, Plus } from 'lucide-react';

export function AdminSettings() {
  return (
    <div className="max-w-4xl mx-auto">
      <ScrollReveal>
        <div className="mb-8">
          <h1 className="font-display font-bold text-3xl text-slate-950 dark:text-white flex items-center gap-3">
            <SettingsIcon className="h-8 w-8 text-cyan-500" />
            Configurações da Plataforma
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Configure comissões, planos, integrações e preferências globais.
          </p>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display font-bold text-xl text-slate-950 dark:text-white flex items-center gap-2">
              <DollarSign className="h-6 w-6 text-cyan-500" />
              Comissões da Plataforma
            </h2>
            <Badge variant="primary">Ao vivo</Badge>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div>
              <label className="label">Plano Free (%)</label>
              <Input type="number" min="0" max="100" step="0.1" defaultValue="12" />
            </div>
            <div>
              <label className="label">Plano Pro (%)</label>
              <Input type="number" min="0" max="100" step="0.1" defaultValue="8" />
            </div>
            <div>
              <label className="label">Plano Enterprise (%)</label>
              <Input type="number" min="0" max="100" step="0.1" defaultValue="5" />
            </div>
          </div>
          <Button>Salvar comissões</Button>
        </Card>
      </ScrollReveal>

      <ScrollReveal delay={0.2}>
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display font-bold text-xl text-slate-950 dark:text-white flex items-center gap-2">
              <Shield className="h-6 w-6 text-emerald-500" />
              Segurança & Moderação
            </h2>
          </div>
          <div className="space-y-4">
            <label className="flex items-center justify-between">
              <span className="text-slate-950 dark:text-white">Verificação de email obrigatória</span>
              <input type="checkbox" className="h-5 w-5 rounded border-slate-300 text-cyan-500 focus:ring-cyan-500" defaultChecked />
            </label>
            <label className="flex items-center justify-between">
              <span className="text-slate-950 dark:text-white">Aprovação manual de novos empregadores</span>
              <input type="checkbox" className="h-5 w-5 rounded border-slate-300 text-cyan-500 focus:ring-cyan-500" />
            </label>
            <label className="flex items-center justify-between">
              <span className="text-slate-950 dark:text-white">Moderação automática de conteúdo suspeito</span>
              <input type="checkbox" className="h-5 w-5 rounded border-slate-300 text-cyan-500 focus:ring-cyan-500" defaultChecked />
            </label>
            <label className="flex items-center justify-between">
              <span className="text-slate-950 dark:text-white">Notificações de segurança por email</span>
              <input type="checkbox" className="h-5 w-5 rounded border-slate-300 text-cyan-500 focus:ring-cyan-500" defaultChecked />
            </label>
          </div>
        </Card>
      </ScrollReveal>

      <ScrollReveal delay={0.3}>
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display font-bold text-xl text-slate-950 dark:text-white flex items-center gap-2">
              <Globe className="h-6 w-6 text-violet-500" />
              Integrações Externas
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="label">Stripe Secret Key</label>
              <Input type="password" placeholder="sk_live_..." />
            </div>
            <div>
              <label className="label">Stripe Webhook Secret</label>
              <Input type="password" placeholder="whsec_..." />
            </div>
            <div>
              <label className="label">Stripe Connect Client ID</label>
              <Input placeholder="ca_..." />
            </div>
            <div>
              <label className="label">Stripe Publishable Key</label>
              <Input placeholder="pk_live_..." />
            </div>
          </div>
          <div className="mt-6">
            <Button variant="outline">Testar conexão Stripe</Button>
          </div>
        </Card>
      </ScrollReveal>

      <ScrollReveal delay={0.4}>
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display font-bold text-xl text-slate-950 dark:text-white flex items-center gap-2">
              <CreditCard className="h-6 w-6 text-amber-500" />
              Planos de Assinatura
            </h2>
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Novo plano
            </Button>
          </div>
          <div className="space-y-4">
            {[
              { name: 'Free', price: 0, commission: '12%', features: ['5 propostas/mês', '1 contrato ativo'], active: true },
              { name: 'Pro', price: 49, commission: '8%', features: ['Propostas ilimitadas', 'Destaque nas buscas'], active: true },
              { name: 'Enterprise', price: 199, commission: '5%', features: ['Equipe ilimitada', 'API access', 'SLA'], active: true },
            ].map(plan => (
              <div key={plan.name} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                <div className="flex items-center gap-4">
                  <Badge variant={plan.name === 'Pro' ? 'primary' : plan.name === 'Enterprise' ? 'success' : 'neutral'}>
                    {plan.name}
                  </Badge>
                  <div>
                    <p className="font-medium text-slate-950 dark:text-white">R$ {plan.price}/mês</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Comissão: {plan.commission}</p>
                  </div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">
                    {plan.features.join(' • ')}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={plan.active ? 'success' : 'neutral'} dot>{plan.active ? 'Ativo' : 'Inativo'}</Badge>
                  <Button variant="ghost" size="sm">Editar</Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </ScrollReveal>

      <ScrollReveal delay={0.5}>
        <Card className="border-red-500/30 bg-red-500/5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-bold text-xl text-red-600 dark:text-red-400 flex items-center gap-2">
              <Shield className="h-6 w-6" />
              Zona de Perigo
            </h2>
          </div>
          <p className="text-sm text-red-500 dark:text-red-400 mb-6">
            Estas ações são irreversíveis. Use com extrema cautela.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button variant="danger">Limpar cache</Button>
            <Button variant="danger">Resetar métricas</Button>
            <Button variant="danger">Modo manutenção</Button>
          </div>
        </Card>
      </ScrollReveal>
    </div>
  );
}