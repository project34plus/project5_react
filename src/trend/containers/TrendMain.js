'use client';
import React from 'react';
import TrendSub from '../components/TrendSub';
import Container from '@/commons/components/Container';

const TrendMain = () => {
  return (
    <Container>
      <TrendSub />
    </Container>
  );
};

export default React.memo(TrendMain);
