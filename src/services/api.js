import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'https://jiseti-backend-xzt6.onrender.com/api'
const ACCESS_TOKEN_KEY = 'accessToken'

const client = axios.create({ baseURL: API_URL })

function authConfig() {
  const token = window.localStorage.getItem(ACCESS_TOKEN_KEY)
  return token ? { headers: { Authorization: `Bearer ${token}` } } : {}
}

function toFrontendRecord(record, fallbackName) {
  const storedUser = window.localStorage.getItem('currentUser')
  const currentUser = storedUser ? JSON.parse(storedUser) : null
  return {
    ...record,
    createdBy: record.createdBy || record.user_name || fallbackName || currentUser?.name || 'You',
    createdAt: record.createdAt || record.created_at,
  }
}

export async function login(credentials) {
  const { data } = await client.post('/auth/login/', credentials)
  window.localStorage.setItem(ACCESS_TOKEN_KEY, data.access)
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
    latitude: record.latitude || null,
    longitude: record.longitude || null,
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
}

export default { fetchRecords, saveRecord, updateRecordStatus, deleteRecord, login, register, clearAccessToken }
