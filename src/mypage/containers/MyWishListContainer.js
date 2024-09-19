'use client';
import React, { useCallback, useState, useEffect } from 'react';
import MyWishList from '../components/MyWishList';
import Container from '@/commons/components/Container';
import CommonContext from '@/commons/modules/CommonContext';
import { apiWishlist as getThesis } from '@/testThesis/apis/apiInfo';
import styled from 'styled-components';

const MyWishListContainer = () => {

  const [items, setItems] = useState([]); // 위시리스트 아이템
  const [pagination, setPagination] = useState({}); //페이지네이션 정보
  const [currentPage, setCurrentPage] = useState(1); //현재 페이지

  const itemsPerPage = 10; //페이지당 아이템 수

  // 페이지 변경 시 호출
  const onChangePage = useCallback((page) => {
    setCurrentPage(page);
  }, []);

  // API 호출 및 데이터 설정
  useEffect(() => {
    (async () => {
      try {
        const res = await getThesis(currentPage, itemsPerPage);
        console.log('API Response:', res);
        setItems(res.items);
        setPagination(res.pagination);
      } catch (err) {
        console.error('Failed to fetch wishlist items:', err);
      }
    })();
  }, [currentPage]); // currentPage가 변경될 때마다 호출

  return (
    <Container>
      {items && items.length > 0 ? (
        <>
          <MyWishList items={items} />
          {/* <Pagination onClick={onChangePage} pagination={pagination} /> */}
        </>
      ) : (
        <NoData>
          등록된 논문이 없습니다.
        </NoData>
      )}
    </Container>
  );
};

const NoData = styled.div`
  font-size: 1.5em;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
`;

export default React.memo(MyWishListContainer);