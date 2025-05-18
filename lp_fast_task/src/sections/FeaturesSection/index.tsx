import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { theme } from '../../theme';
import type { ThemeType } from '../../theme';
import type { Feature, HowItWorksStep } from '../../types';
import FeatureItem from '../../components/FeatureIcon';
import HowItWorksItem from '../../components/HowItWorksItem';

// Importando ícones específicos de react-icons
// Se IconType não for reconhecido, verifique sua instalação de react-icons
// e a configuração do TypeScript.
import type { IconType } from 'react-icons';
import {
  BsCheckLg,
  BsListTask,
  BsCartCheck,
  BsGear,
  BsCalendarDate,
  BsSearch,
} from 'react-icons/bs'; // Bootstrap Icons
import { FaProjectDiagram } from 'react-icons/fa'; // Font Awesome Icons

const SectionContainer = styled.section`
  background-color: ${({ theme }: { theme: ThemeType }) => theme.colors.backgroundLight};
  padding: 40px 20px; // Mobile padding

  @media (min-width: ${({ theme }: { theme: ThemeType }) => theme.breakpoints.tablet}) {
    padding: 60px 40px; // Tablet e Desktop padding
  }
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column; // Empilha as colunas em mobile
  gap: 40px;

  @media (min-width: ${({ theme }: { theme: ThemeType }) => theme.breakpoints.desktop}) {
    flex-direction: row; // Colunas lado a lado em desktop
    justify-content: space-between;
    gap: 60px;
  }
`;

const Column = styled.div`
  flex: 1;
  min-width: 0; // Ajuda a prevenir overflow em layouts flex
`;

const SectionTitle = styled.h2`
  font-size: 1.75rem;
  color: ${({ theme }: { theme: ThemeType }) => theme.colors.secondary};
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  font-weight: 600;

  // Estilo para o ícone opcional no título (ex: "Como funciona")
  svg.title-icon {
    margin-right: 10px;
    font-size: 1.6rem; // Ajuste conforme necessário
    color: ${({ theme }: { theme: ThemeType }) => theme.colors.primary};
  }

  @media (min-width: ${({ theme }: { theme: ThemeType }) => theme.breakpoints.tablet}) {
    font-size: 2rem;
    margin-bottom: 32px;
  }
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

// Dados para as funcionalidades
const featuresData: Feature[] = [
  { id: 'f1', icon: BsCheckLg as IconType, text: 'Login seguro com recuperação de senha' },
  { id: 'f2', icon: BsListTask as IconType, text: 'Criação e edição de listas de tarefas' },
  { id: 'f3', icon: BsCartCheck as IconType, text: 'Gerenciamento de itens com checkboxes' },
  { id: 'f4', icon: BsGear as IconType, text: 'Edição inline e exclusão com confirmação' },
  { id: 'f5', icon: BsCalendarDate as IconType, text: 'Calendário e filtro por prioridade' },
  { id: 'f6', icon: BsSearch as IconType, text: 'Busca e ordenação inteligente' },
];

// Dados para "Como funciona"
const howItWorksData: HowItWorksStep[] = [
  { id: 'h1', stepNumber: 1, text: 'Cadastre-se gratuitamente' },
  { id: 'h2', stepNumber: 2, text: 'Crie suas listas e adicione tarefas' },
  { id: 'h3', stepNumber: 3, text: 'Marque como concluído, reorganize e mantenha o foco!' },
];

const FeaturesSection: React.FC = () => {
  return (
    <ThemeProvider theme={theme}> {/* Fornece o tema para os styled-components dentro desta seção */}
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
              <FaProjectDiagram className="title-icon" /> {/* Ícone ao lado do título */}
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
    </ThemeProvider>
  );
};

export default FeaturesSection;