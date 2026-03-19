import axios from 'axios'

// Базовый URL - работает и локально, и на Vercel
export const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
    "X-API-KEY": import.meta.env.VITE_X_API_KEY ?? "",
  },
})

// Типы для API
export interface SearchParams {
  query?: string
  [key: string]: string | number | undefined
}

// Универсальная функция для запросов
export async function fetchFromApi<T>(
  endpoint: string,
  params?: SearchParams
): Promise<T> {
  const response = await api.get<T>(endpoint, { params })
  return response.data
}

// Пример использования:
// fetchFromApi('/search', { query: 'matrix' })
// -> GET /api/search?query=matrix
// -> проксируется в https://poiskkino.dev/v1.5/search?query=matrix

export default api