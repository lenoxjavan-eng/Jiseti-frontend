import React, { useContext } from 'react'
import RecordForm from '../../components/RecordForm'
import { saveRecord } from '../../services/api'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'

export default function CreateRedFlag(){
  const navigate = useNavigate()
  const { user } = useContext(AuthContext)
  async function handleSubmit(record){
    record.type = 'red-flag'
    record.createdBy = user.name
    await saveRecord(record)
    navigate('/records')
  }
  return (
    <section>
      <h2>Create Red-Flag</h2>
      <RecordForm initial={{ type: 'red-flag', createdBy: user.name }} onSubmit={handleSubmit} />
    </section>
  )
}
