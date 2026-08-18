import React from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

export default function About(){
  return (
    <div>
      <Navbar />
      <main style={{ padding: 24, maxWidth: 900, margin: '24px auto' }}>
        <h1>About Jiseti</h1>
        <p>Jiseti is a lightweight records app prototype created to demonstrate UI patterns, authentication flows and basic record management.</p>
      </main>
      <Footer />
    </div>
  )
}
