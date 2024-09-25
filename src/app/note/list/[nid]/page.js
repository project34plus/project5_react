import ListContainer from '@/Note/containers/ListContainer';
import React from 'react';


const NoteListPage = ({ searchParams, params }) => {
 

  return (
    <div>
      <h1>노트 목록</h1>
      <ListContainer searchParams={searchParams} params={params} />
    </div>
  );
};
export default React.memo(NoteListPage);
