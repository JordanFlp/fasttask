import React from 'react';
import './style.css';
import mockup from '../../assets/images/mockup.png';
import Button from '../../components/Button';
import HeroCard from '../../components/HeroCard';

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
          <Button to="/comecar" className="ft-btn-primary">Comece agora</Button>
          <Button href="/saiba-mais" className="ft-btn-secondary">Saiba mais</Button>
        </div>
      </div>

      {/* <div className="ft-hero-right">
        <img src={mockup} alt="Mockup App 1" className="ft-hero-img img1" />
        <div className="ft-hero-gradient" />
      </div> */}

      <div className="ft-hero-right">
        <HeroCard imageSrc={mockup} altText="Mockup App 1" className="img1">
        </HeroCard>
        <div className="ft-hero-gradient" />
      </div>
    </section>
  );
};

export default HeroSection;