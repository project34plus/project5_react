import React, { useState, useEffect } from 'react';
import { Pie } from '@nivo/pie';
import { getJobs } from '@/member/apis/apiInfo';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { color } from '@/theme/color';
import fontSize from '@/theme/fontSize';
import { LuLoader } from 'react-icons/lu';

const { gray, navy, white, black } = color;
const { center, medium, big, giantBig } = fontSize;

const Wrapper = styled.div`
  width: 1100px;
  display: flex; /* Flexbox를 사용하여 중앙 정렬 */
  flex-direction: column; /* 세로 방향 정렬 */
  align-items: center;
  justify-content: center;
  height: 100%;
  margin-top: 10px;
  font-size: ${center};

  .job-list {
    width: 900px;
    background: ${gray};
    border-radius: 10px;
    text-align: center;
    cursor: pointer;

    .job-item {
      padding-top: 12px;
    }

    div {
      background: ${white};
      display: inline-block;
      margin: 10px;
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
  .subtitle {
    text-align: center;
    font-size: ${medium};
  }

  .load {
    font-size: ${medium};
    padding-top: 60px;
    .icon {
      font-size: ${giantBig};
      margin-bottom: 20px;
    }
  }
`;

/* 출력용...
const GroupKeyword = ({ item, className }) => {
  const { search, count, job } = item; // item에서 값을 추출
  return (
    <li className={className}>
      <div className="search">검색어: {item.search}</div>
      <div className="count">검색 횟수: {count}</div>
      <div className="job">직업군: {job}</div>
    </li>
  );
};*/

const GroupTrend = ({ items }) => {
  const [selectedJob, setSelectedJob] = useState(null);
  const [jobs, setJobs] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    (async () => {
      try {
        const jobs = await getJobs();
        setJobs(jobs);
      } catch (err) {
        console.log('test');
        console.error(err);
      }
    })();
  }, []);

  // job별로 그룹화
  const groupedData = items.reduce((acc, item) => {
    const { job, search, count } = item;

    if (!acc['전체']) {
      acc['전체'] = [];
    }

    // 이미 존재하는 검색어가 있으면 count를 누적
    const existingTotalItem = acc['전체'].find((data) => data.label === search);
    if (existingTotalItem) {
      existingTotalItem.value += count;
    } else {
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
    // 각 job 그룹에 동일한 검색어가 있으면 count를 누적
    const existingJobItem = acc[job].find((data) => data.label === search);
    if (existingJobItem) {
      existingJobItem.value += count;
    } else {
      acc[job].push({
        id: search,
        label: search,
        value: count, // 파이 차트에서 사용할 값
      });
    }

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
        {jobs &&
          jobs.map((job) => (
            <div
              key={job}
              className={`job-item ${
                selectedJob === job ? 'selected-job' : ''
              }`}
              onClick={() => handleJobClick(job[0])}
            >
              {job[1]}
            </div>
          ))}
        {/*
        {Object.keys(groupedData).map((job) => (
          <div
            key={job}
            className={`job-item ${selectedJob === job ? 'selected-job' : ''}`}
            onClick={() => handleJobClick(job)}
          >
            {job}
          </div>
        )) */}
      </div>

      {groupedData[selectedJob || '전체'] ? (
        <>
          <Pie
            className="pie"
            width={700}
            height={700}
            data={groupedData[selectedJob || '전체']
              .sort((a, b) => b.value - a.value) // value 기준으로 내림차순 정렬
              .slice(0, 10)} // 상위 10개 항목만 선택
            margin={{ top: 30, right: 100, bottom: 10, left: 100 }}
            innerRadius={0.5}
            padAngle={0.7}
            cornerRadius={3}
            activeOuterRadiusOffset={10}
            borderWidth={1.5}
            borderColor={{
              from: 'color',
              modifiers: [['darker', 0.3]],
            }}
            arcLinkLabelsSkipAngle={10}
            arcLinkLabelsTextColor={black}
            arcLinkLabelsThickness={3}
            arcLabelsTextSize={50} //라벨 텍스트 크기
            arcLinkLabelsColor={{ from: 'color' }}
            arcLabel={(e) => `${e.id}: ${e.value}`}
            tooltip={({ datum }) => (
              <div>
                <strong>{datum.label}</strong>: {datum.value}
              </div>
            )}
          />
          <div className="subtitle">
            &lt;{selectedJob ? `${selectedJob}` : '전체'} 인기 검색어 TOP10&gt;
          </div>
        </>
      ) : (
        <p className="load">
          <LuLoader className="icon" />
          <br></br>
          {t('데이터_집계중입니다')}
        </p>
      )}
    </Wrapper>
  );
};

export default GroupTrend;
