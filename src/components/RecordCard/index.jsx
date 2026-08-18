import React from 'react'

export default function RecordCard({record}){
  return (
    <article style={{border:'1px solid #e6eef8',padding:12,borderRadius:8,marginBottom:12}}>
      <div style={{display:'flex',justifyContent:'space-between'}}>
        <strong>{record.title}</strong>
        <small>{record.type} • {record.status}</small>
      </div>
      <p style={{margin:'8px 0'}}>{record.description}</p>
      <div style={{fontSize:12,color:'#444'}}>{record.latitude},{record.longitude}</div>
      {record.media && <div style={{marginTop:8}}><img src={record.media} alt="media" style={{maxWidth:240}}/></div>}
    </article>
  )
}
