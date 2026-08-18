import React from 'react'
import RecordForm from '../../components/RecordForm'
import { saveRecord } from '../../services/api'
import { useNavigate } from 'react-router-dom'

export default function CreateIntervention(){
  const navigate = useNavigate()
  async function handleSubmit(record){
    record.type = 'intervention'
    await saveRecord(record)
    navigate('/records')
  }
  return (
    <section>
      <h2>Create Intervention</h2>
      <RecordForm initial={{ type: 'intervention' }} onSubmit={handleSubmit} />
    </section>
  )
}
