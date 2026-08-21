const STORAGE_KEY = 'jiseti_records'

export async function fetchRecords(){
  const raw = localStorage.getItem(STORAGE_KEY)
  if(raw) return JSON.parse(raw)
  const mock = await import('../data/mockRecords.js')
  const records = mock.default || []
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records))
  return records
}

export async function saveRecord(record){
  const list = await fetchRecords()
  const idx = list.findIndex(r=> r.id === record.id)
  if(idx >= 0) list[idx] = record
  else list.push(record)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
  return record
}

export async function deleteRecord(recordId){
  const list = await fetchRecords()
  const remaining = list.filter((record) => String(record.id) !== String(recordId))
  localStorage.setItem(STORAGE_KEY, JSON.stringify(remaining))
  return remaining
}

export default { fetchRecords, saveRecord, deleteRecord }
