import React from 'react'

export default function RecordCard({record}){
  return (
    <div className="record-card">
      <strong>{record?.title}</strong>
    </div>
  )
}
