import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import UserInfoContext, {
  getUserStates,
} from '@/commons/contexts/UserInfoContext';
import styled from 'styled-components';
import { color } from '@/theme/color';
import fontSize from '@/theme/fontSize';
import { format } from 'date-fns';

const { gray, darkgray, midgray } = color;
const { small, extraSmall } = fontSize;

const CommentItems = ({ comments, onDelete }) => {
  const { t } = useTranslation();
  const { userInfo } = getUserStates(); // 사용자 정보 가져오기
  
  console.log('comments: ', comments);
  console.log('user: ', userInfo);

  return (
    <Wrapper>
      {comments.length > 0 ? (
        comments.map(({ seq, createdAt, username, content }) => (
          <li key={seq}>
            <div className="top">
              <p className="commenter">{username}</p>
              <p className="date">{format(new Date(createdAt), 'yy.MM.dd')}</p>
            </div>
            <p className="content">{content}</p>
            {username === userInfo?.userName && ( // 현재 로그인한 회원과 작성자 비교
              <button type="button" onClick={() => onDelete(seq)}>
                {t('삭제하기')}
              </button>
            )}
          </li>
        ))
      ) : (
        <p>{t('아직_댓글이_없습니다')}</p>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  border-top: 1px solid black;

  li {
    border-top: 1px solid ${gray};
    border-bottos: 1px solid ${gray};
    padding: 15px 10px;
    font-size: ${small};

    p {
      margin: 0;
    }
  }

  .top {
    display: flex;
    gap: 15px;
    color: ${darkgray};
    margin-bottom: 10px;
    text-align: center;
  }

  .date {
    color: ${midgray};
    font-size: ${extraSmall};
  }

  .content {
    color: ${darkgray};
  }
`;

export default React.memo(CommentItems);
