'use client';
import React, {
  useCallback,
  useState,
  useEffect,
  useLayoutEffect,
} from 'react';
import { useTranslation } from 'react-i18next';
import { getCommonActions } from '@/commons/contexts/CommonContext';
import { apiFieldRanking, apiList } from '../apis/apiInfo';
import FieldTrends from '../components/FieldTrends';
import Container from '@/commons/components/Container';
import { format } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import styled from 'styled-components';
import { ko } from 'date-fns/locale';
import { color } from '@/theme/color';
import fontSize from '@/theme/fontSize';

const { gray, white, navy, midNavy } = color;
const { small, normal, center } = fontSize;

const Wrapper = styled.div`
  width: 1022px;
  display: block;
  border: 1px solid #000;
  padding: 15px 10px 10px 10px;
  margin: 5px 0;
  font-size: ${small};

  div {
    margin-bottom: 10px;
  }
  .date {
    display: inline-block;
    border: 1px solid #000;
    height: 25px;
    width: 120px;
    text-align: center;

    .pick_date {
      cursor: pointer;
      width: 100%;
      border: none;
    }
  }
  .sel {
    display: inline-block;
    vertical-align: middle;
  }

  div {
    margin: 0 auto;
    .names {
      display: inline-block;
      margin: 10px 20px 0 10px;
      padding: 3px 0;
      text-align: center;
      vertical-align: middle;
      height: 30px;
      width: 100px;
      border: 1px solid ${gray};
      border-radius: 50px;
      cursor: pointer;

      &: hover {
        background: ${navy};
        color: ${white};
      }
    }
  }
`;

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

// 현재날짜 -1일로 기본 설정
let today = format(new Date(), 'yyyy-MM-dd');
let lastday = new Date();
lastday.setDate(lastday.getDate() - 1);
lastday = format(lastday, 'yyyy-MM-dd');

const FieldTrendContainer = ({ searchParams }) => {
  const { t } = useTranslation();
  const [form, setForm] = useState(() => getQueryString(searchParams));
  const [startDate, setStartDate] = useState(new Date(lastday));
  const [endDate, setEndDate] = useState(new Date(today));
  const [search, setSearch] = useState({
    sDate: lastday,
    eDate: today,
  });
  const { setMainTitle } = getCommonActions();

  useLayoutEffect(() => {
    setMainTitle(t('학문별_인기논문'));
  }, [setMainTitle, t]);

  const [stats, setStats] = useState(null);
  const [field, setField] = useState(null);
  const [items, setItems] = useState([]); // items 상태 추가
  const [pagination, setPagination] = useState({}); // pagination 상태 추가

  useEffect(() => {
    console.log('search', search);
    apiFieldRanking(search).then((res) => {
      console.log('API response: ', res);
      const itemsArray = res ? Object.values(res) : [];

      // 대분류로 묶어서 처리
      const stats = {};
      for (const item of itemsArray) {
        stats[item.name] = stats[item.name] ?? { sub: [] };
        stats[item.name].sub = stats[item.name].sub ?? [];
        stats[item.name].sub.push(item);

        // 대분류 별 조회 수 합계
        stats[item.name].count = stats[item.name].count ?? 0;
        stats[item.name].count += item.count;

        // 대분류 별 찜하기 합계
        stats[item.name].wishCount = stats[item.name].wishCount ?? 0;
        stats[item.name].wishCount += item.wishCount;
      }

      setStats(stats);
    });
  }, [search]);

  useEffect(() => {
    console.log('search', search);
    apiList(search).then((res) => {
      console.log('API response:', res);
      setItems(res.items || []);
      setPagination(res.pagination || {});
    });
  }, [search]);

  useEffect(() => {
    setSearch({
      sDate: format(startDate, 'yyyy-MM-dd'),
      eDate: format(endDate, 'yyyy-MM-dd'),
    });
  }, [startDate, endDate]);

  return (
    <Container>
      <h1>학문별인기논문</h1>
      <Wrapper>
        <div className="sel"> 기간별 조회 &nbsp;</div>
        <div className="date">
          <DatePicker
            className="pick_date"
            locale={ko}
            selected={form?.sDate ? new Date(form.sDate) : startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="yyyy-MM-dd"
            placeholderText="시작일"
          />
        </div>
        <div className="sel">&nbsp;~&nbsp;</div>
        <div className="date">
          <DatePicker
            className="pick_date"
            locale={ko}
            selected={form?.eDate ? new Date(form.eDate) : endDate}
            onChange={(date) => setEndDate(date)}
            dateFormat="yyyy-MM-dd"
          />
        </div>
        {stats && (
          <div>
            {Object.keys(stats).map((name) => (
              <span className="names" key={name} onClick={() => setField(name)}>
                {name}
              </span>
            ))}
          </div>
        )}
      </Wrapper>
      <FieldTrends stat={stats} field={field} />
    </Container>
  );
};

export default React.memo(FieldTrendContainer);
