import React from 'react';
import './style.css';

const HowItWorksSection: React.FC = () => {
  return (
    <section className="ft-howitworks-section">
      <div className="ft-howitworks-content">
        <h2 className="ft-howitworks-title">Como o Fast Task funciona?</h2>
        <div className="ft-howitworks-steps">
          <div className="ft-step">
            <div className="ft-step-number">1</div>
            <div className="ft-step-text">
              <h3 className="ft-step-title">Crie sua conta</h3>
              <p className="ft-step-description">
                Cadastre-se rapidamente e comece a usar a ferramenta em poucos cliques.
              </p>
            </div>
          </div>
          <div className="ft-step">
            <div className="ft-step-number">2</div>
            <div className="ft-step-text">
              <h3 className="ft-step-title">Monte suas listas</h3>
              <p className="ft-step-description">
                Personalize suas listas de tarefas para se adequar à sua rotina.
              </p>
            </div>
          </div>
          <div className="ft-step">
            <div className="ft-step-number">3</div>
            <div className="ft-step-text">
              <h3 className="ft-step-title">Organize e acompanhe</h3>
              <p className="ft-step-description">
                Adicione subtarefas, defina prioridades e acompanhe seu progresso.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
