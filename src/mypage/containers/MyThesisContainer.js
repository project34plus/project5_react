'use client';
import React, {
  useLayoutEffect,
  useState,
  useEffect,
  useCallback,
  useContext,
} from 'react';
import MyThesisList from '../components/MyThesisList';
import Pagination from '@/commons/components/Pagination';
import Loading from '@/commons/components/Loading';
import Container2 from '@/commons/components/Container2';
import { apiMyList } from '@/thesis/apis/apiInfo';
import { useTranslation } from 'react-i18next';
import { getCommonActions } from '@/commons/contexts/CommonContext';
import CommonContext from '@/commons/contexts/CommonContext';
import styled from 'styled-components';

const MyThesisListContainer = () => {
  const { t } = useTranslation();
  const [items, setItems] = useState([]);
  const [pagination, setPagination] = useState({});
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const { setMainTitle } = getCommonActions();


  const itemsPerPage = 10; // 페이지당 아이템 수

  // 헤더 설정을 위한 CommonContext 사용
  const {
    actions: { setLinkText, setLinkHref },
  } = useContext(CommonContext);

  const onChangePage = useCallback((page) => {
    setCurrentPage(page);
  }, []);

  useLayoutEffect(() => {
    setMainTitle(t('내가 등록한 논문'));
  }, [setMainTitle, t]);

  useEffect(() => {
    // 헤더 설정
    setLinkText('내가 등록한 논문');
    setLinkHref('/mypage/MyThesisList');
  }, [setLinkHref, setLinkText]);

  // API 호출 및 데이터 설정
  useEffect(() => {
    (async () => {
      try {
        const res = await getThesis(currentPage, itemsPerPage);
        console.log('API Response:', res);
        setItems(res.items);
        setPagination(res.pagination);
        setLinkText('내가 등록한 논문');
        setLinkHref(`/mypage/MyThesisList`);
      } catch (err) {
        console.error('Failed to fetch my thesis list:', err);
      }
    })();
  }, [currentPage, setLinkHref, setLinkText]); // currentPage가 변경될 때마다 호출

  return (
    <Container2>
      {/* 상단 헤더 */}
      <Header>
        <div className="header-tid">번호</div>
        <div className="header-gid">고유번호</div>
        <div className="header-title">제목</div>
        <div className="header-poster">작성자</div>
      </Header>

      {/* 논문 목록이 있으면 목록 표시, 없으면 "등록한 논문이 없습니다" 메시지 표시 */}
      {items && items.length > 0 ? (
        <>
          <MyThesisList items={items} />
          <Pagination onClick={onChangePage} pagination={pagination} />
        </>
      ) : (
        <NoData>등록한 논문이 없습니다.</NoData>
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

// 등록된 논문이 없을 때 표시할 메시지 스타일 정의
const NoData = styled.div`
  font-size: 1.5em;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
`;

export default React.memo(MyThesisListContainer);
