import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TaskList from '../components/TaskList';

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

  // Função para fazer logout
  const handleLogout = () => {
    localStorage.removeItem('user');  // Limpar o localStorage
    navigate('/login');  // Redirecionar para a página de login
  };

  if (!user) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      {/* Exibindo nome do usuário e foto de perfil */}
      <div
        onClick={() => navigate('/profile')}
        style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
      >
        <img
          src="https://via.placeholder.com/40"
          alt="Perfil"
          style={{ borderRadius: '50%' }}
        />
        <h2>Bem-vindo, {user.name}!</h2>
      </div>

      {/* Botão de Logout */}
      <button onClick={handleLogout}>Sair</button>

      {/* Exibindo a lista de tarefas */}
      <TaskList userId={user.id} />
    </div>
  );
};

export default DashboardPage;
