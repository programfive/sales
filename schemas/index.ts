import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from '@/constants/file';
import z from 'zod';

export const profileFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'El nombre debe tener al menos 2 caracteres.' })
    .max(50, { message: 'El nombre no puede tener más de 50 caracteres.' }),
  email: z.string().email({ message: 'Por favor, introduce un email válido.' }),
  avatar: z
    .custom<File>()
    .refine(file => file, 'La imagen es requerida.')
    .refine(file => file.size <= MAX_FILE_SIZE, `El tamaño máximo es de 800KB.`)
    .refine(
      file => ACCEPTED_IMAGE_TYPES.includes(file.type),
      'Solo se aceptan formatos .jpg, .jpeg, .png y .gif.'
    )
    .optional(),
  avatarUrl: z.string().optional(),
});
