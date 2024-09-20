'use client';
import React from 'react';
import ProfileForm from '../components/ProfileForm';
import Container from '@/commons/components/Container';

const InfoContainer = () => {
  return (
    <Container>
      <ProfileForm />
    </Container>
  );
};

export default React.memo(InfoContainer);
