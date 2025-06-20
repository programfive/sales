'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Trash2, LogOut } from 'lucide-react';

export function DangerZone() {
  return (
    <Card className='border-destructive'>
      <CardHeader>
        <CardTitle>Zona de Peligro</CardTitle>
        <CardDescription>Acciones permanentes y destructivas.</CardDescription>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div className='flex flex-col gap-4 rounded-lg border border-destructive/50 p-4 sm:flex-row sm:items-center sm:justify-between'>
          <div>
            <h4 className='font-semibold'>Eliminar Cuenta</h4>
            <p className='text-sm text-muted-foreground'>
              Se eliminarán permanentemente tu cuenta y todos tus datos.
            </p>
          </div>
          <Button variant='destructive' className='w-full sm:w-auto'>
            <Trash2 className='mr-2 h-4 w-4' />
            Eliminar mi cuenta
          </Button>
        </div>
        <div className='flex flex-col gap-4 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between'>
          <div>
            <h4 className='font-semibold'>
              Cerrar Sesión en Otros Dispositivos
            </h4>
            <p className='text-sm text-muted-foreground'>
              Para mayor seguridad, cierra todas las demás sesiones activas.
            </p>
          </div>
          <Button variant='outline' className='w-full sm:w-auto'>
            <LogOut className='mr-2 h-4 w-4' />
            Cerrar sesiones
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
