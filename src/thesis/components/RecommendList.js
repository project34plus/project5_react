'use client';
import React from 'react';

const RecommendList = ({ items, loading }) => {
  if (loading) {
    return <p>로딩 중...</p>; // 로딩 상태일 때 표시
  }

  return (
    <>
      <h1>추천 논문 리스트</h1>
      {items.length > 0 ? (
        <ul>
          {items.map((item, index) => (
            <li key={index}>{item.title || '제목 없음'}</li> // 논문 제목 출력
          ))}
        </ul>
      ) : (
        <p>추천할 논문이 없습니다.</p> // 추천 논문이 없을 때 표시
      )}
    </>
  );
};

export default RecommendList;
