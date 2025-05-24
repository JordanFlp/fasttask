import React from 'react';
import styled from 'styled-components';
import type { Feature, HowItWorksStep } from '../../types';
import FeatureItem from '../../components/FeatureIcon';
import HowItWorksItem from '../../components/HowItWorksItem';

import type { IconType } from 'react-icons';
import {
  BsCheckLg,
  BsListTask,
  BsCartCheck,
  BsGear,
  BsCalendarDate,
  BsSearch,
} from 'react-icons/bs';
import { FaProjectDiagram } from 'react-icons/fa';

const SectionContainer = styled.section`
  background-color: var(--ft-color-bg-light);
  padding: 40px 20px;

  @media (min-width: 768px) {
    padding: 60px 40px;
  }
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 40px;

  @media (min-width: 1024px) {
    flex-direction: row;
    justify-content: space-between;
    gap: 60px;
  }
`;

const Column = styled.div`
  flex: 1;
  min-width: 0;
`;

const SectionTitle = styled.h2`
  font-size: 1.75rem;
  color: var(--ft-color-secondary);
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  font-weight: 600;

  svg.title-icon {
    margin-right: 10px;
    font-size: 1.6rem;
    color: var(--ft-color-primary);
  }

  @media (min-width: 768px) {
    font-size: 2rem;
    margin-bottom: 32px;
  }
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const featuresData: Feature[] = [
  { id: 'f1', icon: BsCheckLg as IconType, text: 'Login seguro com recuperação de senha' },
  { id: 'f2', icon: BsListTask as IconType, text: 'Criação e edição de listas de tarefas' },
  { id: 'f3', icon: BsCartCheck as IconType, text: 'Gerenciamento de itens com checkboxes' },
  { id: 'f4', icon: BsGear as IconType, text: 'Edição inline e exclusão com confirmação' },
  { id: 'f5', icon: BsCalendarDate as IconType, text: 'Calendário e filtro por prioridade' },
  { id: 'f6', icon: BsSearch as IconType, text: 'Busca e ordenação inteligente' },
];

const howItWorksData: HowItWorksStep[] = [
  { id: 'h1', stepNumber: 1, text: 'Cadastre-se gratuitamente' },
  { id: 'h2', stepNumber: 2, text: 'Crie suas listas e adicione tarefas' },
  { id: 'h3', stepNumber: 3, text: 'Marque como concluído, reorganize e mantenha o foco!' },
];

const FeaturesSection: React.FC = () => {
  return (
    <>
      <SectionContainer>
        <ContentWrapper>
          <Column>
            <SectionTitle>Funcionalidades</SectionTitle>
            <List>
              {featuresData.map((feature) => (
                <FeatureItem key={feature.id} feature={feature} />
              ))}
            </List>
          </Column>
          <Column>
            <SectionTitle>
              <FaProjectDiagram className="title-icon" />
              Como funciona
            </SectionTitle>
            <List>
              {howItWorksData.map((step) => (
                <HowItWorksItem key={step.id} step={step} />
              ))}
            </List>
          </Column>
        </ContentWrapper>
      </SectionContainer>
    </>
  );
};

export default FeaturesSection;
