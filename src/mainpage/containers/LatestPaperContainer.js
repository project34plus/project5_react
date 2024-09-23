import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 1400px;
  margin: auto;
  height: 350px;
  position: relative;
  margin-bottom: 100px;
`;

const Title = styled.h1`
  width: 1400px;
  font-size: ${({ theme }) => theme.fontSize.medium};
  color:${({ theme }) => theme.color.black};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`;

const PapersList = styled.div`
  border: 2px solid ${({ theme }) => theme.color.lightGrayNavy};
  width: 1400px;
  margin: auto;
  height: 300px;
`;

const LatestPaperContainer = () => {
  return (
    <Container>
      <Title>최신 인기 논문</Title>
      <PapersList>인기 논문 목록</PapersList>
    </Container>
  );
};

export default React.memo(LatestPaperContainer);
