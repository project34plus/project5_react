import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import fontSize from '@/theme/fontSize';
import { color } from '@/theme/color';

const { gray, midgray, white } = color;
const { small } = fontSize;

const ListSort = ({ search, onChange }) => {
  const { t } = useTranslation();

  const handleSortChange = (sortValue) => {
    onChange({ target: { name: 'sort', value: sortValue } });
  };

  return (
    <Wrapper>
      <p
        className={`sort-item ${
          search?.sort === 'viewCount_DESC' ? 'active' : ''
        }`}
        onClick={() => handleSortChange('viewCount_DESC')}
      >
        {t('인기순')}
      </p>
      <p
        className={`sort-item ${
          search?.sort === 'createdAt_DESC' ? 'active' : ''
        }`}
        onClick={() => handleSortChange('createdAt_DESC')}
      >
        {t('최신순')}
      </p>
      <p
        className={`sort-item ${
          search?.sort === 'createdAt_ASC' ? 'active' : ''
        }`}
        onClick={() => handleSortChange('createdAt_ASC')}
      >
        {t('오래된순')}
      </p>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  padding: 20px 0 0 10px;

  .sort-item {
    margin: 0 10px 0 0;
    padding: 10px ;
    cursor: pointer;
    border-radius: 5px;
    font-size: ${small};
    background: ${gray};
    transition: background 0.3s, color 0.3s;
  }

  .sort-item:hover {
    background: ${midgray};
    color: ${white};
  }

  .sort-item.active {
    background: ${midgray};
    color: ${white};
  }
`;

export default React.memo(ListSort);
