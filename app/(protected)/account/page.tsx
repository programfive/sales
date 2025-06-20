'use client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProfileForm } from '@/components/account/profile-form';
import { PasswordForm } from '@/components/account/password-form';
import { SettingsForm } from '@/components/account/settings-form';
import { DangerZone } from '@/components/account/danger-zone';

const userData = {
  name: 'Josue Guzman',
  email: 'josue@example.com',
  avatarUrl: 'https://github.com/shadcn.png',
  role: 'Admin',
  createdAt: '2023-01-15T10:30:00Z',
  notifications: {
    newSales: true,
    lowStock: true,
    weeklyReports: false,
  },
  preferences: {
    theme: 'dark',
    language: 'es',
  },
};

export default function AccountPage() {
  return (
    <div className='flex-1 max-w-3xl space-y-4 p-4 md:p-8 pt-6'>
      <div className='flex items-center justify-between space-y-2'>
        <h2 className='text-3xl font-bold tracking-tight'>
          Configuración de la Cuenta
        </h2>
      </div>
      <Tabs defaultValue='profile' className='space-y-4'>
        <TabsList>
          <TabsTrigger value='profile'>Perfil</TabsTrigger>
          <TabsTrigger value='password'>Contraseña</TabsTrigger>
          <TabsTrigger value='settings'>Preferencias</TabsTrigger>
        </TabsList>
        <TabsContent value='profile' className='space-y-4'>
          <ProfileForm userData={userData} />
        </TabsContent>
        <TabsContent value='password' className='space-y-4'>
          <PasswordForm />
        </TabsContent>
        <TabsContent value='settings' className='space-y-4'>
          <SettingsForm userData={userData} />
          <DangerZone />
        </TabsContent>
      </Tabs>
    </div>
  );
}
