import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function StatCardSkeleton() {
  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
        <CardTitle className='text-sm font-medium'>
          <Skeleton className='h-4 w-24' />
        </CardTitle>
        <Skeleton className='h-4 w-4 rounded' />
      </CardHeader>
      <CardContent>
        <Skeleton className='h-8 w-16 mb-2' />
        <Skeleton className='h-3 w-32' />
      </CardContent>
    </Card>
  );
}
