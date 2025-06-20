'use client';

import * as React from 'react';
import { Bell, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type Notification = {
  id: number;
  type: 'success' | 'warning' | 'info';
  title: string;
  message: string;
  time: string;
  read: boolean;
};

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: 1,
    type: 'success',
    title: 'Venta completada',
    message: 'La venta #12345 ha sido procesada exitosamente',
    time: '2 min ago',
    read: false,
  },
  {
    id: 2,
    type: 'warning',
    title: 'Stock bajo',
    message: 'El producto "Laptop HP" tiene stock bajo (3 unidades)',
    time: '15 min ago',
    read: false,
  },
  {
    id: 3,
    type: 'info',
    title: 'Nuevo proveedor',
    message: 'Se ha agregado el proveedor "Tech Solutions"',
    time: '1 hora ago',
    read: true,
  },
];

const NotificationIcon = ({ type }: { type: Notification['type'] }) => {
  const icons = {
    success: <CheckCircle className='h-4 w-4 text-green-500' />,
    warning: <AlertCircle className='h-4 w-4 text-yellow-500' />,
    info: <Info className='h-4 w-4 text-blue-500' />,
  };
  return icons[type] || <Info className='h-4 w-4' />;
};

export function NotificationButton() {
  const [notifications] = React.useState<Notification[]>(MOCK_NOTIFICATIONS);
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' size='sm' className='relative'>
          <Bell className='h-4 w-4' />
          {unreadCount > 0 && (
            <Badge
              variant='destructive'
              className='absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs'
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-80'>
        <div className='flex items-center justify-between p-2'>
          <h4 className='text-sm font-medium'>Notificaciones</h4>
          <Button variant='ghost' size='sm' className='h-auto p-0 text-xs'>
            Marcar todas como leídas
          </Button>
        </div>
        <DropdownMenuSeparator />
        {notifications.length === 0 ? (
          <div className='p-4 text-center text-sm text-muted-foreground'>
            No hay notificaciones
          </div>
        ) : (
          notifications.map(notification => (
            <DropdownMenuItem key={notification.id} className='p-3'>
              <div className='flex items-start gap-3'>
                <NotificationIcon type={notification.type} />
                <div className='flex-1 space-y-1'>
                  <p className='text-sm font-medium leading-none'>
                    {notification.title}
                  </p>
                  <p className='text-xs text-muted-foreground'>
                    {notification.message}
                  </p>
                  <p className='text-xs text-muted-foreground'>
                    {notification.time}
                  </p>
                </div>
                {!notification.read && (
                  <div className='h-2 w-2 rounded-full bg-blue-500' />
                )}
              </div>
            </DropdownMenuItem>
          ))
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem className='text-center'>
          <span className='text-xs'>Ver todas las notificaciones</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
