import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import ThesisListContainer from '@/thesis/containers/ThesisListContainer';
import Container from '@/commons/components/Container';

//원래는 이게 정석
// export const metadata = {
//   title: '논문학술자료',
//   description: '논문 검색 페이지',
// };

const SearchPage = () => {
  
  return (
    <Container>
      {/* <Head>
        <title>논문학술자료</title>
      </Head> */}
      <h1>논문학술자료 검색</h1>
      <ThesisListContainer />
    </Container>
  );
};

export default React.memo(SearchPage);
