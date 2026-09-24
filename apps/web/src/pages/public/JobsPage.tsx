import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { cn } from '@/utils/cn';
import { ScrollReveal, StaggerContainer } from '@/components/animations/ScrollReveal';
import { Button } from '@/components/ui/Button';
import { Input, Select } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { Badge, StatusBadge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import { formatCurrency } from '@/utils/cn';
import {
  Search,
  Filter,
  MapPin,
  Clock,
  DollarSign,
  Building2,
  Globe,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from 'lucide-react';
import { Job, JobType, JobCategory } from '@/shared/types';
import { jobsApi } from '@/services/api';

const jobTypeLabels: Record<JobType, string> = {
  FREELANCE: 'Freelance',
  FULL_TIME: 'CLT',
  PART_TIME: 'Meio período',
  CONTRACT: 'PJ',
};

const jobCategoryLabels: Record<JobCategory, string> = {
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

export function JobsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    q: searchParams.get('q') || '',
    type: searchParams.getAll('type') as JobType[],
    category: searchParams.getAll('category') as JobCategory[],
    remote: searchParams.get('remote') === 'true' ? true : searchParams.get('remote') === 'false' ? false : undefined,
    budgetMin: searchParams.get('budgetMin') ? parseInt(searchParams.get('budgetMin')!) : undefined,
    budgetMax: searchParams.get('budgetMax') ? parseInt(searchParams.get('budgetMax')!) : undefined,
    skills: searchParams.getAll('skills'),
    sort: searchParams.get('sort') || 'createdAt',
    order: (searchParams.get('order') as 'asc' | 'desc') || 'desc',
  });

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.set('page', page.toString());
      params.set('limit', '12');
      
      if (filters.q) params.set('q', filters.q);
      filters.type.forEach(t => params.append('type', t));
      filters.category.forEach(c => params.append('category', c));
      if (filters.remote !== undefined) params.set('remote', filters.remote.toString());
      if (filters.budgetMin) params.set('budgetMin', filters.budgetMin.toString());
      if (filters.budgetMax) params.set('budgetMax', filters.budgetMax.toString());
      filters.skills.forEach(s => params.append('skills', s));
      params.set('sort', filters.sort);
      params.set('order', filters.order);

      const response = await jobsApi.list({ params });
      setJobs(response.data.data);
      setTotal(response.data.meta?.total || 0);
      setTotalPages(response.data.meta?.totalPages || 1);
    } catch (error) {
      console.error('Failed to fetch jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [page, filters]);

  const handleFilterChange = (key: string, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    setPage(1);
    
    // Update URL
    const params = new URLSearchParams();
    Object.entries(newFilters).forEach(([k, v]) => {
      if (Array.isArray(v)) {
        v.forEach(item => params.append(k, item));
      } else if (v !== undefined && v !== '') {
        params.set(k, String(v));
      }
    });
    setSearchParams(params, { replace: true });
  };

  const toggleArrayFilter = (key: string, value: string) => {
    const current = filters[key as keyof typeof filters] as string[] || [];
    const newValue = current.includes(value) 
      ? current.filter(v => v !== value)
      : [...current, value];
    handleFilterChange(key, newValue);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Page Header */}
      <section className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <ScrollReveal>
            <h1 className="font-display font-bold text-4xl sm:text-5xl text-slate-950 dark:text-white mb-4">
              Encontre sua próxima <span className="text-gradient">oportunidade</span>
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl">
              Explore vagas de freelance, CLT e PJ. Filtre por skills, localização e tipo de contrato.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Filters & Results */}
      <section className="section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar Filters */}
            <aside className="lg:col-span-1">
              <ScrollReveal direction="left">
                <div className="card sticky top-24 space-y-6">
                  {/* Search */}
                  <div>
                    <label htmlFor="search" className="label">Buscar</label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                      <input
                        id="search"
                        type="search"
                        placeholder="Cargo, empresa, skills..."
                        value={filters.q}
                        onChange={e => handleFilterChange('q', e.target.value)}
                        className="input pl-10"
                      />
                    </div>
                  </div>

                  {/* Job Type */}
                  <div>
                    <label className="label">Tipo de Contrato</label>
                    <div className="space-y-2">
                      {(Object.entries(jobTypeLabels) as [JobType, string][]).map(([value, label]) => (
                        <label key={value} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={filters.type.includes(value)}
                            onChange={() => toggleArrayFilter('type', value)}
                            className="h-4 w-4 rounded border-slate-300 text-cyan-500 focus:ring-cyan-500"
                          />
                          <span className="text-sm text-slate-700 dark:text-slate-300">{label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Category */}
                  <div>
                    <label className="label">Categoria</label>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {(Object.entries(jobCategoryLabels) as [JobCategory, string][]).map(([value, label]) => (
                        <label key={value} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={filters.category.includes(value)}
                            onChange={() => toggleArrayFilter('category', value)}
                            className="h-4 w-4 rounded border-slate-300 text-cyan-500 focus:ring-cyan-500"
                          />
                          <span className="text-sm text-slate-700 dark:text-slate-300">{label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Remote */}
                  <div>
                    <label className="label">Modalidade</label>
                    <div className="space-y-2">
                      {[
                        { value: true, label: 'Remoto' },
                        { value: false, label: 'Presencial' },
                      ].map(({ value, label }) => (
                        <label key={value} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="remote"
                            checked={filters.remote === value}
                            onChange={() => handleFilterChange('remote', value)}
                            className="h-4 w-4 border-slate-300 text-cyan-500 focus:ring-cyan-500"
                          />
                          <span className="text-sm text-slate-700 dark:text-slate-300">{label}</span>
                        </label>
                      ))}
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="remote"
                          checked={filters.remote === undefined}
                          onChange={() => handleFilterChange('remote', undefined)}
                          className="h-4 w-4 border-slate-300 text-cyan-500 focus:ring-cyan-500"
                        />
                        <span className="text-sm text-slate-700 dark:text-slate-300">Qualquer um</span>
                      </label>
                    </div>
                  </div>

                  {/* Budget Range */}
                  <div>
                    <label className="label">Faixa Salarial (R$/mês)</label>
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        placeholder="Mín"
                        value={filters.budgetMin || ''}
                        onChange={e => handleFilterChange('budgetMin', e.target.value ? parseInt(e.target.value) : undefined)}
                        className="w-1/2"
                      />
                      <span className="text-slate-400">–</span>
                      <Input
                        type="number"
                        placeholder="Máx"
                        value={filters.budgetMax || ''}
                        onChange={e => handleFilterChange('budgetMax', e.target.value ? parseInt(e.target.value) : undefined)}
                        className="w-1/2"
                      />
                    </div>
                  </div>

                  {/* Clear Filters */}
                  {(filters.q || filters.type.length || filters.category.length || filters.remote !== undefined || filters.budgetMin || filters.budgetMax) && (
                    <Button variant="ghost" size="sm" className="w-full" onClick={() => {
                      setFilters({
                        q: '',
                        type: [],
                        category: [],
                        remote: undefined,
                        budgetMin: undefined,
                        budgetMax: undefined,
                        skills: [],
                        sort: 'createdAt',
                        order: 'desc',
                      });
                      setPage(1);
                      setSearchParams({});
                    }}>
                      Limpar filtros
                    </Button>
                  )}
                </div>
              </ScrollReveal>
            </aside>

            {/* Results */}
            <div className="lg:col-span-3">
              {/* Results Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <ScrollReveal>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                      {total} {total === 1 ? 'vaga' : 'vagas'} encontrada{total !== 1 ? 's' : ''}
                    </span>
                    {filters.type.length && (
                      <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs">
                        <Filter className="h-3 w-3" />
                        {filters.type.map(t => jobTypeLabels[t]).join(', ')}
                      </span>
                    )}
                    {filters.category.length && (
                      <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-violet-500/10 text-violet-600 dark:text-violet-400 text-xs">
                        {filters.category.map(c => jobCategoryLabels[c]).join(', ')}
                      </span>
                    )}
                    {filters.remote === true && (
                      <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs">
                        <Globe className="h-3 w-3" />
                        Remoto
                      </span>
                    )}
                    {filters.remote === false && (
                      <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs">
                        <MapPin className="h-3 w-3" />
                        Presencial
                      </span>
                    )}
                  </div>
                </ScrollReveal>

                <ScrollReveal direction="right">
                  <div className="flex items-center gap-2">
                    <Select
                      value={filters.sort}
                      onChange={e => handleFilterChange('sort', e.target.value)}
                      options={[
                        { value: 'createdAt', label: 'Mais recentes' },
                        { value: 'budgetMax', label: 'Maior salário' },
                        { value: 'viewsCount', label: 'Mais visualizadas' },
                      ]}
                      className="w-[180px]"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleFilterChange('order', filters.order === 'asc' ? 'desc' : 'asc')}
                      className="hidden sm:flex"
                    >
                      {filters.order === 'asc' ? '↑' : '↓'}
                    </Button>
                  </div>
                </ScrollReveal>
              </div>

              {/* Job Cards */}
              <ScrollReveal>
                {loading ? (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" aria-busy="true">
                    {[1, 2, 3, 4, 5, 6].map(i => (
                      <Card key={i} className="animate-pulse">
                        <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-3/4 mb-3" />
                        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-full mb-2" />
                        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-2/3 mb-2" />
                        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/2" />
                        <div className="flex gap-2 mt-4">
                          <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded-full w-16" />
                          <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded-full w-16" />
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : jobs.length === 0 ? (
                  <div className="text-center py-16">
                    <Search className="h-12 w-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
                    <h3 className="font-display font-bold text-xl text-slate-950 dark:text-white mb-2">
                      Nenhuma vaga encontrada
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 mb-6">
                      Tente ajustar seus filtros ou busque por outros termos.
                    </p>
                    <Button variant="ghost" onClick={() => {
                      setFilters({
                        q: '',
                        type: [],
                        category: [],
                        remote: undefined,
                        budgetMin: undefined,
                        budgetMax: undefined,
                        skills: [],
                        sort: 'createdAt',
                        order: 'desc',
                      });
                      setPage(1);
                      setSearchParams({});
                    }}>
                      Limpar todos os filtros
                    </Button>
                  </div>
                ) : (
                  <>
                    <StaggerContainer stagger={0.1} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {jobs.map(job => (
                        <JobCard key={job.id} job={job} />
                      ))}
                    </StaggerContainer>

                    {/* Pagination */}
                    {totalPages > 1 && (
                      <div className="flex items-center justify-center gap-2 mt-8">
                        <Button
                          variant="ghost"
                          size="sm"
                          disabled={page === 1}
                          onClick={() => setPage(p => p - 1)}
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <span className="text-sm text-slate-600 dark:text-slate-400 px-4">
                          Página {page} de {totalPages}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          disabled={page === totalPages}
                          onClick={() => setPage(p => p + 1)}
                        >
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </>
                )}
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function JobCard({ job }: { job: Job }) {
  return (
    <Link to={`/vagas/${job.id}`} className="card-hover h-full flex flex-col">
      <div className="flex items-start justify-between mb-3">
        <span className="text-xs font-medium px-2 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
          {jobTypeLabels[job.type]}
        </span>
        <StatusBadge status={job.status} />
      </div>
      
      <h3 className="font-display font-bold text-lg text-slate-950 dark:text-white mb-2 line-clamp-2">
        {job.title}
      </h3>
      
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 line-clamp-2 flex-1">
        {job.description.slice(0, 120)}...
      </p>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {job.skills.slice(0, 4).map(skill => (
          <Badge key={skill.id} variant="outline" size="sm">
            {skill.name}
          </Badge>
        ))}
        {job.skills.length > 4 && (
          <Badge variant="neutral" size="sm">+{job.skills.length - 4}</Badge>
        )}
      </div>
      
      <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800 mt-auto">
        <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
          {job.budgetMax && (
            <span className="flex items-center gap-1 font-medium text-slate-950 dark:text-white">
              <DollarSign className="h-4 w-4" />
              {formatCurrency(job.budgetMax)}/mês
            </span>
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
        </div>
        <span className="text-xs text-slate-400">
          {job.viewsCount} visualizações
        </span>
      </div>
    </Link>
  );
}