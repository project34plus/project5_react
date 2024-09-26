import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { LuLoader } from 'react-icons/lu';
import fontSize from '@/theme/fontSize';

const { center, medium, big, giantBig } = fontSize;

const Wrapper = styled.div`
  li {
    padding: 10px 0 10px 8px;
    margin-bottom: 5px;
    border: 1px solid ${({ theme }) => theme.color.gray};
    border-radius: 3px;

    .title {
      font-size: 1.4rem;
    }
    .field {
      display: inline-block;
      padding-right: 3px;
    }
    .subfield {
      display: inline-block;
    }
  }

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

/*{_fields && Object.keys(_fields).length > 0 ? Object.values(_fields)[0][0] : '대분류 없음'}
              {/* _fields가 있을 경우 대분류 렌더링, 없으면 '대분류 없음' 출력 */

const RecentList = ({ item, className }) => {
  const { title, poster, tid, _fields } = item;
  const url = `/thesis/view/${tid}`;
  return (
    <li key={tid} className={className}>
      <a href={url}>
        <div className="field">
          {_fields && Object.keys(_fields).length > 0
            ? Object.values(_fields)[0][0]
            : '대분류 없음'}
          &gt; {/* 대분류 */}
        </div>
        <div className="subfield">
          {_fields && Object.keys(_fields).length > 0
            ? Object.values(_fields)[0][1]
            : '중분류 없음'}
          {/* 중분류 */}
        </div>
        <div className="title">{title}</div>
        <div className="poster">{poster}</div>
      </a>
    </li>
  );
};

const RecentTrend = ({ items }) => {
  const { t } = useTranslation();
  return (
    <Wrapper>
      {items.length > 0 ? (
        <ul>
          {items.map((item) => (
            <RecentList key={item.tid} item={item} />
          ))}
        </ul>
      ) : (
        <div className="load">
          <LuLoader className="icon" />
          <br />
          {t('데이터_집계중입니다')}&nbsp;
        </div>
      )}
    </Wrapper>
  );
};

export default React.memo(RecentTrend);
