'use client';

import * as React from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import { ScrollArea } from '@/components/ui/scroll-area';

type SearchResult = {
  id: string;
  title: string;
  type: 'product' | 'sale' | 'purchase' | 'customer' | 'supplier';
  url: string;
  icon?: React.ReactNode;
};

const MOCK_RESULTS: SearchResult[] = [
  {
    id: '1',
    title: 'Laptop HP Pavilion',
    type: 'product',
    url: '/products/1',
  },
  {
    id: '2',
    title: 'Venta #12345',
    type: 'sale',
    url: '/sales/12345',
  },
  {
    id: '3',
    title: 'Compra #789',
    type: 'purchase',
    url: '/purchases/789',
  },
  {
    id: '4',
    title: 'Juan Pérez',
    type: 'customer',
    url: '/customers/4',
  },
  {
    id: '5',
    title: 'Tech Solutions Inc.',
    type: 'supplier',
    url: '/suppliers/5',
  },
  {
    id: '6',
    title: 'Monitor Dell 27"',
    type: 'product',
    url: '/products/6',
  },
  {
    id: '7',
    title: 'Venta #12346',
    type: 'sale',
    url: '/sales/12346',
  },
  {
    id: '8',
    title: 'María González',
    type: 'customer',
    url: '/customers/8',
  },
  {
    id: '9',
    title: 'Hardware Solutions',
    type: 'supplier',
    url: '/suppliers/9',
  },
  {
    id: '10',
    title: 'Teclado Mecánico',
    type: 'product',
    url: '/products/10',
  },
];

const TYPE_LABELS: Record<SearchResult['type'], string> = {
  product: 'Productos',
  sale: 'Ventas',
  purchase: 'Compras',
  customer: 'Clientes',
  supplier: 'Proveedores',
};

export function SearchButton() {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState('');

  const filteredResults = React.useMemo(() => {
    if (!query) return MOCK_RESULTS;
    const lowerQuery = query.toLowerCase();
    return MOCK_RESULTS.filter(result =>
      result.title.toLowerCase().includes(lowerQuery)
    );
  }, [query]);

  const groupedResults = React.useMemo(() => {
    return filteredResults.reduce(
      (acc, result) => {
        const type = result.type;
        if (!acc[type]) {
          acc[type] = [];
        }
        acc[type].push(result);
        return acc;
      },
      {} as Record<SearchResult['type'], SearchResult[]>
    );
  }, [filteredResults]);

  const handleSelect = (result: SearchResult) => {
    setOpen(false);
    console.log('Navegando a:', result.url);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='ghost' size='sm' className='relative w-9 px-0'>
          <Search className='h-4 w-4' />
          <span className='sr-only'>Buscar</span>
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[625px]'>
        <DialogTitle>Buscar</DialogTitle>
        <Command className='rounded-lg '>
          <CommandInput
            placeholder='Buscar productos, ventas, clientes...'
            value={query}
            onValueChange={setQuery}
          />
          <CommandList className='max-h-[400px] overflow-hidden p-0'>
            <ScrollArea className='h-[400px]'>
              <CommandEmpty>No se encontraron resultados.</CommandEmpty>
              {Object.entries(groupedResults).map(([type, results]) => (
                <React.Fragment key={type}>
                  {results.length > 0 && (
                    <>
                      <CommandGroup
                        heading={TYPE_LABELS[type as SearchResult['type']]}
                      >
                        {results.map(result => (
                          <CommandItem
                            key={result.id}
                            onSelect={() => handleSelect(result)}
                          >
                            <div className='flex items-center gap-2'>
                              <span>{result.title}</span>
                            </div>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                      <CommandSeparator />
                    </>
                  )}
                </React.Fragment>
              ))}
            </ScrollArea>
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
}
