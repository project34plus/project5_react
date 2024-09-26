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
    nid: params.nid,
    mode: 'write',
    attachFiles: [],
    editorImages: [],
    username: userInfo?.userName,
    content: '',
    email: userInfo?.email,
    subject: '',
  });

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      console.log('Submitting form data:', form); // 추가
      const _errors = {};
      let hasErrors = false;

      const requiredFields = {
        subject: t('제목을_입력하세요'),
        content: t('내용을_입력하세요'),
      };

      for (const [field, message] of Object.entries(requiredFields)) {
        if (!form[field] || !form[field].trim()) {
          _errors[field] = _errors[field] ?? [];
          _errors[field].push(message);
          hasErrors = true;
        }
      }
      console.log('form 입력, 에러', _errors);
      setErrors(_errors);
      if (hasErrors) {
        return;
      }
      try {
        const res = await write(params.nid, form);
        const newForm = { ...form, ...res };
        setForm(newForm);
        alert('게시글 저장 성공');
      } catch (err) {
        console.log(err);
        alert('저장 실패');
        const messages = err.message.global
          ? err.message.global
          : { global: [err.message] };
        setErrors(messages);
      }
    },
    [params.nid, t, form],
  );

  const onChange = useCallback((e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log(name, value);
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  }, []);

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
