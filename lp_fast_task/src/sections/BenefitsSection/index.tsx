import './style.css';

const benefits = [
  {
    title: 'Organização simples',
    description: 'Crie listas e subitens facilmente para organizar suas tarefas.',
    icon: '✅',
  },
  {
    title: 'Acesso rápido',
    description: 'Interface responsiva e intuitiva, acessível de qualquer dispositivo.',
    icon: '⚡',
  },
  {
    title: 'Segurança garantida',
    description: 'Seus dados protegidos com autenticação segura.',
    icon: '🔒',
  },
];

const BenefitsSection: React.FC = () => {
  return (
    <section className="ft-benefits-section">
      <div className="ft-benefits-content">
        <h2 className="ft-benefits-title">Por que escolher o Fast Task?</h2>
        <ul className="ft-benefits-list">
          {benefits.map((benefit, index) => (
            <li className="ft-benefit-item" key={index}>
              <span className="ft-benefit-icon">{benefit.icon}</span>
              <div>
                <h3 className="ft-benefit-heading">{benefit.title}</h3>
                <p className="ft-benefit-description">{benefit.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default BenefitsSection;
