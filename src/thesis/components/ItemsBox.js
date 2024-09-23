import React from 'react';
import styled from 'styled-components';
import { color } from '@/theme/color';
import { useTranslation } from 'react-i18next';
import fontSize from '@/theme/fontSize';

const { gray } = color;
const { small, normal } = fontSize;

const ItemsBox = ({ items, pagination }) => {
  const { t } = useTranslation();
  return (
    <Wrapper>
      {/* 총 검색 결과 표시 */}
      <div className="total">{`${t('총 검색 결과')}: ${
        pagination.total || 0
      }`}</div>
      {items?.length > 0 ? (
        items.map(({ tid, title, poster, publisher, _fields }) => (
          <li key={tid}>
            <a href={`/thesis/view/${tid}`}>
              <div className="title">{title}</div>
              <div className="poster">{poster}</div>
              <div className="publisher">{publisher}</div>
              <div className="fields">
                {Object.values(_fields)?.[0][0]} {/* 대분류만 렌더링 */}
              </div>
            </a>
          </li>
        ))
      ) : (
        <p>{t('검색결과가_없습니다')}</p> // 검색 결과 논문이 없을 때
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-top: 50px;
  li {
    border: 1px solid ${gray};
    padding: 10px 15px;
    margin-top: 5px;
  }
  .title {
    font-size: ${normal};
    margin: 5px 0;
  }
  .total {
    font-size: ${normal};
    border-top: 1px solid ${gray};
    border-bottom: 1px solid ${gray};
    padding: 15px 10px;
  }
  .poster,
  .publisher {
    margin: 5px 0;
  }

  .fields {
    background: ${gray};
    width: 80px;
    text-align: center;
    border-radius: 50px;
    padding: 3px 0;
    margin-top: 5px;
  }
`;

export default React.memo(ItemsBox);
