'use client';
import React from 'react';
import GroupTrend from '../components/GroupTrends';
import Container from '@/commons/components/Container';

const GroupTrendContainer = () => {
  return (
    <Container>
      <GroupTrend />
    </Container>
  );
};

export default React.memo(GroupTrendContainer);
