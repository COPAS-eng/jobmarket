import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { Button } from '@/components/ui/Button';
import { Input, Select } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { useToast } from '@/components/ui/Toast';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/utils/cn';
import { registerSchema } from '@/shared/validators';
import { UserRole } from '@/shared';
import {
  User,
  Briefcase,
  Eye,
  EyeOff,
  ArrowRight,
  Loader2,
  CheckCircle,
} from 'lucide-react';

type RegisterForm = {
  email: string;
  password: string;
  confirmPassword: string;
  role: UserRole;
  fullName: string;
  acceptTerms: boolean;
};

const roleOptions = [
  { value: 'PROFISSIONAL', label: 'Sou profissional', description: 'Quero encontrar vagas e projetos', icon: User },
  { value: 'EMPREGADOR', label: 'Sou empresa/empregador', description: 'Quero contratar talentos', icon: Briefcase },
];

export function RegisterPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { register: registerUser } = useAuth();
  const toast = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const redirectTo = searchParams.get('redirect') || '/dashboard';
  const roleFromUrl = searchParams.get('role') as UserRole | null;

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema.shape.body),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      role: (roleFromUrl || 'PROFISSIONAL') as UserRole,
      fullName: '',
      acceptTerms: false,
    },
  });

  const watchedRole = watch('role');

  const onSubmit = async (data: RegisterForm) => {
    const { confirmPassword, acceptTerms, ...registerData } = data;
    setLoading(true);
    try {
      await registerUser(registerData);
      toast.success('Conta criada com sucesso! Bem-vindo ao JobMarket.');
      navigate(redirectTo, { replace: true });
    } catch (error: any) {
      const message = error.response?.data?.error?.message || 'Erro ao criar conta';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center px-4 py-12">
      <ScrollReveal>
        <Card className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link to="/" className="font-display font-bold text-2xl text-slate-950 dark:text-white inline-block mb-6">
              JobMarket
            </Link>
            <h1 className="font-display font-bold text-2xl text-slate-950 dark:text-white mb-2">
              Crie sua conta
            </h1>
            <p className="text-slate-500 dark:text-slate-400">
              Junte-se a milhares de profissionais e empresas
            </p>
          </div>

          {/* Role Selection */}
          <div className="mb-6">
            <label className="label">Tipo de conta</label>
            <div className="grid grid-cols-2 gap-3" role="radiogroup" aria-label="Tipo de conta">
              {roleOptions.map(option => {
                const Icon = option.icon;
                const isSelected = watchedRole === option.value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setValue('role', option.value as UserRole)}
                    role="radio"
                    aria-checked={isSelected}
                    className={cn(
                      'relative p-4 rounded-xl border-2 transition-all duration-200 text-left',
                      isSelected
                        ? 'border-cyan-500 bg-cyan-500/5 dark:bg-cyan-500/10'
                        : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        'h-10 w-10 rounded-lg flex items-center justify-center',
                        isSelected ? 'bg-cyan-500' : 'bg-slate-100 dark:bg-slate-800'
                      )}>
                        <Icon className={cn('h-5 w-5', isSelected ? 'text-white' : 'text-slate-600 dark:text-slate-400')} />
                      </div>
                      <div>
                        <p className={cn('font-medium', isSelected ? 'text-slate-950 dark:text-white' : 'text-slate-700 dark:text-slate-300')}>
                          {option.label}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{option.description}</p>
                      </div>
                    </div>
                    {isSelected && (
                      <div className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-cyan-500 flex items-center justify-center">
                        <CheckCircle className="h-3 w-3 text-white" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <Input
              label="Nome completo"
              type="text"
              placeholder="João Silva"
              autoComplete="name"
              error={errors.fullName?.message}
              {...register('fullName')}
            />

            <Input
              label="E-mail"
              type="email"
              placeholder="seu@email.com"
              autoComplete="email"
              error={errors.email?.message}
              {...register('email')}
            />

            <div className="relative">
              <Input
                label="Senha"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                autoComplete="new-password"
                error={errors.password?.message}
                {...register('password')}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-[38px] text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>

            <Input
              label="Confirmar senha"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              autoComplete="new-password"
error={errors.confirmPassword?.message}
                {...register('confirmPassword')}
              />

            {/* Terms */}
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="terms"
                className="h-4 w-4 mt-0.5 rounded border-slate-300 text-cyan-700 focus:ring-cyan-500"
                {...register('acceptTerms', { required: true })}
              />
              <label htmlFor="terms" className="text-sm text-slate-600 dark:text-slate-400">
                Aceito os <Link to="/termos" className="text-cyan-700 hover:text-cyan-600 underline">Termos de Uso</Link> e a <Link to="/privacidade" className="text-cyan-700 hover:text-cyan-600 underline">Política de Privacidade</Link>
              </label>
            </div>

            {errors.acceptTerms && (
              <p className="text-sm text-red-500" role="alert" aria-live="assertive">Você deve aceitar os termos para continuar</p>
            )}

            <Button type="submit" className="w-full" size="lg" loading={loading}>
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin mr-2" />
                  Criando conta...
                </>
              ) : (
                <>
                  Criar conta grátis
                  <ArrowRight className="h-5 w-5 ml-2" />
                </>
              )}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
            Já tem conta?{' '}
            <Link to="/login" className="text-cyan-700 hover:text-cyan-600 font-medium">
              Faça login
            </Link>
          </p>
        </Card>
      </ScrollReveal>
    </div>
  );
}