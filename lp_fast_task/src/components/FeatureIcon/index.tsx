import React from 'react';
import styled from 'styled-components';
import type { Feature } from '../../types';

interface FeatureItemProps {
  feature: Feature;
}

const ItemWrapper = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  color: var(--ft-color-text-main);

  &:last-child {
    margin-bottom: 0;
  }
`;

const IconWrapper = styled.div`
  margin-right: 12px;
  color: var(--ft-color-secondary);
  font-size: 1.5rem;
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
};

export default FeatureItem;
