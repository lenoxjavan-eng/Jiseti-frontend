import React, { useState } from 'react'
import RecordForm from '../../components/RecordForm'
import { saveRecord } from '../../services/api'
import { useNavigate } from 'react-router-dom'

export default function CreateRecord(){
  const navigate = useNavigate()
  const [error, setError] = useState('')
  async function handleSubmit(record){
    setError('')
    try {
      await saveRecord(record)
      navigate('/records')
    } catch (requestError) {
      if (requestError.response?.status === 401) {
        setError('Your session has expired. Please log in again before submitting a report.')
      } else {
        setError('We could not submit your report. Check the form and try again.')
      }
    }
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
      {error && <p role="alert" className="record-form__error">{error}</p>}
      <RecordForm onSubmit={handleSubmit} />
    </main>
  )
}
