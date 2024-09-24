import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { color } from '@/theme/color';
import fontSize from '@/theme/fontSize';
import { format } from 'date-fns';

const { gray, darkgray, midgray } = color;
const { small, extraSmall } = fontSize;

const CommentItems = ({ comments }) => {
  const { t } = useTranslation();
  console.log('comments', comments);

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
    padding: 10px;
    font-size: ${small};

    p {
      margin: 0;
    }
  }

  .top {
    display: flex;
    gap: 10px;
    color: ${darkgray};
    margin-bottom: 7px;
  }

  .content {
    color: ${midgray};
  }
`;

export default React.memo(CommentItems);
