import { FormCard } from '@/components/auth/form-card';

export default function Page() {
  return (
    <FormCard
      title='Thank you for signing up!'
      description='Check your email to confirm'
    >
      <p className='text-sm text-muted-foreground text-center'>
        You&apos;ve successfully signed up. Please check your email to confirm
        your account before signing in.
      </p>
    </FormCard>
  );
}
