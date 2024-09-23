import React from 'react';
import { Pie } from '@nivo/pie';

const GroupKeyword = ({ item, className }) => {
  const { search, count, job } = item; // item에서 값을 추출
  return (
    <li className={className}>
      <div className="search">검색어: {item.search}</div>
      <div className="count">검색 횟수: {count}</div>
      <div className="job">직업군: {job}</div>
    </li>
  );
};

const GroupTrend = ({ items }) => {
  // items를 props로 받음
  const formattedData = items.map((item) => ({
    id: item.search,
    label: item.search,
    value: item.count, // 파이 차트에서 사용할 값
  }));

  console.log('formattedData', formattedData);

  return (
    <>
      <h1>그룹별 인기검색어</h1>
      {items.length > 0 ? (
        /*
        <ul>
          {items.map((item, index) => (
            <GroupKeyword key={index} item={item} /> // item을 넘김
          ))}
        </ul>*/
        <Pie
            width={700}
            height={700}
          data={formattedData}
          margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
          innerRadius={0.5}
          padAngle={0.7}
          cornerRadius={3}
          activeOuterRadiusOffset={8}
          borderWidth={1}
          borderColor={{
            from: 'color',
            modifiers: [['darker', 0.2]],
          }}
          arcLinkLabelsSkipAngle={10}
          arcLinkLabelsTextColor="#333333"
          arcLinkLabelsThickness={2}
          arcLinkLabelsColor={{ from: 'color' }}
          arcLabel={(e) => `${e.id}: ${e.value}`}
          tooltip={({ datum }) => (
            <div>
              <strong>{datum.label}</strong>: {datum.value}
            </div>
          )}
        />
      ) : (
        <p>인기 키워드 집계 중입니다 ...⏳</p>
      )}
    </>
  );
};

export default GroupTrend;
