import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const CommentItems = (data) => {
  const { t } = useTranslation();
  console.log('data', data);

  return (
    <Wrapper>
      <h1>댓글 목록, 지울 예정</h1>
      {data.length > 0 ? (
        data.map(({ seq, createdAt, username, content }) => (
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
