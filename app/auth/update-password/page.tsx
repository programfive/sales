'use client';

import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { FormCard } from '@/components/modules/auth/form-card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Page() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      router.push('/dashboard');
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormCard
      title='Reset Your Password'
      description='Please enter your new password below.'
    >
      <form onSubmit={handleForgotPassword}>
        <div className='flex flex-col gap-6'>
          <div className='grid gap-2'>
            <Label htmlFor='password'>New password</Label>
            <Input
              id='password'
              type='password'
              placeholder='New password'
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          {error && <p className='text-sm text-red-500'>{error}</p>}
          <Button type='submit' className='w-full' disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Save new password'}
          </Button>
        </div>
      </form>
    </FormCard>
  );
}
