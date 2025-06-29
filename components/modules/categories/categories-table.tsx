'use client';

import { useState, useTransition } from 'react';
import { Category } from '@/types';
import { DataTable } from '@/components/table/data-table';
import { columns } from '@/components/modules/categories/columns';
import { deleteMultipleCategories } from '@/actions/categories';
import { DeleteDialog } from '@/components/dialogs/delete-dialog';
import { toast } from 'sonner';

interface CategoriesTableProps {
  categories: Category[];
}

export function CategoriesTable({ categories }: CategoriesTableProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<Category[]>([]);
  const [isPending, startTransition] = useTransition();

  const onExport = (data: Category[], format: string) => {
    if (format === 'pdf') {
    } else {
      toast.info(`La exportación a ${format} aún no está implementada.`);
    }
  };

  const onDeleteSelected = (items: Category[]) => {
    setSelectedItems(items);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    const ids = selectedItems.map(item => item.id);
    startTransition(async () => {
      const result = await deleteMultipleCategories(ids);
      if (result.success) {
        toast.success(`Se eliminaron ${ids.length} categorías correctamente.`);
        setIsDeleteDialogOpen(false);
        setSelectedItems([]);
      } else {
        toast.error(result.error || 'Error al eliminar las categorías.');
      }
    });
  };

  return (
    <>
      <DataTable
        columns={columns}
        data={categories as Category[]}
        globalFilterColumn='name'
        translations={{
          id: 'ID',
          name: 'Nombre',
          description: 'Descripción',
          created_at: 'Fecha de Creación',
          updated_at: 'Última Actualización',
          actions: 'Acciones',
        }}
        onExport={onExport}
        onDeleteSelected={onDeleteSelected}
      />
      <DeleteDialog
        description={`Esta acción eliminará ${selectedItems.length} categorías permanentemente. ¿Deseas continuar?`}
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleConfirmDelete}
        isPending={isPending}
      />
    </>
  );
}
