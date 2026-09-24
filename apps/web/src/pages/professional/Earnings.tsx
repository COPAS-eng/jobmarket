import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { cn } from '@/utils/cn';
import { Link } from 'react-router-dom';
import { Plus, DollarSign, TrendingUp, Activity } from 'lucide-react';

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
            <Link to="/ganhos/sacar">Solicitar saque</Link>
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
                {[
                  { month: 'Jan 2025', gross: 45000, fee: 36000, net: 41400 },
                  { month: 'Dez 2024', gross: 52000, fee: 41600, net: 47840 },
                  { month: 'Nov 2024', gross: 38000, fee: 30400, net: 34960 },
                  { month: 'Out 2024', gross: 41000, fee: 32800, net: 37720 },
                ].map(e => (
                  <tr key={e.month} className="border-b border-slate-100 dark:border-slate-800/50">
                    <td className="py-4 px-4 font-medium text-slate-950 dark:text-white">{e.month}</td>
                    <td className="py-4 px-4 text-right text-slate-950 dark:text-white">R$ {(e.gross/100).toFixed(2)}</td>
                    <td className="py-4 px-4 text-right text-slate-500 dark:text-slate-400">-R$ {(e.fee/100).toFixed(2)}</td>
                    <td className="py-4 px-4 text-right font-medium text-emerald-600 dark:text-emerald-400">R$ {(e.net/100).toFixed(2)}</td>
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