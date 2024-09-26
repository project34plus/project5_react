import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { color } from '@/theme/color';
import fontSize from '@/theme/fontSize';

const Wrapper = styled.div``;

const NoteItem = ({ item }) => {
  const { t } = useTranslation();
  const { subject, content } = item;

  return (
    <Wrapper>
      <div className="subject">{subject}</div>
      <div className="content">{content}</div>
    </Wrapper>
  );
};

export default React.memo(NoteItem);
