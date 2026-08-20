import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import AdminDashboard from './pages/AdminDashboard'
import AdminRecordDetails from './pages/AdminRecordDetails'
import Home from './pages/Home'
import Login from './pages/Login'
import AdminLogin from './pages/AdminLogin'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard/Dashboard.jsx'
import MyRecords from './pages/MyRecords/MyRecords.jsx'
import CreateRecord from './pages/CreateRecord'
import CreateRedFlag from './pages/CreateRedFlag'
import CreateIntervention from './pages/CreateIntervention'
import RecordDetails from './pages/RecordDetails/RecordDetails.jsx'
import EditRecord from './pages/EditRecord/EditRecord.jsx'
import About from './pages/About'
import HowItWorks from './pages/HowItWorks'
import Reports from './pages/Reports'
import { AdminRoute, ProtectedRoute } from './components/RouteGuards'
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
        <Route path="/about" element={<About />} />
        <Route path="/how" element={<HowItWorks />} />
        <Route path="/dashboard" element={<AdminRoute><Dashboard /></AdminRoute>} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/records" element={<ProtectedRoute><MyRecords /></ProtectedRoute>} />
        <Route path="/my-records" element={<Navigate to="/records" replace />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/records/new" element={<ProtectedRoute><CreateRecord /></ProtectedRoute>} />
        <Route path="/records/:id" element={<ProtectedRoute><RecordDetails /></ProtectedRoute>} />
        <Route path="/records/:id/edit" element={<ProtectedRoute><EditRecord /></ProtectedRoute>} />
        <Route path="/edit/:id" element={<Navigate to="/records" replace />} />
        <Route path="/create/red-flag" element={<ProtectedRoute><CreateRedFlag /></ProtectedRoute>} />
        <Route path="/create/intervention" element={<ProtectedRoute><CreateIntervention /></ProtectedRoute>} />
        <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
        <Route path="/admin/record/:id" element={<AdminRoute><AdminRecordDetails /></AdminRoute>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

export default App
