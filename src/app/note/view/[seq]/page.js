'use client';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import ViewContainer from '@/Note/containers/ViewContainer';
import Container from '@/commons/components/Container';
import { FcViewDetails } from 'react-icons/fc';
import styled from 'styled-components';

const Icon = styled.span`
  position: relative;
  top: 5px;
  margin-right: 5px;
`;

const NoteViewPage = ({ params }) => {
  const [setPageTitle] = useState('');
  const { nid } = useParams();

  return (
    // <MemberOnlyContainer>
    <Container>
      <h1>
        <Icon>
          <FcViewDetails />
        </Icon>
        나의 연구노트
      </h1>
      <ViewContainer params={params} />
    </Container>
    // </MemberOnlyContainer>
  );
};

export default React.memo(NoteViewPage);
