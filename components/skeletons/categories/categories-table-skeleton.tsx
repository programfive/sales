import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export function CategoriesTableSkeleton() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Skeleton className='h-6 w-32' />
        </CardTitle>
        <CardDescription>
          <Skeleton className='h-4 w-64' />
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className='space-y-4'>
          {/* Search and filters skeleton */}
          <div className='flex items-center justify-between'>
            <Skeleton className='h-10 w-64' />
            <div className='flex gap-2'>
              <Skeleton className='h-10 w-24' />
              <Skeleton className='h-10 w-24' />
            </div>
          </div>

          {/* Table skeleton */}
          <div className='rounded-md border'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    <Skeleton className='h-4 w-8' />
                  </TableHead>
                  <TableHead>
                    <Skeleton className='h-4 w-20' />
                  </TableHead>
                  <TableHead>
                    <Skeleton className='h-4 w-24' />
                  </TableHead>
                  <TableHead>
                    <Skeleton className='h-4 w-32' />
                  </TableHead>
                  <TableHead>
                    <Skeleton className='h-4 w-32' />
                  </TableHead>
                  <TableHead>
                    <Skeleton className='h-4 w-20' />
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array.from({ length: 5 }).map((_, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Skeleton className='h-4 w-8' />
                    </TableCell>
                    <TableCell>
                      <Skeleton className='h-4 w-24' />
                    </TableCell>
                    <TableCell>
                      <Skeleton className='h-4 w-32' />
                    </TableCell>
                    <TableCell>
                      <Skeleton className='h-4 w-24' />
                    </TableCell>
                    <TableCell>
                      <Skeleton className='h-4 w-24' />
                    </TableCell>
                    <TableCell>
                      <div className='flex gap-2'>
                        <Skeleton className='h-8 w-8 rounded' />
                        <Skeleton className='h-8 w-8 rounded' />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination skeleton */}
          <div className='flex items-center justify-between'>
            <Skeleton className='h-4 w-32' />
            <div className='flex gap-2'>
              <Skeleton className='h-8 w-8 rounded' />
              <Skeleton className='h-8 w-8 rounded' />
              <Skeleton className='h-8 w-8 rounded' />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
