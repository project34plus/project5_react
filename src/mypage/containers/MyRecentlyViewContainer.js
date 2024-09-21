'use client';
import React, { useContext, useEffect } from 'react';
import MyRecentlyView from '../components/MyRecentlyView';
import Container from '@/commons/components/Container';
import CommonContext from '@/commons/contexts/CommonContext';

const MyRecentlyViewContainer = () => {

  const {
    actions: { setLinkText, setLinkHref },
  } = useContext(CommonContext);

  useEffect(() => {
    (async () => {
      try {

        setLinkText('최근 본 논문')
        setLinkHref('/mypage/MyRecentlyView')
        
      } catch (err) {
        console.error('Failed to fetch items:', err);
      }
    })();
  }, [setLinkHref, setLinkText]);
  return (
    <Container>
        <MyRecentlyView />
    </Container>
  )
};

export default React.memo(MyRecentlyViewContainer);