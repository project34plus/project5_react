import React from 'react';
import Head from 'next/head';
import ThesisViewContainer from '@/thesis/containers/ThesisViewContainer';
import Container from '@/commons/components/Container';

const ViewPage = ({ params }) => {
  return (
    <Container>
      <h1>논문 수정</h1>
      <ThesisViewContainer params={params} />
    </Container>
  );
};

export default React.memo(ViewPage);
