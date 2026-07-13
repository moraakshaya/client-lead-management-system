import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from './layouts/MainLayout.jsx'
import { Dashboard } from './pages/Dashboard/dashboard.jsx'
import { Leads } from "./pages/Leads/Leads.jsx";
import { Clients } from "./pages/Clients/Clients.jsx";
import { FollowUps } from "./pages/FollowUps/FollowUps.jsx";

import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/leads" element={<Leads />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/follow-ups" element={<FollowUps />} />
          <Route path="/notes" element={<h1>Notes</h1>} />
          <Route path="/activity-timeline" element={<h1>Activity Timeline</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
