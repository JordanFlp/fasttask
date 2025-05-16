import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setName(parsedUser.name);
      setEmail(parsedUser.email);
    }
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!user) return;

    const updatedData = {
      id: user.id,
      name,
      email,
    };

    // Só adiciona nova senha se o campo estiver preenchido
    if (newPassword) {
      updatedData.password = newPassword;
    }

    try {
      const response = await axios.put(`http://localhost:8080/user/${user.id}`, updatedData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      alert('Perfil atualizado com sucesso!');
      localStorage.setItem('user', JSON.stringify(response.data));
      navigate('/dashboard');
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      alert('Erro ao atualizar perfil!');
    }
  };

  if (!user) {
    return <div>Carregando...</div>;
  }

  const getInitials = (name) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div>
      <button onClick={() => navigate('/dashboard')}>← Voltar</button>
      <h2>Perfil do Usuário</h2>

      <div style={{ fontSize: '48px', width: '80px', height: '80px', backgroundColor: '#ccc', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {getInitials(user.name)}
      </div>

      {!editing ? (
        <div>
          <p><strong>Nome:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <button onClick={() => setEditing(true)}>Editar Perfil</button>
        </div>
      ) : (
        <form onSubmit={handleUpdate}>
          <input
            type="text"
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Nova senha (opcional)"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button type="submit">Salvar</button>
          <button type="button" onClick={() => {
            setEditing(false);
            setName(user.name);
            setEmail(user.email);
            setNewPassword('');
          }}>
            Cancelar
          </button>
        </form>
      )}
    </div>
  );
};

export default ProfilePage;
