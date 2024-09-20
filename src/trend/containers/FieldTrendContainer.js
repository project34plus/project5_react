'use client';
import React, { useCallback, useState, useEffect } from 'react';
import { apiFieldRanking } from '../apis/apiInfo';
import FieldTrends from '../components/FieldTrends';
import Container from '@/commons/components/Container';
import { format } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';

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
lastMonth.setMonth(lastMonth.getMonth() - 12);
lastMonth = format(lastMonth, 'yyyy-MM-dd');

const FieldTrendContainer = ({ searchParams }) => {
  const [form, setForm] = useState(() => getQueryString(searchParams));
  const [startDate, setStartDate] = useState(new Date(lastMonth));
  const [endDate, setEndDate] = useState(new Date(today));
  const [search, setSearch] = useState({
    sDate: lastMonth,
    eDate: today,
  });
  const [items, setItems] = useState([]);

  useEffect(() => {
    console.log('search', search);
    apiFieldRanking(search).then((res) => {
      console.log('API response: ', res);
      const itemsArray = Object.values(res);
      setItems(itemsArray || []);
      console.log('itemsArrays: ', itemsArray);
    });
  }, [search]);

  return (
    <Container>
      <h1>학문별인기논문</h1>
      <div>
        <lable>시작 날짜:</lable>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
        />
      </div>
      <div>
        <label>종료 날짜:</label>
        <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
      </div>
      <FieldTrends items={items} />
    </Container>
  );
};

export default React.memo(FieldTrendContainer);
