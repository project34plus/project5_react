import React, { useState, useEffect, useCallback, useContext } from 'react';
import { useParams, useNavigate} from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import loadable from '@loadable/component';
import { produce } from 'immer';
import apiConfig from '../apis/apiConfig';
import Loading from '../../commons/components/Loading';
import { apiFileDelete } from '../../commons/libs/file/apiFile';
import UserInfoContext from '../../member/modules/UserInfoContext';
import { write, update, getInfo } from '../apis/apiBoard';
import WriteHeader from '../../commons/components/WriteHeader';

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

const FormContainer = ({ setPageTitle }) => {
  const { nid, seq } = useParams();

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

  const navigate = useNavigate();

  /**
   * 게시글 번호 seq로 유입되면 수정
   *
   */
  useEffect(() => {
    if (!seq) {
      return;
    }

    (async () => {
      try {
        setLoading(true);

        const res = await getInfo(seq);
        res.mode = 'update';
        delete res.guestPw;

        if (!res.editable) {
          navigate(-1);
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
  }, [seq, setPageTitle, navigate]);

  useEffect(() => {
    if (note || !nid) {
      return;
    }

    (async () => {
      try {
        setLoading(true);

        const data = await apiConfig(bid);
        setBoard(data); // 게시판 설정 조회

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

  /* 파일 업로드 후속 처리 */
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

    // 에디터에 이미지 추가
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

  /* 파일 삭제 처리 */
  const fileDeleteCallback = useCallback((seq) => {
    if (!window.confirm('정말 삭제하겠습니까?')) {
      return;
    }

    (async () => {
      try {
        await apiFileDelete(seq);

        setForm(
          produce((draft) => {
            draft.attachFiles = draft.attachFiles.filter(
              (file) => file.seq !== seq,
            );

            draft.editorImages = draft.editorImages.filter(
              (file) => file.seq !== seq,
            );
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

      /* 유효성 검사 - 필수 항목 검증 S */
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
      /* 유효성 검사 - 필수 항목 검증 E */

      // 검증 실패시에는 처리 X
      setErrors(_errors);
      if (hasErrors) {
        return;
      }

      /* 데이터 저장 처리 S */
      (async () => {
        try {
          const { locationAfterWriting, nid } = note;
          const res =
            form.mode === 'update'
              ? await update(seq, form)
              : await write(nid, form);

          const url =
            locationAfterWriting === 'list'
              ? `/note/list/${nid}`
              : `/note/view/${res.seq}`;
          navigate(url, { replace: true });
        } catch (err) {
          setErrors(err.message);
        }
      })();

      /* 데이터 저장 처리 E */
    },
    [t, form, isAdmin, isLogin, note, navigate, seq],
  );

  if (loading || !note) {
    return <Loading />;
  }

  const { skin } = note;
  const Form = skinRoute(skin);
  return (
    <>
    < WriteHeader></ WriteHeader>
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
    </>
  );
  /*
  return skinRoute(skin, {
    board,
    form,
    onSubmit,
    onChange,
    onToggleNotice,
    errors,
    fileUploadCallback,
    fileDeleteCallback,
  });
  */
};

export default React.memo(FormContainer);