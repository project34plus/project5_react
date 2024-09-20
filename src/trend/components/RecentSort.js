import React from 'react';
import { useTranslation } from 'react-i18next';

const RecentSort = ({ search, onChange }) => {
  const { t } = useTranslation();

  const handleSortChange = (sortValue) => {
    onChange({ target: { name: 'sort', value: sortValue } });
  };

  return (
    <>
      <div
        className={`sort-item ${
          search?.sort === 'viewCount_DESC' ? 'active' : ''
        }`}
        onClick={() => handleSortChange('viewCount_DESC')}
      >
        {t('인기순')}
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
    </>
  );
};

export default React.memo(RecentSort);