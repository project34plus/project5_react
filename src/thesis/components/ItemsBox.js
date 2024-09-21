import React from 'react';
import styled from 'styled-components';
import { color } from '@/theme/color';
import { useTranslation } from 'react-i18next';

const { gray } = color;

const ItemsBox = ({ items }) => {
  const {t} = useTranslation();
  return (
    <Wrapper>
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
        <p>{t('검색결과가_없습니다')}</p>  // 검색 결과 논문이 없을 때
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  li {
    border: 1px solid ${gray};
  }
`;

export default ItemsBox;
