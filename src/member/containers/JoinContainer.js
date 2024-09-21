'use client';
import React, {
  useLayoutEffect,
  useCallback,
  useState,
  useEffect,
} from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { getCommonActions } from '@/commons/contexts/CommonContext';
import JoinForm from '../components/JoinForm';
import { apiJoin } from '../apis/apiJoin';
import Container from '@/commons/components/Container';
import JoinBox from '../components/JoinBox';
import { apiList } from '../apis/apiFields';
import { apiFieldList } from '../apis/apiFields';

function getQueryString(searchParams) {
  const qs = {};
  if (searchParams?.size > 0) {
    for (const [k, v] of searchParams) {
      qs[k] = v;
    }
  }
  return qs;
}

const JoinContainer = ({ searchParams }) => {
  const { t } = useTranslation();
  const { setMainTitle } = getCommonActions();
  const router = useRouter();
  const [form, setForm] = useState({
    interests: [],
  });
  const [errors, setErrors] = useState({});
  const [fields, setfields] = useState([]);
  const [interests, setinterests] = useState([]);
  const [search, setSearch] = useState(() => getQueryString(searchParams));

  useLayoutEffect(() => {
    setMainTitle(t('회원가입'));
  }, [t, setMainTitle]);

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

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      console.log('form:', form);
      const _errors = {};
      let hasErrors = false;

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
    const name = e.target.name;
    const value = e.target.value;
    if (name === 'skey') {
      setSkey(value);
    } else {
      setForm((form) => ({ ...form, [name]: value }));
    }
  }, []);

  const onToggle = useCallback((name, value) => {
    setForm((form) => ({ ...form, [name]: value }));
  }, []);

  return (
    <Container>
      <JoinBox>
        <JoinForm
          form={form}
          onSubmit={onSubmit}
          onChange={onChange}
          onToggle={onToggle}
          errors={errors}
          fields={fields}
          interests={interests}
        />
      </JoinBox>
    </Container>
  );
};

export default React.memo(JoinContainer);
