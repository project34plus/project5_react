import React from 'react';
import CommentForm from './CommentForm';
import CommentItems from './CommentItems';
import ItemDescription from './ItemDescription';

const View = ({ item, form, onChange, onSubmit, errors, data }) => {
  return (
    <>
      <ItemDescription item={item} />

      <CommentForm
        form={form}
        onChange={onChange}
        onSubmit={onSubmit}
        errors={errors}
      />

      {data?.comments?.length > 0 && <CommentItems datas={data.comments} />}
    </>
  );
};

export default React.memo(View);
