import React from 'react'
import { Link } from 'react-router-dom'

export default function RecordCard({record}){
  return (
    <article className="record-card">
      <div className="meta">
        <strong>{record.title}</strong>
        <div style={{display:'flex',alignItems:'center',gap:8}}>
          <span className={`type-badge ${record.type === 'red-flag' ? 'red-flag' : record.type === 'intervention' ? 'intervention' : ''}`}>{record.type}</span>
          <small>{record.status}</small>
          <Link to={`/edit/${record.id}`} className="btn" style={{marginLeft:8}}>Update</Link>
        </div>
      </div>
      <p style={{margin:'8px 0'}}>{record.description}</p>
      <div style={{fontSize:12,color:'#444'}}>{record.latitude},{record.longitude}</div>
      {(record.attachments||[]).length > 0 && (
        <div style={{marginTop:8,display:'flex',gap:8,flexWrap:'wrap'}}>
          {(record.attachments||[]).map((a,i)=> (
            a.type && a.type.startsWith('image') ?
              <img key={i} src={a.preview} alt={a.name} style={{maxWidth:160,borderRadius:6}} /> :
              <video key={i} src={a.preview} style={{maxWidth:200}} controls />
          ))}
        </div>
      )}
    </article>
  )
}
