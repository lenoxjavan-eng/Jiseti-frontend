import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import AdminDashboard from './pages/AdminDashboard'
import AdminRecordDetails from './pages/AdminRecordDetails'
import Home from './pages/Home'
import CreateRedFlag from './pages/CreateRedFlag'
import MyRecords from './pages/MyRecords'
import EditRecord from './pages/EditRecord'
import './App.css'
import Navbar from './components/Navbar'

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create/red-flag" element={<CreateRedFlag />} />
        <Route path="/my-records" element={<MyRecords />} />
        <Route path="/records" element={<MyRecords />} />
        <Route path="/edit/:id" element={<EditRecord />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/record/:id" element={<AdminRecordDetails />} />
        <Route path="/" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

export default App
