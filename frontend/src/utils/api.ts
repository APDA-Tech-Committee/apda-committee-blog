// Centralized API fetch helper for frontend
function getApiBase() {
  // Use Vite's env for frontend builds
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    if (import.meta.env.MODE === 'production' || import.meta.env.PROD) {
      return 'https://apda-committee-blog-568718017696.us-east4.run.app';
    } else {
      return 'http://localhost:3000';
    }
  }
  // Fallback for SSR or other environments
  return 'http://localhost:3000';
}

export async function apiFetch(path: string, options?: RequestInit) {
  const API_BASE = getApiBase();
  // Ensure /api is always present in the path
  const apiPath = path.startsWith('/api') ? path : `/api${path.startsWith('/') ? path : '/' + path}`;
  const url = `${API_BASE}${apiPath}`;
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }
  return response;
}
