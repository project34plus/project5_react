'use client';
import React, { useContext, useEffect, useState } from 'react';
import MyRecentlyView from '../components/MyRecentlyView';
import CommonContext from '@/commons/contexts/CommonContext';
import Container2 from '@/commons/components/Container2';
import { apiVisit } from '@/thesis/apis/apiInfo';

const MyRecentlyViewContainer = () => {
  const [recentlyViewedItems, setRecentlyViewedItems] = useState([]); // 최근 본 논문 목록 상태
  const {
    actions: { setLinkText, setLinkHref },
  } = useContext(CommonContext);

  useEffect(() => {
    // Link text와 href 설정
    setLinkText('최근 본 논문');
    setLinkHref('/mypage/MyRecentlyView');

    // 방문 기록 데이터를 가져오는 API 호출
    (async () => {
      try {
        const response = await apiVisit();
        setRecentlyViewedItems(response); // 가져온 데이터를 상태로 설정
      } catch (err) {
        console.error('Failed to fetch items:', err);
      }
    })();
  }, [setLinkHref, setLinkText]);

  return (
    <Container2>
      {/* 최근 본 논문 목록을 MyRecentlyView 컴포넌트로 전달 */}
      <MyRecentlyView items={recentlyViewedItems} />
    </Container2>
  );
};

export default React.memo(MyRecentlyViewContainer);
