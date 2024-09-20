'use client';
import React from 'react';
import MyInterests from '../components/MyInterests';
import Container from '@/commons/components/Container';

const MyInterestsContainer = () => {
  return (
    <Container>
        <MyInterests />
    </Container>
  )
};

export default React.memo(MyInterestsContainer);