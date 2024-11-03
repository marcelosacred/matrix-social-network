export function isAuthenticated(): boolean {
  const token = localStorage.getItem('auth_token');
  return !!token;
}

// Дополнительные функции для работы с аутентификацией

export function login(token: string): void {
  localStorage.setItem('auth_token', token);
}

export function logout(): void {
  localStorage.removeItem('auth_token');
  // Можно добавить редирект на страницу входа
}