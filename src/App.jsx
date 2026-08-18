import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import AdminDashboard from './pages/AdminDashboard'
import AdminRecordDetails from './pages/AdminRecordDetails'
import Home from './pages/Home'
import CreateRecord from './pages/CreateRecord'
import CreateRedFlag from './pages/CreateRedFlag'
import CreateIntervention from './pages/CreateIntervention'
import MyRecords from './pages/MyRecords'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateRecord />} />
        <Route path="/create/red-flag" element={<CreateRedFlag />} />
        <Route path="/create/intervention" element={<CreateIntervention />} />
        <Route path="/my-records" element={<MyRecords />} />
        <Route path="/records" element={<MyRecords />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/record/:id" element={<AdminRecordDetails />} />
        <Route path="/" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

export default App
