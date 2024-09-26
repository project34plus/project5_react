import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { color } from '@/theme/color';
import fontSize from '@/theme/fontSize';
import { format } from 'date-fns';
import { MidButton } from '@/commons/components/buttons/BlueButtons';
import { PiNotebookBold } from 'react-icons/pi';
import Link from 'next/link';

const {
  gray,
  midgray,
  lemon,
  lightgray,
  lightGrayNavy,
  whiteGrayNavy,
  grayNavy,
  white,
  navy,
} = color;
const { small, normal, center, big } = fontSize;

const NoteList = ({ items }) => {
  const { t } = useTranslation();
  console.log(items);
  return (
    <Wrapper>
      <h1>
        <PiNotebookBold className="icon" />
        노트 목록
      </h1>

      <div className="noteHead">
        <Link href="/note/write/1">
          <MidButton>{t('작성하기')}</MidButton>
        </Link>
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
              {/* <div
                className="content"
                dangerouslySetInnerHTML={{ __html: content }}
              /> */}
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
    .icon {
      color: ${navy};
      padding-top: 8px;
      padding-right: 3px;
    }
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
        overflow: hidden; //글자 넘치는 부분 감추기
        text-overflow: ellipsis; //숨겨지는 영역 끝에 말줄임표 생성
        white-space: normal; //줄바꿈
        text-align: left; //텍스트 윈쪽 정렬
        word-wrap: break-word; //단어 단위로 줄바꿈
        display: -webkit-box; //영역을 box형태로 지정
        -webkit-line-clamp: 2; //해당 영역 내 텍스트 최대 라인수
        -webkit-box-orient: vertical; //박스 방향 설정(가로)
      }
    }
    .date {
      color: ${midgray};
    }

    // .content {
    //   font-size: ${normal};
    //   overflow: hidden; //글자 넘치는 부분 감추기
    //   text-overflow: ellipsis; //숨겨지는 영역 끝에 말줄임표 생성
    //   white-space: normal; //줄바꿈
    //   text-align: left; //텍스트 윈쪽 정렬
    //   word-wrap: break-word; //단어 단위로 줄바꿈
    //   display: -webkit-box; //영역을 box형태로 지정
    //   -webkit-line-clamp: 2; //해당 영역 내 텍스트 최대 라인수
    //   -webkit-box-orient: vertical; //박스 방향 설정(가로)
    // }
  }
`;

export default React.memo(NoteList);
