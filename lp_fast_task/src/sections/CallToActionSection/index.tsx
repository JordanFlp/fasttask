import React from 'react';
import './style.css';

const CallToActionSection: React.FC = () => {
  const handleCadastrar = () => {
    window.location.href = 'http://localhost:3000/register';
  };

  return (
    <section className="ft-call-to-action">
      <div className="ft-cta-content">
        <h2>Crie sua conta agora</h2>
        <p>Experimente o Fast Task gratuitamente e comece a gerenciar suas tarefas de forma eficiente!</p>

        <button className="ft-cta-button" onClick={handleCadastrar}>
          Cadastrar
        </button>
      </div>
    </section>
  );
};

export default CallToActionSection;