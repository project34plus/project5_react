import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const CommentItems = ({ comments }) => {
  const { t } = useTranslation();

  return (
    <Wrapper>
      {comments.length > 0 ? (
        comments.map(({ seq, createdAt, commenter, content }) => (
          <li key={seq}>
            <div className="commenter">{username}</div>
            <div className="content">{content}</div>
            <div className="createdAt">{createdAt}</div>
          </li>
        ))
      ) : (
        <p>{t('댓글이_없습니다')}</p>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default React.memo(CommentItems);
