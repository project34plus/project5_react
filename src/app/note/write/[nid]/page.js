import FormContainer from '@/Note/containers/FormContainer';
import React from 'react';
import MemberOnlyContainer from '@/member/containers/MemberOnlyContainer';
const NoteWritePage = ({ params }) => {
  console.log('params', params);
  return (
    <MemberOnlyContainer>
      <h1>노트 작성</h1>
      <FormContainer params={params} />
    </MemberOnlyContainer>
  );
};

export default React.memo(NoteWritePage);
