import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import { ScrollReveal, StaggerContainer } from '@/components/animations/ScrollReveal';
import { Button } from '@/components/ui/Button';
import { Input, Select } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import { cn, formatCurrency } from '@/utils/cn';
import {
  Search,
  Filter,
  MapPin,
  DollarSign,
  Globe,
  Languages,
  ChevronLeft,
  ChevronRight,
  User,
  Code,
  Palette,
  Briefcase,
  TrendingUp,
} from 'lucide-react';
import { Profile, Skill } from '@jobmarket/shared/types';
import { usersApi } from '@/services/api';

const availabilityLabels: Record<string, string> = {
  FULL_TIME: 'Tempo integral',
  PART_TIME: 'Meio período',
  FREELANCE: 'Freelance',
  UNAVAILABLE: 'Indisponível',
};

export function ProfessionalsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [professionals, setProfessionals] = useState<Profile[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    q: searchParams.get('q') || '',
    skills: searchParams.getAll('skills'),
    availability: searchParams.getAll('availability') as ('FULL_TIME' | 'PART_TIME' | 'FREELANCE')[],
    rateMin: searchParams.get('rateMin') ? parseInt(searchParams.get('rateMin')!) : undefined,
    rateMax: searchParams.get('rateMax') ? parseInt(searchParams.get('rateMax')!) : undefined,
    location: searchParams.get('location') || '',
    languages: searchParams.getAll('languages'),
    sort: searchParams.get('sort') || 'createdAt',
    order: (searchParams.get('order') as 'asc' | 'desc') || 'desc',
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch skills for filter
      // In real app, this would come from a skills API
      
      const params = new URLSearchParams();
      params.set('page', page.toString());
      params.set('limit', '12');
      
      if (filters.q) params.set('q', filters.q);
      filters.skills.forEach(s => params.append('skills', s));
      filters.availability.forEach(a => params.append('availability', a));
      if (filters.rateMin) params.set('rateMin', filters.rateMin.toString());
      if (filters.rateMax) params.set('rateMax', filters.rateMax.toString());
      if (filters.location) params.set('location', filters.location);
      filters.languages.forEach(l => params.append('languages', l));
      params.set('sort', filters.sort);
      params.set('order', filters.order);

      const response = await usersApi.listProfessionals({ params });
      setProfessionals(response.data.data);
      setTotal(response.data.meta?.total || 0);
      setTotalPages(response.data.meta?.totalPages || 1);
    } catch (error) {
      console.error('Failed to fetch professionals:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, filters]);

  const handleFilterChange = (key: string, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    setPage(1);
    
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
              Encontre os melhores <span className="text-gradient">profissionais</span>
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl">
              Navegue por perfis verificados de desenvolvedores, designers, marketers e mais.
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
                  <div>
                    <label htmlFor="search" className="label">Buscar</label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                      <input
                        id="search"
                        type="search"
                        placeholder="Nome, skills, cargo..."
                        value={filters.q}
                        onChange={e => handleFilterChange('q', e.target.value)}
                        className="input pl-10"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="label">Skills</label>
                    <Input
                      placeholder="Filtrar por skills..."
                      className="mb-2"
                    />
                    <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto">
                      {['React', 'Node.js', 'TypeScript', 'Python', 'Figma', 'UI/UX', 'AWS', 'Marketing'].map(skill => (
                        <label key={skill} className="cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={filters.skills.includes(skill)}
                            onChange={() => toggleArrayFilter('skills', skill)}
                          />
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
                            filters.skills.includes(skill)
                              ? 'bg-cyan-500 text-white'
                              : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
                          }`}>
                            {skill}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="label">Disponibilidade</label>
                    <div className="space-y-2">
                      {(Object.entries(availabilityLabels) as [string, string][]).map(([value, label]) => (
                        <label key={value} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={filters.availability.includes(value as any)}
                            onChange={() => toggleArrayFilter('availability', value)}
                            className="h-4 w-4 rounded border-slate-300 text-cyan-500 focus:ring-cyan-500"
                          />
                          <span className="text-sm text-slate-700 dark:text-slate-300">{label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="label">Taxa horária (R$/h)</label>
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        placeholder="Mín"
                        value={filters.rateMin || ''}
                        onChange={e => handleFilterChange('rateMin', e.target.value ? parseInt(e.target.value) : undefined)}
                        className="w-1/2"
                      />
                      <span className="text-slate-400">–</span>
                      <Input
                        type="number"
                        placeholder="Máx"
                        value={filters.rateMax || ''}
                        onChange={e => handleFilterChange('rateMax', e.target.value ? parseInt(e.target.value) : undefined)}
                        className="w-1/2"
                      />
                    </div>
                  </div>

                  {(filters.q || filters.skills.length || filters.availability.length || filters.rateMin || filters.rateMax || filters.location || filters.languages.length) && (
                    <Button variant="ghost" size="sm" className="w-full" onClick={() => {
                      setFilters({
                        q: '',
                        skills: [],
                        availability: [],
                        rateMin: undefined,
                        rateMax: undefined,
                        location: '',
                        languages: [],
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
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <ScrollReveal>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                      {total} {total === 1 ? 'profissional' : 'profissionais'} encontrado{total !== 1 ? 's' : ''}
                    </span>
                  </div>
                </ScrollReveal>

                <ScrollReveal direction="right">
                  <div className="flex items-center gap-2">
                    <Select
                      value={filters.sort}
                      onChange={e => handleFilterChange('sort', e.target.value)}
                      options={[
                        { value: 'createdAt', label: 'Mais recentes' },
                        { value: 'hourlyRate', label: 'Maior taxa' },
                        { value: 'rating', label: 'Melhor avaliado' },
                      ]}
                      className="w-[180px]"
                    />
                  </div>
                </ScrollReveal>
              </div>

              <ScrollReveal>
                {loading ? (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" aria-busy="true">
                    {[1, 2, 3, 4, 5, 6].map(i => (
                      <Card key={i} className="animate-pulse">
                        <div className="flex items-center gap-4">
                          <div className="h-16 w-16 rounded-full bg-slate-200 dark:bg-slate-700" />
                          <div className="flex-1 space-y-3">
                            <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded w-3/4" />
                            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/2" />
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : professionals.length === 0 ? (
                  <div className="text-center py-16">
                    <User className="h-12 w-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
                    <h3 className="font-display font-bold text-xl text-slate-950 dark:text-white mb-2">
                      Nenhum profissional encontrado
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 mb-6">
                      Tente ajustar seus filtros ou busque por outros termos.
                    </p>
                    <Button variant="ghost" onClick={() => {
                      setFilters({
                        q: '',
                        skills: [],
                        availability: [],
                        rateMin: undefined,
                        rateMax: undefined,
                        location: '',
                        languages: [],
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
                      {professionals.map(prof => (
                        <ProfessionalCard key={prof.id} professional={prof} />
                      ))}
                    </StaggerContainer>

                    {totalPages > 1 && (
                      <div className="flex items-center justify-center gap-2 mt-8">
                        <Button variant="ghost" size="sm" disabled={page === 1} onClick={() => setPage(p => p - 1)}>
                          <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <span className="text-sm text-slate-600 dark:text-slate-400 px-4">
                          Página {page} de {totalPages}
                        </span>
                        <Button variant="ghost" size="sm" disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>
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

function ProfessionalCard({ professional }: { professional: Profile & { user: { id: string; subscription: { plan: string } } } }) {
  const topSkills = professional.skills.slice(0, 3);
  
  return (
    <Link to={`/profissionais/${professional.userId}`} className="card-hover h-full">
      <div className="flex items-start gap-4">
        <Avatar src={professional.avatar} name={professional.fullName} size="xl" />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div>
              <h3 className="font-display font-bold text-lg text-slate-950 dark:text-white truncate">
                {professional.fullName}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 truncate">
                {professional.headline || 'Profissional'}
              </p>
            </div>
            {professional.user.subscription?.plan !== 'FREE' && (
              <Badge variant={professional.user.subscription.plan === 'PRO' ? 'primary' : 'success'} size="sm">
                {professional.user.subscription.plan}
              </Badge>
            )}
          </div>
          
          {professional.bio && (
            <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mb-3">
              {professional.bio}
            </p>
          )}
          
          <div className="flex flex-wrap gap-2 mb-3">
            {topSkills.map(skill => (
              <Badge key={skill.id} variant="outline" size="sm">
                {skill.name}
              </Badge>
            ))}
            {professional.skills.length > 3 && (
              <Badge variant="neutral" size="sm">+{professional.skills.length - 3}</Badge>
            )}
          </div>
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
            {professional.hourlyRate && (
              <span className="flex items-center gap-1 font-medium text-slate-950 dark:text-white">
                <DollarSign className="h-4 w-4" />
                {formatCurrency(professional.hourlyRate)}/h
              </span>
            )}
            <span className="flex items-center gap-1">
              <Globe className="h-4 w-4" />
              {availabilityLabels[professional.availability]}
            </span>
            {professional.location && (
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {professional.location}
              </span>
            )}
            {professional.languages.length > 0 && (
              <span className="flex items-center gap-1">
                <Languages className="h-4 w-4" />
                {professional.languages.join(', ')}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}