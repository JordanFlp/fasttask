import './style.css';
import mockup from '../../assets/images/mockup.png';

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
          <button className="ft-btn ft-btn-primary">Comece agora</button>
          <button className="ft-btn ft-btn-secondary">Saiba mais</button>
        </div>
      </div>

      <div className="ft-hero-right">
        <img src={mockup} alt="Mockup App 1" className="ft-hero-img img1" />
        <div className="ft-hero-gradient" />
      </div>
    </section>
  );
};

export default HeroSection;
