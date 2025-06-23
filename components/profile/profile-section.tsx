'use client';

import { useState, useCallback } from 'react';
import { Edit, Save, X, Calendar, Shield, User, Mail, Upload, Image } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ShoppingCart, TrendingUp, Package, Users } from 'lucide-react';
import { UserData } from '@/types';

interface ProfileSectionProps {
  userData: UserData;
}

export function ProfileSection({ userData }: ProfileSectionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: userData.name,
    email: userData.email,
  });

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setIsUploading(true);
      
      // Simular carga de archivo
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedImage(reader.result as string);
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
      
      // Aquí normalmente harías la llamada a la API para subir el archivo
      // uploadImageToServer(file).then(() => setIsUploading(false));
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif']
    },
    maxFiles: 1,
    maxSize: 2 * 1024 * 1024, // 2MB
  });

  const handleSave = () => {
    // Aquí guardarías tanto los datos del formulario como la imagen subida
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: userData.name,
      email: userData.email,
    });
    setUploadedImage(null);
    setIsEditing(false);
  };

  const currentAvatarUrl = uploadedImage || userData.avatarUrl;

  return (
    <div className='space-y-6'>
      <div className='grid gap-6 lg:grid-cols-3'>
        {/* Profile Information */}
        <Card className='md:col-span-2'>
          <CardHeader className='flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0'>
            <div>
              <CardTitle>Información Personal</CardTitle>
              <CardDescription>
                Actualiza tu información de perfil
              </CardDescription>
            </div>
            {!isEditing ? (
              <Button
                variant='outline'
                size='sm'
                onClick={() => setIsEditing(true)}
              >
                <Edit className='w-4 h-4 mr-2' />
                Editar
              </Button>
            ) : (
              <div className='flex flex-col gap-2 sm:flex-row'>
                <Button size='sm' onClick={handleSave}>
                  <Save className='w-4 h-4 mr-2' />
                  Guardar
                </Button>
                <Button variant='outline' size='sm' onClick={handleCancel}>
                  <X className='w-4 h-4 mr-2' />
                  Cancelar
                </Button>
              </div>
            )}
          </CardHeader>
          <CardContent className='space-y-6'>
            <div className='flex items-center space-x-4'>
              <div className='relative'>
                <Avatar className='h-20 w-20'>
                  <AvatarImage
                    src={currentAvatarUrl || '/placeholder.svg'}
                    alt={userData.name}
                  />
                  <AvatarFallback className='text-lg'>
                    {userData.name
                      .split(' ')
                      .map(n => n[0])
                      .join('')}
                  </AvatarFallback>
                </Avatar>
                {isUploading && (
                  <div className='absolute inset-0 flex items-center justify-center bg-black/50 rounded-full'>
                    <div className='animate-spin rounded-full h-6 w-6 border-b-2 border-white'></div>
                  </div>
                )}
              </div>
              <div className='space-y-2'>
                {isEditing ? (
                  <div
                    {...getRootProps()}
                    className={`cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 ${
                      isDragActive ? 'border-primary bg-primary/10' : ''
                    }`}
                  >
                    <input {...getInputProps()} />
                    <Upload className='w-4 h-4 mr-2' />
                    {isDragActive ? 'Suelta la imagen aquí' : 'Cambiar foto'}
                  </div>
                ) : (
                  <Button variant='outline' size='sm' disabled>
                    <Image className='w-4 h-4 mr-2' />
                    Cambiar foto
                  </Button>
                )}
                <p className='text-sm text-muted-foreground'>
                  JPG, PNG o GIF. Máximo 2MB.
                </p>
                {isDragActive && (
                  <p className='text-sm text-primary font-medium'>
                    Suelta para subir la imagen
                  </p>
                )}
              </div>
            </div>

            <div className='grid gap-4 sm:grid-cols-2'>
              <div className='space-y-2'>
                <Label htmlFor='name'>Nombre completo</Label>
                <Input
                  id='name'
                  startIcon={User}
                  value={formData.name}
                  onChange={e =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  disabled={!isEditing}
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='email'>Correo electrónico</Label>
                <Input
                  id='email'
                  startIcon={Mail}
                  type='email'
                  value={formData.email}
                  onChange={e =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  disabled={!isEditing}
                />
              </div>
            </div>

            <div className='space-y-2'>
              <Label>Miembro desde</Label>
              <div className='flex items-center space-x-2 text-sm text-muted-foreground'>
                <Calendar className='h-4 w-4' />
                <span>
                  {new Date(userData.created_at).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Roles */}
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center'>
              <Shield className='w-5 h-5 mr-2' />
              Roles
            </CardTitle>
            <CardDescription>Roles asignados a tu cuenta</CardDescription>
          </CardHeader>
          <CardContent className='space-y-3'>
            {userData.roles.map(role => (
              <div key={role.id} className='flex items-center justify-between'>
                <div className='space-y-1'>
                  <p className='text-sm font-medium leading-none'>
                    {role.name}
                  </p>
                  <p className='text-sm text-muted-foreground'>
                    {role.description}
                  </p>
                </div>
                <Badge variant='secondary'>Activo</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Statistics */}
      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Ventas Totales
            </CardTitle>
            <ShoppingCart className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>
              {userData.stats.totalSales}
            </div>
            <p className='text-xs text-muted-foreground'>
              +12% desde el mes pasado
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Ingresos</CardTitle>
            <TrendingUp className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>
              ${userData.stats.totalRevenue.toLocaleString()}
            </div>
            <p className='text-xs text-muted-foreground'>
              +8% desde el mes pasado
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Productos Activos
            </CardTitle>
            <Package className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>
              {userData.stats.activeProducts}
            </div>
            <p className='text-xs text-muted-foreground'>
              +3 nuevos esta semana
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Clientes</CardTitle>
            <Users className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>
              {userData.stats.totalCustomers}
            </div>
            <p className='text-xs text-muted-foreground'>+5 nuevos este mes</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
