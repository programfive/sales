'use client';

import { useState, useTransition } from 'react';
import Link from 'next/link';
import { Category } from '@/types';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import { DeleteDialog } from '@/components/dialogs/delete-dialog';
import { deleteCategory } from '@/actions/categories';
import { toast } from 'sonner';

interface CategoryActionsCellProps {
  category: Category;
}

export function CategoryActionsCell({ category }: CategoryActionsCellProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleDeleteResource = () => {
    startTransition(async () => {
      const result = await deleteCategory(category.id);

      if (result.success) {
        toast.success('Categoría eliminada correctamente');
        setIsDeleteDialogOpen(false);
      } else {
        toast.error(result.error || 'Error al eliminar la categoría');
      }
    });
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='h-8 w-8 p-0'>
            <span className='sr-only'>Abrir menú</span>
            <MoreHorizontal className='h-4 w-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuLabel>Acciones</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() =>
              navigator.clipboard.writeText(category.id.toString())
            }
          >
            Copiar ID
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href={`/categories/${category.id}/show`}>Ver</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={`/categories/${category.id}/edit`}>Editar</Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setIsDeleteDialogOpen(true)}
            disabled={isPending}
          >
            Eliminar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteDialog
        description='Esta acción eliminará la categoría permanentemente. ¿Deseas continuar?'
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDeleteResource}
        isPending={isPending}
      />
    </>
  );
}
