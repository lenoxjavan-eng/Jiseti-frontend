import React, { useEffect, useState } from 'react'

export default function Modal({ title, children, onClose, actions }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // trigger enter animation
    requestAnimationFrame(() => setVisible(true))
    return () => {}
  }, [])

  const overlay = {
    position: 'fixed', inset: 0,
    background: 'rgba(0,0,0,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50
  }

  const boxBase = {
    background: '#fff', padding: 20, borderRadius: 8, maxWidth: 560, width: '90%', transition: 'transform 220ms ease, opacity 220ms ease'
  }
  const boxVisible = { transform: visible ? 'translateY(0) scale(1)' : 'translateY(8px) scale(0.98)', opacity: visible ? 1 : 0 }

  function handleOverlayClick(e){
    if (e.target === e.currentTarget) onClose && onClose()
  }

  return (
    <div style={overlay} role="dialog" aria-modal="true" onClick={handleOverlayClick}>
      <div style={{ ...boxBase, ...boxVisible }} onClick={(e) => e.stopPropagation()}>
        {title && <h3 style={{ marginTop: 0 }}>{title}</h3>}
        <div>{children}</div>
        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 16 }}>
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

