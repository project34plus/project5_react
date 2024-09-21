import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import ThesisListContainer from '@/thesis/containers/ThesisListContainer';

// export const metadata = {
//   title: '논문학술자료',
//   description: '논문 검색 페이지',
// };

const SearchPage = () => {
  return (
    <>
      {/* <Head>
        <title>논문학술자료</title>
      </Head> */}
      <h1>논문학술자료 검색</h1>
      <ThesisListContainer />
    </>
  );
};

export default React.memo(SearchPage);
