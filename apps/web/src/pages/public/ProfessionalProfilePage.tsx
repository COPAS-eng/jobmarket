import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import { cn, formatCurrency, formatDate } from '@/utils/cn';
import {
  MapPin,
  Globe,
  Clock,
  DollarSign,
  Code,
  Palette,
  Briefcase,
  Linkedin,
  Github,
  ExternalLink,
  Mail,
  ArrowLeft,
  Star,
  Share2,
  Bookmark,
} from 'lucide-react';
import { Profile } from '@jobmarket/shared/types';
import { usersApi } from '@/services/api';
import { useToast } from '@/components/ui/Toast';

export function ProfessionalProfilePage() {
  const { id } = useParams<{ id: string }>();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    if (!id) return;
    const fetchProfile = async () => {
      try {
        const response = await usersApi.getProfessional(id);
        setProfile(response.data.data);
      } catch {
        toast.error('Profissional não encontrado');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [id, toast]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="animate-pulse space-y-8">
          <div className="flex items-center gap-6">
            <div className="h-24 w-24 rounded-full bg-slate-200 dark:bg-slate-700" />
            <div className="flex-1 space-y-4">
              <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded w-1/2" />
              <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded w-1/3" />
              <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded w-1/4" />
            </div>
          </div>
          <div className="h-64 bg-slate-200 dark:bg-slate-700 rounded" />
          <div className="grid grid-cols-3 gap-4">
            {[1,2,3].map(i => <div key={i} className="h-10 bg-slate-200 dark:bg-slate-700 rounded" />)}
          </div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h1 className="font-display font-bold text-3xl text-slate-950 dark:text-white mb-4">
          Profissional não encontrado
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mb-8">
          Este perfil pode ter sido removido ou não existe mais.
        </p>
        <Button asChild>
          <Link to="/profissionais">Voltar para profissionais</Link>
        </Button>
      </div>
    );
  }

  const topSkills = profile.skills.slice(0, 6);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back button */}
        <ScrollReveal>
          <Button variant="ghost" size="sm" asChild className="mb-6">
            <Link to="/profissionais" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Voltar
            </Link>
          </Button>
        </ScrollReveal>

        {/* Profile Header */}
        <ScrollReveal>
          <Card className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent" />
            <div className="relative flex flex-col sm:flex-row items-center sm:items-start gap-6 p-6 sm:p-8">
              <Avatar src={profile.avatar} name={profile.fullName} size="2xl" className="ring-4 ring-white dark:ring-slate-950" />
              <div className="flex-1 text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-3 mb-2">
                  <h1 className="font-display font-bold text-3xl text-slate-950 dark:text-white">
                    {profile.fullName}
                  </h1>
                  {profile.user?.subscription?.plan !== 'FREE' && (
                    <Badge variant={profile.user.subscription.plan === 'PRO' ? 'primary' : 'success'}>
                      {profile.user.subscription.plan}
                    </Badge>
                  )}
                </div>
                <p className="text-xl text-slate-600 dark:text-slate-300 mb-3">
                  {profile.headline || 'Profissional disponível para novas oportunidades'}
                </p>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-sm text-slate-500 dark:text-slate-400">
                  {profile.availability !== 'UNAVAILABLE' && (
                    <span className="flex items-center gap-1">
                      <Globe className="h-4 w-4" />
                      Disponível: {profile.availability === 'FULL_TIME' ? 'Tempo integral' : profile.availability === 'PART_TIME' ? 'Meio período' : 'Freelance'}
                    </span>
                  )}
                  {profile.hourlyRate && (
                    <span className="flex items-center gap-1 font-medium text-slate-950 dark:text-white">
                      <DollarSign className="h-4 w-4" />
                      {formatCurrency(profile.hourlyRate)}/h
                    </span>
                  )}
                  {profile.location && (
                    <span className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {profile.location}
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-4">
                  {profile.website && (
                    <a href={profile.website} target="_blank" rel="noopener noreferrer" className="text-cyan-500 hover:text-cyan-400 flex items-center gap-1">
                      <ExternalLink className="h-4 w-4" /> Portfolio
                    </a>
                  )}
                  {profile.linkedin && (
                    <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="text-cyan-500 hover:text-cyan-400 flex items-center gap-1">
                      <Linkedin className="h-4 w-4" /> LinkedIn
                    </a>
                  )}
                  {profile.github && (
                    <a href={profile.github} target="_blank" rel="noopener noreferrer" className="text-cyan-500 hover:text-cyan-400 flex items-center gap-1">
                      <Github className="h-4 w-4" /> GitHub
                    </a>
                  )}
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`mailto:${profile.user?.email || '#'}`}>
                      <Mail className="h-4 w-4 mr-2" /> Contatar
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </ScrollReveal>

        {/* About */}
        {profile.bio && (
          <ScrollReveal delay={0.1}>
            <Card>
              <div className="flex items-center gap-2 mb-4">
                <Code className="h-5 w-5 text-cyan-500" />
                <h2 className="font-display font-bold text-xl text-slate-950 dark:text-white">Sobre</h2>
              </div>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
                {profile.bio}
              </p>
            </Card>
          </ScrollReveal>
        )}

        {/* Skills */}
        <ScrollReveal delay={0.2}>
          <Card>
            <div className="flex items-center gap-2 mb-4">
              <Code className="h-5 w-5 text-cyan-500" />
              <h2 className="font-display font-bold text-xl text-slate-950 dark:text-white">
                Skills ({profile.skills.length})
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {profile.skills.map(skill => (
                <Badge key={skill.id} variant="outline">
                  {skill.name}
                </Badge>
              ))}
            </div>
          </Card>
        </ScrollReveal>

        {/* Languages */}
        {profile.languages.length > 0 && (
          <ScrollReveal delay={0.3}>
            <Card>
              <div className="flex items-center gap-2 mb-4">
                <Code className="h-5 w-5 text-cyan-500" />
                <h2 className="font-display font-bold text-xl text-slate-950 dark:text-white">Idiomas</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {profile.languages.map((lang, i) => (
                  <Badge key={i} variant="neutral">{lang}</Badge>
                ))}
              </div>
            </Card>
          </ScrollReveal>
        )}

        {/* Portfolio */}
        {profile.portfolio?.length > 0 && (
          <ScrollReveal delay={0.4}>
            <Card>
              <div className="flex items-center gap-2 mb-4">
                <Briefcase className="h-5 w-5 text-cyan-500" />
                <h2 className="font-display font-bold text-xl text-slate-950 dark:text-white">
                  Portfolio ({profile.portfolio.length})
                </h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {profile.portfolio.map((item, i) => (
                  <Link key={i} to={item.projectUrl || '#'} target="_blank" rel="noopener noreferrer" className="card-hover group">
                    {item.imageUrl && (
                      <div className="h-32 rounded-xl overflow-hidden mb-3 relative">
                        <img src={item.imageUrl} alt={item.title} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      </div>
                    )}
                    <h3 className="font-medium text-slate-950 dark:text-white group-hover:text-cyan-500 transition-colors">
                      {item.title}
                    </h3>
                    {item.description && (
                      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                        {item.description}
                      </p>
                    )}
                  </Link>
                ))}
              </div>
            </Card>
          </ScrollReveal>
        )}

        {/* Footer CTA */}
        <ScrollReveal delay={0.5}>
          <Card className="bg-gradient-to-br from-slate-900 to-slate-950 border-cyan-500/20 text-center">
            <div className="max-w-xl mx-auto">
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-white mb-4">
                Quer trabalhar com {profile.fullName.split(' ')[0]}?
              </h2>
              <p className="text-slate-300 mb-6">
                Envie uma proposta direta ou convide para uma vaga. Profissionais respondem em média em 4 horas.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Button size="lg" asChild>
                  <Link to={`/propostas/nova?professional=${profile.userId}`}>
                    Enviar proposta
                  </Link>
                </Button>
                <Button size="lg" variant="ghost" className="border-slate-700 hover:bg-slate-800 text-white" asChild>
                  <Link to="/vagas/nova">
                    Convidar para vaga
                  </Link>
                </Button>
              </div>
            </div>
          </Card>
        </ScrollReveal>
      </div>
    </div>
  );
}