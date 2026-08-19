import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import RecordForm from '../../components/RecordForm'
import { fetchRecords, saveRecord } from '../../services/api'

export default function EditRecord(){
  const { id } = useParams()
  const navigate = useNavigate()
  const [initial, setInitial] = useState(null)

  useEffect(()=>{
    let mounted = true
    fetchRecords().then(list=>{
      if(!mounted) return
      const found = list.find(r=> r.id === id)
      setInitial(found || null)
    })
    return ()=> mounted = false
  },[id])

  async function handleSubmit(record){
    await saveRecord(record)
    navigate('/records')
  }

  if(!initial) return <div className="container">Loading record...</div>
  return (
    <section className="container">
      <h2>Edit Record</h2>
      <RecordForm initial={initial} onSubmit={handleSubmit} />
    </section>
  )
}
