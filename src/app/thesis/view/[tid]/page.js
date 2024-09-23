import React from 'react';
import Head from 'next/head';
import ThesisViewContainer from '@/thesis/containers/ThesisViewContainer';
import Container from '@/commons/components/Container';

// export const metadata = {
//   title: '논문 상세 정보',
//   description: '논문 상세 정보 페이지',
// };

const ViewPage = ({ params }) => {
  return (
    <Container>
      {/* <Head>
        <title>논문 상세 정보</title>
      </Head> */}
      <h1>상세보기 페이지</h1>
      <ThesisViewContainer params={params} />
    </Container>
  );
};

export default React.memo(ViewPage);
