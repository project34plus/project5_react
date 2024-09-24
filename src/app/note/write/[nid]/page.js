import FormContainer from '@/Note/containers/FormContainer';
import React from 'react';

const NoteWritePage = ({ params }) => {
  console.log('params', params);
  return (
    <>
      <h1>노트 작성</h1>
      <FormContainer params={params}/>
    </>
  );
};

export default React.memo(NoteWritePage);
