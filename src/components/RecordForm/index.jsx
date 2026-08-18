import React, { useState } from 'react'
import LatLngInputs from '../LatLngInputs'
import LocationPicker from '../LocationPicker'

export default function RecordForm({ initial = {}, onSubmit }){
  const [form, setForm] = useState({
    title: initial.title || '',
    description: initial.description || '',
    type: initial.type || 'red-flag',
    status: initial.status || 'pending',
    latitude: initial.latitude || '',
    longitude: initial.longitude || '',
  })

  function update(fields){
    setForm(prev=>({ ...prev, ...fields }))
  }

  function handleSubmit(e){
    e.preventDefault()
    const record = {
      ...form,
      id: initial.id || Date.now(),
      createdBy: initial.createdBy || 'anonymous',
      createdAt: initial.createdAt || new Date().toISOString()
    }
    if(onSubmit) onSubmit(record)
  }

  return (
    <form onSubmit={handleSubmit} style={{maxWidth:720}}>
      <div style={{marginBottom:8}}>
        <label>Title</label>
        <input value={form.title} onChange={e=>update({ title: e.target.value })} required />
      </div>

      <div style={{marginBottom:8}}>
        <label>Description</label>
        <textarea value={form.description} onChange={e=>update({ description: e.target.value })} rows={4} />
      </div>

      <div style={{display:'flex',gap:8,marginBottom:8}}>
        <div>
          <label>Type</label>
          <select value={form.type} onChange={e=>update({ type: e.target.value })}>
            <option value="red-flag">red-flag</option>
            <option value="intervention">intervention</option>
          </select>
        </div>
        <div>
          <label>Status</label>
          <select value={form.status} onChange={e=>update({ status: e.target.value })}>
            <option value="pending">pending</option>
            <option value="under-investigation">under-investigation</option>
            <option value="rejected">rejected</option>
            <option value="resolved">resolved</option>
          </select>
        </div>
      </div>

      <div style={{marginBottom:8}}>
        <label>Location</label>
        <div style={{marginTop:6}}>
          <LocationPicker value={`${form.latitude},${form.longitude}`} onChange={(val)=>{
            // LocationPicker can pass { latitude, longitude } or a string
            if(typeof val === 'string'){
              const [lat, lon] = val.split(',')
              update({ latitude: lat, longitude: lon })
            } else {
              update(val)
            }
          }} />
        </div>
        <LatLngInputs latitude={form.latitude} longitude={form.longitude} onChange={(v)=>update(v)} />
      </div>

      <div style={{marginBottom:8}}>
        <label>Attach media (optional)</label>
        <input type="file" accept="image/*,video/*" />
      </div>

      <div style={{marginTop:12}}>
        <button type="submit">Save Record</button>
      </div>
    </form>
  )
}
