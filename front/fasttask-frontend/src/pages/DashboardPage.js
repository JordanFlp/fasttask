import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TaskList from '../components/TaskList';

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
      alert('Você precisa fazer login primeiro!');
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (!user) {
    return <div>Carregando...</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      {/* Header com nome e avatar */}
      <div
        onClick={() => navigate('/profile')}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          cursor: 'pointer',
          marginBottom: '20px',
        }}
      >
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            backgroundColor: '#ccc',
            color: '#fff',
            fontWeight: 'bold',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '18px',
          }}
        >
          {getInitials(user.name)}
        </div>
        <h2 style={{ margin: 0 }}>Bem-vindo(a), {user.name}!</h2>
      </div>

      <button onClick={handleLogout} style={{ marginBottom: '20px' }}>
        Sair
      </button>

      <TaskList userId={user.id} />
    </div>
  );
};

export default DashboardPage;
