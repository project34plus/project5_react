import React from 'react';
import ViewContainer from '@/Note/containers/ViewContainer';
import MemberOnlyContainer from '@/member/containers/MemberOnlyContainer';

const NoteViewPage = ({ params }) => {
  return <ViewContainer params={params} />;
};

export default React.memo(NoteViewPage);
