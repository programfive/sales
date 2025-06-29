'use client';

import { Separator } from '@/components/ui/separator';
import { Icons } from '@/components/ui/icons';
import { SocialButton } from '@/components/modules/auth/social-button';
export function SocialHeader() {
  return (
    <>
      <div className='relative'>
        <div className='absolute inset-0 flex items-center'>
          <Separator className='w-full' />
        </div>
        <div className='relative flex justify-center text-xs uppercase'>
          <span className='bg-background px-2 text-muted-foreground'>
            Continúa con
          </span>
        </div>
      </div>
      <div className='grid grid-cols-2 gap-4'>
        <SocialButton Icon={Icons.google} label='Google' />
        <SocialButton Icon={Icons.gitHub} label='GitHub' />
      </div>
    </>
  );
}
