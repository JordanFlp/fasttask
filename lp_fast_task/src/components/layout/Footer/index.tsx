import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: var(--ft-color-secondary);
  color: var(--ft-color-bg-light);
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
  color: var(--ft-color-bg-light);
  margin-bottom: 24px;
  font-weight: 600;

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

const ListItem = styled.li`
  margin-bottom: 12px;
  color: var(--ft-color-bg-light);
  cursor: pointer;

  &:hover {
    color: var(--ft-color-primary);
  }
`;

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <ContentWrapper>
        <Column>
          <SectionTitle>Sobre Nós</SectionTitle>
          <List>
            <ListItem>Quem somos</ListItem>
            <ListItem>Missão e Visão</ListItem>
            <ListItem>Equipe</ListItem>
          </List>
        </Column>

        <Column>
          <SectionTitle>Serviços</SectionTitle>
          <List>
            <ListItem>Consultoria</ListItem>
            <ListItem>Suporte</ListItem>
            <ListItem>Desenvolvimento</ListItem>
          </List>
        </Column>

        <Column>
          <SectionTitle>Contato</SectionTitle>
          <List>
            <ListItem>Email: contato@seudominio.com</ListItem>
            <ListItem>Telefone: (11) 1234-5678</ListItem>
            <ListItem>Endereço: Rua Exemplo, 123</ListItem>
          </List>
        </Column>
      </ContentWrapper>
    </FooterContainer>
  );
};

export default Footer;
