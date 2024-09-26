'use client';
import React, { useEffect, useState, useCallback, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { getCommonActions } from '@/commons/contexts/CommonContext';
import UserInfoContext from '@/commons/contexts/UserInfoContext';
import Container from '@/commons/components/Container';
import Form from '../components/skins/default/Form';
import { getNote, getInfo, write, update } from '../apis/apiConfig';

/* 스킨별 양식 가져오기 */
function getSkin(skin) {
  return Form;
}

const FormContainer = ({ params }) => {
  const { t } = useTranslation();
  const nid = params?.nid;
  const noteSeq = params?.noteSeq;
  const {
    states: { isLogin, isAdmin, userInfo },
  } = useContext(UserInfoContext);
  const { setMainTitle } = getCommonActions();
  //const NoteContainer = getForm(params.nid);
  const [errors, setErrors] = useState({});
  const [note, setNote] = useState(null);
  const [form, setForm] = useState({
    nid,
    gid: Date.now() + '',
    mode: nid ? 'write' : 'update',
    poster: userInfo?.userName,
    //email: userInfo?.email,
    attachFiles: [],
    editorImages: [],
    subject: '',
    content: '',
  });
  const router = useRouter();

  useEffect(() => {
    console.log('params.nid:', nid); // params.nid 값이 올바르게 들어오는지 확인
    //console.log('form', form);
  }, [nid]);

  useEffect(() => {
    if (noteSeq) {
      // 글 수정 - 게시글 정보
      (async () => {
        try {
          const data = await getInfo(noteSeq);
          if (data) {
            setForm((form) => ({ ...form, ...data, mode: 'update' }));
            setNote(data.note);
            setMainTitle(data.subject);
          }
        } catch (err) {
          console.error(err);
        }
      })();
    }

    if (nid) {
      // 게시글 작성
      (async () => {
        try {
          const note = await getNote(nid);
          if (note) {
            setNote(note);
            setMainTitle(`${note.nName} ${t('글쓰기')}`);
          }
        } catch (err) {
          console.error(err);
        }
      })();
    }
  }, [nid, setMainTitle, t, noteSeq, form.nid]);

  const onChange = useCallback((e) => {
    setForm((form) => ({ ...form, [e.target.name]: e.target.value }));
  }, []);

  const onClick = useCallback((name, value) => {
    setForm((form) => ({ ...form, [name]: value }));
  }, []);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();

      /* 유효성 검사 S */
      const _errors = {};
      let hasErrors = false;
      const requiredFields = {
        subject: t('제목을_입력하세요.'),
        poster: t('작성자를_입력하세요.'),
        content: t('내용을_입력하세요.'),
      };

      for (const [field, message] of Object.entries(requiredFields)) {
        if (!form[field] || !form[field].trim()) {
          _errors[field] = _errors[field] ?? [];
          _errors[field].push(message);
          hasErrors = true;
        }
      }
      /* 유효성 검사 E */
      setErrors(_errors);
      if (hasErrors) {
        return;
      }

      // 등록 또는 수정 처리
      (async () => {
        try {
          const noteData =
            form?.mode === 'update' ? await update(form) : await write(form);

          const redirectUrl =
            note?.locationAfterWriting === 'view'
              ? `/note/info/${noteData.noteSeq}`
              : `/note/list/1`;

          router.replace(redirectUrl);
        } catch (err) {
          const message = err.message;

          setErrors(
            typeof message === 'string' ? { global: [message] } : message,
          );

          console.error(err);
        }
      })();
    },
    [t, form, router, note],
  );

  return (
    <Container>
      <Form
        note={note}
        form={form}
        errors={errors}
        onChange={onChange}
        onClick={onClick}
        onSubmit={onSubmit}
      />
    </Container>
  );
};

export default React.memo(FormContainer);
