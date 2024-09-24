'use client';
import React, {
  useLayoutEffect,
  useEffect,
  useState,
  useCallback,
  useContext,
} from 'react';
import { List } from 'react-content-loader';
import { apiGet, apiFileGet } from '../apis/apiInfo.js';
import { getInfo, getList, write } from '../apis/apiComment.js';
import { getCommonActions } from '@/commons/contexts/CommonContext';
import { useTranslation } from 'react-i18next';
import UserInfoContext, { getUserContext, getUserStates } from '@/commons/contexts/UserInfoContext.js';
import { useRouter } from 'next/navigation'; //CSR ->router는 SSR
import View from '../components/View.js';

const MyListLoader = () => <List />;

const ThesisViewContainer = ({ params }) => {
  const { t } = useTranslation();
  const [item, setItem] = useState(null); //논문 데이터

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const router = useRouter();

  const { tid } = params;
  const { setMainTitle } = getCommonActions();

  const { userInfo, isLogin } = getUserStates();

  const [commentForm, setCommentForm] = useState({
    tid: tid,
    mode: 'write',
    userName: '',
    content: '',
  });
  const [comments, setComments] = useState([]);
  useLayoutEffect(() => {
    setMainTitle(t('논문_상세정보'));
  }, [setMainTitle, t]);
  useEffect(() => {
    if (userInfo) {  // userInfo가 존재할 때만 업데이트
      setCommentForm((prevForm) => ({
        ...prevForm,
        userName: userInfo.userName, // userInfo가 로딩되면 userName을 설정
      }));
    }
  }, [userInfo]);

  useEffect(() => {

    ( async () => {
      try {
        const item = await apiGet(tid);
        setMainTitle(item.title);
        setItem(item);

        // if (item.gid) {
        //   const fileData = await apiFileGet(item.gid);
        // }
      } catch (err) {
        console.error('논문 정보 불러오기 실패:', err);
        // 필요에 따라 적절한 에러 처리 로직 추가
        return; // 실패 시 함수 종료
      }

      try {
        const res = await getList(tid);
        console.log(res);
        setComments(res); // 댓글 목록

      } catch (err) {
        console.error(err);
        setMessage(err.message);
        console.error('댓글 목록 불러오기 실패:', err);
        // 필요에 따라 적절한 에러 처리 로직 추가
      } finally {
        window.scrollTo(0, 0); // 페이지 상단으로 스크롤
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

  //댓글 작성 처리
  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      console.log(commentForm);
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
          console.log('commentForm : ', commentForm);
          _errors[field] = _errors[field] ?? [];
          _errors[field].push(message);
          hasErrors = true;
        }
      }
      /* 필수 항목 검증 E*/

      setErrors(_errors);

      if (hasErrors) {
        console.log(_errors);
        return;
      }

      // 댓글 등록 처리
      (async () => {
        try {
          await write(commentForm).then((res) => {
            console.log(res);
          });
          setCommentForm({
            // tid: tid,
            // mode: 'write',
            // username: userInfo?.userName,
            ...commentForm,
            content: '',
          });
          router.refresh();
        } catch (err) {
          setErrors(err.message);
        }
      })();
    },
    [t, router, isLogin, item, commentForm, userInfo],
  );
  
  const onChange = useCallback((e) => {
    setCommentForm((form) => ({ ...form, [e.target.name]: e.target.value }));
  }, []);
  if (!item) {
    return <MyListLoader />;
  }

  return (
    <>
      <div>
        <View
          item={item}
          comments={comments}
          form={commentForm}
          onSubmit={onSubmit}
          onChange={onChange}
          onDelete={onDelete}
          errors={errors}

        />
      </div>
    </>
  );
};

export default React.memo(ThesisViewContainer);
