import {
  LayoutDashboard,
  Package,
  BarChart3,
  ShoppingCart,
  ShoppingBag,
  Users,
  Building2,
  Tags,
  FileSpreadsheet,
  Settings,
  HelpCircle,
  Search,
  Database,
  TrendingUp,
  Warehouse,
} from 'lucide-react';

export const data = {
  navMain: [
    {
      title: 'Dashboard',
      url: '/dashboard',
      icon: LayoutDashboard,
    },
    {
      title: 'Productos',
      url: '/products',
      icon: Package,
    },
    {
      title: 'Inventario',
      url: '/inventory',
      icon: Warehouse,
    },
    {
      title: 'Ventas',
      url: '/sales',
      icon: ShoppingCart,
    },
    {
      title: 'Compras',
      url: '/purchases',
      icon: ShoppingBag,
    },
    {
      title: 'Clientes',
      url: '/customers',
      icon: Users,
    },
    {
      title: 'Proveedores',
      url: '/suppliers',
      icon: Building2,
    },
    {
      title: 'Categorías',
      url: '/categories',
      icon: Tags,
    },
  ],
  navClouds: [
    {
      title: 'Gestión',
      icon: TrendingUp,
      isActive: true,
      url: '#',
      items: [
        {
          title: 'Movimientos',
          url: '/inventory-movements',
        },
        {
          title: 'Mermas',
          url: '/wastes',
        },
      ],
    },
    {
      title: 'Reportes',
      icon: FileSpreadsheet,
      url: '#',
      items: [
        {
          title: 'Ventas',
          url: '/reports/sales',
        },
        {
          title: 'Inventario',
          url: '/reports/inventory',
        },
        {
          title: 'Compras',
          url: '/reports/purchases',
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: 'Configuración',
      url: '/settings',
      icon: Settings,
    },
    {
      title: 'Ayuda',
      url: '/help',
      icon: HelpCircle,
    },
    {
      title: 'Buscar',
      url: '/search',
      icon: Search,
    },
  ],
  documents: [
    {
      name: 'Base de Datos',
      url: '/database',
      icon: Database,
    },
    {
      name: 'Reportes',
      url: '/reports',
      icon: FileSpreadsheet,
    },
    {
      name: 'Analytics',
      url: '/analytics',
      icon: BarChart3,
    },
  ],
};
