import FormContainer from '@/Note/containers/FormContainer';
import React from 'react';
import MemberOnlyContainer from '@/member/containers/MemberOnlyContainer';
import Container from '@/commons/components/Container';

const NoteWritePage = ({ params }) => {
  console.log('params', params);
  return (
    <Container>
      <MemberOnlyContainer>
      <FormContainer params={params}/>
      </MemberOnlyContainer>
      </Container>
   
)};

export default React.memo(NoteWritePage);
