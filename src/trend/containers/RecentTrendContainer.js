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
import { format, subDays, subWeeks, subMonths } from 'date-fns';
import styled from 'styled-components';
import { color } from '@/theme/color';
import fontSize from '@/theme/fontSize';

const { gray, navy, white } = color;
const { small, normal, center } = fontSize;

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

const getPeriodRange = (period) => {
  switch (period) {
    case 'daily':
      return {
        sDate: (subDays(new Date(), 1), 'yyyy-MM-ddformat'),
        eDate: today,
      };
    case 'weekly':
      return {
        sDate: format(subWeeks(new Date(), 1), 'yyyy-MM-dd'),
        eDate: today,
      };
    case 'monthly':
    default:
      return {
        sDate: format(subMonths(new Date(), 1), 'yyyy-MM-dd'),
        eDate: today,
      };
  }
};

const PeriodTabs = ({ currentPeriod, onChangePeriod }) => (
  <div>
    <button
      onClick={() => onChangePeriod('monthly')}
      className={currentPeriod === 'monthly' ? 'active' : ''}
    >
      월간
    </button>
    <button
      onClick={() => onChangePeriod('weekly')}
      className={currentPeriod === 'weekly' ? 'active' : ''}
    >
      주간
    </button>
    <button
      onClick={() => onChangePeriod('daily')}
      className={currentPeriod === 'daily' ? 'active' : ''}
    >
      일간
    </button>
  </div>
);

const RecentTrendContainer = () => {
  const { t } = useTranslation();
  const searchParams = useSearchParams();
  const { setMainTitle } = getCommonActions();

  useLayoutEffect(() => {
    setMainTitle(t('최신인기논문'));
  }, [setMainTitle, t]);

  const [form, setForm] = useState(() => getQueryString(searchParams));
  const [search, setSearch] = useState({
    ...getPeriodRange('monthly'),
    page: 1,
    limit: 10,
    sort: 'viewCount_DESC',
  });
  const [items, setItems] = useState([]);
  const [pagination, setPagination] = useState({});
  const [currentPeriod, setCurrentPeriod] = useState('monthly'); // 현재 선택된 기간

  useEffect(() => {
    apiList(search).then((res) => {
      setItems(res.items || []);
      setPagination(res.pagination || {});
    });
  }, [search]);

  const onChangePeriod = (period) => {
    setCurrentPeriod(period);
    const newPeriod = getPeriodRange(period);
    setSearch((search) => ({ ...search, ...newPeriod, page: 1 }));
  };

  const onChangeSort = useCallback((e) => {
    setSearch((search) => ({ ...search, sort: e.target.value }));
  }, []);

  const onChangePage = useCallback((p) => {
    setSearch((search) => ({ ...search, page: p }));
    window.location.hash = '#root';
  }, []);

  return (
    <Container>
      <Wrapper>
        <div className="listform">
          <h1>
            {currentPeriod === 'daily'
              ? '일간'
              : currentPeriod === 'weekly'
              ? '주간'
              : '월간'}
            &nbsp;{t('인기논문리스트')}
          </h1>
          <PeriodTabs
            currentPeriod={currentPeriod}
            onChangePeriod={onChangePeriod}
          />
          <RecentSort
            className="sort"
            search={search}
            onChange={onChangeSort}
          />
          <RecentTrend items={items} />
          {items.length > 0 && (
            <Pagination onClick={onChangePage} pagination={pagination} />
          )}
        </div>
      </Wrapper>
    </Container>
  );
};

const Wrapper = styled.div`
  font-size: ${normal};
  padding: 30px;

  h1 {
    margin-left: 20px;
  }

  button {
    font-size: ${normal};
    display: inline-block;
    margin: 10px 10px 0 10px;
    padding: 3px 0;
    text-align: center;
    vertical-align: middle;
    height: 45px;
    width: 100px;
    border: 1px solid ${gray};
    background: ${white};
    border-radius: 50px;
    cursor: pointer;

    &.active {
      background: ${navy};
      color: ${white};
    }
  }
`;

export default React.memo(RecentTrendContainer);
