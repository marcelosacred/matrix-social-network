import { deleteCookie, getCookie, setCookie } from 'cookies-next';

export function isAuthenticated(): boolean {
  // Проверяем наличие токена аутентификации в куки
  const authToken = getCookie('auth_token');
  
  // Если токен существует, считаем пользователя аутентифицированным
  if (authToken) {
    return true;
  }
  
  // Если токена нет, пользователь не аутентифицирован
  return false;
}

// Дополнительные функции для работы с аутентификацией

export function login(token: string): void {
  // Сохраняем токен в куки при успешном входе
  setCookie('auth_token', token, {
    maxAge: 30 * 24 * 60 * 60, // 30 дней
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  });
}

export function logout(): void {
  // Удаляем токен из куки при выходе
  deleteCookie('auth_token');
}