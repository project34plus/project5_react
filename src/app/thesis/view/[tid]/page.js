import React from 'react';
import Head from 'next/head';
import ThesisViewContainer from '@/thesis/containers/ThesisViewContainer';

export const metadata = {
  title: '논문 상세보기',
  description: '논문 상세 페이지',
};

const ViewPage = ({ params }) => {
  return (
    <>
      <Head>
        <title>논문 상세 정보</title>
      </Head>
      <h1>상세보기 페이지</h1>
      <ThesisViewContainer params={params} />
    </>
  );
};

export default React.memo(ViewPage);
