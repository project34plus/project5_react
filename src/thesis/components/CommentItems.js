import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import UserInfoContext, {
  getUserStates,
} from '@/commons/contexts/UserInfoContext';
import styled from 'styled-components';
import { color } from '@/theme/color';
import fontSize from '@/theme/fontSize';
import { format } from 'date-fns';

const { gray, darkgray, midgray, black, white } = color;
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
            <div className="fBody">
              <div className="top">
                <p className="commenter">{username}</p>
                <p className="date">
                  {format(new Date(createdAt), 'yy.MM.dd')}
                </p>
              </div>
              <div className="content">{content}</div>
            </div>
            {username === userInfo?.userName && ( // 현재 로그인한 회원과 작성자 비교
              <button
                type="button"
                className="delete-btn"
                onClick={() => onDelete(seq)}
              >
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
  border-top: 1px solid ${black};

  li {
    border-top: 1px solid ${gray};
    border-bottom: 1px solid ${gray};
    padding: 15px 10px;
    font-size: ${small};
    display: flex;
    align-items: center;

    p {
      margin: 0;
    }
  }

  .fBody {
    width: 90%;
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
     overflow-wrap: break-word; /* 텍스트 줄 개행 */
  }

  .delete-btn {
    width: 100px;
    height: 40px;
    margin-left: 20px;
    background: ${darkgray};
    color: ${white};
    border-radius: 5px;
    // border-color: ${midgray};
  }
`;

export default React.memo(CommentItems);
