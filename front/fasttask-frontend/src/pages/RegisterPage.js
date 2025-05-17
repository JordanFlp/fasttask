import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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
      await axios.post(
        'http://localhost:8080/user',
        {
          name: fullName,
          email,
          password,
          address: fullAddress,
          phone,
          birthdate,
        },
        { headers: { 'Content-Type': 'application/json' } }
      );

      alert('Cadastro realizado com sucesso!');
      navigate('/login');
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
    <form onSubmit={handleRegister} style={{ maxWidth: 400, margin: '0 auto' }}>
      <h2>Cadastro</h2>

      {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}

      <input
        type="text"
        placeholder="Nome"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Sobrenome"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        required
      />

      <input
        type="email"
        placeholder="E‑mail"
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

      <input
        type="password"
        placeholder="Confirme a senha"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Rua"
        value={street}
        onChange={(e) => setStreet(e.target.value)}
      />

      <input
        type="text"
        placeholder="Número"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
      />

      <input
        type="text"
        placeholder="Bairro"
        value={neighborhood}
        onChange={(e) => setNeighborhood(e.target.value)}
      />

      <input
        type="text"
        placeholder="Cidade"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />

      <input
        type="text"
        placeholder="Telefone (XX) X XXXX-XXXX"
        value={phone}
        onChange={(e) => setPhone(formatPhoneNumber(e.target.value))}
        maxLength={16}
      />

      <input
        type="date"
        placeholder="Data de nascimento"
        value={birthdate}
        onChange={(e) => setBirthdate(e.target.value)}
      />

      <button type="submit" style={{ marginTop: '1rem' }}>
        Cadastrar
      </button>
    </form>
  );
};

export default RegisterPage;
