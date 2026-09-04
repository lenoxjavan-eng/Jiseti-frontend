import React, { useState } from 'react'
import LatLngInputs from '../LatLngInputs'
import LocationPicker from '../LocationPicker'

export default function RecordForm({ initial = {}, onSubmit }){
  const [form, setForm] = useState({
    title: initial.title || '',
    description: initial.description || '',
    type: initial.type || 'red-flag',
    status: 'pending',
    latitude: initial.latitude || '',
    longitude: initial.longitude || '',
  })

  function update(fields){
    setForm(prev=>({ ...prev, ...fields }))
  }

  async function handleSubmit(e){
    e.preventDefault()
    const record = {
      ...form,
      id: initial.id || Date.now(),
      createdBy: initial.createdBy || 'anonymous',
      createdAt: initial.createdAt || new Date().toISOString()
    }
    if(onSubmit) await onSubmit(record)
  }

  return (
    <form onSubmit={handleSubmit} className="record-form">
      <div className="record-form__field">
        <label htmlFor="record-title">Title</label>
        <input id="record-title" value={form.title} onChange={e=>update({ title: e.target.value })} placeholder="Give your report a clear title" required />
      </div>

      <div className="record-form__field">
        <label htmlFor="record-description">Description</label>
        <textarea id="record-description" value={form.description} onChange={e=>update({ description: e.target.value })} rows={5} placeholder="Describe what happened and where it happened" required />
      </div>

      <div className="record-form__row">
        <div className="record-form__field">
          <label htmlFor="record-type">Report type</label>
          <select id="record-type" value={form.type} onChange={e=>update({ type: e.target.value })}>
            <option value="red-flag">Red flag</option>
            <option value="intervention">Intervention</option>
          </select>
        </div>
        <div className="record-form__field">
          <label htmlFor="record-status">Status</label>
          <input id="record-status" value="Pending" readOnly />
        </div>
      </div>

      <fieldset className="record-form__location">
        <legend>Location</legend>
        <div className="record-form__picker">
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
      </fieldset>

      <div className="record-form__field">
        <label htmlFor="record-media">Supporting image or video <span>(optional)</span></label>
        <input id="record-media" type="file" accept="image/*,video/*" onChange={e=>{
          const file = e.target.files && e.target.files[0]
          if(!file) return
          const reader = new FileReader()
          reader.onload = ()=>{
            update({ media: reader.result })
          }
          reader.readAsDataURL(file)
        }} />
        {form.media && <div className="record-form__preview"><img src={form.media} alt="Selected media preview" /></div>}
      </div>

      <div className="record-form__actions">
        <button className="button button--primary" type="submit">Submit report</button>
      </div>
    </form>
  )
}
