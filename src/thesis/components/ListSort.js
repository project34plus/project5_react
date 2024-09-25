import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import fontSize from '@/theme/fontSize';
import { color } from '@/theme/color';

const { lemon, midgray, white, navy, lightgray, darkgray, yellow } = color;
const { small, center } = fontSize;

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
    margin: 0 5px 0 0;
    padding: 10px 15px;
    cursor: pointer;
    border-radius: 15px;
    font-size: ${center};
    // background: ${navy};
    color: ${navy};
    transition: background 0.3s, color 0.3s;
  }

  .sort-item:hover {
    // background: ${midgray};
    color: ${yellow};
  }

  .sort-item.active {
    background: ${lemon};
    color: ${darkgray};
  }
`;

export default React.memo(ListSort);
