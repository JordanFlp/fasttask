import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';

function App() {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <Router>
      <div className="app-root">  
       <header className="app-header">
        <div className="header-content">
          <img src="/logo_icon.png" alt="FastTask Logo" className="app-logo" />
          <h1 className="app-brand">FastTask</h1>
        </div>
      </header>

        {/* Container flexível baseado na rota */}
        <div className={`app-content ${['/login', '/register'].includes(window.location.pathname) ? 'auth-layout' : 'default-layout'}`}>
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
    </Router>
  );
}

export default App;