'use client';
import React from 'react';
import MyInterests from '../components/MyInterests';
import Container2 from '@/commons/components/Container2';

const MyInterestsContainer = () => {
  return (
    <Container2>
        <MyInterests />
    </Container2>
  )
};

export default React.memo(MyInterestsContainer);