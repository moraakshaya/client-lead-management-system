import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from './components/ScrollToTop';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import MainLayout from './layouts/MainLayout.jsx'
import { Dashboard } from './pages/Dashboard/dashboard.jsx'
import { Leads } from "./pages/Leads/Leads.jsx";
import { Clients } from "./pages/Clients/Clients.jsx";
import { FollowUps } from "./pages/FollowUps/FollowUps.jsx";
import { Notes } from "./pages/Notes/Notes.jsx";
import { ActivityTimeline } from "./pages/ActivityTimeline/ActivityTimeline.jsx";
import { Settings } from "./pages/Settings/Settings.jsx";

import './App.css'

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/leads" element={<Leads />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/follow-ups" element={<FollowUps />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/activity-timeline" element={<ActivityTimeline />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
