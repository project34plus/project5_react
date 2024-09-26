'use client';
import React, { useEffect, useState, useCallback, useContext, useNavigate } from 'react';
import loadable from '@loadable/component';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

/* 스킨별 양식 가져오기 */
function getForm(skin) {
  return loadable(() => import(`../components/skins/${skin}/View`));
}

const ViewContainer = ({ params }) => {
  const Container = getForm(params.seq);
  const [note, setNote] = useState(null);
  const [data, setData] = useState(null);
  const [errors, setErrors] = useState({});
  const { t } = useTranslation();
  const navigate = useNavigate;

  const onChange = useCallback((e) => {
    setCommentForm((form) => ({ ...form, [e.target.name]: e.target.value }));
  }, []);


  const onDelete = useCallback(
    (seq) => {
      if (!window.confirm(t('정말_삭제_하시겠습니까'))) {
        return;
      }

      (async () => {
        try {
          await deleteData(seq);
          navigate(`/board/list/${board.bid}`);
        } catch (err) {
          console.error(err);
        }
      })();
    },
    [t, navigate, note],
  );


  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();

      const _errors = {};
      let hasErrors = false;


      setErrors(_errors);

      if (hasErrors) {
        return;
      }
    
    },
  );

  return (
    <>
      <Container 
      data={data}
      onDelete={onDelete}>
      onChange={onChange}
      onSubmit={onSubmit}
      errors={errors}
      </Container>
    </>
  );
};
export default React.memo(ViewContainer);
