import React from 'react'

export default function RecordCard({record}){
  return (
    <article className="record-card">
      <div className="meta">
        <strong>{record.title}</strong>
        <div style={{display:'flex',alignItems:'center',gap:8}}>
          <span className={`type-badge ${record.type === 'red-flag' ? 'red-flag' : record.type === 'intervention' ? 'intervention' : ''}`}>{record.type}</span>
          <small>{record.status}</small>
          <a href={`/edit/${record.id}`} className="btn secondary" style={{marginLeft:8}}>Update</a>
        </div>
      </div>
      <p style={{margin:'8px 0'}}>{record.description}</p>
      <div style={{fontSize:12,color:'#444'}}>{record.latitude},{record.longitude}</div>
      {record.media && <div style={{marginTop:8}}><img src={record.media} alt="media" style={{maxWidth:240}}/></div>}
    </article>
  )
}
