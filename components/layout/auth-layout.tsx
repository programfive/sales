import AuthIcon from '@/components/icons/auth';

interface AuthLayoutProps {
  children: React.ReactNode;
}
export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <>
      <div className='min-h-screen bg-background flex items-center justify-center p-4'>
        <div className='w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center'>
          <div className='hidden lg:flex justify-center items-center'>
            <div className='w-full max-w-xl'>
              <AuthIcon className='w-full h-auto' />
            </div>
          </div>
          <div className='w-full max-w-md mx-auto'>{children}</div>
        </div>
      </div>
    </>
  );
}
