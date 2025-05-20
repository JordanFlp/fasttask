import React from 'react';
import styled from 'styled-components';
import type { Feature } from '../../types';
import type { ThemeType } from '../../theme';

interface FeatureItemProps {
  feature: Feature;
}

const ItemWrapper = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  color: ${({ theme }: { theme: ThemeType }) => theme.colors.textMain};

  &:last-child {
    margin-bottom: 0;
  }
`;

const IconWrapper = styled.div`
  margin-right: 12px;
  color: ${({ theme }: { theme: ThemeType }) => theme.colors.secondary}; // Cor dos ícones de funcionalidades
  font-size: 1.5rem; // Ajuste o tamanho conforme necessário
  display: flex;
  align-items: center;
`;

const Text = styled.span`
  font-size: 1rem;
  line-height: 1.5;
`;

const FeatureItem: React.FC<FeatureItemProps> = ({ feature }) => {
  const Icon = feature.icon;

  return (
    <ItemWrapper>
      <IconWrapper>
        <Icon />
      </IconWrapper>
      <Text>{feature.text}</Text>
    </ItemWrapper>
  );
}

export default FeatureItem;