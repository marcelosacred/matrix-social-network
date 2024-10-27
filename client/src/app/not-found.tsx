import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-2xl mb-8">Страница не найдена</h2>
      <p className="mb-8">Извините, запрашиваемая страница не существует.</p>
      <Link href="/">
        <Button>Вернуться на главную</Button>
      </Link>
    </div>
  );
}