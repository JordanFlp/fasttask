import React, { useState } from 'react';
import './style.css';

const CallToActionSection: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('idle');
    setMessage('');

    // Validação básica
    if (!formData.name || !formData.email || !formData.password) {
      setStatus('error');
      setMessage('Preencha todos os campos.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setStatus('success');
        setMessage('Cadastro realizado com sucesso!');
        setFormData({ name: '', email: '', password: '' });
      } else {
        throw new Error('Erro no servidor');
      }
    } catch (error) {
      console.error('Erro ao cadastrar:', error);
      setStatus('error');
      setMessage('Erro ao cadastrar. Tente novamente.');
    }
  };

  return (
    <section className="ft-call-to-action">
      <div className="ft-cta-content">
        <h2>Crie sua conta agora</h2>
        <p>Experimente o Fast Task gratuitamente e comece a gerenciar suas tarefas de forma eficiente!</p>

        <form onSubmit={handleSubmit} className="ft-cta-form">
          <input
            type="text"
            name="name"
            placeholder="Seu nome"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Seu e-mail"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Sua senha"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Cadastrar</button>
        </form>

        {status === 'success' && <p className="ft-success">{message}</p>}
        {status === 'error' && <p className="ft-error">{message}</p>}
      </div>
    </section>
  );
};

export default CallToActionSection;
