"use client";

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { isAuthenticated } from '@/lib/auth';
import Sidebar from "@/components/ui/custom/sidebar/sidebar";
import { Progress } from "@/components/ui/progress";

const publicPaths = ['/auth/login', '/auth/signup', '/groups', '/profile'];

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

    // Для авторизованных пользователей или публичных страниц
    return (
      <div className='flex max-w-[1800px] mx-auto items-center justify-center'>
        {isAuthed && <Sidebar />}
        <main className='p-4 min-w-[750px] text-center'>
          {children}
        </main>
        {isAuthed && <Sidebar />}
      </div>
    );
  }