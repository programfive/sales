'use client';

import { cn } from '@/lib/utils';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FormCard } from './form-card';
import { Mail } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    try {
      // The url which will be included in the email. This URL needs to be configured in your redirect URLs in the Supabase dashboard at https://supabase.com/dashboard/project/_/auth/url-configuration
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/update-password`,
      });
      if (error) throw error;
      setSuccess(true);
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      {success ? (
        <FormCard
          title='Revisa tu Email'
          description='Instrucciones de restablecimiento enviadas'
        >
          <p className='text-sm text-muted-foreground text-center'>
            Si te registraste usando tu email y contraseña, recibirás un email
            para restablecer tu contraseña.
          </p>
        </FormCard>
      ) : (
        <FormCard
          title='Restablecer Contraseña'
          description='Ingresa tu email y te enviaremos un enlace para restablecer tu contraseña'
        >
          <form onSubmit={handleForgotPassword}>
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
              {error && <p className='text-sm text-red-500'>{error}</p>}
              <Button type='submit' className='w-full' disabled={isLoading}>
                {isLoading ? 'Enviando...' : 'Enviar email de restablecimiento'}
              </Button>
            </div>
            <div className='mt-4 text-center text-sm'>
              ¿Ya tienes una cuenta?{' '}
              <Link href='/auth/login' className='underline underline-offset-4'>
                Iniciar Sesión
              </Link>
            </div>
          </form>
        </FormCard>
      )}
    </div>
  );
}
