import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge, StatusBadge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import { formatCurrency, formatDate, formatRelativeTime } from '@/utils/cn';
import { cn } from '@/utils/cn';
import {
  MapPin,
  Clock,
  DollarSign,
  Globe,
  Building2,
  User,
  Tag,
  ArrowLeft,
  Share2,
  Bookmark,
  Loader2,
} from 'lucide-react';
import { Job } from '@/shared/types';
import { jobsApi } from '@/services/api';
import { useToast } from '@/components/ui/Toast';

const jobTypeLabels: Record<string, string> = {
  FREELANCE: 'Freelance',
  FULL_TIME: 'CLT',
  PART_TIME: 'Meio período',
  CONTRACT: 'PJ',
};

const jobCategoryLabels: Record<string, string> = {
  DESENVOLVIMENTO: 'Desenvolvimento',
  DESIGN: 'Design',
  MARKETING: 'Marketing',
  VENDAS: 'Vendas',
  ADMINISTRATIVO: 'Administrativo',
  FINANCEIRO: 'Financeiro',
  RECURSOS_HUMANOS: 'RH',
  OPERACOES: 'Operações',
  PRODUTO: 'Produto',
  DADOS: 'Dados',
  OUTROS: 'Outros',
};

export function JobDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const toast = useToast();

  useEffect(() => {
    if (!id) return;
    const fetchJob = async () => {
      try {
        const response = await jobsApi.get(id);
        setJob(response.data.data);
      } catch (error) {
        toast.error('Vaga não encontrada');
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id, toast]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="animate-pulse space-y-8">
          <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-1/2" />
          <div className="h-32 bg-slate-200 dark:bg-slate-700 rounded" />
          <div className="grid grid-cols-3 gap-4">
            {[1,2,3].map(i => <div key={i} className="h-10 bg-slate-200 dark:bg-slate-700 rounded" />)}
          </div>
          <div className="h-64 bg-slate-200 dark:bg-slate-700 rounded" />
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h1 className="font-display font-bold text-3xl text-slate-950 dark:text-white mb-4">
          Vaga não encontrada
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mb-8">
          Esta vaga pode ter sido removida ou não existe mais.
        </p>
        <Button asChild>
          <Link to="/vagas">Voltar para as vagas</Link>
        </Button>
      </div>
    );
  }

  const handleApply = async () => {
    setApplying(true);
    try {
      // In a real app, this would redirect to login if not authenticated
      // or open a proposal form
      toast.success('Redirecionando para envio de proposta...');
      // Navigate to proposal page or open modal
    } catch {
      toast.error('Erro ao enviar proposta');
    } finally {
      setApplying(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back button */}
        <ScrollReveal>
          <Button variant="ghost" size="sm" asChild className="mb-6">
            <Link to="/vagas" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Voltar
            </Link>
          </Button>
        </ScrollReveal>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <ScrollReveal>
              <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                <div className="flex flex-wrap items-center gap-2">
                  <StatusBadge status={job.status} />
                  <Badge variant="primary">{jobTypeLabels[job.type]}</Badge>
                  <Badge variant="outline">{jobCategoryLabels[job.category]}</Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" className="gap-1">
                    <Bookmark className="h-4 w-4" /> Salvar
                  </Button>
                  <Button variant="ghost" size="sm" className="gap-1">
                    <Share2 className="h-4 w-4" /> Compartilhar
                  </Button>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <h1 className="font-display font-bold text-3xl sm:text-4xl text-slate-950 dark:text-white mb-4">
                {job.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 dark:text-slate-400 mb-6">
                {job.employer.profile && (
                  <>
                    <Avatar src={job.employer.profile.avatar} name={job.employer.profile.fullName} size="sm" />
                    <span className="font-medium text-slate-950 dark:text-white">
                      {job.employer.profile.fullName}
                    </span>
                  </>
                )}
                {job.remote && (
                  <span className="flex items-center gap-1">
                    <Globe className="h-4 w-4" />
                    Remoto
                  </span>
                )}
                {!job.remote && job.location && (
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {job.location}
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  Publicada {formatRelativeTime(job.createdAt)}
                </span>
              </div>
            </ScrollReveal>

            {/* Description */}
            <ScrollReveal delay={0.2}>
              <Card className="prose prose-slate dark:prose-invert max-w-none">
                <div className="whitespace-pre-wrap text-slate-700 dark:text-slate-300 leading-relaxed">
                  {job.description}
                </div>
              </Card>
            </ScrollReveal>

            {/* Skills */}
            <ScrollReveal delay={0.3}>
              <div>
                <h3 className="font-display font-bold text-lg text-slate-950 dark:text-white mb-3 flex items-center gap-2">
                  <Tag className="h-5 w-5 text-cyan-500" />
                  Skills requeridas
                </h3>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map(skill => (
                    <Badge key={skill.id} variant="outline">{skill.name}</Badge>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Apply Card */}
            <ScrollReveal direction="right">
              <Card className="sticky top-24">
                <div className="space-y-4">
                  <div>
                    <span className="text-sm text-slate-500 dark:text-slate-400">Orçamento</span>
                    <div className="font-display font-bold text-2xl text-slate-950 dark:text-white">
                      {job.budgetMin && job.budgetMax 
                        ? `${formatCurrency(job.budgetMin)} – ${formatCurrency(job.budgetMax)}/mês`
                        : job.budgetMax
                        ? `Até ${formatCurrency(job.budgetMax)}/mês`
                        : job.budgetMin
                        ? `A partir de ${formatCurrency(job.budgetMin)}/mês`
                        : 'A combinar'}
                    </div>
                  </div>

                  <div className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4" />
                      <span>{jobTypeLabels[job.type]}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>{jobCategoryLabels[job.category]}</span>
                    </div>
                    {job.budgetMax && (
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4" />
                        <span>Até {formatCurrency(job.budgetMax)}/mês</span>
                      </div>
                    )}
                  </div>

                  <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
                    <Button size="lg" className="w-full" onClick={handleApply} disabled={applying}>
                      {applying ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Enviando...
                        </>
                      ) : (
                        'Enviar proposta'
                      )}
                    </Button>
                    <p className="text-center text-xs text-slate-500 dark:text-slate-400">
                      Ao enviar proposta, seu perfil será compartilhado com a empresa.
                    </p>
                  </div>
                </div>
              </Card>
            </ScrollReveal>

            {/* Company Info */}
            {job.employer.profile && (
              <ScrollReveal direction="right" delay={0.1}>
                <Card>
                  <h3 className="font-display font-bold text-lg text-slate-950 dark:text-white mb-4">
                    Sobre a empresa
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Avatar src={job.employer.profile.avatar} name={job.employer.profile.fullName} size="lg" />
                      <div>
                        <p className="font-medium text-slate-950 dark:text-white">{job.employer.profile.fullName}</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">{jobTypeLabels[job.type]} • {jobCategoryLabels[job.category]}</p>
                      </div>
                    </div>
                    {job.employer.profile.bio && (
                      <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3">{job.employer.profile.bio}</p>
                    )}
                    {job.employer.profile.website && (
                      <a href={job.employer.profile.website} target="_blank" rel="noopener noreferrer" className="text-sm text-cyan-500 hover:text-cyan-400 flex items-center gap-1">
                        <Globe className="h-4 w-4" /> Site da empresa
                      </a>
                    )}
                  </div>
                </Card>
              </ScrollReveal>
            )}

            {/* Meta */}
            <ScrollReveal direction="right" delay={0.2}>
              <Card>
                <h3 className="font-display font-bold text-lg text-slate-950 dark:text-white mb-4">
                  Detalhes da vaga
                </h3>
                <dl className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-slate-500 dark:text-slate-400">ID da vaga</dt>
                    <dd className="font-mono text-slate-950 dark:text-white">{job.id.slice(0, 8)}...</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-slate-500 dark:text-slate-400">Publicada em</dt>
                    <dd className="text-slate-950 dark:text-white">{formatDate(job.createdAt)}</dd>
                  </div>
                  {job.expiresAt && (
                    <div className="flex justify-between">
                      <dt className="text-slate-500 dark:text-slate-400">Expira em</dt>
                      <dd className="text-slate-950 dark:text-white">{formatDate(job.expiresAt)}</dd>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <dt className="text-slate-500 dark:text-slate-400">Visualizações</dt>
                    <dd className="text-slate-950 dark:text-white">{job.viewsCount}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-slate-500 dark:text-slate-400">Candidaturas</dt>
                    <dd className="text-slate-950 dark:text-white">{job.applicationsCount}</dd>
                  </div>
                </dl>
              </Card>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </div>
  );
}