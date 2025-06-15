import AuthLayout from '@/components/layout/auth-layout';

interface AuthLayoutPageProps {
  children: React.ReactNode;
}
export default function AuthLayoutPage({ children }: AuthLayoutPageProps) {
  return <AuthLayout>{children}</AuthLayout>;
}
