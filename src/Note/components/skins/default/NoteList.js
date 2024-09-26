import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { color } from '@/theme/color';
import fontSize from '@/theme/fontSize';
import { format } from 'date-fns';
import { MidButton } from '@/commons/components/buttons/BlueButtons';

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
const { small, normal, center, big } = fontSize;

const NoteList = ({ items }) => {
  const { t } = useTranslation();
  console.log(items);
  return (
    <Wrapper>
      <h1>노트 목록</h1>
      <div className="noteHead">
        <MidButton href="note/write/1">{t('작성하기')}</MidButton>
      </div>
      {items?.length > 0 ? (
        items.map(({ noteSeq, subject, content, createdAt }) => (
          <li key={noteSeq}>
            <a href={`/note/view/${noteSeq}`}>
              <div className="top">
                <div className="subject">{subject}</div>
                <div className="date">
                  {format(new Date(createdAt), 'yy.MM.dd')}
                </div>
              </div>
              <div
                className="content"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            </a>
          </li>
        ))
      ) : (
        <p>{t('작성한_노트가_없습니다')}</p> // 검색 결과 논문이 없을 때
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-top: 10px;
  h1 {
    font-size: ${big};
  }

  .noteHead {
    display: flex;
    justify-content: right;
  }
  li {
    border: 1px solid ${gray};
    padding: 15px 30px;
    margin-top: 5px;
    position: relative;
    p {
      margin: 10px 0;
    }
    .top {
      display: flex;
      gap: 20px;
      align-items: center;
      .subject {
        font-size: ${center};
        font-weight: bold;
      }
    }
    .date {
      color: ${midgray};
    }

    .content {
      font-size: ${normal};
    }
  }
`;

export default React.memo(NoteList);
