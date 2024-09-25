'use client';
import ListContainer from '@/Note/containers/ListContainer';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
const NoteListPage = () => {
  const [setPageTitle] = useState('');
  const { nid } = useParams();

  return (
    <div>
      <h1>노트 목록</h1>
      <ListContainer/>
    </div>
  );
};
export default React.memo(NoteListPage);
