import { CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ShoppingCart } from 'lucide-react';

interface FormCardHeaderProps {
  title: string;
  description: string;
}
export function FormCardHeader({ title, description }: FormCardHeaderProps) {
  return (
    <CardHeader className='space-y-4 text-center'>
      <div className='mx-auto w-12 h-12 bg-primary rounded-xl flex items-center justify-center'>
        <ShoppingCart className='w-6 h-6 text-primary-foreground' />
      </div>
      <div>
        <CardTitle className='text-2xl font-bold text-foreground'>
          {title}
        </CardTitle>
        <CardDescription className='text-muted-foreground mt-2'>
          {description}
        </CardDescription>
      </div>
    </CardHeader>
  );
}
