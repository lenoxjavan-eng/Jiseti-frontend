import React from 'react'

export default function RecordCard({record}){
  return (
    <article className="record-card">
      <div className="meta">
        <strong>{record.title}</strong>
        <small>{record.type} • {record.status}</small>
      </div>
      <p style={{margin:'8px 0'}}>{record.description}</p>
      <div style={{fontSize:12,color:'#444'}}>{record.latitude},{record.longitude}</div>
      {record.media && <div style={{marginTop:8}}><img src={record.media} alt="media" style={{maxWidth:240}}/></div>}
    </article>
  )
}
