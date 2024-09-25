'use client';
import React, { useEffect, useState, useCallback, useContext } from 'react';
import loadable from '@loadable/component';
import { useTranslation } from 'react-i18next';
import { getCommonActions } from '@/commons/contexts/CommonContext';
import apiConfig from '../apis/apiConfig';
import UserInfoContext from '@/commons/contexts/UserInfoContext';
import { write } from '../apis/apiNote';

/* 스킨별 양식 가져오기 */
function getForm(skin) {
  return loadable(() => import(`../components/skins/${skin}/Form`));
}

const FormContainer = ({ params }) => {
  const { t } = useTranslation();
  const { nid, seq } = params;
  const {
    states: { isLogin, isAdmin, userInfo },
  } = useContext(UserInfoContext);

  const { setMainTitle } = getCommonActions();
  const [config, setConfig] = useState(null);
  const NoteContainer = getForm(params.nid);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    gid: '' + Date.now(),
    mode: 'write',
    attachFiles: [],
    editorImages: [],
    username: userInfo?.userName,
    content: '',
    email: userInfo?.email,
    subject:'',

  });

  const onSubmit = useCallback((e) => {
    e.preventDefault();
    console.log('Submitting form data:', form); // 추가
    write(params.nid, form)
      .then((res) => {
        alert('게시글 저장 성공');
      })
      .catch((err) => {
        console.log(err);
        alert('저장 실패');
      });
  }, []);
  const onChange = useCallback((e) => {
    setForm((form => ({ ...form, [e.target.name]: e.target.value })));
  });
  const onClick = (e, params, form) => {
    console.log('click!');
  };
  useEffect(() => {
    if (nid) {
      (async () => {
        try {
          const data = await apiConfig(nid);
          console.log(data);
        } catch (err) {
          console.error(err);
        }
      })();
    }
  }, [nid]);
  return (
    <>
      <NoteContainer
        note={config}
        form={form}
        errors={errors}
        onSubmit={onSubmit}
        onChange={onChange}
        onClick={onClick}
      />
    </>
  );
};

export default React.memo(FormContainer);
