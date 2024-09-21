import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import UserInfoContext from '@/commons/contexts/UserInfoContext';
import MessageBox from '@/commons/components/MessageBox';
import styled from 'styled-components';

//댓글 작성
const FormBox = styled.form``;

const CommentForm = ({ form, onChange, onSubmit, errors }) => {
  const { t } = useTranslation();
  const { userInfo } = useContext(UserInfoContext); // 사용자 정보 가져오기

  return (
    <FormBox onSubmit={onSubmit} autoComplete="off">
      <div className="comment-form">
        <div className="field">
          <div className="commenter">{userInfo?.userName}</div>
          {/*로그인한 회원명 나와야 하는데 안나옴*/}
          <textarea
            name="content"
            placeholder={t('소중한_의견을_남겨주세요')}
            value={form?.content}
            onChange={onChange}
          ></textarea>
          {errors?.content && (
            <MessageBox color="danger" messages={errors.content} />
          )}
          <button type="submit">{t('작성하기')}</button>
        </div>
      </div>
    </FormBox>
  );
};

export default React.memo(CommentForm);
