import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { StatCardSkeleton } from './stat-card-skeleton';
import { CategoriesTableSkeleton } from './categories-table-skeleton';

export function CategoriesPageSkeleton() {
  return (
    <div className='container mx-auto p-6 space-y-6'>
      {/* Header */}
      <div className='flex flex-col space-y-2'>
        <div className='flex items-center justify-between'>
          <div>
            <Skeleton className='h-9 w-32 mb-2' />
            <Skeleton className='h-5 w-80' />
          </div>
          <Skeleton className='h-10 w-36 rounded-md' />
        </div>
      </div>

      <div className='flex flex-col-reverse md:flex-col gap-4'>
        {/* Stats Cards */}
        <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
          {Array.from({ length: 3 }).map((_, index) => (
            <StatCardSkeleton key={index} />
          ))}
        </div>

        {/* Main Content */}
        <CategoriesTableSkeleton />
      </div>
    </div>
  );
}
