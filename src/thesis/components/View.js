import React from 'react';
import CommentForm from './CommentForm';
import CommentItems from './CommentItems';
import ItemDescription from './ItemDescription';

const View = ({ item, form, onChange, onSubmit, errors, comments }) => {
  return (
    <>
      <ItemDescription item={item} />
      <CommentForm
        form={form}
        onChange={onChange}
        onSubmit={onSubmit}
        errors={errors}
      />
      <CommentItems comments={comments} />
    </>
  );
};

export default React.memo(View);
