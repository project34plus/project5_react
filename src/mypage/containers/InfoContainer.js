'use client';
import React, { useContext, useCallback, useState } from 'react';
import ProfileForm from '../components/ProfileForm';
import Container from '@/commons/components/Container';
import UserInfoContext from '@/commons/contexts/UserInfoContext';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';
import { apiUpdate } from '../apis/apiMyPage';
import { apiPatch } from '../apis/apiMyPage';

const InfoContainer = () => {
  const {
    states: { isLogin, userInfo, isAdmin },
    actions: { setIsLogin, setIsAdmin, setUserInfo },
  } = useContext(UserInfoContext);

  const initialForm = userInfo;
  delete initialForm.password;
  delete initialForm.confirmPassword;
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  const { t } = useTranslation();
  const router = useRouter();

  const _onChange = useCallback((e) => {
    setForm((form) => ({
      ...form,
      [e.target.name]: e.target.value,
    }));
  }, []);

  const onLogout = useCallback(() => {
    setIsLogin(false);
    setIsAdmin(false);
    setUserInfo(null);
    cookies.remove('token', { path: '/' });
  }, [setIsLogin, setIsAdmin, setUserInfo]);

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const _errors = {};
      let hasErrors = false;

      const requiredFields = {
        userName: t('회원명을_입력하세요'),
      };
      if (form?.password?.trim()) {
        requiredFields.confirmPassword = t('비밀번호를_확인하세요');
      }

      for (const [field, message] of Object.entries(requiredFields)) {
        if (!form[field] || !form[field].trim()) {
          _errors[field] = _errors[field] ?? [];
          _errors[field].push(message);
          hasErrors = true;
        }
      }

      if (!hasErrors && form?.password !== form?.confirmPassword) {
        _errors.confirmPassword = _errors.confirmPassword ?? [];
        _errors.confirmPassword.push(t('비밀번호가_일치하지_않습니다'));
        hasErrors = true;
      }

      setErrors(_errors);
      if (hasErrors) {
        return;
      }

      try {
        const res = await apiUpdate(form);
        const newForm = { ...form, ...res };
        delete newForm.password;

        setForm(newForm);
        setUserInfo(newForm);
        alert(t('회원정보가_수정되었습니다'));
        router.replace('/mypage/info');
      } catch (err) {
        console.error(err);
        const messages = err.message.global
          ? err.message.global
          : { global: [err.message] };
        setErrors(messages);
      }
    },
    [t, form, router, setUserInfo],
  );

  const deleteUserInfo = useCallback(() => {
    if (!window.confirm(t('회원탈퇴를_진행하시겠습니까'))) {
      return;
    }

    (async () => {
      try {
        await apiPatch(form);
        alert(t('회원탈퇴완료'));
        router.replace('/member/login');
        onLogout();
      } catch (err) {
        console.error(err);
        alert(t('회원탈퇴실패'));
      }
    })();
  }, [t, form, router, onLogout]);

  const fileUploadCallback = useCallback(
    (files) => {
      if (files.length === 0) {
        return;
      }

      setForm((form) => ({ ...form, profileImage: files[0] }));
      setUserInfo((userInfo) => ({ ...userInfo, profileImage: files[0] }));
    },
    [setUserInfo],
  );

  return (
    <Container>
      <ProfileForm
        form={form}
        _onChange={_onChange}
        onSubmit={onSubmit}
        onClick={deleteUserInfo}
        errors={errors}
      />
    </Container>
  );
};

export default React.memo(InfoContainer);
