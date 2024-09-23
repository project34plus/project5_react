import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const CommentItems = (item) => {
  const { t } = useTranslation();
  console.log(data);

  return (
    <Wrapper>
      <h1>댓글 목록, 지울 예정</h1>
      {item.length > 0 ? (
        item.map(({ seq, createdAt, commenter, content }) => (
          <li key={seq}>
            <div className="commenter">{commenter}</div>
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
