import { usePathname } from 'next/navigation';
import { sidebarConfig } from './right-sidebar.config';

export function RightSidebar() {
  const pathname = usePathname();
  
  // Получаем компонент для текущего пути
  const SidebarComponent = sidebarConfig[pathname as keyof typeof sidebarConfig];
  
  // Если нет компонента для текущего пути, не рендерим сайдбар
  if (!SidebarComponent) {
    return null;
  }

  return (
    <aside className="w-64 h-full bg-white border-l border-gray-200 overflow-y-auto">
      <nav className="flex flex-col p-4 space-y-2">
        <SidebarComponent />
      </nav>
    </aside>
  );
}