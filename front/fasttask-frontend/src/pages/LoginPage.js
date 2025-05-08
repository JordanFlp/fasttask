import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      console.log('Tentando fazer login com os seguintes dados:', { email, password }); // Log dos dados de login
  
      const response = await axios.post('http://localhost:8080/user/login', 
        {
          email,
          password,
        },
        {
          headers: {
            'Content-Type': 'application/json', 
          },
          withCredentials: true, 
        }
      );
  
      console.log('Resposta do backend:', response); 
  
      const user = response.data;
      localStorage.setItem('user', JSON.stringify(user));
      navigate('/dashboard');
    } catch (error) {
      console.error('Erro no login:', error);
  
      if (error.response) {
       
        console.error('Resposta de erro do backend:', error.response);
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
    </form>
  );
};

export default LoginPage;
