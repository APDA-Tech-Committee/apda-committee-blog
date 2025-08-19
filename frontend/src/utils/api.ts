// Centralized API fetch helper for frontend
export const API_BASE = import.meta.env.DEV
  ? '/api'
  : (import.meta.env.VITE_API_URL ?? 'http://localhost:3000');

export async function apiFetch(path: string, options?: RequestInit) {
  const url = `${API_BASE}${path.startsWith('/') ? path : '/' + path}`;
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }
  return response;
}
