import React from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

export default function HowItWorks(){
  return (
    <div>
      <Navbar />
      <main style={{ padding: 24, maxWidth: 900, margin: '24px auto' }}>
        <h1>How it works</h1>
        <p>This application uses localStorage to store mock users and an in-memory auth context to simulate authentication. Navigation is handled client-side for a simple SPA experience.</p>
        <ol>
          <li>Register an account via the Register page.</li>
          <li>Log in using the Login page.</li>
          <li>Once signed in, you can access protected pages like Reports.</li>
        </ol>
      </main>
      <Footer />
    </div>
  )
}
