'use client';
import React, { useLayoutEffect, useCallback, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { getCommonActions } from '@/commons/contexts/CommonContext';
import JoinForm from '../components/JoinForm';
import { apiJoin, apiEmailAuth, apiEmailAuthCheck } from '../apis/apiJoin';
import Container from '@/commons/components/Container';
import JoinBox from '../components/JoinBox';
import apiRequest from '@/commons/libs/apiRequest';

const JoinContainer = () => {
  const { t } = useTranslation();
  const { setMainTitle } = getCommonActions();
  const router = useRouter();
  const [errors, setErrors] = useState({});
  const authCountInterval = useRef();

  useLayoutEffect(() => {
    setMainTitle(t('회원가입'));
  }, [t, setMainTitle]);

  const [form, setForm] = useState({
    gid: '' + Date.now(),
    agree: false,
    authNum: '',
    emailVerified: false,
    authCount: 180,
    authCountMin: '03:00',
  });

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();

      const _errors = {};
      let hasErrors = false;

   // 이메일 인증 코드 전송
   const onSendAuthCode = useCallback(() => {
    // 이메일을 입력하지 않은 경우
    if (!form?.email?.trim()) {
      setErrors((errors) => ({
        ...errors,
        email: [t('이메일을_입력하세요.')],
      }));
      return;
    } else {
      delete errors.email;
      const _errors = errors;
      setErrors(_errors);
    }

    form.authCount = 180;
    // 3분 카운트 시작
    authCountInterval.current = setInterval(() => {
      form.authCount--;
      const minutes = Math.floor(form.authCount / 60);
      const seconds = form.authCount - minutes * 60;

      const authCountMin =
        ('' + minutes).padStart(2, '0') + ':' + ('' + seconds).padStart(2, '0');

      if (form.authCount < 0) {
        form.authCount = 0;
        clearInterval(authCountInterval.current);
      }

      setForm((form) => ({
        ...form,
        authCount: form.authCount,
        authCountMin,
      }));
    }, 1000);

    // 인증 이메일 보내기
    apiEmailAuth(form.email, form.gid);
  }, [form, errors, t]);

  // 인증 코드 재전송
  const onReSendAuthCode = useCallback(() => {
    clearTimeout(authCountInterval.current);
    onSendAuthCode();
  }, [onSendAuthCode]);

  const onVerifyAuthCode = useCallback(() => {
    if (!form.authNum?.trim()) {
      setErrors((errors) => ({
        ...errors,
        email: [t('인증코드를_입력하세요.')],
      }));
      return;
    }

    (async () => {
      try {
        await apiEmailAuthCheck(form.authNum, form.gid);

        setForm((form) => ({ ...form, emailVerified: true })); // 이메일 인증 처리

        delete errors.email;
        const _errors = errors;
        setErrors(_errors);
        // 인증 완료 시 타이머 멈춤
        clearInterval(authCountInterval.current);
      } catch (err) {
        setErrors((errors) => ({
          ...errors,
          email: [t('이메일_인증에_실패하였습니다.')],
        }));
      }
    })();
  }, [t, form, errors]);

      /* 필수 항목 검증 S */
      const requiredFields = {
        email: t('이메일을_입력하세요'),
        password: t('비밀번호를_입력하세요'),
        confirmPassword: t('비밀번호를_확인하세요'),
        userName: t('회원명을_입력하세요'),
        birth: t('생년월일을_입력하세요'),
        gender: t('성별을_선택하세요'),
        job: t('직업을_선택하세요'),
        mobile: t('전화번호를_입력하세요'),
      };

      for (const [field, message] of Object.entries(requiredFields)) {
        if (!form[field] || !form[field]?.trim()) {
          _errors[field] = _errors[field] ?? [];
          _errors[field].push(message);
          hasErrors = true;
        }
      }

      if (!form.agree) {
        _errors.agree = [t('회원가입_약관에_동의하세요')];
        hasErrors = true;
      }
      /* 필수 항목 검증 E */

      /* 비밀번호 및 비밀번호 확인 일치 여부 */
      if (form.password !== form.confirmPassword) {
        _errors.confirmPassword = [t('비밀번호가_일치하지_않습니다')];
        hasErrors = true;
      }

      setErrors(_errors);
      if (hasErrors) {
        // 검증 실패시 회원 가입 X
        return;
      }

      // 회원 가입 처리
      (async () => {
        try {
          await apiJoin(form);
          router.replace('/member/login');
          console.log(form);
          // 회원가입 완료 후 페이지 이동
        } catch (err) {
          // 검증 실패, 가입 실패
          const messages =
            typeof err.message === 'string'
              ? { global: [err.message] }
              : err.message;

          for (const [field, _messages] of Object.entries(messages)) {
            _errors[field] = _errors[field] ?? [];
            _errors[field].push(_messages);
          }
          setErrors({ ..._errors });
        }
      })();
    },
    [form, router, t],
  );

  const onChange = useCallback((e) => {
    setForm((form) => ({ ...form, [e.target.name]: e.target.value }));
  }, []);

  const onToggle = useCallback((name, value) => {
    setForm((form) => ({ ...form, [name]: value }));
  }, []);



  return (
    <Container>
      <JoinBox>
        <JoinForm
      form={form}
      errors={errors}
      onSubmit={onSubmit}
      onChange={onChange}
      onToggle={onToggle}
      onReset={onReset}
      onSendAuthCode={onSendAuthCode}
      onReSendAuthCode={onReSendAuthCode}
      onVerifyAuthCode={onVerifyAuthCode}
        />
      </JoinBox>
    </Container>
  );
};

export default React.memo(JoinContainer);
