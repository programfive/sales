'use client';

import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';

interface LogoutButtonProps {
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
  children?: React.ReactNode;
  showIcon?: boolean;
}

export function LogoutButton({
  variant = 'default',
  size = 'default',
  className,
  children = 'Logout',
  showIcon = true,
}: LogoutButtonProps) {
  const router = useRouter();

  const logout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/auth/login');
  };

  return (
    <Button
      onClick={logout}
      variant={variant}
      size={size}
      className={className}
    >
      {showIcon && <LogOut className='mr-2 h-4 w-4' />}
      {children}
    </Button>
  );
}
