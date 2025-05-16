import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/user', {
        name,
        email,
        password,
      }, {
        headers: { 'Content-Type': 'application/json' }
      });

      console.log('Usuário criado:', response.data);
      alert('Cadastro realizado com sucesso!');
      navigate('/login');
    } catch (error) {
      console.error('Erro no cadastro:', error);
      if (error.response) {
        alert(`Erro: ${error.response.data}`);
      } else {
        alert('Erro na conexão com o servidor!');
      }
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <h2>Cadastro</h2>
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
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Cadastrar</button>
    </form>
  );
};

export default RegisterPage;
