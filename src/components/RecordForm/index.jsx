import React, { useState } from 'react'
import LatLngInputs from '../LatLngInputs'
import LocationPicker from '../LocationPicker'

function makeId(){ return String(Date.now()) }

export default function RecordForm({ initial = {}, onSubmit }){
  const [form, setForm] = useState({
    id: initial.id || '',
    title: initial.title || '',
    description: initial.description || '',
    type: initial.type || '',
    status: initial.status || 'pending',
    latitude: initial.latitude || '',
    longitude: initial.longitude || '',
    createdBy: initial.createdBy || '',
    createdAt: initial.createdAt || '',
    attachments: initial.attachments || []
  })

  function update(ch){ setForm(prev=> ({ ...prev, ...ch })) }

  function handleFile(e){
    const files = Array.from(e.target.files || [])
    const attachments = files.map(f=> ({ name: f.name, type: f.type }))
    update({ attachments: (form.attachments||[]).concat(attachments) })
  }

  function submit(e){
    e.preventDefault()
    const record = { ...form }
    if(!record.id) record.id = makeId()
    if(!record.createdAt) record.createdAt = new Date().toISOString()
    onSubmit && onSubmit(record)
  }

  return (
    <form onSubmit={submit} style={{maxWidth:720,display:'grid',gap:10}}>
      <div>
        <label>Title</label>
        <input required value={form.title} onChange={e=>update({ title: e.target.value })} />
      </div>

      <div>
        <label>Description</label>
        <textarea required value={form.description} onChange={e=>update({ description: e.target.value })} />
      </div>

      <div style={{display:'flex',gap:8}}>
        <div style={{flex:1}}>
          <label>Type</label>
          <select value={form.type} onChange={e=>update({ type: e.target.value })}>
            <option value="">Select type</option>
            <option value="red-flag">Red-Flag</option>
            <option value="intervention">Intervention</option>
          </select>
        </div>
        <div style={{flex:1}}>
          <label>Status</label>
          <select value={form.status} onChange={e=>update({ status: e.target.value })}>
            <option value="pending">pending</option>
            <option value="under-investigation">under-investigation</option>
            <option value="rejected">rejected</option>
            <option value="resolved">resolved</option>
          </select>
        </div>
      </div>

      <div>
        <label>Reporter name</label>
        <input value={form.createdBy} onChange={e=>update({ createdBy: e.target.value })} />
      </div>

      <div>
        <label>Location (lat / lon)</label>
        <LatLngInputs latitude={form.latitude} longitude={form.longitude} onChange={vals=>update(vals)} />
      </div>

      <div>
        <label>Pick on map</label>
        <LocationPicker value={{ latitude: form.latitude, longitude: form.longitude }} onChange={vals=>{
          if(typeof vals === 'string'){
            const [lat, lon] = vals.split(',')
            if(lat && lon) update({ latitude: lat.trim(), longitude: lon.trim() })
          } else update(vals)
        }} />
      </div>

      <div>
        <label>Attachments (images / videos) — optional</label>
        <input type="file" accept="image/*,video/*" multiple onChange={handleFile} />
        <div style={{marginTop:8}}>
          {(form.attachments||[]).map((a,i)=> <div key={i} style={{fontSize:12}}>{a.name} ({a.type})</div>)}
        </div>
      </div>

      <div style={{display:'flex',gap:8,justifyContent:'flex-end'}}>
        <button type="submit">Save Record</button>
      </div>
    </form>
  )
}
