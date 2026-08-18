import React from 'react'
import RecordForm from '../../components/RecordForm'
import { saveRecord } from '../../services/api'
import { useNavigate } from 'react-router-dom'

export default function CreateRedFlag(){
  const navigate = useNavigate()
  async function handleSubmit(record){
    record.type = 'red-flag'
    await saveRecord(record)
    navigate('/records')
  }
  return (
    <section>
      <h2>Create Red-Flag</h2>
      <RecordForm initial={{ type: 'red-flag' }} onSubmit={handleSubmit} />
    </section>
  )
}
