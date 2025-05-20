import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);

  // Campos separados
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName]   = useState('');
  const [email, setEmail]         = useState('');
  const [newPassword, setNewPassword] = useState('');

  const [street, setStreet]       = useState('');
  const [number, setNumber]       = useState('');
  const [neighborhood, setNeighborhood] = useState('');

  const [phone, setPhone]         = useState('');
  const [birthdate, setBirthdate] = useState('');

  // Foto
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

    // Nome
    const parts = u.name.trim().split(' ');
    setFirstName(parts.shift());
    setLastName(parts.join(' '));

    // E‑mail, telefone, nascimento
    setEmail(u.email);
    setPhone(u.phone || '');
    setBirthdate(u.birthdate || '');

    // Endereço
    if (u.address) {
      const ruaMatch = u.address.match(/^(.+?),/);
      const numeroMatch = u.address.match(/, (\d+)/);
      const bairroMatch = u.address.match(/- (.+)$/);
      setStreet(ruaMatch?.[1]?.trim() || '');
      setNumber(numeroMatch?.[1]?.trim() || '');
      setNeighborhood(bairroMatch?.[1]?.trim() || '');
    }

    // Foto no banco (esperamos uma string base64)
    if (u.photo) {
      setPreviewSrc(u.photo);
      setPhotoBase64(u.photo);
    }
  }, [navigate]);

  const getInitials = (name) => {
    if (!name) return '';
    const parts = name.trim().split(' ');
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
  };

  // Converter arquivo em base64
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
    const base64ToByteArray = (base64String) => {
      if (!base64String || !base64String.includes(',')) return null;
      const base64 = base64String.split(',')[1]; // remove o prefixo data:image/...
      const binaryString = atob(base64);
      const byteArray = [];
      for (let i = 0; i < binaryString.length; i++) {
        byteArray.push(binaryString.charCodeAt(i));
      }
      return byteArray;
    };

    const handleUpdate = async (e) => {
    e.preventDefault();
    if (!user) return;

    const fullName    = `${firstName} ${lastName}`.trim();
    const fullAddress = `${street}, ${number} - ${neighborhood}`.trim();

    const updatedData = {
      id: user.id,
      name: fullName,
      email,
      address: fullAddress,
      phone,
      birthdate,
      photo: photoBase64 ? base64ToByteArray(photoBase64) : null,
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
      alert('Perfil atualizado com sucesso!');
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      alert('Erro ao atualizar perfil!');
    }
  };


  const handleDeleteAccount = async () => {
    if (!window.confirm('Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.')) {
      return;
    }
    try {
      await axios.delete(`http://localhost:8080/user/${user.id}`);
      localStorage.removeItem('user');
      alert('Conta excluída com sucesso!');
      navigate('/login');
    } catch (err) {
      console.error(err);
      alert('Erro ao excluir conta!');
    }
  };

  if (!user) return <div>Carregando...</div>;

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
      <button onClick={() => navigate('/dashboard')}>← Voltar</button>
      <h2>Perfil do Usuário</h2>

      {/* Avatar */}
      <div
        style={{
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          backgroundColor: '#ccc',
          overflow: 'hidden',
          marginBottom: '20px',
        }}
      >
        {previewSrc
          ? <img src={previewSrc} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          : <div style={{
              width: '100%', height: '100%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '24px', color: '#fff',
            }}>
              {getInitials(user.name)}
            </div>
        }
      </div>

      {!editing ? (
        <>
          <p><strong>Nome:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Endereço:</strong> {user.address || '—'}</p>
          <p><strong>Telefone:</strong> {user.phone || '—'}</p>
          <p><strong>Data de Nasc.:</strong> {user.birthdate || '—'}</p>
          <button onClick={() => setEditing(true)}>Editar Perfil</button>
          <button onClick={handleDeleteAccount} style={{ marginLeft: '10px', color: 'red' }}>
            Excluir Conta
          </button>
        </>
      ) : (
        <form onSubmit={handleUpdate} style={{ display: 'grid', gap: '10px' }}>
          {/* Nome */}
          <div style={{ display: 'flex', gap: '10px' }}>
            <input
              type="text"
              placeholder="Primeiro nome"
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Sobrenome"
              value={lastName}
              onChange={e => setLastName(e.target.value)}
              required
            />
          </div>

          {/* E‑mail e senha */}
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Nova senha (opcional)"
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
          />

          {/* Endereço separado */}
          <div style={{ display: 'flex', gap: '10px' }}>
            <input
              type="text"
              placeholder="Rua"
              value={street}
              onChange={e => setStreet(e.target.value)}
            />
            <input
              type="text"
              placeholder="Número"
              value={number}
              onChange={e => setNumber(e.target.value)}
            />
          </div>
          <input
            type="text"
            placeholder="Bairro"
            value={neighborhood}
            onChange={e => setNeighborhood(e.target.value)}
          />

          {/* Telefone e nascimento */}
          <input
            type="tel"
            placeholder="Telefone"
            value={phone}
            onChange={e => setPhone(e.target.value)}
          />
          <input
            type="date"
            value={birthdate}
            onChange={e => setBirthdate(e.target.value)}
          />

          {/* Upload de foto */}
          <label>
            Foto de Perfil:
            <input type="file" accept="image/*" onChange={handlePhotoChange} />
          </label>

          {/* Ações */}
          <div style={{ display: 'flex', gap: '10px' }}>
            <button type="submit">Salvar</button>
            <button
              type="button"
              onClick={() => {
                // reset
                setEditing(false);
                setNewPassword('');
                // recarrega estado original
                setFirstName(user.name.split(' ')[0]);
                setLastName(user.name.split(' ').slice(1).join(' '));
                setEmail(user.email);
                setPhone(user.phone || '');
                setBirthdate(user.birthdate || '');
                setPhotoBase64(user.photo || '');
                setPreviewSrc(user.photo || '');
                if (user.address) {
                  const ruaMatch = user.address.match(/^(.+?),/);
                  const numeroMatch = user.address.match(/, (\d+)/);
                  const bairroMatch = user.address.match(/- (.+)$/);
                  setStreet(ruaMatch?.[1]?.trim() || '');
                  setNumber(numeroMatch?.[1]?.trim() || '');
                  setNeighborhood(bairroMatch?.[1]?.trim() || '');
                }
              }}
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
