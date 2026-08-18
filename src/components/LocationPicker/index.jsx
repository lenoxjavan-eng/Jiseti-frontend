import React, { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
})

function ClickHandler({ onMapClick }){
  useMapEvents({
    click(e){ onMapClick && onMapClick(e.latlng) }
  })
  return null
}

export default function LocationPicker({ value, onChange }){
  const [pos, setPos] = useState(null)

  useEffect(()=>{
    if(!value) return
    if(typeof value === 'string'){
      const [lat, lon] = value.split(',')
      if(lat && lon) setPos([parseFloat(lat), parseFloat(lon)])
    } else if(value.latitude && value.longitude){
      setPos([parseFloat(value.latitude), parseFloat(value.longitude)])
    }
  },[value])

  function handleMapClick(latlng){
    const [latitude, longitude] = [latlng.lat, latlng.lng]
    setPos([latitude, longitude])
    onChange && onChange({ latitude: String(latitude), longitude: String(longitude) })
  }

  return (
    <div style={{display:'grid',gridTemplateColumns:'1fr 200px',gap:12}}>
      <div>
        <input placeholder="Search location or paste lat,lon" value={value||''} onChange={e=>onChange && onChange(e.target.value)} />
        <div style={{marginTop:8,border:'1px solid #e6eef8'}}>
          <MapContainer center={pos || [0,0]} zoom={pos?13:2} style={{height:260}}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <ClickHandler onMapClick={handleMapClick} />
            {pos && <Marker position={pos} />}
          </MapContainer>
        </div>
      </div>
      <div>
        <div style={{fontSize:12,color:'#666'}}>Quick pick</div>
        <button type="button" onClick={()=>onChange && onChange({ latitude: '0.000', longitude: '0.000' })} style={{display:'block',marginTop:8}}>Use default 0,0</button>
      </div>
    </div>
  )
}
