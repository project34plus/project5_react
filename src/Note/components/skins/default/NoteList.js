import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const NoteList = ({ items }) => {
  const { t } = useTranslation();
  console.log(items);
  return (
    <Wrapper>
      {items?.length > 0 ? (
        items.map(({ noteSeq, subject, content }) => (
          <li key={noteSeq}>
            <a href={`/note/view/${seq}`}>
              <div className="subject">{subject}</div>
              <div className="content">{content}</div>
            </a>
          </li>
        ))
      ) : (
        <p>{t('작성한_노트가_없습니다')}</p> // 검색 결과 논문이 없을 때
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default React.memo(NoteList);
