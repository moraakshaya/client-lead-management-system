import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
import { Login } from "./pages/Login/Login.jsx";
// --- NEW IMPORTS ---
import { Users } from "./pages/Users/Users.jsx";
import { LandingPage } from "./pages/LandingPage/LandingPage.jsx";
import { ForgotPassword } from "./pages/ForgotPassword/ForgotPassword.jsx";
import { ResetPassword } from "./pages/ResetPassword/ResetPassword.jsx";

import './App.css'

// --- PROTECTED ROUTE COMPONENT ---
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

// --- PUBLIC ROUTE COMPONENT ---
// If a logged-in user visits the landing page or login page, redirect them to the dashboard!
const PublicRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (token) {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
};

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        {/* PUBLIC ROUTES (No Token Required) */}
        <Route path="/" element={<PublicRoute><LandingPage /></PublicRoute>} />
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />

        <Route path="/forgot-password" element={<PublicRoute><ForgotPassword /></PublicRoute>} />
        <Route path="/reset-password/:token" element={<PublicRoute><ResetPassword /></PublicRoute>} />

        {/* PROTECTED ROUTES (Token Required, Wrapped in MainLayout) */}
        <Route element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/leads" element={<Leads />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/follow-ups" element={<FollowUps />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/activity-timeline" element={<ActivityTimeline />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/users" element={<Users />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
