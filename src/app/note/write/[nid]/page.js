'use client'; // 클라이언트 컴포넌트로 설정
import React from 'react';
import FormContainer from '../../../../Note/containers/FormContainer';
import { useParams } from 'next/navigation'; // useParams를 사용

const NoteWritePage = () => {
  const { nid, seq } = useParams(); // useParams를 사용하여 nid와 seq 가져오기

  return (
    <div>
      <h1>노트 작성</h1>
      <FormContainer nid={nid} seq={seq} />
    </div>
  );
};

export default React.memo(NoteWritePage);