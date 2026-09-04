import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || (
  import.meta.env.PROD
    ? 'https://jiseti-backend-xzt6.onrender.com/api'
    : 'http://localhost:8000/api'
)
const ACCESS_TOKEN_KEY = 'accessToken'
const REFRESH_TOKEN_KEY = 'refreshToken'

const client = axios.create({ baseURL: API_URL })

client.interceptors.response.use(undefined, async (error) => {
  const request = error.config
  const refreshToken = window.localStorage.getItem(REFRESH_TOKEN_KEY)
  if (error.response?.status !== 401 || request?._retry || !refreshToken) {
    return Promise.reject(error)
  }

  request._retry = true
  try {
    const { data } = await axios.post(`${API_URL}/auth/token/refresh/`, { refresh: refreshToken })
    window.localStorage.setItem(ACCESS_TOKEN_KEY, data.access)
    request.headers.Authorization = `Bearer ${data.access}`
    return client(request)
  } catch (refreshError) {
    clearAccessToken()
    return Promise.reject(refreshError)
  }
})

function authConfig() {
  const token = window.localStorage.getItem(ACCESS_TOKEN_KEY)
  return token ? { headers: { Authorization: `Bearer ${token}` } } : {}
}

function toFrontendRecord(record, fallbackName) {
  const storedUser = window.localStorage.getItem('currentUser')
  const currentUser = storedUser ? JSON.parse(storedUser) : null
  return {
    ...record,
    userId: record.userId || record.user_id,
    createdBy: record.createdBy || record.user_name || fallbackName || currentUser?.name || 'You',
    createdAt: record.createdAt || record.created_at,
  }
}

function normalizeCoordinate(value) {
  if (value === '' || value === null || value === undefined) return null
  const coordinate = Number(value)
  return Number.isFinite(coordinate) ? coordinate.toFixed(6) : null
}

export async function login(credentials) {
  const { data } = await client.post('/auth/login/', credentials)
  window.localStorage.setItem(ACCESS_TOKEN_KEY, data.access)
  window.localStorage.setItem(REFRESH_TOKEN_KEY, data.refresh)
  return data
}

export async function register(user) {
  const { data } = await client.post('/auth/register/', user)
  return data
}

export async function fetchProfile() {
  const { data } = await client.get('/auth/profile/', authConfig())
  return data
}

export async function fetchRecords({ all = false } = {}) {
  const endpoint = all ? '/records/' : '/records/my-records/'
  const { data } = await client.get(endpoint, authConfig())
  const storedUser = window.localStorage.getItem('currentUser')
  const currentUser = storedUser ? JSON.parse(storedUser) : null
  return data.map((record) => toFrontendRecord(record, all ? undefined : currentUser?.name))
}

export async function saveRecord(record) {
  const payload = {
    title: record.title,
    description: record.description,
    type: record.type,
    latitude: normalizeCoordinate(record.latitude),
    longitude: normalizeCoordinate(record.longitude),
  }
  const { data } = await client.post('/records/', payload, authConfig())
  return toFrontendRecord(data)
}

export async function updateRecordStatus(recordId, status) {
  const { data } = await client.patch(
    `/admin/records/${recordId}/status/`,
    { status },
    authConfig(),
  )
  return toFrontendRecord(data)
}

export async function deleteRecord(recordId) {
  await client.delete(`/records/${recordId}/`, authConfig())
  return fetchRecords()
}

export function clearAccessToken() {
  window.localStorage.removeItem(ACCESS_TOKEN_KEY)
  window.localStorage.removeItem(REFRESH_TOKEN_KEY)
}

export default { fetchRecords, saveRecord, updateRecordStatus, deleteRecord, login, register, clearAccessToken }
