'use client';

import { ColumnDef } from '@tanstack/react-table';
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
import { DataTableColumnHeader } from '@/components/table/datatable-column-header';
import { DataTableRowSelectionHeader } from '@/components/table/datatable-row-selection-header';
import { DataTableRowSelectionCell } from '@/components/table/datatable-row-selection-cell';
import { Category } from '@/types';
import { CategoryActionsCell } from './category-actions-cell';
import { Badge } from '@/components/ui/badge';

export const columns: ColumnDef<Category>[] = [
  {
    id: 'select',
    header: ({ table }) => <DataTableRowSelectionHeader table={table} />,
    cell: ({ row }) => <DataTableRowSelectionCell row={row} />,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'id',
    header: 'ID',
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader title='Nombre' column={column} />
    ),
  },
  {
    accessorKey: 'description',
    header: ({ column }) => (
      <DataTableColumnHeader title='Descripción' column={column} />
    ),
    cell: ({ row }) => (
      <div
        className='max-w-[300px] truncate'
        title={row.getValue('description')}
      >
        {row.getValue('description') || '-'}
      </div>
    ),
  },
  {
    accessorKey: 'is_active',
    header: ({ column }) => (
      <DataTableColumnHeader title='Estado' column={column} />
    ),
    cell: ({ row }) => {
      const active = row.getValue('is_active');
      const isActive = active === 'true';
      const variant = isActive ? 'secondary' : 'destructive';
      const text = isActive ? 'Activo' : 'Inactivo';

      return <Badge variant={variant}>{text}</Badge>;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id) ? 'active' : 'inactive');
    },
  },
  {
    accessorKey: 'created_at',
    header: ({ column }) => (
      <DataTableColumnHeader title='Fecha Creación' column={column} />
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue('created_at'));
      return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    },
  },
  {
    accessorKey: 'updated_at',
    header: ({ column }) => (
      <DataTableColumnHeader title='Última Actualización' column={column} />
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue('updated_at'));
      return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    },
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => <CategoryActionsCell category={row.original} />,
  },
];
