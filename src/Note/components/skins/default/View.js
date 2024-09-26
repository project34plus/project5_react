import React from 'react';
import ViewContent from './ViewContent';

const View = ({ note, data, onDelete }) => {
  return (
    <>
      <ViewContent data={data} onDelete={onDelete} />
    </>
  );
};

export default React.memo(View);