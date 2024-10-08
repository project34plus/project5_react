'use client';
import React, { useState, useEffect, useContext, useLayoutEffect } from 'react';
import MyThesisList from '../components/MyThesisList';
import { apiMyList } from '@/thesis/apis/apiInfo';
import styled from 'styled-components';
import Container2 from '@/commons/components/Container2';
import { getUserStates } from '@/commons/contexts/UserInfoContext';
import { useTranslation } from 'react-i18next';
import CommonContext, {
  getCommonActions,
} from '@/commons/contexts/CommonContext';

const MyThesisListContainer = () => {
  const { t } = useTranslation();
  const { setMainTitle } = getCommonActions();
  const [thesisList, setThesisList] = useState([]); // 논문 목록 상태
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState(null); // 에러 상태
  const { isLogin } = getUserStates();

  const {
    actions: { setLinkText, setLinkHref },
  } = useContext(CommonContext);

  useLayoutEffect(() => {
    setMainTitle(t('내 논문 관리'));
  }, [setMainTitle, t]);

  useEffect(() => {
    const fetchTheses = async () => {
      if (!isLogin) {
        return;
      }
      try {
        const data = await apiMyList(); // API에서 데이터 가져오기

        setLinkText('내 논문 관리');
        setLinkHref('/mypage/MyThesisList');
        setThesisList(data.items || []); // 가져온 데이터를 상태에 저장 (items가 있는 경우에만)
      } catch (err) {
        setError(err); // 에러가 발생하면 에러 상태 저장
      } finally {
        setLoading(false); // 로딩 완료
      }
    };
    fetchTheses();
  }, [isLogin, setLinkHref, setLinkText]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Container2>
      <Header>
        <div className="header-tid">논문 ID</div>
        <div className="header-title">제목</div>
        <div className="header-poster">저자</div>
        <div className="header-status">승인상태</div>
      </Header>
      <MyThesisList items={thesisList} />
    </Container2>
  );
};

// 상단 헤더 스타일 정의
const Header = styled.div`
  display: flex;
  border-bottom: 2px solid #ccc;
  font-weight: bold;
  text-align: center;
  padding: 10px 0;

  .header-tid {
    width: 10%;
  }

  .header-title {
    width: 40%;
  }

  .header-poster {
    width: 25%;
  }

  .header-status {
    width: 10%;
  }
`;

export default MyThesisListContainer;
