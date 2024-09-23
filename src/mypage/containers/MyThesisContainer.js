'use client';
import React, { useState, useEffect } from 'react';
import MyThesisList from '../components/MyThesisList';
import { apiMyList } from '@/thesis/apis/apiInfo';

const MyThesisListContainer = () => {
  const [thesisList, setThesisList] = useState([]); // 논문 목록 상태
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState(null); // 에러 상태

  useEffect(() => {
    const fetchTheses = async () => {
      try {
        const data = await apiMyList(); // API에서 데이터 가져오기
        console.log('API에서 가져온 데이터:', data); // 데이터를 콘솔에 출력
        setThesisList(data.items || []); // 가져온 데이터를 상태에 저장 (items가 있는 경우에만)
      } catch (err) {
        console.error('데이터 가져오기 에러:', err); // 에러가 발생했을 때 콘솔에 출력
        setError(err); // 에러가 발생하면 에러 상태 저장
      } finally {
        setLoading(false); // 로딩 완료
      }
    };
    fetchTheses();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return <MyThesisList items={thesisList} />;
};

export default MyThesisListContainer;