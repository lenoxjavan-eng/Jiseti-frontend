import React, { useEffect, useState } from 'react'
import RecordCard from '../../components/RecordCard'
import { fetchRecords } from '../../services/api'

export default function MyRecords(){
  const [records, setRecords] = useState([])
  useEffect(()=>{
    let mounted = true
    fetchRecords().then(data=>{ if(mounted) setRecords(data) })
    return ()=>mounted = false
  },[])
  return (
    <section>
      <h2>My Records</h2>
      {records.length === 0 && <p>No records yet</p>}
      {records.map(r=> <RecordCard key={r.id} record={r} />)}
    </section>
  )
}
