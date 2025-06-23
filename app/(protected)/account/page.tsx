'use client';

import { SettingsSection } from '@/components/profile/settings-section';
import { ActivitySection } from '@/components/profile/activity-section';
import { SecuritySection } from '@/components/profile/security-section';
import { ProfileSection } from '@/components/profile/profile-section';
import { UserData } from '@/types';
import { Badge } from '@/components/ui/badge';
import { MobileTabs, MobileTabsContent } from '@/components/ui/mobile-tabs';
import { User, Shield, Activity, Settings } from 'lucide-react';

const userData: UserData = {
  id: 1,
  name: 'María González',
  email: 'maria.gonzalez@empresa.com',
  avatarUrl: '/placeholder.svg?height=100&width=100',
  is_active: true,
  created_at: '2024-01-15T10:30:00Z',
  updated_at: '2024-06-20T14:45:00Z',
  roles: [
    { id: 1, name: 'Administrador', description: 'Acceso completo al sistema' },
    { id: 2, name: 'Vendedor', description: 'Gestión de ventas y clientes' },
  ],
  permissions: [
    'sales.create',
    'sales.read',
    'sales.update',
    'sales.delete',
    'products.read',
    'inventory.read',
    'customers.manage',
  ],
  stats: {
    totalSales: 156,
    totalRevenue: 45780.5,
    activeProducts: 234,
    totalCustomers: 89,
  },
};

const tabItems = [
  { value: 'profile', label: 'Perfil', icon: <User className='w-5 h-5' /> },
  {
    value: 'security',
    label: 'Seguridad',
    icon: <Shield className='w-5 h-5' />,
  },
  {
    value: 'activity',
    label: 'Actividad',
    icon: <Activity className='w-5 h-5' />,
  },
  {
    value: 'settings',
    label: 'Configuración',
    icon: <Settings className='w-5 h-5' />,
  },
];

export default function AccountPage() {
  return (
    <div className='container mx-auto p-6 max-w-6xl'>
      <div className='flex flex-col space-y-2 mb-8'>
        <div className='flex items-center justify-between'>
          <h1 className='text-3xl font-bold tracking-tight'>Mi Cuenta</h1>
          <Badge variant={userData.is_active ? 'default' : 'secondary'}>
            {userData.is_active ? 'Activo' : 'Inactivo'}
          </Badge>
        </div>
        <p className='text-muted-foreground'>
          Gestiona tu perfil y configuraciones del sistema
        </p>
      </div>

      <MobileTabs defaultValue='profile' className='space-y-6' items={tabItems}>
        <MobileTabsContent value='profile' className='space-y-6'>
          <ProfileSection userData={userData} />
        </MobileTabsContent>

        <MobileTabsContent value='security' className='space-y-6'>
          <SecuritySection />
        </MobileTabsContent>

        <MobileTabsContent value='activity' className='space-y-6'>
          <ActivitySection />
        </MobileTabsContent>

        <MobileTabsContent value='settings' className='space-y-6'>
          <SettingsSection />
        </MobileTabsContent>
      </MobileTabs>
    </div>
  );
}
