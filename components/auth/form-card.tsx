import { Card, CardContent } from '@/components/ui/card';
import { FormCardHeader } from '@/components/auth/form-card-header';
import { cn } from '@/lib/utils';
interface FormCardProps {
  title: string;
  description: string;
  className?: string;
  children: React.ReactNode;
  props?: React.ComponentPropsWithoutRef<'div'>;
}
export function FormCard({
  title,
  description,
  className,
  children,
  props,
}: FormCardProps) {
  return (
    <div className='flex min-h-svh w-full items-center justify-center p-6 md:p-10'>
      <div className={cn('flex flex-col gap-6', className)} {...props}>
        <Card className='w-full md:w-[400px] mx-auto bg-background'>
          <FormCardHeader title={title} description={description} />
          <CardContent className='space-y-4'>{children}</CardContent>
        </Card>
      </div>
    </div>
  );
}
