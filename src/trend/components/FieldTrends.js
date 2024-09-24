import React from 'react';
import styled from 'styled-components';
import { Bar } from '@nivo/bar';
import Loading from '@/commons/components/Loading';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: left;

  div {
    display: inline-block;
    border: 1px solid #000;
    padding: 10px;
  }
`;

const FieldsRank = ({ item, className }) => {
  const { name, subfield, count, wishCount } = item;
  return (
    <li className={className}>
      <div className="name">대분류:{name}</div>
      <div className="subfield">중분류:{subfield}</div>
      <div className="count">조회수:{count}</div>
      <div className="wishCount">찜하기수:{wishCount}</div>
    </li>
  );
};

const FieldBarStat = ({ stat, field }) => {
  const data = [];
  let indexBy = '대분류';

  if (field) {
    indexBy = '중분류';
    for (const { name, subfield, count, wishCount } of stat[field].sub) {
      data.push({
        중분류: `${name}/${subfield}`,
        조회수: count,
        찜하기: wishCount,
      });
    }
  } else {
    for (const [name, item] of Object.entries(stat)) {
      data.push({
        대분류: name,
        조회수: item.count,
        찜하기: item.wishCount,
      });
    }
  }

  /*
  const name = data.map((item) => item.대분류);
  console.log('name', name);
  const sub = data.map((item) => item.중분류);
  console.log('sub', sub);*/

  return (
    <Bar
      data={data}
      keys={['조회수', '찜하기']}
      indexBy={indexBy}
      labelPosition="middle"
      width={1000}
      height={500}
      padding={0.3}
      theme={{
        labels: {
          text: {
            fontSize: 14,
            fill: '#000',
          },
          legends: {
            text: {
              fontSize: 12,
              fill: '#000',
            },
          },
          axis: {
            legend: {
              text: {
                fontSize: 20,
                fill: '#000',
              },
            },
            ticks: {
              text: {
                fontSize: 16,
                fill: '#000',
              },
            },
          },
        },
      }}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: -45,
        legend: field ? '중분류' : '대분류',
        legendPosition: 'middle',
        legendOffset: 32,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'indexBy',
        legendPosition: 'middle',
        legendOffset: -60,
      }}
    />
  );
};

const FieldTrends = ({ stat, field }) => {
  return (
    <Wrapper>
      {stat ? <FieldBarStat stat={stat} field={field} /> : <Loading />}
    </Wrapper>
  );
};
export default FieldTrends;
