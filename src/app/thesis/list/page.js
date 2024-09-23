import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import ThesisListContainer from '@/thesis/containers/ThesisListContainer';

const SearchPage = () => {
  
  return (
    <>
      <h1>논문 검색</h1>
      <ThesisListContainer />
    </>
  );
};

export default React.memo(SearchPage);
