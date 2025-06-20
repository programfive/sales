'use client';

import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDropzone } from 'react-dropzone';
import { cn } from '@/lib/utils';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Upload, User, Mail, Loader2 } from 'lucide-react';
import { profileFormSchema } from '@/schemas';
import { ACCEPTED_IMAGE_TYPES } from '@/constants/file';

type ProfileFormValues = z.infer<typeof profileFormSchema>;

interface ProfileFormProps {
  userData: {
    name: string;
    email: string;
    avatarUrl: string;
  };
}

export function ProfileForm({ userData }: ProfileFormProps) {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: userData.name || '',
      email: userData.email || '',
    },
    mode: 'onChange',
  });

  const [preview, setPreview] = useState<string | null>(userData.avatarUrl);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        setPreview(URL.createObjectURL(file));
        form.setValue('avatar', file, {
          shouldValidate: true,
          shouldDirty: true,
        });
      }
    },
    [form]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ACCEPTED_IMAGE_TYPES },
    multiple: false,
  });

  async function onSubmit(data: ProfileFormValues) {
    console.log('Formulario válido, enviando datos:', data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle>Información del Perfil</CardTitle>
            <CardDescription>
              Actualiza la información de tu perfil público.
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-6'>
            <FormField
              control={form.control}
              name='avatar'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Foto de Perfil</FormLabel>
                  <div
                    {...getRootProps()}
                    className='relative w-24 mx-auto md:mx-0 h-24 cursor-pointer group rounded-full'
                  >
                    <input {...getInputProps()} />
                    <Avatar className='h-full w-full'>
                      <AvatarImage
                        src={preview || ''}
                        alt={form.getValues('name')}
                      />
                      <AvatarFallback>
                        {form.getValues('name')?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div
                      className={cn(
                        'absolute inset-0 flex flex-col items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-full',
                        isDragActive && 'opacity-100 bg-primary/70'
                      )}
                    >
                      <Upload className='h-8 w-8 text-white' />
                      <p className='text-xs font-semibold text-white mt-1'>
                        {isDragActive ? 'Suelta aquí' : 'Cambiar foto'}
                      </p>
                    </div>
                  </div>
                  <FormDescription>
                    JPG, GIF o PNG. Tamaño máximo de 800K.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Separator />

            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input
                      startIcon={User}
                      placeholder='Tu nombre'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      startIcon={Mail}
                      type='email'
                      placeholder='tu@email.com'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button
              type='submit'
              className='w-full sm:w-auto'
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? (
                <>
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  Guardando...
                </>
              ) : (
                'Guardar Cambios'
              )}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
