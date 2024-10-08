import React from 'react';
import styled from 'styled-components';
import { color } from '@/theme/color';
import { useTranslation } from 'react-i18next';
import fontSize from '@/theme/fontSize';
import WishButton from '@/commons/components/WishButton';

const {
  gray,
  midgray,
  lemon,
  lightgray,
  lightGrayNavy,
  whiteGrayNavy,
  grayNavy,
  white,
} = color;
const { small, normal, center, medium } = fontSize;

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
                {_fields && Object.keys(_fields).length > 0
                  ? Object.values(_fields)[0][0]
                  : '미분류'}
                {/* _fields가 있을 경우 대분류 렌더링, 없으면 '대분류 없음' 출력, 사실 필드값은 필수 입력값임.. */}
                {/* {Object?.values(_fields)?.[0][0]}  */}
                {/* 대분류만 렌더링 */}
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
  margin-top: 10px;
  li {
    border: 1px solid ${gray};
    padding: 15px 30px;
    margin-top: 5px;
    position: relative;
  }

  .wishButton {
    position: absolute;
    right: 25px;
    top: calc(100% - 105px);
    z-index: 1000;
  }
  .title {
    font-size: ${medium};
    margin: 5px 0 10px;
    overflow: hidden; //글자 넘치는 부분 감추기
    text-overflow: ellipsis; //숨겨지는 영역 끝에 말줄임표 생성
    white-space: normal; //줄바꿈
    text-align: left; //텍스트 윈쪽 정렬
    word-wrap: break-word; //단어 단위로 줄바꿈
    display: -webkit-box; //영역을 box형태로 지정
    -webkit-line-clamp: 1; //해당 영역 내 텍스트 최대 라인수
    -webkit-box-orient: vertical; //박스 방향 설정(가로)
    width: 95%;
  }
  .total {
    font-size: ${normal};
    border-top: 1px solid ${midgray};
    border-bottom: 1px solid ${midgray};
    padding: 15px 20px;
    background: ${lightgray};
  }
  .poster,
  .publisher {
    margin: 5px 0;
    font-size: ${center};
    width: 95%;
  }

  .fields {
    background: ${lightGrayNavy};
    color: ${white};
    width: 110px;
    text-align: center;
    border-radius: 50px;
    padding: 5px 10px;
    font-size: ${small};
    margin-top: 10px;
  }
`;

export default React.memo(ItemsBox);
