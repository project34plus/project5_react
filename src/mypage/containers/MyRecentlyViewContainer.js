'use client';
import React from 'react';
import MyRecentlyView from '../components/MyRecentlyView';
import Container from '@/commons/components/Container';

const MyRecentlyViewContainer = () => {
  return (
    <Container>
        <MyRecentlyView />
    </Container>
  )
};

export default React.memo(MyRecentlyViewContainer);