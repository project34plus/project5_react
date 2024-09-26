import React, { useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { MidButton } from '@/commons/components/buttons/BlueButtons';
import Link from 'next/link';

const Wrapper = styled.div`
  font-size: ${({ theme }) => theme.fontSize.normal};

  .subject {
    font-size: ${({ theme }) => theme.fontSize.center};
    font-weight: bold;
    text-align: left;
    padding: 18px 30px;
    background: ${({ theme }) => theme.color.lightgray};
    border: 2px solid ${({ theme }) => theme.color.lightgray};
    border-top: 3px solid ${({ theme }) => theme.color.lightgray};
    border-radius: 5px 5px 0 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 3px 4px 0 rgba(0, 0, 0, 0.6);
  }

  .content {
    border: 2px solid ${({ theme }) => theme.color.lightgray};
    padding: 0 20px 20px 30px;
    box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.6);
  }

  .button {
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
  }
`;

const NoteItem = ({ item }) => {
  const { t } = useTranslation();
  const { subject, content } = item;

  return (
    <Wrapper>
      <div className="subject">{subject}</div>
      <div className="content" dangerouslySetInnerHTML={{ __html: content }} />
      <div className="button">
        <Link href="/note/list/1" passHref>
          <MidButton type="button" width="200px">
            {t('목록으로')}
          </MidButton>
        </Link>
      </div>
    </Wrapper>
  );
};

export default React.memo(NoteItem);
