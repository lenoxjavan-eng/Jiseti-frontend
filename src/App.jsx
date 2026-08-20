import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import AdminDashboard from './pages/AdminDashboard'
import AdminRecordDetails from './pages/AdminRecordDetails'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import MyRecords from './pages/MyRecords'
import CreateRedFlag from './pages/CreateRedFlag'
import CreateIntervention from './pages/CreateIntervention'
import Navbar from './components/Navbar'
import './App.css'

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/records" element={<MyRecords />} />
        <Route path="/my-records" element={<MyRecords />} />
        <Route path="/create/red-flag" element={<CreateRedFlag />} />
        <Route path="/create/intervention" element={<CreateIntervention />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/record/:id" element={<AdminRecordDetails />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

export default App
