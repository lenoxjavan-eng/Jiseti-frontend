import React from 'react'

export default function Button({children, className = '', ...props}){
  const cls = `btn ${className}`.trim()
  return (<button className={cls} {...props}>{children || 'Button'}</button>)
}
