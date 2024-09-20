'use client';
import React, {
  useLayoutEffect,
  useEffect,
  useState,
  useCallback,
  useContext,
} from 'react';
import { List } from 'react-content-loader';
import { useParams } from 'next/navigation';
import { apiGet } from '../apis/apiInfo.js';
import ItemDescription from '../components/ItemDescription';
import { getCommonActions } from '@/commons/contexts/CommonContext';
import { useTranslation } from 'react-i18next';
import Container from '@/commons/components/Container.js';
import UserInfoContext from '@/commons/modules/UserInfoContext.js';
import errors from '@/langs/ko/errors.js';
import View from '../components/View.js';

const MyListLoader = () => <List />;

const ThesisViewContainer = () => {
  const { t } = useTranslation();
  const [item, setItem] = useState(null);
  const [commentForm, setCommentForm] = useState(null);

  const { seq } = useParams();

  const { setMainTitle } = getCommonActions();

  const {
    states: { userInfo, isLogin },
  } = useContext(UserInfoContext);

  useLayoutEffect(() => {
    setMainTitle(t('자료상세'));
  }, [setMainTitle, t]);

  useEffect(() => {
    apiGet(seq).then((item) => {
      setMainTitle(item.title);
      setItem(item);
      console.log('item', item); // 데이터 확인용
    });
  }, [seq, setMainTitle]);

  useEffect(() => {
    (async () => {
      try {
        const res = await getInfo(seq);
        setData(res);

        /* 댓글 기본 양식 */
        setCommentForm({
          tid: seq,
          mode: 'write',
          commenter: userInfo?.userName,
        });
        window.scrollTo(0, 0);
      } catch (err) {
        console.error(err);
        setMessage(err.message);
        setTimeout(function () {
          setMessage('');
          navigate(-1);
        }, 3000);
      }
    })();
  }, [seq, userInfo]);

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
            tid: data.seq,
            mode: 'write',
            commenter: userInfo?.userName,
          });
        } catch (err) {
          setErrors(err.message);
        }
      })();
    },
    [t, commentForm, userInfo],
  );

  if (!item) {
    return <MyListLoader />;
  }

  return (
    <Container>
      <div>
        <ItemDescription item={item} />
      </div>
    </Container>
  );
};

export default React.memo(ThesisViewContainer);
