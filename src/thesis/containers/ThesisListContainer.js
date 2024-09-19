'use client';
import React, { useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { apiList } from '../apis/apiInfo.js';
import Pagination from '@/commons/components/Pagination';
import ItemsBox from '../components/ItemsBox';
import SearchBox from '../components/SearchBox';
import Loading from '@/commons/components/Loading';

function getQueryString(searchParams) {
  const qs = {};
  if (searchParams && searchParams.size > 0) {
    //searchParams가 존재하는지, 실제 쿼리 파라미터가 있는지 체크
    for (const [k, v] of searchParams) {
      qs[k] = v;
    }
  }
  return qs;
}

const ThesisListContainer = ({searchParams}) => {
  // const [searchParams] = useSearchParams();
  const [form, setForm] = useState(() => getQueryString(searchParams));
  const [search, setSearch] = useState(() => getQueryString(searchParams));
  const [items, setItems] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    apiList(search).then((res) => {
      setItems(res.items);
      setPagination(res.pagination);
      setLoading(false);
    });
  }, [search]);

  /* 검색 관련 함수 */
  const onChangeSearch = useCallback((e) => {
    setForm((form) => ({ ...form, [e.target.name]: e.target.value }));
  }, []);

  const onSubmitSearch = useCallback(
    (e) => {
      e.preventDefault();
      setSearch({ ...form, page: 1 });
    },
    [form],
  );

  const selectChange = useCallback(
    (selectedOption) => {
      setForm(
        produce((draft) => {
          draft.persons = selectedOption ? selectedOption.value : null;
        }),
      );
    },
    [setForm],
  );

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
    <>
      <SearchBox
        form={form}
        onChange={onChangeSearch}
        onSubmit={onSubmitSearch}
        selectChange={selectChange}
      />
      <ItemsBox items={items} />
      {items.length > 0 && (
        <Pagination onClick={onChangePage} pagination={pagination} />
      )}
    </>
  );
};

export default ThesisListContainer;
