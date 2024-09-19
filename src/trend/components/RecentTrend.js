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
  const url = `/thesis/info/${tid}`;
  return (
    <li className={className}>
      <div className="title">{title}</div>
      <div className="poster">{poster}</div>
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
        <div>{t('최신_논문_업로드_중입니다')}</div>
      )}
    </Wrapper>
  );
};

export default React.memo(RecentTrend);
