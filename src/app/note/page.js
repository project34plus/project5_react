import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import ThesisListContainer from '@/thesis/containers/ThesisListContainer';
import Container from '@/commons/components/Container';

const NotePage = () => {
  return (
    <Container>
      <h1>연구노트</h1>
      <h2>컨테이너 추가해주세요~</h2>
    </Container>
  );
};

export default React.memo(NotePage);
