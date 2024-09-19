import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import ThesisListContainer from '@/thesis/containers/ThesisListContainer';

export const metadata = {
  title: '논문 검색',
  description: '논문 검색 페이지',
};

const SearchPage = ({searchParams}) => {
  // const {t} = useTranslation();
  return (
    <>
      <Head>
        <title>논문검색</title>
      </Head>
      <h1>검색페이지</h1>
      <ThesisListContainer searchParams={searchParams}/>
    </>
  );
};

export default SearchPage;