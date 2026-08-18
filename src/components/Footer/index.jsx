import React from 'react'

export default function Footer() {
  const foot = {
    padding: '24px 20px',
    borderTop: '1px solid #e6e6e6',
    textAlign: 'center',
    background: '#fafafa',
    marginTop: 40,
  }

  const small = { color: '#6b7280', fontSize: 13 }

  return (
    <footer style={foot} role="contentinfo">
      <div style={small}>© {new Date().getFullYear()} Jiseti — All rights reserved.</div>
    </footer>
  )
}
