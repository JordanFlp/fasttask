import React from 'react';
import styled from 'styled-components';
import type { HowItWorksStep } from '../../types';

interface HowItWorksItemProps {
  step: HowItWorksStep;
}

const ItemWrapper = styled.li`
  display: flex;
  align-items: flex-start;
  margin-bottom: 16px;
  color: var(--ft-color-text-main);

  &:last-child {
    margin-bottom: 0;
  }
`;

const StepNumberWrapper = styled.div`
  background-color: var(--ft-color-primary);
  color: var(--ft-color-white);
  border-radius: 50%;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 0.9rem;
  margin-right: 12px;
  flex-shrink: 0;
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
