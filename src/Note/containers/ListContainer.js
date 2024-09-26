'use client';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { getCommonActions } from '@/commons/contexts/CommonContext';
import { useTranslation } from 'react-i18next';
import Pagination from '@/commons/components/Pagination';
import { getList } from '../apis/apiNote';
import { List } from 'react-content-loader';
import NoteList from '../components/skins/default/NoteList';
import { useLayoutEffect } from 'react';
import { useParams } from 'next/navigation';

const MyListLoader = () => <List />;

const ListContainer = () => {
  const { nid } = useParams();
  const { setMainTitle } = getCommonActions();
  const [search, setSearch] = useState(nid);
  const [items, setItems] = useState([]);
  const [pagination, setPagination] = useState();
  const [loading, setLoading] = useState(false);

  const { t } = useTranslation();

  useLayoutEffect(() => {
    setMainTitle(t('연구노트'));
  }, [setMainTitle, t]);

  useEffect(() => {
    (async () => {
      const data = await getList(search);
      console.log(data);
      if (data) {
        setItems(data.items);
        setPagination(data.pagination);
      }
    })();
  }, [search]);

  useEffect(() => {
    console.log(items);
  }, [items]);

  const onChangePage = useCallback((p) => {
    setSearch((search) => ({ ...search, page: p }));
    window.location.hash = '#root';
  }, []);

  /* 로딩 처리 */
  if (loading) {
    return <MyListLoader />;
  }

  return (
    <>
      <NoteList items={items} />
      {items?.length > 0 && (
        <Pagination onClick={onChangePage} pagination={pagination} />
      )}
    </>
  );
};

export default React.memo(ListContainer);
