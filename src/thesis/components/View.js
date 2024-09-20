import React from 'react';
import CommentForm from './CommentForm';
import CommentItems from './CommentItems';
import ItemDescription from './ItemDescription';

const View = ({ data, form, onChange, onSubmit, errors }) => {
    const { useComment } = board;
  
    return (
      <>
        <ItemDescription />
  
        {useComment && (
          <>
            {data.commentable && (
              <CommentForm
                form={form}
                onChange={onChange}
                onSubmit={onSubmit}
                errors={errors}
              />
            )}
            {data?.comments?.length > 0 && <CommentItems items={data.comments} />}
          </>
        )}
      </>
    );
  };

  export default React.memo(View);