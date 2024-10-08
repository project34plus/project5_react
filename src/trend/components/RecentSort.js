import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: right;
  margin: 20px 0;
  padding-left: 15px;

  div {
    padding: 0 20px;
    border-right: 1px solid #ddd;
    cursor: pointer;

    &:first-child {
      border-left: 1px solid #ddd;
    }
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
