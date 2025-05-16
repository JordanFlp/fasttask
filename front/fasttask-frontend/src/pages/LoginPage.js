import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      console.log('Tentando fazer login com os seguintes dados:', { email, password });

      const response = await axios.post('http://localhost:8080/user/login', 
        { email, password },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );

      console.log('Resposta do backend:', response.data);
      localStorage.setItem('user', JSON.stringify(response.data));
      navigate('/dashboard');
    } catch (error) {
      console.error('Erro no login:', error);
      if (error.response) {
        alert(`Erro no login: ${error.response.data || error.message}`);
      } else {
        alert('Erro na conexão com o servidor!');
      }
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
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
      <button type="submit">Entrar</button>

      <p style={{ marginTop: '1rem' }}>
        Não tem uma conta? <Link to="/register">Cadastre-se</Link>
      </p>
    </form>
  );
};

export default LoginPage;
