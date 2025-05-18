import React from 'react';
import styled from 'styled-components';
import type { HowItWorksStep } from '../../types';
import type { ThemeType } from '../../theme'; 

interface HowItWorksItemProps {
  step: HowItWorksStep;
}

const ItemWrapper = styled.li`
  display: flex;
  align-items: flex-start; // Alinha o número com o topo do texto, útil para textos longos
  margin-bottom: 16px;
  color: ${({ theme }: { theme: ThemeType }) => theme.colors.textMain};

  &:last-child {
    margin-bottom: 0;
  }
`;

const StepNumberWrapper = styled.div`
  background-color: ${({ theme }: { theme: ThemeType }) => theme.colors.primary};
  color: ${({ theme }: { theme: ThemeType }) => theme.colors.white};
  border-radius: 50%;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 0.9rem;
  margin-right: 12px;
  flex-shrink: 0; // Previne que o círculo encolha com texto adjacente
`;

const Text = styled.span`
  font-size: 1rem;
  line-height: 1.5;
`;

const HowItWorksItem: React.FC<HowItWorksItemProps> = ({ step }) => {
  return (
    <ItemWrapper>
      <StepNumberWrapper>{step.stepNumber}</StepNumberWrapper>
      <Text>{step.text}</Text>
    </ItemWrapper>
  );
};

export default HowItWorksItem;