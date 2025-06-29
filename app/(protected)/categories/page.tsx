import { Plus, Package, TrendingUp, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Category } from '@/types';
import { CategoriesTable } from '@/components/modules/categories/categories-table';
import { StatCard } from '@/components/cards/start-card';
import { getCategories, categoriesActive } from '@/actions/categories';
import Link from 'next/link';

export default async function CategoriesPage() {
  const [categoriesData, activeData] = await Promise.all([
    getCategories(),
    categoriesActive(),
  ]);

  const categories = categoriesData || [];
  const activeCategoriesCount =
    activeData?.data?.filter((cat: any) => cat.is_active).length || 0;

  const stats = [
    {
      title: 'Total Categorías',
      value: categories?.length || 0,
      icon: Package,
      description: 'Categorías registradas',
    },
    {
      title: 'Categorías Activas',
      value: activeCategoriesCount,
      icon: TrendingUp,
      description: 'En uso actualmente',
    },
    {
      title: 'Categoría con más productos',
      value: 'Electrónicos',
      icon: ShoppingBag,
      description: 'Categoría con más productos',
    },
  ];

  return (
    <div className='container mx-auto px-4 md:p-6 space-y-6'>
      {/* Header */}
      <div className='flex flex-col space-y-2'>
        <div className='flex items-center justify-between'>
          <div>
            <h1 className='text-3xl font-bold tracking-tight'>Categorías</h1>
            <p className='text-muted-foreground'>
              Gestiona las categorías de productos del sistema
            </p>
          </div>
          <Button asChild className='flex items-center gap-2'>
            <Link href='/categories/create'>
              <Plus className='h-4 w-4' />
              Nueva Categoría
            </Link>
          </Button>
        </div>
      </div>

      <div className='flex flex-col-reverse md:flex-col gap-4 '>
        {/* Stats Cards */}
        <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              title={stat.title}
              value={stat.value}
              description={stat.description}
              Icon={stat.icon}
            />
          ))}
        </div>

        {/* Main Content */}
        <Card>
          <CardHeader>
            <CardTitle>Categorías</CardTitle>
            <CardDescription>
              Lista de todas las categorías disponibles en el sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CategoriesTable categories={categories} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
