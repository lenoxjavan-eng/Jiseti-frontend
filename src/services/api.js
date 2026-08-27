const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'https://jiseti-backend-xzt6.onrender.com/api').replace(/\/$/, '')
const ACCESS_TOKEN_KEY = 'jiseti_access_token'
const REFRESH_TOKEN_KEY = 'jiseti_refresh_token'

function getAccessToken() {
  return window.localStorage.getItem(ACCESS_TOKEN_KEY)
}

function normalizeRecord(record) {
  return {
    ...record,
    userId: record.user_id,
    createdBy: String(record.user_id),
    createdAt: record.created_at,
    updatedAt: record.updated_at,
  }
}

async function request(path, options = {}, token = getAccessToken()) {
  const headers = { 'Content-Type': 'application/json', ...options.headers }
  if (token) headers.Authorization = `Bearer ${token}`

  const response = await fetch(`${API_BASE_URL}${path}`, { ...options, headers })
  const body = await response.json().catch(() => null)
  if (!response.ok) {
    const message = body?.detail || body?.non_field_errors?.[0] || 'Request failed.'
    throw new Error(message)
  }
  return body
}

export async function registerUser(user) {
  const response = await request('/auth/register/', {
    method: 'POST',
    body: JSON.stringify(user),
  }, null)
  return response
}

export async function loginUser(email, password) {
  const tokens = await request('/auth/login/', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  }, null)
  window.localStorage.setItem(ACCESS_TOKEN_KEY, tokens.access)
  window.localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refresh)
  const user = await request('/auth/profile/', {}, tokens.access)
  return { tokens, user }
}

export function clearSession() {
  window.localStorage.removeItem(ACCESS_TOKEN_KEY)
  window.localStorage.removeItem(REFRESH_TOKEN_KEY)
}

export async function fetchRecords() {
  const records = await request('/records/', {}, null)
  return records.map(normalizeRecord)
}

export async function saveRecord(record) {
  const payload = {
    title: record.title,
    description: record.description,
    type: record.type,
    latitude: record.latitude || null,
    longitude: record.longitude || null,
  }
  const response = record.id && Number.isInteger(Number(record.id))
    ? await request(`/records/${record.id}/`, { method: 'PATCH', body: JSON.stringify(payload) })
    : await request('/records/', { method: 'POST', body: JSON.stringify(payload) })
  return normalizeRecord(response)
}

export async function deleteRecord(recordId) {
  await request(`/records/${recordId}/`, { method: 'DELETE' })
  return fetchRecords()
}

export async function updateRecordStatus(recordId, status) {
  const response = await request(`/admin/records/${recordId}/status/`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  })
  return normalizeRecord(response)
}

export default { fetchRecords, saveRecord, deleteRecord, updateRecordStatus }
