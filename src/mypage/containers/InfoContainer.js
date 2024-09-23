'use client';
import React, { useContext, useCallback, useState, useEffect } from 'react';
import ProfileForm from '../components/ProfileForm';
import Container2 from '@/commons/components/Container2';
import UserInfoContext from '@/commons/contexts/UserInfoContext';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';
import { apiUpdate } from '../apis/apiMyPage';
import { apiPatch } from '../apis/apiMyPage';
import { apiList } from '@/member/apis/apiFields';
import { apiFieldList } from '@/member/apis/apiFields';

function getQueryString(searchParams) {
  const qs = {};
  if (searchParams?.size > 0) {
    for (const [k, v] of searchParams) {
      qs[k] = v;
    }
  }
  return qs;
}

const InfoContainer = ({ searchParams }) => {
  const {
    states: { isLogin, userInfo, isAdmin },
    actions: { setIsLogin, setIsAdmin, setUserInfo },
  } = useContext(UserInfoContext);

  const initialForm = {
    ...userInfo,
    interests: userInfo.interests || ['', ''], // 관심 분야 초기값 설정
    birth: userInfo.birth || '', // 생일 초기값 설정
  };
  delete initialForm.password;
  delete initialForm.confirmPassword;
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [fields, setfields] = useState([]);
  const [interests, setinterests] = useState([]);
  const [search, setSearch] = useState(() => getQueryString(searchParams));

  useEffect(() => {
    apiList(search)
      .then((res) => {
        setfields(res || []);
      })
      .catch((error) => {
        console.error('실패사유:', error);
      });
  }, [search]);

  useEffect(() => {
    apiFieldList(search)
      .then((res) => {
        setinterests(res || []);
      })
      .catch((error) => {
        console.error('실패사유:', error);
      });
  }, [search]);

  const { t } = useTranslation();
  const router = useRouter();

  const _onChange = useCallback((e) => {
    const name = e.target.name;
    const value = e.target.value;

    if (name.startsWith('interest')) {
      const index = parseInt(name.replace('interest', '')) - 1;
      setForm((prevForm) => {
        const interests = [...(prevForm.interests || [])];
        interests[index] = value;
        return { ...prevForm, interests };
      });
    } else {
      setForm((prevForm) => ({
        ...prevForm,
        [name]: value,
      }));
    }
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
    <Container2>
      <ProfileForm
        form={form}
        _onChange={_onChange}
        onSubmit={onSubmit}
        onClick={deleteUserInfo}
        errors={errors}
        fields={fields}
        interests={interests}
      />
    </Container2>
  );
};

export default React.memo(InfoContainer);
