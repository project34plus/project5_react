import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

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
        <div>...Loading...</div>
      )}
    </Wrapper>
  );
};

export default React.memo(RecentTrend);
