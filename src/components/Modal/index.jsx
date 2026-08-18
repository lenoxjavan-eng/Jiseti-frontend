import React from 'react'

export default function Modal({ title, children, onClose, actions }) {
  const overlay = {
    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
    background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50
  }
  const box = { background: '#fff', padding: 20, borderRadius: 8, maxWidth: 560, width: '90%' }
  const footer = { display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 16 }

  return (
    <div style={overlay} role="dialog" aria-modal="true">
      <div style={box}>
        {title && <h3 style={{ marginTop: 0 }}>{title}</h3>}
        <div>{children}</div>
        <div style={footer}>
          {actions && actions.map((a, i) => (
            <button key={i} onClick={a.onClick} style={{ padding: '8px 12px', ...(a.primary ? { background: '#2563eb', color: '#fff', border: 'none' } : {}) }}>
              {a.label}
            </button>
          ))}
          <button onClick={onClose} style={{ padding: '8px 12px' }}>Close</button>
        </div>
      </div>
    </div>
  )
}

