"use client";

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { isAuthenticated } from '@/lib/auth';
import Sidebar from "@/components/ui/custom/sidebar/sidebar";
import { RightSidebar } from '@/components/ui/custom/right-sidebar/right-sidebar';

const publicPaths = ['/auth/login', '/auth/signup', '/groups', '/complete-profile'];

export default function ClientLayout({
    children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthed, setIsAuthed] = useState(false);

  useEffect(() => {
    const authed = isAuthenticated();
    setIsAuthed(authed);
    
    if (!authed && !publicPaths.some(path => pathname.startsWith(path))) {
      router.push('/auth/login');
    }
  }, [router, pathname]);

  // Не показываем сайдбары для страниц аутентификации
  if (pathname.startsWith('/auth')) {
    return <main className='flex-grow'>{children}</main>;
  }

  return (
    <div className='flex max-w-[1500px] mx-auto'>
      <div className='w-[240px] flex-shrink-0'>
        {isAuthed && !pathname.startsWith('/auth') && <Sidebar />}
      </div>
      
      <main className='flex-grow p-4 min-w-[750px] text-center'>
        {children}
      </main>
  
      <div className='w-[240px] flex-shrink-0'>
        {isAuthed && !pathname.startsWith('/auth') && <RightSidebar />}
      </div>
    </div>
  );
}