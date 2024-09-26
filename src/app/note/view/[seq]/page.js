'use client';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import ViewContainer from '@/Note/containers/ViewContainer';
import Container from '@/commons/components/Container';
import MemberOnlyContainer from '@/member/containers/MemberOnlyContainer';

const NoteViewPage = ({ params }) => {
  const [setPageTitle] = useState('');
  const { nid } = useParams();

  return (
    // <MemberOnlyContainer>
    <Container>
      <h1>노트 상세</h1>
      <ViewContainer params={params} />
    </Container>
    // </MemberOnlyContainer>
  );
};

export default React.memo(NoteViewPage);
