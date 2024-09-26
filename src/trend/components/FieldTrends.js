import React from 'react';
import styled from 'styled-components';
import { Bar } from '@nivo/bar';
import Loading from '@/commons/components/Loading';
import fontSize from '@/theme/fontSize';
import { color } from '@/theme/color';
import { LuLoader } from 'react-icons/lu';
import { useTranslation } from 'react-i18next';

const { gray, white, lightgray, navy, darkgray, midgray, midNavy } = color;
const { center, medium, big, giantBig } = fontSize;

const Wrapper = styled.div`
  width: 1200px;
  display: flex; /* Flexbox를 사용하여 중앙 정렬 */
  flex-direction: column; /* 세로 방향 정렬 */
  align-items: center;
  justify-content: center;
  height: 100%;
  margin-top: 30px;
  font-size: ${center};
  border: 1px solid ${gray};

  .load {
    font-size: ${medium};
    height: 300px;
    text-align: center;
    vertical-align: middle;
    align-items: center;
    margin-top: 140px;
    .icon {
      font-size: ${giantBig};
      margin-bottom: 20px;
    }
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
  const { t } = useTranslation();
  let indexBy = '대분류';
  console.log('field', field, 'stat', stat);
  if (field && stat[field]) {
    indexBy = '중분류';

    for (const { name, subfield, count, wishCount } of stat[field].sub) {
      if (count > 0 || wishCount > 0) {
        data.push({
          중분류: `${subfield}`,
          조회수: count,
          찜하기: wishCount,
        });
      }
    }
  } else {
    for (const [name, item] of Object.entries(stat)) {
      if (item.count > 0 || item.wishCount > 0) {
        data.push({
          대분류: name,
          조회수: item.count,
          찜하기: item.wishCount,
        });
      }
    }
  }

  if (field && !stat[field]) {
    return (
      <div className="load">
        <LuLoader className="icon" />
        <br />
        {t('데이터_집계중입니다')}&nbsp;
      </div>
    );
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
      width={1200}
      height={500}
      padding={0.3}
      margin={{ top: 30, right: 30, bottom: 30, left: 40 }}
      theme={{
        labels: {
          text: {
            fontSize: 14,
            fill: '#000',
          },
          legends: {
            text: {
              fontSize: 30,
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
                fontSize: 30,
                fill: '#000',
              },
            },
          },
        },
      }}
      axisBottom={{
        tickSize: 15,
        tickPadding: 0,
        tickRotation: 0,
        legend: field ? '중분류' : '대분류',
        legendPosition: 'start',
        legendOffset: 20,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        tickValues: [5, 10, 15, 20, 25, 30, 35, 40],
        tickFormat: (value) => `${value}회`,
        //legend: 'indexBy',
        legendPosition: 'top',
        legendOffset: -50,
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
