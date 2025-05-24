import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';

function AppWrapper() {
  const user = JSON.parse(localStorage.getItem('user'));
  const location = useLocation();

  const isAuthPage = ['/login', '/register'].includes(location.pathname);

  return (
    <div className="app-root">
      <header className="app-header">
        <div className="header-content">
          <img src="/logo_icon.png" alt="FastTask Logo" className="app-logo" />
          <h1 className="app-brand">FastTask</h1>
        </div>
      </header>

      <div className={`app-content ${isAuthPage ? 'auth-layout' : 'default-layout'}`}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/dashboard"
            element={user ? <DashboardPage user={user} /> : <Navigate to="/login" />}
          />
          <Route
            path="/profile"
            element={user ? <ProfilePage /> : <Navigate to="/login" />}
          />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;
