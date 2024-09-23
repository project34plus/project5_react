'use client';
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import Pagination from '@/commons/components/Pagination';
import { useTranslation } from 'react-i18next';
import { getCommonActions } from '@/commons/contexts/CommonContext';
import { apiRecommendData } from '@/thesis/apis/apiRecommend';
import Loading from '@/commons/components/Loading';
import Container from '@/commons/components/Container';
import ItemsBox from '@/thesis/components/ItemsBox';
import SubMenus from '@/thesis/components/SubMenus';
import RecommendList from '../components/RecommendList';
import { load } from 'react-cookies';

function getQueryString(searchParams) {
  const qs = {};
  if (searchParams?.size > 0) {
    for (const [k, v] of searchParams) {
      qs[k] = v;
    }
  }
  return qs;
}

const ThesisRecommendListContainer = ({ searchParams }) => {
  const { t } = useTranslation();
  const [form, setForm] = useState(() => getQueryString(searchParams));
  const [search, setSearch] = useState(() => getQueryString(searchParams));
  const [items, setItems] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(false);
  const { setMainTitle } = getCommonActions();

  useLayoutEffect(() => {
    setMainTitle(t('추천논문'));
  }, [setMainTitle, t]);

  useEffect(() => {
    setLoading(true);
    console.log('search', search);
    apiRecommendData(search).then((res) => {
      console.log('res', res);
      setItems(res.items || []);
      setPagination(res.pagination || {});
      setLoading(false);
    });
  }, [search]);
  const onClick = (field) => {
    console.log('Selected field:', field);
    setSearch((prevSearch) => ({ ...prevSearch, fieldFilter : field })); // 검색 조건에 필드 값 추가
    console.log(search);
  };
  /* 페이지 변경 함수 */
  const onChangePage = useCallback((p) => {
    setSearch((search) => ({ ...search, page: p }));
    window.location.hash = '#root';
  }, []);

  /* 로딩 처리 */
  if (loading) {
    return <Loading />;
  }
  return (
    <Container>
      <SubMenus onClick={onClick} />
      <RecommendList items={items} loading={loading} />
      {items.length > 0 && (
        <Pagination onClick={onChangePage} pagination={pagination} />
      )}
    </Container>
  );
};

export default React.memo(ThesisRecommendListContainer);
