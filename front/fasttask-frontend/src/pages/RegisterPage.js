import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/RegisterPage.css';

const RegisterPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [error, setError] = useState('');

  const [photoBase64, setPhotoBase64] = useState('');
  const [previewSrc, setPreviewSrc] = useState('');

  const navigate = useNavigate();

  const formatPhoneNumber = (value) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length <= 2) return `(${cleaned}`;
    if (cleaned.length <= 7) return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2)}`;
    if (cleaned.length <= 11) {
      return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 3)} ${cleaned.slice(3, 7)}-${cleaned.slice(7)}`;
    }
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 3)} ${cleaned.slice(3, 7)}-${cleaned.slice(7, 11)}`;
  };

  const getInitials = (name) => {
    if (!name || typeof name !== 'string') return '';
    const parts = name.trim().split(' ').filter(Boolean);
    if (parts.length === 0) return '';
    const firstInitial = parts[0][0]?.toUpperCase() || '';
    const secondInitial = parts[1]?.[0]?.toUpperCase() || '';
    return `${firstInitial}${secondInitial}`;
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setPhotoBase64(reader.result);
      setPreviewSrc(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const cleanBase64Image = (base64String) => {
    if (!base64String || !base64String.includes(',')) return null;
    return base64String;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('As senhas não conferem.');
      return;
    }

    const fullName = `${firstName.trim()} ${lastName.trim()}`.trim();
    const fullAddress = `${street.trim()}, ${number.trim()} - ${neighborhood.trim()}, ${city.trim()}`.trim();

    try {
      await axios.post('http://localhost:8080/user', {
        name: fullName,
        email,
        password,
        address: fullAddress,
        phone,
        birthdate,
        photoBase64: photoBase64 ? cleanBase64Image(photoBase64) : null,
      }, {
        headers: { 'Content-Type': 'application/json' }
      });

      console.log('Cadastro realizado com sucesso!');
      navigate('/dashboard');
    } catch (err) {
      console.error('Erro no cadastro:', err);
      if (err.response?.data) {
        setError(err.response.data);
      } else {
        setError('Erro na conexão com o servidor.');
      }
    }
  };

  return (
    <div className="auth-layout">
      <div className="register-form-container">
        <div className="register-header">
          <h2>Cadastro</h2>
        </div>
        
        <form onSubmit={handleRegister} className="register-inner-form">
          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <label htmlFor="photo" className="input-label">Foto de Perfil</label>
            <div className="photo-upload-section">
              <div className="avatar-container">
                {previewSrc ? (
                  <img src={previewSrc} alt="Avatar" />
                ) : (
                  (firstName || lastName) ? (
                    <div className="avatar-initials">
                      {getInitials(`${firstName} ${lastName}`)}
                    </div>
                  ) : (
                    <div className="default-avatar-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )
                )}
              </div>
              <div className="custom-file-input-wrapper">
                <input id="photo" type="file" accept="image/*" onChange={handlePhotoChange} className="hidden-file-input" />
                <label htmlFor="photo" className="custom-upload-button">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M11.47 2.47a.75.75 0 0 1 1.06 0l3.75 3.75a.75.75 0 0 1-1.06 1.06L12 4.81v11.69a.75.75 0 0 1-1.5 0V4.81L8.78 7.28a.75.75 0 0 1-1.06-1.06l3.75-3.75Z" clipRule="evenodd" />
                    <path fillRule="evenodd" d="M2.25 13.5a.75.75 0 0 0 0 1.5h19.5a.75.75 0 0 0 0-1.5H2.25Z" clipRule="evenodd" />
                  </svg>
                  Escolher Arquivo
                </label>
              </div>
              {previewSrc && (
                <button
                  type="button"
                  onClick={() => {
                    setPhotoBase64('');
                    setPreviewSrc('');
                  }}
                  className="remove-photo-button"
                >
                  Remover Foto
                </button>
              )}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="firstName" className="input-label">Nome</label>
            <input
              id="firstName"
              type="text"
              placeholder="Digite seu nome"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="lastName" className="input-label">Sobrenome</label>
            <input
              id="lastName"
              type="text"
              placeholder="Digite seu sobrenome"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email" className="input-label">E-mail</label>
            <input
              id="email"
              type="email"
              placeholder="Digite seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="input-label">Senha</label>
            <input
              id="password"
              type="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword" className="input-label">Confirme a senha</label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="Confirme sua senha"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="street" className="input-label">Rua</label>
            <input
              id="street"
              type="text"
              placeholder="Digite sua rua"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="number" className="input-label">Número</label>
            <input
              id="number"
              type="text"
              placeholder="Número da residência"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="neighborhood" className="input-label">Bairro</label>
            <input
              id="neighborhood"
              type="text"
              placeholder="Digite seu bairro"
              value={neighborhood}
              onChange={(e) => setNeighborhood(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="city" className="input-label">Cidade</label>
            <input
              id="city"
              type="text"
              placeholder="Digite sua cidade"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone" className="input-label">Telefone</label>
            <input
              id="phone"
              type="tel"
              placeholder="Telefone (XX) X XXXX-XXXX"
              value={phone}
              onChange={(e) => setPhone(formatPhoneNumber(e.target.value))}
              maxLength={16}
            />
          </div>

          <div className="form-group">
            <label htmlFor="birthdate" className="input-label">Data de Nascimento</label>
            <input
              id="birthdate"
              type="date"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
            />
          </div>

          <button type="submit" className="ft-btn ft-btn-primary ft-btn-block">
            Cadastrar
          </button>

          <div className="form-footer">
            <p className="register-link">
              Já tem uma conta?{' '}
              <Link to="/login" className="register-link-text">
                Entrar
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
