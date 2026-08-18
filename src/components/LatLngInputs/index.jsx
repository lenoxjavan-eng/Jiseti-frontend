import React from 'react'

export default function LatLngInputs({ latitude, longitude, onChange }){
  return (
    <div style={{display:'flex',gap:8,marginTop:8}}>
      <div style={{flex:1}}>
        <label>Latitude</label>
        <input value={latitude||''} onChange={e=>onChange({ latitude: e.target.value })} placeholder="Latitude" />
      </div>
      <div style={{flex:1}}>
        <label>Longitude</label>
        <input value={longitude||''} onChange={e=>onChange({ longitude: e.target.value })} placeholder="Longitude" />
      </div>
    </div>
  )
}
