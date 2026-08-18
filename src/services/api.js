const STORAGE_KEY = 'jiseti_records'

export async function fetchRecords(){
  const raw = localStorage.getItem(STORAGE_KEY)
  if(raw) return JSON.parse(raw)
  // fallback to bundled mock records if localStorage empty
  const mock = await import('../data/mockRecords.js')
  return mock.default || []
}

export async function saveRecord(record){
  const list = await fetchRecords()
  const idx = list.findIndex(r=> r.id === record.id)
  if(idx >= 0) list[idx] = record
  else list.push(record)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
  return record
}

export default { fetchRecords, saveRecord }
