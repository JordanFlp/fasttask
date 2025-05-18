import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { theme } from '../../../theme';
import type { ThemeType } from '../../../theme';

type FooterProps = Record<string, never>;

const FooterWrapper = styled.footer<{ theme: ThemeType }>`
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.white}; // Texto branco para bom contraste
  padding: 20px 0; // Espaçamento vertical e remove o horizontal para o container controlar
  text-align: center;
  width: 100%;
`;

const FooterContainer = styled.div<{ theme: ThemeType }>`
  max-width: 1200px; // Ou a largura máxima do seu layout
  margin: 0 auto;
  padding: 0 20px; // Espaçamento lateral para o conteúdo dentro do container

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 0 40px;
  }
`;

const FooterText = styled.p`
  margin: 0;
  font-size: 0.875rem; // Tamanho de fonte pequeno, comum para rodapés
  line-height: 1.5;

  a {
    color: ${({ theme }) => theme.colors.primary}; // Usando a cor primária para links
    text-decoration: none;
    font-weight: bold;

    &:hover {
      text-decoration: underline;
      color: ${({ theme }) => theme.colors.actionEmphasis};
    }
  }
`;

const currentYear = new Date().getFullYear();

const Footer: React.FC<FooterProps> = () => {
  return (
    <ThemeProvider theme={theme}>
      <FooterWrapper>
        <FooterContainer>
          <FooterText>
            © {currentYear} Fast Task. Todos os direitos reservados.
          </FooterText>
          <FooterText>
            <a href="/privacy-policy">Política de Privacidade</a> | <a href="/terms-of-service">Termos de Serviço</a>
          </FooterText>
        </FooterContainer>
      </FooterWrapper>
    </ThemeProvider>
  );
};

export default Footer;