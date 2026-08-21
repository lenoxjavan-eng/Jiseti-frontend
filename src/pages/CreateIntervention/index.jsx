import React, { useContext } from 'react'
import RecordForm from '../../components/RecordForm'
import { saveRecord } from '../../services/api'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'

export default function CreateIntervention(){
  const navigate = useNavigate()
  const { user } = useContext(AuthContext)
  async function handleSubmit(record){
    record.type = 'intervention'
    record.createdBy = user.name
    await saveRecord(record)
    navigate('/records')
  }
  return (
    <section>
      <h2>Create Intervention</h2>
      <RecordForm initial={{ type: 'intervention', createdBy: user.name }} onSubmit={handleSubmit} />
    </section>
  )
}
