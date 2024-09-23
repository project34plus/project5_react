'use client';
import React, { useEffect, useState } from 'react';
import { apiRecommendData } from '@/thesis/apis/apiRecommend';

async function fetchRecommendList() {
  try {
    return await apiRecommendData();  // 비동기 호출로 추천 논문 리스트 가져오기
  } catch (err) {
    console.log(err);  // 에러 발생 시 로그 출력
    return { items: [], pagination: {} };  // 에러 시 기본 구조 반환
  }
}

const RecommendList = () => {
  const [recommendLists, setRecommendLists] = useState({ items: [], pagination: {} });  // 추천 논문 리스트 상태 관리
  const [loading, setLoading] = useState(true);  // 로딩 상태 관리

  useEffect(() => {
    async function getData() {
      const data = await fetchRecommendList();
      setRecommendLists(data);  // 상태 업데이트
      setLoading(false);  // 로딩 상태 종료
    }
    getData();  // 컴포넌트가 마운트될 때 데이터 가져오기
  }, []);

  useEffect(() => {
    console.log('추천 논문 리스트:', recommendLists);  // 상태 변경 후 출력
  }, [recommendLists]);

  if (loading) {
    return <p>로딩 중...</p>;  // 로딩 상태일 때 표시
  }

  return (
    <>
      <h1>추천 논문 리스트</h1>
      {recommendLists.items.length > 0 ? (
        <ul>
          {recommendLists.items.map((item, index) => (
            <li key={index}>{item.title || '제목 없음'}</li>  // 논문 제목 출력
          ))}
        </ul>
      ) : (
        <p>추천할 논문이 없습니다.</p>  // 추천 논문이 없을 때 표시
      )}
    </>
  );
};

export default RecommendList;
