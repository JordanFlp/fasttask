import React from 'react';
import './style.css';

const PricingSection: React.FC = () => {
  return (
    <section className="ft-pricing-section">
      <div className="ft-container">
        <h2 className="ft-section-title">Planos Simples e Acessíveis</h2>
        <p className="ft-section-subtitle">Comece gratuitamente e evolua conforme sua necessidade.</p>

        <div className="ft-pricing-cards">
          <div className="ft-pricing-card">
            <h3 className="ft-pricing-title">Gratuito</h3>
            <p className="ft-pricing-price">R$ 0 / mês</p>
            <ul className="ft-pricing-features">
              <li>✔ Tarefas ilimitadas</li>
              <li>✔ Subtarefas e checklists</li>
              <li>✔ Modo escuro</li>
              <li>✔ Suporte básico</li>
            </ul>
            <button className="ft-btn-primary">Começar agora</button>
          </div>

          <div className="ft-pricing-card ft-popular">
            <h3 className="ft-pricing-title">Pro (em breve)</h3>
            <p className="ft-pricing-price">R$ 19,90 / mês</p>
            <ul className="ft-pricing-features">
              <li>✔ Tudo do plano gratuito</li>
              <li>✔ Colaboração em equipe</li>
              <li>✔ Integrações com apps</li>
              <li>✔ Suporte prioritário</li>
            </ul>
            <button className="ft-btn-disabled" disabled>Disponível em breve</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
