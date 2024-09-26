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
import { apiList as apiFields } from '@/member/apis/apiFields';
const { gray, white, lightgray, navy, darkgray, midgray, midNavy } = color;
const { small, normal, center } = fontSize;

const Wrapper = styled.div`
  //border: 1px solid ${gray};
  width: 1200px;
  font-size: ${center};
  align-items: center;
  text-align: center;

  .fieldsbox {
    width: 900px;
    border-radius: 10px;
    text-align: center;
    cursor: pointer;

    .names {
      background: ${white};
      margin: 10px;
      padding-top: 13px;
      text-align: center;
      align-items: center;
      vertical-align: middle;
      height: 50px;
      width: 150px;
      border: 1px solid ${gray};
      border-radius: 25px;

      &:hover {
        background: ${navy};
        color: ${white};
      }
    }
  }

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
        padding-left: 20%;
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
  }
  .sel {
    display: inline-block;
    vertical-align: middle;
  }

  div {
    margin: 0 auto;
    .names {
      display: inline-block;
      margin: 10px 10px 0 10px;
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
  const [stats, setStats] = useState(null);
  const [field, setField] = useState(null);
  const [fields, setFields] = useState(null);
  const [items, setItems] = useState([]); // items 상태 추가
  const [pagination, setPagination] = useState({}); // pagination 상태 추가

  const { setMainTitle } = getCommonActions();

  useLayoutEffect(() => {
    setMainTitle(t('학문별_인기논문'));
  }, [setMainTitle, t]);

  useEffect(() => {
    //console.log('search', search);
    apiFieldRanking(search).then((res) => {
      console.log('API response: ', res);
      const itemsArray = res ? Object.values(res) : [];

      // 대분류로 묶어서 처리
      const stats = {};
      for (const item of itemsArray) {
        if (!item.name) continue;

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

  useEffect(() => {
    (async () => {
      try {
        const fields = await apiFields();
        setFields(fields);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  return (
    <Container>
      <Wrapper>
        <h1>학문별인기논문</h1>
        <div className="datebox">
          <div className="date">
            <label>{t('검색시작일')}</label>
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
        {stats && fields && (
          <div className="fieldsbox">
            {fields.map((name) => (
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
