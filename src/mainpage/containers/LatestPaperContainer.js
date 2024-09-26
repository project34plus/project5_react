import RecentTrend from '@/trend/components/RecentTrend';
import React, { useState, useEffect, onChangePage } from 'react';
import styled from 'styled-components';
import Pagination from '@/commons/components/Pagination';
import { apiList } from '@/thesis/apis/apiInfo';
import { FcList } from 'react-icons/fc';

const Container = styled.div`
  width: 100%;
  margin: auto;
  position: relative;
  margin-bottom: 100px;
  
   &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url('/images/logo.png');
    background-size: 1000px;
    background-repeat: no-repeat;
    background-position: center;
    opacity: 0.2; 
    z-index: -1;
`;

const Title = styled.h1`
  width: 100%;
  font-size: ${({ theme }) => theme.fontSize.big};
  color: ${({ theme }) => theme.color.black};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  text-align: center;
`;

const PapersList = styled.div`
  width: 1400px;
  margin: auto;
`;

const Icon = styled.span`
  position: relative;
  top: 5px;
  margin-right: 5px;
`;

const LatestPaperContainer = () => {
  const [items, setItems] = useState([]);
  const [pagination, setPagination] = useState({});

  useEffect(() => {
    apiList().then((res) => {
      setItems(res.items || []);
      setPagination(res.pagination || {});
    });
  }, []);

  // 목록에서 10개 항목만 가져오기
  const displayedItems = items.slice(0, 8);

  return (
    <Container>
      <Title>
        <Icon>
          <FcList />
        </Icon>
        최신 인기 논문
      </Title>
      <PapersList>
        <RecentTrend items={displayedItems} />
      </PapersList>
    </Container>
  );
};

export default React.memo(LatestPaperContainer);
