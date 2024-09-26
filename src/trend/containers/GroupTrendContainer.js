'use client';
import React, { useLayoutEffect, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { getCommonActions } from '@/commons/contexts/CommonContext';
import GroupTrend from '../components/GroupTrends';
import Container from '@/commons/components/Container';
import { apiGroupRanking } from '../apis/apiInfo';
import styled from 'styled-components';
import { color } from '@/theme/color';
import fontSize from '@/theme/fontSize';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/locale';
import { format } from 'date-fns';

const { gray, white, lightgray, navy, darkgray, midgray, midNavy } = color;
const { small, normal, center } = fontSize;

const Wrapper = styled.div`
  font-size: ${center};
  align-items: center;
  text-align: center;
  width: 1100px;

  .datebox {
    width: 500px;
    display: flex;
    gap: 10px;
    margin: 20px auto;
    align-items: center;
    text-align: center;
    justify-content: space-between;
    cursor: pointer;

    .date {
      border: 1px solid ${gray};
      display: flex;
      flex-direction: column;
      margin: 0 auto;
      height: 70px;
      font-size: ${normal};
      padding: 10px 20px;
      border-radius: 4px;

      .pick_date {
        cursor: pointer;
        width: 100%;
        border: none;
        padding-left: 18%;
      }

      .react-datepicker {
        width: 300px;
        height: 300px;
        border-radius: 10px;
      }

      .react-datepicker__navigation--next,
      .react-datepicker__navigation--previous {
        margin: 5px 5px 0 5px;
      }

      .react-datepicker__month-container {
        width: 100%;
        height: 100%;
        border-radius: 10px;
        border: 1px solid ${gray};
      }

      .react-datepicker__triangle {
        fill: ${white};
        color: ${white};
      }

      .react-datepicker__header {
        background: ${lightgray};
        width: 100%;
        padding: 10px;
        border-radius: 10px 10px 0 0;
        text-align: center;
      }

      //요일
      .react-datepicker__day-names {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 10px;
        width: 100%;
        font-weight: bold;
      }

      .react-datepicker__week {
        justify-content: space-between;
        display: flex;
        padding: 5px;

        > * {
          display: flex;
          width: 30px;
          height: 30px;
          justify-content: center;
          align-items: center;
          color: ${darkgray};
          text-align: center;
          font-size: ${small};
          line-height: 1;
        }

        //날짜
        .react-datepicker__month {
          display: flex;
          flex-direction: column;
          margin-top: 5px;
        }

        .react-datepicker__day {
          color: ${darkgray};
          margin: 0;
        }

        .react-datepicker__current-month {
          font-size: ${small};
          margin-top: 3px;
        }

        .react-datepicker__day--today {
          // 오늘 날짜 하이라이트 커스텀
          color: ${navy};
          border: 1px solid ${navy};
          border-radius: 50%;
        }
        .react-datepicker__day--selected {
          background: ${gray};
          color: ${white};
          border-radius: 50%;
        }
        .react-datepicker__day:hover {
          background: ${navy}; /* 마우스 오버 시 배경색 변경 */
          color: ${white}; /* 마우스 오버 시 텍스트 색상 변경 */
          border-radius: 50%; /* 원형 테두리 적용 */
        }

        .react-datepicker__day--outside-month {
          color: ${gray};
        }

        .react-datepicker__day--keyboard-selected {
          border-radius: 50%;
          background: ${navy};
          color: ${white};
        }
      }
    }
    .sel {
      display: inline-block;
      vertical-align: middle;
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

// 한 달간의 인기 키워드 조회 (기간)
let today = format(new Date(), 'yyyy-MM-dd');
let lastMonth = new Date();
lastMonth.setMonth(lastMonth.getMonth() - 1);
lastMonth = format(lastMonth, 'yyyy-MM-dd');

const GroupTrendContainer = ({ searchParams }) => {
  const { t } = useTranslation();
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(() => getQueryString(searchParams));
  const [startDate, setStartDate] = useState(new Date(lastMonth));
  const [endDate, setEndDate] = useState(new Date(today));
  const [pagination, setPagination] = useState({});
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
      console.log('res', res); // 날짜로 필터링한 결과 조회
      console.log('search', search); // 날짜 조건 들어가는지!
      setItems(res || []);
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
      <Wrapper>
        <h1>{t('그룹별_인기검색어')}</h1>
        <div className="datebox">
          <div className="date">
            <label>{t('검색시작일')}</label>
            <DatePicker
              className="pick_date"
              locale={ko}
              selected={form?.sDate ? new Date(form.sDate) : startDate}
              onChange={(date) => setStartDate(date)}
              dateFormat="yyyy-MM-dd"
            />
          </div>
          ~
          <div className="date">
            <label>{t('검색종료일')}</label>
            <DatePicker
              className="pick_date"
              locale={ko}
              selected={form?.eDate ? new Date(form.eDate) : endDate}
              onChange={(date) => setEndDate(date)}
              dateFormat="yyyy-MM-dd"
            />
          </div>
        </div>
        <GroupTrend items={items} />
      </Wrapper>
    </Container>
  );
};

export default React.memo(GroupTrendContainer);
