import type { VercelRequest, VercelResponse } from '@vercel/node'

const API_BASE = import.meta.env.VITE_BASE_URL

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Получаем путь после /api/proxy
  const { path, ...queryParams } = req.query

  // Формируем URL
  const pathString = Array.isArray(path) ? path.join('/') : path || ''
  const queryString = new URLSearchParams(
    Object.entries(queryParams).reduce((acc, [key, value]) => {
      acc[key] = Array.isArray(value) ? value[0] : value || ''
      return acc
    }, {} as Record<string, string>)
  ).toString()

  const targetUrl = `${API_BASE}/${pathString}${queryString ? `?${queryString}` : ''}`

  try {
    const response = await fetch(targetUrl, {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      ...(req.method !== 'GET' && req.body ? { body: JSON.stringify(req.body) } : {}),
    })

    const data = await response.json()

    // Устанавливаем CORS заголовки
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

    res.status(response.status).json(data)
  } catch (error) {
    console.error('Proxy error:', error)
    res.status(500).json({ error: 'Proxy request failed' })
  }
}