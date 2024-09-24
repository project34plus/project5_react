import React from 'react';
import Head from 'next/head';
import ThesisViewContainer from '@/thesis/containers/ThesisViewContainer';
import Container from '@/commons/components/Container';
import ThesisUploadContainer from '@/thesis/containers/ThesisUploadContainer';
import ThesisUpdateContainer from '@/thesis/containers/ThesisUpdateContaner';

const ViewPage = ({ params }) => {
  return (
    <Container>
      <h1>논문 수정</h1>
      <ThesisUpdateContainer params={params} />
    </Container>
  );
};

export default React.memo(ViewPage);
