import { SignUpForm } from '@/components/auth/sign-up-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Sign Up",
};

export default function SignUpPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <SignUpForm />
    </div>
  );
}