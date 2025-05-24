import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/ProfilePage.css';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [isEditingPhoto, setIsEditingPhoto] = useState(false);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [city, setCity] = useState('');

  const [phone, setPhone] = useState('');
  const [birthdate, setBirthdate] = useState('');

  const [photoBase64, setPhotoBase64] = useState('');
  const [previewSrc, setPreviewSrc] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (!stored) {
      navigate('/login');
      return;
    }
    const u = JSON.parse(stored);
    setUser(u);

    const parts = u.name.trim().split(' ');
    setFirstName(parts.shift());
    setLastName(parts.join(' '));

    setEmail(u.email);
    setPhone(u.phone || '');
    setBirthdate(u.birthdate || '');

    if (u.address) {
      const addressParts = u.address.split(',');
      if (addressParts.length >= 1) setStreet(addressParts[0].trim());
      if (addressParts.length >= 2) {
        const numBairroCidade = addressParts[1].trim().split('-');
        if (numBairroCidade.length >= 1) setNumber(numBairroCidade[0].trim());
        if (numBairroCidade.length >= 2) {
          const bairroCidadeParts = numBairroCidade[1].trim().split(',');
          if (bairroCidadeParts.length >= 1) setNeighborhood(bairroCidadeParts[0].trim());
          if (bairroCidadeParts.length >= 2) setCity(bairroCidadeParts[1].trim());
        }
      }
    }

    if (u.photoBase64) {
      setPreviewSrc(u.photoBase64);
      setPhotoBase64(u.photoBase64);
    }
  }, [navigate]);

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

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!user) return;

    const fullName = `${firstName} ${lastName}`.trim();
    const fullAddress = `${street}, ${number} - ${neighborhood}, ${city}`.trim();

    const updatedData = {
      id: user.id,
      name: fullName,
      email,
      address: fullAddress,
      phone,
      birthdate,
      photoBase64: photoBase64 ? cleanBase64Image(photoBase64) : null,
    };

    if (newPassword) {
      updatedData.password = newPassword;
    }

    try {
      const { data } = await axios.put(
        `http://localhost:8080/user/${user.id}`,
        updatedData,
        { headers: { 'Content-Type': 'application/json' } }
      );
      localStorage.setItem('user', JSON.stringify(data));
      setUser(data);
      setEditing(false);
      setIsEditingPhoto(false);
      console.log('Perfil atualizado com sucesso!');
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      console.error('Erro ao atualizar perfil!');
    }
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm('Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.')) {
      return;
    }
    try {
      await axios.delete(`http://localhost:8080/user/${user.id}`);
      localStorage.removeItem('user');
      console.log('Conta excluída com sucesso!');
      navigate('/login');
    } catch (err) {
      console.error(err);
      console.error('Erro ao excluir conta!');
    }
  };

  if (!user) return <div>Carregando...</div>;

  return (
    <div className="profile-page-container">
      <button onClick={() => navigate('/dashboard')} className="back-button">
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" width="20" height="20" style={{ marginRight: '6px' }}>
          <path fillRule="evenodd" d="M15.28 3.72a.75.75 0 0 1 0 1.06L9.06 11l6.22 6.22a.75.75 0 0 1-1.06 1.06l-6.75-6.75a.75.75 0 0 1 0-1.06l6.75-6.75a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
        </svg>
        Voltar
      </button>
      <h2>Perfil do Usuário</h2>

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

        {editing && !isEditingPhoto && (
          <button
            type="button"
            onClick={() => setIsEditingPhoto(true)}
            className="ft-btn ft-btn-secondary"
          >
            Editar Foto
          </button>
        )}

        {editing && isEditingPhoto && (
          <div className="custom-file-input-wrapper">
            <input id="photo-profile" type="file" accept="image/*" onChange={handlePhotoChange} className="hidden-file-input" />
            <label htmlFor="photo-profile" className="custom-upload-button">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M11.47 2.47a.75.75 0 0 1 1.06 0l3.75 3.75a.75.75 0 0 1-1.06 1.06L12 4.81v11.69a.75.75 0 0 1-1.5 0V4.81L8.78 7.28a.75.75 0 0 1-1.06-1.06l3.75-3.75Z" clipRule="evenodd" />
                <path fillRule="evenodd" d="M2.25 13.5a.75.75 0 0 0 0 1.5h19.5a.75.75 0 0 0 0-1.5H2.25Z" clipRule="evenodd" />
              </svg>
              Escolher Arquivo
            </label>
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
            <button
              type="button"
              onClick={() => setIsEditingPhoto(false)}
              className="ft-btn ft-btn-secondary"
            >
              OK
            </button>
          </div>
        )}
      </div>

      {!editing ? (
        <div className="profile-info-display">
          <p><strong>Nome:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Endereço:</strong> {user.address || '—'}</p>
          <p><strong>Telefone:</strong> {user.phone || '—'}</p>
          <p><strong>Data de Nasc.:</strong> {user.birthdate || '—'}</p>
          <div className="profile-actions">
            <button onClick={() => setEditing(true)} className="ft-btn ft-btn-primary">
              Editar Perfil
            </button>
            <button onClick={handleDeleteAccount} className="delete-account-button">
              Excluir Conta
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleUpdate} className="profile-edit-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName" className="input-label">Nome</label>
              <input
                id="firstName"
                type="text"
                placeholder="Primeiro nome"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName" className="input-label">Sobrenome</label>
              <input
                id="lastName"
                type="text"
                placeholder="Sobrenome"
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email" className="input-label">E-mail</label>
            <input
              id="email"
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="newPassword" className="input-label">Nova Senha</label>
            <input
              id="newPassword"
              type="password"
              placeholder="Nova senha (opcional)"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="street" className="input-label">Rua</label>
              <input
                id="street"
                type="text"
                placeholder="Rua"
                value={street}
                onChange={e => setStreet(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="number" className="input-label">Número</label>
              <input
                id="number"
                type="text"
                placeholder="Número"
                value={number}
                onChange={e => setNumber(e.target.value)}
              />
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="neighborhood" className="input-label">Bairro</label>
            <input
              id="neighborhood"
              type="text"
              placeholder="Bairro"
              value={neighborhood}
              onChange={e => setNeighborhood(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="city" className="input-label">Cidade</label>
            <input
              id="city"
              type="text"
              placeholder="Cidade"
              value={city}
              onChange={e => setCity(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone" className="input-label">Telefone</label>
            <input
              id="phone"
              type="tel"
              placeholder="Telefone"
              value={phone}
              onChange={e => setPhone(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="birthdate" className="input-label">Data de Nascimento</label>
            <input
              id="birthdate"
              type="date"
              value={birthdate}
              onChange={e => setBirthdate(e.target.value)}
            />
          </div>

          <div className="profile-edit-actions">
            <button type="submit" className="ft-btn ft-btn-primary">Salvar</button>
            <button
              type="button"
              onClick={() => {
                setEditing(false);
                setIsEditingPhoto(false);
                setNewPassword('');
                const stored = localStorage.getItem('user');
                if (stored) {
                  const u = JSON.parse(stored);
                  setFirstName(u.name.trim().split(' ')[0] || '');
                  setLastName(u.name.trim().split(' ').slice(1).join(' ') || '');
                  setEmail(u.email);
                  setPhone(u.phone || '');
                  setBirthdate(u.birthdate || '');
                  setPhotoBase64(u.photoBase64 || '');
                  setPreviewSrc(u.photoBase64 || '');

                  if (u.address) {
                    const addressParts = u.address.split(',');
                    if (addressParts.length >= 1) setStreet(addressParts[0].trim());
                    if (addressParts.length >= 2) {
                      const numBairroCidade = addressParts[1].trim().split('-');
                      if (numBairroCidade.length >= 1) setNumber(numBairroCidade[0].trim());
                      if (numBairroCidade.length >= 2) {
                        const bairroCidadeParts = numBairroCidade[1].trim().split(',');
                        if (bairroCidadeParts.length >= 1) setNeighborhood(bairroCidadeParts[0].trim());
                        if (bairroCidadeParts.length >= 2) setCity(bairroCidadeParts[1].trim());
                      }
                    }
                  } else {
                    setStreet('');
                    setNumber('');
                    setNeighborhood('');
                    setCity('');
                  }
                }
              }}
              className="ft-btn cancel-button"
            >
              Cancelar
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ProfilePage;
