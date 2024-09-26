'use client';
import loadable from '@loadable/component';
import React, { useEffect, useState, useCallback, useLayoutEffect } from 'react';
import { getCommonActions } from '@/commons/contexts/CommonContext';
import { useTranslation } from 'react-i18next';
import Pagination from '@/commons/components/Pagination';
import { getList } from '../apis/apiNote';
import ListItems from '@/Note/components/skins/default/ListItems';

/* 스킨별 양식 가져오기 */
function getForm(skin) {
  return loadable(() => import(`../components/skins/${skin}/List`));
}

const ListContainer = ({ searchParams, params = {} }) => {
    const { setMenuCode, setSubMenuCode, setMainTitle } = getCommonActions();
    const [search, setSearch] = useState(searchParams);
    const [items, setItems] = useState(null);
    const [pagination, setPagination] = useState(null); // pagination 상태 추가
    const { t } = useTranslation();
    const NoteContainer = getForm(params.nid);

    useLayoutEffect(() => {
    

        setMainTitle(t('노트_목록'));
    }, [setMenuCode, setSubMenuCode, setMainTitle, t]);
    
    useEffect(() => {
        (async () => {
          try {
            const data = await getList(search);
            if (data) {
              setItems(data.items);
              setPagination(data.pagination); // pagination 상태 업데이트
            }
            console.log('data', data);
          } catch (err) {
            console.error(err);
          }
        })();
    }, [search]);
    
    const onPageClick = useCallback((page) => {
        setSearch((search) => ({ ...search, page }));
    }, []);
    
    return (
        <>
        <NoteContainer>
          <ListItems items={items} />
          {pagination && ( // pagination이 null이 아닐 때만 렌더링
            <Pagination pagination={pagination} onClick={onPageClick} />
          )}
        </NoteContainer>
        </>
    );
};

export default React.memo(ListContainer);