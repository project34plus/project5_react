'use client';
import React, { useCallback, useState, useEffect } from 'react';
import cookies from 'react-cookies';
import ProfileForm from '../components/ProfileForm';
import Container2 from '@/commons/components/Container2';
import UserInfoContext, {
  getUserContext,
} from '@/commons/contexts/UserInfoContext';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';
import { apiUpdate } from '../apis/apiMyPage';
import { apiPatch } from '../apis/apiMyPage';
import { apiList } from '@/member/apis/apiFields';
import { apiFieldList } from '@/member/apis/apiFields';
import { apiInterests } from '@/thesis/apis/apiInterests';
import styled from 'styled-components';

const StyledProfileImage = styled.div`
  width: 250px;
  height: 250px;
  border: 3px solid ${({ theme }) => theme.color.whiteGrayNavy};
  display: flex;
  flex-direction: column;
  margin: auto;
  margin-bottom: 30px;
`;

const initialFormData = {
  gid: Date.now() + '',
  category: 'DOMESTIC',
  poster: '',
  contributor: '',
  thAbstract: '',
  reference: '',
  visible: 'false',
  publisher: '',
  title: '',
  fields: [],
  language: '한국어',
  country: '한국',
  keywords: '',
};

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
  } = getUserContext();

  const initialForm = {
    ...userInfo,
    interests: ['', ''],
    // interests: userInfo.interests || ['', ''], // 관심 분야 초기값 설정
    birth: userInfo.birth || '', // 생일 초기값 설정
  };
  delete initialForm.password;
  delete initialForm.confirmPassword;
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [fields, setFields] = useState([]);
  const [interests, setInterests] = useState([]);
  const [search, setSearch] = useState(() => getQueryString(searchParams));

  useEffect(() => {
    apiInterests(userInfo.email).then((res) => {
      setForm({ ...form, interests: [res[0]?.id, res[1]?.id] });
    });
  }, []);

  useEffect(() => {
    apiList(search)
      .then((res) => {
        setFields(res || []);
      })
      .catch((error) => {
        console.error('실패사유:', error);
      });
  }, [search]);

  useEffect(() => {
    apiFieldList(search)
      .then((res) => {
        setInterests(res || []);
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
      console.log(index, value);
      setForm((prevForm) => {
        const interests = [...(prevForm.interests || [])];
        interests[index] = value;

        return { ...prevForm, interests };
      });
    } else {
      setForm((prevForm) => ({
        ...prevForm,
        [e.target.name]: e.target.value,
      }));
    }
  }, []);

  const validateForm = useCallback(() => {
    const _errors = {};
    let hasErrors = false;
    const requiredFields = {
      userName: t('회원명을_입력하세요'),
      password: t('비밀번호를_입력하세요'),
      confirmPassword: t('비밀번호를_확인하세요'),
      mobile: t('전화번호를_입력하세요'),
      birth: t('생년월일을_입력하세요'),
      gender: t('성별을_선택하세요'),
      job: t('직업을_선택하세요'),
    };

    for (const [field, message] of Object.entries(requiredFields)) {
      const value = form[field];

      // 값이 문자열일 때만 trim()을 호출하고, 그렇지 않으면 빈 값인지 확인 (문자열일때만 trim 가능하다함)
      if (typeof value !== 'string' || !value.trim()) {
        _errors[field] = message; // 에러 메시지 저장
        hasErrors = true;
      }
    }

    setErrors(_errors); // 에러 상태 업데이트
    return !hasErrors; // 에러가 없으면 true 반환
  }, [form, t]);

  const onLogout = useCallback(() => {
    setIsLogin(false);
    setIsAdmin(false);
    setUserInfo(null);
    cookies.remove('token', { path: '/' });
  }, [setIsLogin, setIsAdmin, setUserInfo]);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();

      const _errors = {};
      let hasErrors = false;
      if (!validateForm()) return;

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
      (async () => {
        try {
          const res = await apiUpdate(form); // updateMemberInfo 호출
          const newForm = { ...form, ...res };
          delete newForm.password;

          setForm(newForm);
          setUserInfo(newForm);
          alert(t('회원정보가_수정되었습니다'));
          router.replace('/mypage/info');
        } catch (err) {
          console.error(err);
          const messages =
            typeof err.message === 'string'
              ? { global: [err.message] }
              : err.message;
          for (const [field, _messages] of Object.entries(messages)) {
            _errors[field] = _errors[field] ?? [];
            _errors[field].push(_messages);
          }
          setErrors({ ..._errors }); // 에러 상태 업데이트
        }
      })();
    },
    [form, validateForm, router, apiUpdate],
  );

  const fileUploadCallback = useCallback((files) => {
    if (!files || files.length === 0) {
      return;
    }

    const file = files[0];
    const profileImage = `${file.thumbUrl}?seq=${file.seq}&width=200&height=200`;
    setForm((form) => ({ ...form, profileImage }));
  }, []);

  const deleteUserInfo = useCallback(() => {
    if (!window.confirm(t('회원탈퇴를_진행하시겠습니까'))) {
      return;
    }

    (async () => {
      try {
        await apiPatch(form);
        alert(t('회원탈퇴완료'));
        onLogout();
        router.replace('/member/login');
      } catch (err) {
        console.error(err);
        alert(t('회원탈퇴실패'));
      }
    })();
  }, [t, form, router, onLogout]);

  return (
    <>
      <Container2>
        <ProfileForm
          form={form}
          _onChange={_onChange}
          onSubmit={onSubmit}
          onClick={deleteUserInfo}
          errors={errors}
          fields={fields}
          interests={interests}
          fileUploadCallback={fileUploadCallback}
        />
      </Container2>
    </>
  );
};

export default React.memo(InfoContainer);
