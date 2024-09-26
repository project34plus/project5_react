import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import ThesisListContainer from '@/thesis/containers/ThesisListContainer';
import Container from '@/commons/components/Container';

const NotePage = () => {
  return (
    <Container>
      <h1>연구노트메인</h1>
    </Container>
  );
};

export default React.memo(NotePage);
