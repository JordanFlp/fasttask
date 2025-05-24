import React from 'react';
import './style.css';
import mockup from '../../assets/images/dashboard.png';
import Button from '../../components/Button';

const HeroSection: React.FC = () => {
  return (
    <section className="ft-hero">
      <div className="ft-hero-left">
        <h1 className="ft-hero-title">
          Organize suas tarefas <br />
          de forma <strong>simples, rápida e eficiente</strong> com o <strong>Fast Task!</strong>
        </h1>
        <p className="ft-hero-subtitle">
          Um gerenciador de tarefas intuitivo, com login seguro, listas personalizadas e visualização responsiva.
        </p>
        <div className="ft-hero-buttons">
          <Button to="http://localhost:3000/login" className="ft-btn-primary">Comece agora</Button>
          <Button href="/saiba-mais" className="ft-btn-secondary">Saiba mais</Button>
        </div>
      </div>

      <div className="ft-hero-right">
        <div className="ft-hero-card">
          <img src={mockup} alt="Dashboard Image" className="ft-hero-image" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;