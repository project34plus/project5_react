import React from 'react';
import Container from '@/commons/components/Container';
import InfoContainer from '@/info/containers/InfoContainer';

const InfoPage = () => {
  return (
    <Container>
      <h1>이용안내</h1>
      <InfoContainer/>
    </Container>
  );
};

export default React.memo(InfoPage);