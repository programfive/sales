'use client';

import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { cn } from '@/lib/utils';

interface ResponsiveTabsProps
  extends React.ComponentProps<typeof TabsPrimitive.Root> {
  items: Array<{ value: string; label: string; icon?: React.ReactNode }>;
}

function ResponsiveTabs({ items, className, ...props }: ResponsiveTabsProps) {
  return (
    <TabsPrimitive.Root
      data-slot='tabs'
      className={cn('flex flex-col gap-4', className)}
      {...props}
    >
      <div className='relative w-full'>
        <TabsPrimitive.List className='w-full h-auto bg-muted text-muted-foreground rounded-lg p-1 flex flex-col sm:flex-row sm:flex-nowrap sm:overflow-x-auto sm:scrollbar-hide sm:scroll-smooth sm:snap-x sm:snap-mandatory gap-1'>
          {items.map(item => (
            <TabsPrimitive.Trigger
              key={item.value}
              value={item.value}
              className={cn(
                'flex-1 sm:flex-none sm:snap-start sm:flex-shrink-0 whitespace-nowrap px-4 py-3 text-sm font-medium rounded-md transition-all duration-200',
                'data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm',
                'hover:bg-muted/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                'disabled:pointer-events-none disabled:opacity-50',
                'min-h-[44px] sm:min-h-[36px]', // Touch-friendly on mobile
                'flex items-center justify-center sm:justify-start'
              )}
            >
              <div className='flex items-center gap-2 sm:gap-2'>
                {item.icon && (
                  <span className='flex-shrink-0'>{item.icon}</span>
                )}
                <span className='hidden sm:inline'>{item.label}</span>
                <span className='sm:hidden text-xs'>{item.label}</span>
              </div>
            </TabsPrimitive.Trigger>
          ))}
        </TabsPrimitive.List>
      </div>
    </TabsPrimitive.Root>
  );
}

function ResponsiveTabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot='tabs-content'
      className={cn('flex-1 outline-none', className)}
      {...props}
    />
  );
}

export { ResponsiveTabs, ResponsiveTabsContent };
