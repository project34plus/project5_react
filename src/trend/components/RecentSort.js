import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: left;
  margin: 20px 0;

  div {
    padding: 0 20px;
    border-right: 1px solid #ddd;
    cursor: pointer;
  }
`;

const RecentSort = ({ search, onChange }) => {
  const { t } = useTranslation();

  const handleSortChange = (sortValue) => {
    onChange({ target: { name: 'sort', value: sortValue } });
  };

  return (
    <>
      <Wrapper>
        <div
          className={`sort-item ${
            search?.sort === 'viewCount_DESC' ? 'active' : ''
          }`}
          onClick={() => handleSortChange('viewCount_DESC')}
        >
          {t('조회순')}
        </div>
        <div
          className={`sort-item ${
            search?.sort === 'createdAt_DESC' ? 'active' : ''
          }`}
          onClick={() => handleSortChange('createdAt_DESC')}
        >
          {t('최신순')}
        </div>
        <div
          className={`sort-item ${
            search?.sort === 'createdAt_ASC' ? 'active' : ''
          }`}
          onClick={() => handleSortChange('createdAt_ASC')}
        >
          {t('오래된순')}
        </div>
      </Wrapper>
    </>
  );
};

export default React.memo(RecentSort);
