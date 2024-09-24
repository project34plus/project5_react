'use client';
import React, { useLayoutEffect, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { getCommonActions } from '@/commons/contexts/CommonContext';
import GroupTrend from '../components/GroupTrends';
import Container from '@/commons/components/Container';
import { apiGroupRanking } from '../apis/apiInfo';
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

// 한 달간의 인기 키워드 조회 (기간)
let today = format(new Date(), 'yyyy-MM-dd');
let lastMonth = new Date();
lastMonth.setMonth(lastMonth.getMonth() - 1);
lastMonth = format(lastMonth, 'yyyy-MM-dd');

const GroupTrendContainer = ({ searchParams }) => {
  const { t } = useTranslation();
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState({
    sDate: lastMonth,
    eDate: today,
  });
  const { setMainTitle } = getCommonActions();
  useLayoutEffect(() => {
    setMainTitle(t('그룹별_인기검색어'));
  }, [setMainTitle, t]);

  useEffect(() => {
    apiGroupRanking(search).then((res) => {
      console.log('res', res);
      setItems(res || []);
    });
  }, [search]);

  return (
    <Container>
      <h1>
        {lastMonth} ~ {today} 직업군별 인기검색어
      </h1>
      <GroupTrend items={items} />
    </Container>
  );
};

export default React.memo(GroupTrendContainer);
