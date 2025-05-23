import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/LoginPage.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    if (!email.includes('@')) {
      setErrorMsg('Por favor, insira um e-mail válido.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:8080/user/login',
        { email, password },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );

      localStorage.setItem('user', JSON.stringify(response.data));
      navigate('/dashboard');
    } catch (error) {
      if (error.response) {
        setErrorMsg(error.response.data || 'Credenciais inválidas');
      } else {
        setErrorMsg('Erro na conexão com o servidor.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-layout">
      <div className="login-container">
        <div className="login-header">
          <h2>Bem-vindo</h2>
        </div>
        
        <form className="login-form" onSubmit={handleLogin}>
          {errorMsg && <div className="error-message">{errorMsg}</div>}

          <div className="form-group">
            <label htmlFor="email" className="input-label">E-mail</label>
            <input
              id="email"
              type="email"
              className="form-input"
              placeholder="Digite seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="input-label">Senha</label>
            <input
              id="password"
              type="password"
              className="form-input"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            className={`ft-btn ft-btn-primary ft-btn-block ${loading ? 'ft-btn-loading' : ''}`}
            disabled={loading}
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>

          <div className="form-footer">
            <p className="register-link">
              Não tem uma conta?{' '}
              <Link to="/register" className="register-link-text">
                Cadastre-se
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;