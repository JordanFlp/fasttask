import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TaskList from '../components/TaskList';
import '../styles/DashboardPage.css';

const getInitials = (name) => {
  if (!name) return '';
  const words = name.trim().split(' ');
  if (words.length === 1) return words[0][0].toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
};

const DashboardPage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (!user) {
    return <div className="dashboard-loading">Carregando...</div>;
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="dashboard-avatar" onClick={() => navigate('/profile')}>
          {user.photoBase64 ? (
            <img src={user.photoBase64} alt="Avatar" />
          ) : (
            getInitials(user.name)
          )}
        </div>
        <h2 className="dashboard-welcome">Bem-vindo(a), {user.name.split(' ')[0]}!</h2>
        <button className="dashboard-logout" onClick={handleLogout}>
          Sair
        </button>
      </header>

      <main className="dashboard-content">
        <TaskList userId={user.id} />
      </main>
    </div>
  );
};

export default DashboardPage;