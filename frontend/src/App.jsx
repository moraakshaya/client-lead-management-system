import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from './layouts/MainLayout.jsx'
import { Dashboard } from './pages/Dashboard/dashboard.jsx'
import { Leads } from "./pages/Leads/Leads.jsx";

import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/leads" element={<Leads />} />
          <Route path="/clients" element={<h1>Clients</h1>} />
          <Route path="/follow-ups" element={<h1>Follow-Ups</h1>} />
          <Route path="/notes" element={<h1>Notes</h1>} />
          <Route path="/activity-timeline" element={<h1>Activity Timeline</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
