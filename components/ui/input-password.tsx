'use client';

import * as React from 'react';
import { Input, InputProps } from './input';
import { Eye, EyeOff } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface InputPasswordProps
  extends Omit<InputProps, 'type' | 'endIcon'> {
  showToggle?: boolean;
}

export const InputPassword = React.forwardRef<
  HTMLInputElement,
  InputPasswordProps
>(({ className, showToggle = true, ...props }, ref) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  if (!showToggle) {
    return <Input type='password' ref={ref} className={className} {...props} />;
  }

  return (
    <div className='relative'>
      <Input
        type={showPassword ? 'text' : 'password'}
        className={cn('pr-10', className)}
        ref={ref}
        {...props}
      />
      <button
        type='button'
        onClick={togglePasswordVisibility}
        className='absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors'
        tabIndex={-1}
      >
        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
    </div>
  );
});

InputPassword.displayName = 'InputPassword';
