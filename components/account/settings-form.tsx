'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Bell, Palette, Languages } from 'lucide-react';

type UserData = {
  notifications: {
    newSales: boolean;
    lowStock: boolean;
    weeklyReports: boolean;
  };
  preferences: {
    theme: string;
    language: string;
  };
};

interface SettingsFormProps {
  userData: UserData;
}

export function SettingsForm({ userData }: SettingsFormProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Preferencias y Notificaciones</CardTitle>
        <CardDescription>
          Personaliza tu experiencia en la plataforma.
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-6'>
        <div className='space-y-4'>
          <h3 className='text-md font-medium'>Apariencia</h3>
          <div className='flex flex-col gap-4 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between'>
            <div className='space-y-0.5'>
              <Label className='flex items-center gap-2'>
                <Palette className='h-4 w-4' /> Tema
              </Label>
              <p className='text-xs text-muted-foreground'>
                Selecciona el tema para tu dashboard.
              </p>
            </div>
            <Select defaultValue={userData.preferences.theme}>
              <SelectTrigger className='w-full sm:w-[180px]'>
                <SelectValue placeholder='Seleccionar tema' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='light'>Claro</SelectItem>
                <SelectItem value='dark'>Oscuro</SelectItem>
                <SelectItem value='system'>Sistema</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className='flex flex-col gap-4 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between'>
            <div className='space-y-0.5'>
              <Label className='flex items-center gap-2'>
                <Languages className='h-4 w-4' /> Idioma
              </Label>
              <p className='text-xs text-muted-foreground'>
                Selecciona tu idioma de preferencia.
              </p>
            </div>
            <Select defaultValue={userData.preferences.language}>
              <SelectTrigger className='w-full sm:w-[180px]'>
                <SelectValue placeholder='Seleccionar idioma' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='es'>Español</SelectItem>
                <SelectItem value='en'>Inglés</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Separator />
        <div className='space-y-4'>
          <h3 className='text-md font-medium'>Notificaciones por Email</h3>
          <div className='space-y-2'>
            <div className='flex items-center justify-between'>
              <Label
                htmlFor='new-sales'
                className='font-normal flex items-center gap-2'
              >
                <Bell className='h-4 w-4' /> Nuevas Ventas
              </Label>
              <Switch
                id='new-sales'
                defaultChecked={userData.notifications.newSales}
              />
            </div>
            <div className='flex items-center justify-between'>
              <Label
                htmlFor='low-stock'
                className='font-normal flex items-center gap-2'
              >
                <Bell className='h-4 w-4' /> Stock Bajo
              </Label>
              <Switch
                id='low-stock'
                defaultChecked={userData.notifications.lowStock}
              />
            </div>
            <div className='flex items-center justify-between'>
              <Label
                htmlFor='weekly-reports'
                className='font-normal flex items-center gap-2'
              >
                <Bell className='h-4 w-4' /> Reportes Semanales
              </Label>
              <Switch
                id='weekly-reports'
                defaultChecked={userData.notifications.weeklyReports}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
