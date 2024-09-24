'use client';
import React, { useContext, useEffect } from 'react';
import MyRecentlyView from '../components/MyRecentlyView';
import CommonContext from '@/commons/contexts/CommonContext';
import Container2 from '@/commons/components/Container2';

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
    <Container2>
        <MyRecentlyView />
    </Container2>
  )
};

export default React.memo(MyRecentlyViewContainer);