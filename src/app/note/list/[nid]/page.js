'use client';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import ListContainer from '@/Note/containers/ListContainer';
import Container from '@/commons/components/Container';
import MemberOnlyContainer from '@/member/containers/MemberOnlyContainer';

const NoteListPage = () => {
  const [setPageTitle] = useState('');
  return (
    <MemberOnlyContainer>
      <Container>
        <ListContainer />
      </Container>
    </MemberOnlyContainer>
  );
};

export default React.memo(NoteListPage);
