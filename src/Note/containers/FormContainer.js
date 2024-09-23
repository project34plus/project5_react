import React, { useState, useEffect, useCallback, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import loadable from '@loadable/component';
import { produce } from 'immer';
import apiConfig from '../apis/apiConfig';
import Loading from '../../commons/components/Loading';
import { apiFileDelete } from '../../commons/libs/file/apiFile';
import UserInfoContext from '../../member/modules/UserInfoContext';
import { write, update, getInfo } from '../apis/apiNote';
import { useRouter } from 'next/navigation'; // Next.js router import

const DefaultForm = loadable(() => import('../components/skins/default/Form'));
const GalleryForm = loadable(() => import('../components/skins/gallery/Form'));

function skinRoute(skin) {
  switch (skin) {
    case 'gallery':
      return GalleryForm;
    default:
      return DefaultForm;
  }
}

const FormContainer = ({ setPageTitle, nid, seq }) => {
  const {
    states: { isLogin, isAdmin, userInfo },
  } = useContext(UserInfoContext);

  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    gid: '' + Date.now(),
    mode: 'write',
    attachFiles: [],
    editorImages: [],
  });

  const [errors, setErrors] = useState({});
  const { t } = useTranslation();
  const router = useRouter(); // useRouter 훅 사용

  useEffect(() => {
    if (!seq) {
      return;
    }

    (async () => {
      try {
        setLoading(true);
        const res = await getInfo(seq);
        console.log('Fetched note data:', res); // 여기에 추가
        res.mode = 'update';
        

        if (!res.editable) {
          router.push('/note/list'); // useRouter로 이동
          return;
        }
        setForm(res);
        setNote(res.note);
        setPageTitle(`${res.subject}`);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [seq, setPageTitle, router]);

  useEffect(() => {
    if (note || !nid) {
      return;
    }

    (async () => {
      try {
        setLoading(true);
        const data = await apiConfig(nid);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [nid, setPageTitle, note]);

  const onChange = useCallback(
    (e) => {
      setForm({ ...form, [e.target.name]: e.target.value });
    },
    [form],
  );

  const onToggleNotice = useCallback(() => {
    setForm(
      produce((draft) => {
        draft.notice = !draft.notice;
      }),
    );
  }, []);

  const fileUploadCallback = useCallback((files, editor) => {
    if (!files || files.length === 0) return;

    const imageUrls = [];
    const _editorImages = [];
    const _attachFiles = [];

    for (const file of files) {
      const { location, fileUrl } = file;

      if (location === 'editor') {
        imageUrls.push(fileUrl);
        _editorImages.push(file);
      } else {
        _attachFiles.push(file);
      }
    }

    if (imageUrls.length > 0) {
      editor.execute('insertImage', { source: imageUrls });
    }

    setForm(
      produce((draft) => {
        draft.attachFiles.push(..._attachFiles);
        draft.editorImages.push(..._editorImages);
      }),
    );
  }, []);

  const fileDeleteCallback = useCallback((seq) => {
    if (!window.confirm('정말 삭제하겠습니까?')) {
      return;
    }

    (async () => {
      try {
        await apiFileDelete(seq);

        setForm(
          produce((draft) => {
            draft.attachFiles = draft.attachFiles.filter((file) => file.seq !== seq);
            draft.editorImages = draft.editorImages.filter((file) => file.seq !== seq);
          }),
        );
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();

      const requiredFields = {
        subject: t('제목을_입력하세요'),
        content: t('내용을_입력하세요'),
      };

      const _errors = {};
      let hasErrors = false;
      for (const [field, message] of Object.entries(requiredFields)) {
        if (!form[field]?.trim()) {
          _errors[field] = _errors[field] ?? [];
          _errors[field].push(message);
          hasErrors = true;
        }
      }

      setErrors(_errors);
      if (hasErrors) {
        return;
      }

      (async () => {
        try {
          const { locationAfterWriting } = note;
          const res =
            form.mode === 'update' ? await update(seq, form) : await write(nid, form);

          const url =
            locationAfterWriting === 'list'
              ? `/note/list/${nid}`
              : `/note/view/${res.seq}`;
          router.push(url); // useRouter로 이동
        } catch (err) {
          setErrors(err.message);
        }
      })();
    },
    [t, form, note, router, seq, nid],
  );

  if (loading || !note) {
    return <Loading />;
  }

  const { skin } = note;
  const Form = skinRoute(skin);
  return (
    <Form
      note={note}
      form={form}
      onSubmit={onSubmit}
      onChange={onChange}
      onToggleNotice={onToggleNotice}
      errors={errors}
      fileUploadCallback={fileUploadCallback}
      fileDeleteCallback={fileDeleteCallback}
    />
  );
};

export default React.memo(FormContainer);