import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { theme } from '../../../theme';
import type { ThemeType } from '../../../theme';

type FooterProps = Record<string, never>;

const FooterWrapper = styled.footer<{ theme: ThemeType }>`
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.white};
  padding: 20px 0;
  text-align: center;
  width: 100%;
`;

const FooterContainer = styled.div<{ theme: ThemeType }>`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 0 40px;
  }
`;

const FooterText = styled.p`
  margin: 0;
  font-size: 0.875rem;
  line-height: 1.5;

  a {
    color: ${({ theme }) => theme.colors.primary};
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