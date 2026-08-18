import React from 'react'

export default function LocationPicker({ value, onChange }){
  // Simple picker with a map placeholder. Integration with a map library (Leaflet/Mapbox)
  // can be added later. For now the component can accept a comma-separated value
  // or call onChange with { latitude, longitude }.
  return (
    <div style={{display:'grid',gridTemplateColumns:'1fr 300px',gap:12,alignItems:'start'}}>
      <div>
        <input placeholder="Search location or paste lat,lon" value={value||''} onChange={e=>onChange && onChange(e.target.value)} />
        <div style={{marginTop:8,border:'1px solid #e6eef8',height:180,display:'flex',alignItems:'center',justifyContent:'center'}}>
          <div>Map placeholder (integrate Leaflet/Mapbox here)</div>
        </div>
      </div>
      <div>
        <div style={{fontSize:12,color:'#666'}}>Quick pick</div>
        <button onClick={()=>onChange && onChange({ latitude: '0.000', longitude: '0.000' })} style={{display:'block',marginTop:8}}>Use default 0,0</button>
      </div>
    </div>
  )
}
