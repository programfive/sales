'use client';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { useRouter } from 'next/navigation';
import { Loader, Tag } from 'lucide-react';
import { categorySchema } from '@/schemas';
import { createCategory, updateCategory } from '@/actions/categories';
import Link from 'next/link';
import { toast } from 'sonner';
import { Category } from '@/types';

type CategoryFormValues = z.infer<typeof categorySchema>;
interface FormCategoryProps {
  category?: Category;
  isEdit?: boolean;
  isShow?: boolean;
}

export function FormCategory({
  category,
  isEdit = false,
  isShow = false,
}: FormCategoryProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: category?.name || '',
      description: category?.description || '',
      is_active: String(category?.is_active) === 'true',
    },
  });

  async function onSubmit(values: CategoryFormValues) {
    setLoading(true);
    let result;
    if (isEdit && category) {
      result = await updateCategory(category.id, values);
    } else {
      result = await createCategory(values);
    }

    if (result?.success) {
      toast.success(
        isEdit
          ? 'Categoría actualizada correctamente'
          : 'Categoría creada correctamente'
      );
      router.push('/categories');
    } else {
      form.setError('name', { message: result?.error });
    }
    setLoading(false);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-6 max-w-2xl w-full mt-10 md:px-4'
      >
        <div className='mb-8'>
          <h1 className='text-3xl font-bold tracking-tight mb-2'>
            {isShow
              ? 'Mostrar categoría'
              : isEdit
                ? 'Editar categoría'
                : 'Crear categoría'}
          </h1>
          <p className='text-muted-foreground text-base'>
            {isShow
              ? 'Visualiza la información de la categoría.'
              : isEdit
                ? 'Edita la categoría para actualizar sus datos.'
                : 'Completa el formulario para agregar una nueva categoría al sistema.'}
          </p>
        </div>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input
                  startIcon={Tag}
                  placeholder='Nombre de la categoría'
                  className='w-full'
                  {...field}
                  disabled={isShow}
                />
              </FormControl>
              <FormDescription>
                El nombre debe ser único y no exceder 100 caracteres.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripción</FormLabel>
              <FormControl>
                <Textarea
                  placeholder='Descripción de la categoría (opcional)'
                  className='min-h-24'
                  {...field}
                  disabled={isShow}
                />
              </FormControl>
              <FormDescription>
                Proporciona una descripción breve de la categoría.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='is_active'
          render={({ field }) => (
            <FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4'>
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={isShow ? undefined : field.onChange}
                  className={isShow ? 'cursor-default' : ''}
                />
              </FormControl>
              <div className='space-y-1 leading-none'>
                <FormLabel>¿Activa?</FormLabel>
                <FormDescription>
                  Marca esta casilla para activar la categoría.
                </FormDescription>
              </div>
            </FormItem>
          )}
        />

        <div className='flex justify-center flex-col sm:flex-row gap-4 sm:justify-start'>
          {!isShow && (
            <Button
              type='submit'
              className='w-full sm:w-auto'
              disabled={loading}
            >
              {loading && <Loader className='w-4 h-4 animate-spin' />}
              {loading ? 'Guardando' : 'Guardar'}
            </Button>
          )}

          <Button
            asChild
            variant={isShow ? 'default' : 'outline'}
            className='w-full sm:w-auto'
            disabled={loading}
          >
            <Link href='/categories'>Cancelar</Link>
          </Button>
        </div>
      </form>
    </Form>
  );
}
