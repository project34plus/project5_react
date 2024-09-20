'use client';
import React from 'react';
import FieldTrends from '../components/FieldTrends';
import Container from '@/commons/components/Container';

const FieldTrendContainer = () => {
  return (
    <Container>
      <FieldTrends />
    </Container>
  );
};

export default React.memo(FieldTrendContainer);
