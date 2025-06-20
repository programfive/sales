'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Lock } from 'lucide-react';

export function PasswordForm() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Cambiar Contraseña</CardTitle>
        <CardDescription>
          Para mayor seguridad, elige una contraseña fuerte.
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div className='space-y-2'>
          <Label htmlFor='current-password'>Contraseña Actual</Label>
          <Input id='current-password' startIcon={Lock} type='password' />
        </div>
        <div className='space-y-2'>
          <Label htmlFor='new-password'>Nueva Contraseña</Label>
          <Input id='new-password' startIcon={Lock} type='password' />
        </div>
        <div className='space-y-2'>
          <Label htmlFor='confirm-password'>Confirmar Nueva Contraseña</Label>
          <Input id='confirm-password' startIcon={Lock} type='password' />
        </div>
      </CardContent>
      <CardFooter>
        <Button className='w-full sm:w-auto'>Actualizar Contraseña</Button>
      </CardFooter>
    </Card>
  );
}
