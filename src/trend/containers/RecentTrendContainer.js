'use client';
import React, {
  useCallback,
  useEffect,
  useState,
  useLayoutEffect,
} from 'react';
import { useTranslation } from 'react-i18next';
import { apiList } from '../apis/apiInfo';
import RecentTrend from '../components/RecentTrend';
import { getCommonActions } from '@/commons/contexts/CommonContext';
import Container from '@/commons/components/Container';
import Pagination from '@/commons/components/Pagination';
import { useSearchParams } from 'next/navigation';
import RecentSort from '../components/RecentSort';
import { format } from 'date-fns';

function getQueryString(searchParams) {
  if (!searchParams) return { limit: 9 };

  const qs = { limit: 9 };
  if (searchParams.length > 0) {
    for (const [k, v] of searchParams) {
      qs[k] = v;
    }
  }
  return qs;
}

let today = format(new Date(), 'yyyy-MM-dd');
let lastMonth = new Date();
lastMonth.setMonth(lastMonth.getMonth() - 1);
lastMonth = format(lastMonth, 'yyyy-MM-dd');

const RecentTrendContainer = () => {
  const { t } = useTranslation();
  const searchParams = useSearchParams();
  const { setMainTitle } = getCommonActions();

  useLayoutEffect(() => {
    setMainTitle(t('최신인기논문'));
  }, [setMainTitle, t]);

  const [form, setForm] = useState(() => getQueryString(searchParams));
  const [search, setSearch] = useState({
    sDate: lastMonth,
    eDate: today,
    page: 1,
    limit: 10,
  });
  const [items, setItems] = useState([]);
  const [pagination, setPagination] = useState({});

  useEffect(() => {
    console.log('search', search);
    apiList(search).then((res) => {
      console.log('API response:', res);
      setItems(res.items || []);
      setPagination(res.pagination || {});
    });
  }, [search]);

  /* 검색 관련 함수(사용할 수도 있으니까... 지우지마세요) */
  const onChangeSearch = useCallback((e) => {
    setForm((form) => ({ ...form, [e.target.name]: e.target.value }));
  }, []);

  const onSubmitSearch = useCallback(
    (e) => {
      e.preventDefault();
      setSearch((search) => ({ ...search, ...form, page: 1 }));
    },
    [form],
  );

  /* 정렬 */
  const onChangeSort = useCallback((e) => {
    setSearch((search) => ({ ...search, sort: e.target.value }));
  }, []);

  /* 페이지 변경 함수 */
  const onChangePage = useCallback((p) => {
    setSearch((search) => ({ ...search, page: p }));
    window.location.hash = '#root';
  }, []);
  return (
    <Container>
      <h1>
        {lastMonth}부터 {today}까지의 최신 논문 목록
      </h1>
      <RecentSort search={search} onChange={onChangeSort} />
      <RecentTrend items={items} />
      {items.length > 0 && (
        <Pagination onClick={onChangePage} pagination={pagination} />
      )}
    </Container>
  );
};

export default React.memo(RecentTrendContainer);
