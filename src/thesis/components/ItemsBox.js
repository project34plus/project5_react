import React from 'react';
import styled from 'styled-components';
import { color } from '@/theme/color';
import { useTranslation } from 'react-i18next';
import fontSize from '@/theme/fontSize';
import WishButton from '@/commons/components/WishButton';

const { gray, midgray } = color;
const { small, normal, center } = fontSize;

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
            <div className="wishButton">
              <WishButton tid={tid}></WishButton>
            </div>
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
    padding: 15px 30px;
    margin-top: 5px;
    position: relative;
  }

  .wishButton {
    position: absolute;
    right: 25px;
    top: calc(100% - 95px);
    z-index: 1000;
  }
  .title {
    font-size: ${center};
    margin: 5px 0 10px;
  }
  .total {
    font-size: ${normal};
    border-top: 1px solid ${midgray};
    border-bottom: 1px solid ${midgray};
    padding: 15px 10px;
    background: ${gray};
  }
  .poster,
  .publisher {
    margin: 5px 0;
    font-size: ${small};
  }

  .fields {
    background: ${gray};
    width: 90px;
    text-align: center;
    border-radius: 50px;
    padding: 5px 10px;
    font-size: ${small};
    margin-top: 10px;
  }
`;

export default React.memo(ItemsBox);
