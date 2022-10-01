import { JWT_LOCAL_STORAGE } from './local-storage/model'

const SERVER_URL = 'http://localhost:8080'

export function fetchWithAuthorization(fetchUrl: string, options?: RequestInit): Promise<Response> {
  const accessToken = localStorage.getItem(JWT_LOCAL_STORAGE)
  return fetch(`${SERVER_URL}/${fetchUrl}`, {
    ...options,
    headers: { Authorization: `Bearer ${accessToken}`, ...options?.headers },
  })
}
