import React from 'react'
import RecordForm from '../../components/RecordForm'
import { saveRecord } from '../../services/api'
import { useNavigate } from 'react-router-dom'

export default function CreateRecord(){
  const navigate = useNavigate()
  async function handleSubmit(record){
    await saveRecord(record)
    navigate('/records')
  }
  return (
    <main className="create-record-page">
      <section className="create-record-page__header">
        <div>
          <p className="eyebrow">COMMUNITY REPORT</p>
          <h1>Create a report</h1>
          <p>Share a corruption incident or request government intervention.</p>
        </div>
      </section>
      <RecordForm onSubmit={handleSubmit} />
    </main>
  )
}
