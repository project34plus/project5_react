'use client';
import React, {
  useLayoutEffect,
  useCallback,
  useState,
  useEffect,
  useContext,
} from 'react';
import MyWishList from '../components/MyWishList';
import { apiWishlist as getThesis } from '@/thesis/apis/apiInfo';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { getCommonActions } from '@/commons/contexts/CommonContext';
import Pagination from '@/commons/components/Pagination';
import CommonContext from '@/commons/contexts/CommonContext';
import Container2 from '@/commons/components/Container2';

const MyWishListContainer = () => {
  const { t } = useTranslation();
  const [items, setItems] = useState([]); // 위시리스트 아이템
  const [pagination, setPagination] = useState({}); // 페이지네이션 정보
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const { setMainTitle } = getCommonActions();

  const itemsPerPage = 10; // 페이지당 아이템 수

  // 페이지 변경 시 호출
  const onChangePage = useCallback((page) => {
    setCurrentPage(page);
  }, []);

  const {
    actions: { setLinkText, setLinkHref },
  } = useContext(CommonContext);

  useLayoutEffect(() => {
    setMainTitle(t('즐겨찾기 한 논문'));
  }, [setMainTitle, t]);

  // API 호출 및 데이터 설정
  useEffect(() => {
    (async () => {
      try {
        const res = await getThesis(currentPage, itemsPerPage);
        console.log('API Response:', res);
        setItems(res.items);
        setPagination(res.pagination);
        setLinkText('즐겨찾기 한 논문');
        setLinkHref(`/mypage/MyWishList`);
      } catch (err) {
        console.error('Failed to fetch wishlist items:', err);
      }
    })();
  }, [currentPage, setLinkHref, setLinkText]); // currentPage가 변경될 때마다 호출

  return (
    <Container2>
      {/* 상단 헤더는 항상 표시 */}
      <Header>
        <div className="header-tid">번호</div>
        <div className="header-gid">고유번호</div>
        <div className="header-title">제목</div>
        <div className="header-poster">작성자</div>
      </Header>

      {items && items.length > 0 ? (
        <>
          <MyWishList items={items} />
          <Pagination onClick={onChangePage} pagination={pagination} />
        </>
      ) : (
        <NoData>즐겨찾기 한 논문이 없습니다.</NoData>
      )}
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

  .header-gid {
    width: 20%;
  }

  .header-title {
    width: 50%;
  }

  .header-poster {
    width: 20%;
  }
`;

const NoData = styled.div`
  font-size: 1.5em;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
`;

export default React.memo(MyWishListContainer);
