'use client';

import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { InputPassword } from '@/components/ui/input-password';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FormCard } from './form-card';
import { cn } from '@/lib/utils';
import { Mail, Lock } from 'lucide-react';

export function SignUpForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'form'>) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    if (password !== repeatPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard`,
        },
      });
      if (error) throw error;
      router.push('/auth/sign-up-success');
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormCard
      title='Sistema de Ventas'
      description='Ingresa tus credenciales para acceder al dashboard'
      showSocialHeader={true}
    >
      <form
        className={cn('flex flex-col gap-6', className)}
        {...props}
        onSubmit={handleSignUp}
      >
        <div className='flex flex-col gap-6'>
          <div className='grid gap-2'>
            <Label htmlFor='email'>Email</Label>
            <Input
              id='email'
              type='email'
              startIcon={Mail}
              placeholder='m@example.com'
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className='grid gap-2'>
            <div className='flex items-center'>
              <Label htmlFor='password'>Password</Label>
            </div>
            <InputPassword
              id='password'
              required
              startIcon={Lock}
              placeholder='********'
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <div className='grid gap-2'>
            <div className='flex items-center'>
              <Label htmlFor='repeat-password'>Repeat Password</Label>
            </div>
            <InputPassword
              id='repeat-password'
              required
              startIcon={Lock}
              placeholder='********'
              value={repeatPassword}
              onChange={e => setRepeatPassword(e.target.value)}
            />
          </div>
          {error && <p className='text-sm text-red-500'>{error}</p>}
          <Button type='submit' className='w-full' disabled={isLoading}>
            {isLoading ? 'Creating an account...' : 'Sign up'}
          </Button>
        </div>
        <div className='mt-4 text-center text-sm'>
          Already have an account?{' '}
          <Link href='/auth/login' className='underline underline-offset-4'>
            Login
          </Link>
        </div>
      </form>
    </FormCard>
  );
}
