import React, { useState } from 'react';
import { Pie } from '@nivo/pie';
import styled from 'styled-components';
import { color } from '@/theme/color';
import fontSize from '@/theme/fontSize';

const { gray, navy, white } = color;

const Wrapper = styled.div`
  width: 1020px;
  border: 1px solid #000;
  display: flex; /* Flexbox를 사용하여 중앙 정렬 */
  flex-direction: column; /* 세로 방향 정렬 */
  align-items: center;
  justify-content: center;
  height: 100%;

  .job-list {
    div {
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

      &:hover {
        background: ${navy};
        color: ${white};
      }
    }
  }
  .subtitle {
    margin-top: 20px;
    text-align: center;
  }
`;

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
  const [selectedJob, setSelectedJob] = useState(null);

  // job별로 그룹화
  const groupedData = items.reduce((acc, item) => {
    const { job, search, count } = item;

    if (!acc['전체']) {
      acc['전체'] = [];
    }

    if (!acc['전체'].some((data) => data.label === search)) {
      acc['전체'].push({
        id: search,
        label: search,
        value: count,
      });
    }

    // job을 key로 하여 그룹화
    if (!acc[job]) {
      acc[job] = [];
    }
    // 각 job 그룹에 해당하는 검색어와 count를 push
    acc[job].push({
      id: search,
      label: search,
      value: count, // 파이 차트에서 사용할 값
    });

    return acc;
  }, {});

  const handleJobClick = (job) => {
    setSelectedJob(job);
  };

  console.log('groupedData', groupedData);

  return (
    <Wrapper>
      <div className="job-list">
        {/* job 목록을 보여주고 클릭 가능하게 설정 */}
        {Object.keys(groupedData).map((job) => (
          <div
            key={job}
            className={`job-item ${selectedJob === job ? 'selected-job' : ''}`}
            onClick={() => handleJobClick(job)}
          >
            {job}
          </div>
        ))}
      </div>

      {groupedData[selectedJob || '전체'] ? (
        <>
          <div className="subtitle">
            {selectedJob ? `${selectedJob}` : '전체'} 인기 검색어
          </div>
          <Pie
            className="pie"
            width={700}
            height={700}
            data={groupedData[selectedJob || '전체']}
            margin={{ top: 30, right: 100, bottom: 30, left: 100 }}
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
        </>
      ) : (
        <p>직업을 선택해 주세요</p>
      )}
    </Wrapper>
  );
};

export default GroupTrend;
