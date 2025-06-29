import { FormCard } from '@/components/modules/auth/form-card';

export default function Page() {
  return (
    <FormCard
      title='¡Gracias por registrarte!'
      description='Revisa tu correo electrónico para confirmar'
    >
      <p className='text-sm text-muted-foreground text-center'>
        Te has registrado con éxito. Revisa su correo electrónico para confirmar
        su cuenta antes de iniciar sesión.
      </p>
    </FormCard>
  );
}
