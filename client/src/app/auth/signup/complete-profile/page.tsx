import { CompleteProfileForm } from '@/components/auth/complete-profile-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Complete Profile",
};

export default function CompleteProfilePage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <CompleteProfileForm />
    </div>
  );
}