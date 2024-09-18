import React from 'react';
import styled from 'styled-components';

const Title = styled.h1`
  color: ${({ theme }) => theme.color.white};
  font-size: ${({ theme }) => theme.fontSize.giantBig};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  text-shadow: 
    2px 2px 4px rgba(0, 0, 0, 0.5),
    -2px -2px 4px rgba(0, 0, 0, 0.5), 
    4px 4px 8px rgba(0, 0, 0, 0.9); 
`;

const MainTitle = () => {
  return (
    <Title>
      The Paper Prepared for You:
      <br />
      NonNull
    </Title>
  );
};
export default React.memo(MainTitle);
