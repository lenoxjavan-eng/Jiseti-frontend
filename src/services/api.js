const API_BASE = '/api'

export async function fetchRecords(){
  const res = await fetch(`${API_BASE}/records`)
  if(!res.ok) throw new Error('Network error')
  return res.json()
}

export default { fetchRecords }
