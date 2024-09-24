'use client';
import React, {
  useLayoutEffect,
  useEffect,
  useState,
  useCallback,
  useContext,
} from 'react';
import { List } from 'react-content-loader';
import { apiGet } from '../apis/apiInfo.js';
import { getList } from '../apis/apiComment.js';
import { getCommonActions } from '@/commons/contexts/CommonContext';
import { useTranslation } from 'react-i18next';
import UserInfoContext from '@/commons/contexts/UserInfoContext.js';
import { useRouter } from 'next/navigation'; //CSR ->router는 SSR
import View from '../components/View.js';

const MyListLoader = () => <List />;

const ThesisViewContainer = ({ params }) => {
  const { t } = useTranslation();
  const [item, setItem] = useState(null); //논문 데이터
  const [data, setData] = useState(null);
  const [commentForm, setCommentForm] = useState(null);
  const [comments, setComments] = useState(null);

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const router = useRouter();

  const { tid } = params;
  const { setMainTitle } = getCommonActions();

  const {
    states: { userInfo, isLogin },
  } = useContext(UserInfoContext);

  useLayoutEffect(() => {
    setMainTitle(t('논문_상세정보'));
  }, [setMainTitle, t]);

  useEffect(() => {
    (async () => {
      try {
        const item = await apiGet(tid);
        setMainTitle(item.title);
        setItem(item);
      } catch (err) {
        console.error(err);
        router.back();
      }

      try {
        const res = await getList(tid);
        setData(res);
        setComments(res.comments); // 댓글 목록
        console.log(res);

        /* 댓글 기본 양식 */
        setCommentForm({
          tid: tid,
          mode: 'write',
          username: userInfo?.userName,
        });
        window.scrollTo(0, 0);
      } catch (err) {
        console.error(err);
        setMessage(err.message);
      }
    })();
  }, [tid, router, userInfo, setMainTitle]);

  const onDelete = useCallback(
    (seq) => {
      if (!window.confirm(t('정말_삭제_하시겠습니까'))) {
        return;
      }

      (async () => {
        try {
          await deleteData(seq);
          router.push(`/thesis/comment/list/${seq}`);
        } catch (err) {
          console.error(err);
        }
      })();
    },
    [t, router],
  );

  const onChange = useCallback((e) => {
    setCommentForm((form) => ({ ...form, [e.target.name]: e.target.value }));
  }, []);

  //댓글 작성 처리
  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();

      const _errors = {};
      let hasErrors = false;

      /* 필수 항목 검증 S */
      const requiredFields = {
        content: t('댓글을_입력하세요'),
      };

      if (!isLogin) {
        // 로그인 페이지로 리다이렉트
        alert(t('로그인_후_댓글_작성이_가능합니다'));
        router.push(`/member/login?redirectUrl=${location.pathname}`);
        return;
      }

      for (const [field, message] of Object.entries(requiredFields)) {
        if (!commentForm[field]?.trim()) {
          _errors[field] = _errors[field] ?? [];
          _errors[field].push(message);
          hasErrors = true;
        }
      }
      /* 필수 항목 검증 E*/

      setErrors(_errors);

      if (hasErrors) {
        return;
      }

      // 댓글 등록 처리
      (async () => {
        try {
          const comments = await write(commentForm);
          console.log(comments);
          setData(
            produce((draft) => {
              draft.comments = comments;
            }),
          );
          setCommentForm({
            tid: data.tid,
            mode: 'write',
            username: userInfo?.userName,
          });
        } catch (err) {
          setErrors(err.message);
        }
      })();
    },
    [t, router, isLogin, data, commentForm, userInfo],
  );

  if (!item) {
    return <MyListLoader />;
  }



  return (
    <>
      <div>
        <View
          item={item}
          form={commentForm}
          onSubmit={onSubmit}
          onChange={onChange}
          onDelete={onDelete}
          errors={errors}
          data={comments}
        />
      </div>
    </>
  );
};

export default React.memo(ThesisViewContainer);
