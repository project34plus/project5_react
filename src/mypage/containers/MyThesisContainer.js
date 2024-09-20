'use client';
import React, { useContext, useEffect } from 'react';
import MyThesisList from '../components/MyThesisList';
import Container from '@/commons/components/Container';
import CommonContext from '@/commons/contexts/CommonContext';

const MyThesisContainer = () => {

  const {
    actions: { setLinkText, setLinkHref },
  } = useContext(CommonContext);

  useEffect(() => {
    (async () => {
      try {

        setLinkText('내가 등록한 논문')
        setLinkHref('/mypage/MyThesisList')
        
      } catch (err) {
        console.error('Failed to fetch items:', err);
      }
    })();
  }, [setLinkHref, setLinkText]);

  return (
    <Container>
        <MyThesisList />
    </Container>
  )
};

export default React.memo(MyThesisContainer);