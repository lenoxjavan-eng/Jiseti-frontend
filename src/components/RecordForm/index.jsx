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
        <input type="file" accept="image/*,video/*" onChange={e=>{
          const file = e.target.files && e.target.files[0]
          if(!file) return
          const reader = new FileReader()
          reader.onload = ()=>{
            update({ media: reader.result })
          }
          reader.readAsDataURL(file)
        }} />
        {form.media && <div style={{marginTop:8}}><img src={form.media} alt="preview" style={{maxWidth:200}}/></div>}
      </div>

      <div style={{marginTop:12}}>
        <button type="submit">Save Record</button>
      </div>
    </form>
  )
}
