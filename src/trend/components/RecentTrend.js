import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 800px;

  li {
    padding: 10px 0;
    border-bottom: 1px solid ${({ theme }) => theme.color.midgray};
  }
`;

const RecentList = ({ item, className }) => {
  const { title, poster, tid } = item;
  const url = `/thesis/view/${tid}`;
  return (
    <li key={tid} className={className}>
      <a href={url}>
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
