import React from 'react'

export default function StatusBadge({status}){
  return <span>{status || 'unknown'}</span>
}
