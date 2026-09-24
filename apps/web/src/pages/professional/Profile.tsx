import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input, Textarea, Select } from '@/components/ui/Input';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/utils/cn';
import {
  User,
  Camera,
  Save,
  Loader2,
  Globe,
  Linkedin,
  Github,
  ExternalLink,
  Mail,
  Code,
  Briefcase,
  Languages,
  MapPin,
  Clock,
  DollarSign,
} from 'lucide-react';

export function ProfessionalProfile() {
  const { user } = useAuth();

  return (
    <div className="max-w-4xl mx-auto">
      <ScrollReveal>
        <div className="mb-8">
          <h1 className="font-display font-bold text-3xl text-slate-950 dark:text-white">
            Meu Perfil
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Gerencie suas informações profissionais e preferências.
          </p>
        </div>
      </ScrollReveal>

      <form className="space-y-8">
        {/* Avatar & Basic Info */}
        <ScrollReveal>
          <Card>
            <h2 className="font-display font-bold text-xl text-slate-950 dark:text-white mb-6">
              Informações básicas
            </h2>
            <div className="flex items-center gap-6 mb-6">
              <div className="relative">
                <Avatar src={user?.profile?.avatar} name={user?.profile?.fullName} size="2xl" />
                <label className="absolute bottom-0 right-0 cursor-pointer">
                  <input type="file" accept="image/*" className="sr-only" />
                  <button type="button" className="h-10 w-10 rounded-full bg-cyan-500 text-white flex items-center justify-center hover:bg-cyan-600 transition-colors">
                    <Camera className="h-5 w-5" />
                  </button>
                </label>
              </div>
              <div className="flex-1 space-y-4">
                <Input
                  label="Nome completo"
                  value={user?.profile?.fullName || ''}
                  placeholder="João Silva"
                  icon={<User className="h-5 w-5" />}
                />
                <Input
                  label="Título profissional"
                  value={user?.profile?.headline || ''}
                  placeholder="Full Stack Developer | React & Node.js"
                  icon={<Briefcase className="h-5 w-5" />}
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <Input
                label="E-mail"
                type="email"
                value={user?.email || ''}
                disabled
                icon={<Mail className="h-5 w-5" />}
              />
              <Input
                label="Localização"
                value={user?.profile?.location || ''}
                placeholder="São Paulo, SP"
                icon={<MapPin className="h-5 w-5" />}
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <Select
                label="Disponibilidade"
                value={user?.profile?.availability || 'FREELANCE'}
                options={[
                  { value: 'FULL_TIME', label: 'Tempo integral' },
                  { value: 'PART_TIME', label: 'Meio período' },
                  { value: 'FREELANCE', label: 'Freelance' },
                  { value: 'UNAVAILABLE', label: 'Indisponível' },
                ]}
              />
              <Input
                label="Taxa horária (R$)"
                type="number"
                value={user?.profile?.hourlyRate ? (user.profile.hourlyRate / 100).toString() : ''}
                placeholder="150"
                icon={<DollarSign className="h-5 w-5" />}
              />
            </div>
          </Card>
        </ScrollReveal>

        {/* Bio */}
        <ScrollReveal>
          <Card>
            <h2 className="font-display font-bold text-xl text-slate-950 dark:text-white mb-6">
              Sobre mim
            </h2>
            <Textarea
              label="Bio"
              value={user?.profile?.bio || ''}
              placeholder="Conte um pouco sobre sua experiência, especialidades e o que você busca..."
              rows={6}
              icon={<User className="h-5 w-5" />}
            />
          </Card>
        </ScrollReveal>

        {/* Skills */}
        <ScrollReveal>
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display font-bold text-xl text-slate-950 dark:text-white">
                Skills
              </h2>
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Adicionar skill
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {user?.profile?.skills?.map(skill => (
                <Badge key={skill.id} variant="outline" className="gap-1">
                  {skill.name}
                  <button type="button" className="ml-1 hover:text-red-500">
                    ×
                  </button>
                </Badge>
              ))}
            </div>
          </Card>
        </ScrollReveal>

        {/* Links */}
        <ScrollReveal>
          <Card>
            <h2 className="font-display font-bold text-xl text-slate-950 dark:text-white mb-6">
              Links sociais
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <Input
                label="Website / Portfolio"
                type="url"
                value={user?.profile?.website || ''}
                placeholder="https://seuportfolio.com"
                icon={<ExternalLink className="h-5 w-5" />}
              />
              <Input
                label="LinkedIn"
                type="url"
                value={user?.profile?.linkedin || ''}
                placeholder="https://linkedin.com/in/seuusuario"
                icon={<Linkedin className="h-5 w-5" />}
              />
              <Input
                label="GitHub"
                type="url"
                value={user?.profile?.github || ''}
                placeholder="https://github.com/seuusuario"
                icon={<Github className="h-5 w-5" />}
              />
              <Input
                label="Outro link"
                type="url"
                value={user?.profile?.portfolio || ''}
                placeholder="https://dribbble.com/seuusuario"
                icon={<Globe className="h-5 w-5" />}
              />
            </div>
          </Card>
        </ScrollReveal>

        {/* Languages */}
        <ScrollReveal>
          <Card>
            <h2 className="font-display font-bold text-xl text-slate-950 dark:text-white mb-6">
              Idiomas
            </h2>
            <div className="flex flex-wrap gap-2">
              {user?.profile?.languages?.map((lang, i) => (
                <Badge key={i} variant="neutral" className="gap-1">
                  {lang}
                  <button type="button" className="ml-1 hover:text-red-500">×</button>
                </Badge>
              ))}
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Adicionar idioma
              </Button>
            </div>
          </Card>
        </ScrollReveal>

        {/* Save */}
        <ScrollReveal>
          <div className="flex justify-end">
            <Button size="lg" loading={false}>
              <Save className="h-5 w-5 mr-2" />
              Salvar alterações
            </Button>
          </div>
        </ScrollReveal>
      </form>
    </div>
  );
}