'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { apiList } from '../apis/apiInfo';
import RecentTrend from '../components/RecentTrend';
import Container from '@/commons/components/Container';
import SearchBox from '@/mainpage/components/SearchBox';
import Pagination from '@/commons/components/Pagination';
import { useSearchParams } from 'next/navigation';
import RecentSort from '../components/RecentSort';

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

const RecentTrendContainer = () => {
  const searchParams = useSearchParams();

  const [form, setForm] = useState(() => getQueryString(searchParams));
  const [search, setSearch] = useState({});
  const [items, setItems] = useState([]);
  const [pagination, setPagination] = useState({});

  useEffect(() => {
    console.log(search);
    apiList(search).then((res) => {
      console.log('API response:', res);
      setItems(res.items || []);
      setPagination(res.pagination || {});
    });
  }, [search]);

  /* 검색 관련 함수 */
  const onChangeSearch = useCallback((e) => {
    setForm((form) => ({ ...form, [e.target.name]: e.target.value }));
  }, []);

  const onSubmitSearch = useCallback(
    (e) => {
      e.preventDefault();
      const today = new Date();
      const lastMonth = new Date(today.setMonth(today.getMonth() - 1));

      setSearch({
        ...form,
        page: 1,
        sDate: today.toDateString(),
        eDate: lastMonth.toDateString(),
      });
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
      <SearchBox
        form={form}
        onChange={onChangeSearch}
        onSubmit={onSubmitSearch}
      />
      <RecentTrend items={items} />
      {items.length > 0 && (
        <Pagination onClick={onChangePage} pagination={pagination} />
      )}
      <RecentSort search={search} onChange={onChangeSort} />
    </Container>
  );
};

export default React.memo(RecentTrendContainer);
