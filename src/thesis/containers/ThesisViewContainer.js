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
import { getInfo } from '../apis/apiComment.js';
import { getCommonActions } from '@/commons/contexts/CommonContext';
import { useTranslation } from 'react-i18next';
import Container from '@/commons/components/Container.js';
import UserInfoContext from '@/commons/contexts/UserInfoContext.js';
import { useRouter } from 'next/navigation'; //CSR ->router는 SSR
import View from '../components/View.js';

const MyListLoader = () => <List />;

const ThesisViewContainer = ({ params }) => {
  const { t } = useTranslation();
  const [item, setItem] = useState(null);
  const [commentForm, setCommentForm] = useState(null);

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const router = useRouter();

  const { tid } = params;
  console.log(tid);
  const { setMainTitle } = getCommonActions();

  const {
    states: { userInfo, isLogin },
  } = useContext(UserInfoContext);

  useLayoutEffect(() => {
    setMainTitle(t('자료상세'));
  }, [setMainTitle, t]);

  useEffect(() => {
    (async () => {
      try {
        const item = await apiGet(tid);
        setMainTitle(item.title);
        setItem(item);
      } catch (err) {
        console.error(err);
        //router.back();
      }

      try {
        const res = await getInfo(tid);

        /* 댓글 기본 양식 */
        setCommentForm({
          tid: tid,
          mode: 'write',
          commenter: userInfo?.userName,
        });
        window.scrollTo(0, 0);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [tid, router, userInfo, setMainTitle]);

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
        // 로그인 상태가 아닌 경우
        router.replace(`/member/login?redirectUrl=${location.pathname}`);
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
          const comments = await writeComment(commentForm);
          setData(
            produce((draft) => {
              draft.comments = comments;
            }),
          );
          setCommentForm({
            tid: item.tid,
            mode: 'write',
            commenter: userInfo?.userName,
          });
        } catch (err) {
          setErrors(err.message);
        }
      })();
    },
    [t, router, isLogin, item, commentForm, userInfo],
  );

  if (!item) {
    return <MyListLoader />;
  }

  return (
    <Container>
      <div>
        <View
          item={item}
          form={commentForm}
          onSubmit={onSubmit}
          errors={errors}
        />
      </div>
    </Container>
  );
};

export default React.memo(ThesisViewContainer);
