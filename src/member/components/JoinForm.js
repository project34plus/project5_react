'use client';
import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'next-i18next';
import { FaCheckSquare, FaRegCheckSquare } from 'react-icons/fa';
import { IoMdRadioButtonOn, IoMdRadioButtonOff } from 'react-icons/io';
import { StyledButton } from '@/commons/components/buttons/StyledButton';
import StyledMessage from '@/commons/components/StyledMessage';
import JoinInput from './JoinInput';
import {
  IoAtSharp,
  IoLockClosed,
  IoLockClosedOutline,
  IoPersonCircleSharp,
  IoPhonePortraitOutline,
} from 'react-icons/io5';

const FormBox = styled.form`
  width: 100%;
  padding: 30px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.6);
`;

const JoinForm = ({ form, errors, onSubmit, onChange, onToggle }) => {
  const { t } = useTranslation();

  return (
    <>
      <h1>{t('회원가입')}</h1>
      <h2>{t('기본정보입력')}</h2>
      <FormBox onSubmit={onSubmit} autoComplete="off">
        <dl>
          <dd>
            <IoAtSharp />
            <JoinInput
              type="text"
              name="email"
              value={form?.email ?? ''}
              onChange={onChange}
              placeholder={t('메일_주소')}
            />
            <StyledMessage variant="danger">{errors?.email}</StyledMessage>
          </dd>
        </dl>
        <dl>
          <dd>
            <IoLockClosedOutline />
            <JoinInput
              type="password"
              name="password"
              value={form?.password ?? ''}
              onChange={onChange}
              placeholder={t('비밀번호')}
            />
            <StyledMessage variant="danger">{errors?.password}</StyledMessage>
          </dd>
        </dl>
        <dl>
          <dd>
            <IoLockClosed />
            <JoinInput
              type="password"
              name="confirmPassword"
              value={form?.confirmPassword ?? ''}
              onChange={onChange}
              placeholder={t('비밀번호_확인')}
            />
            <StyledMessage variant="danger">
              {errors?.confirmPassword}
            </StyledMessage>
          </dd>
        </dl>
        <dl>
          <dd>
            <IoPersonCircleSharp />
            <JoinInput
              type="text"
              name="userName"
              value={form?.userName ?? ''}
              onChange={onChange}
              placeholder={t('회원명')}
            />
            <StyledMessage variant="danger">{errors?.userName}</StyledMessage>
          </dd>
        </dl>
        <dl>
          <dd>
            <IoPhonePortraitOutline />
            <JoinInput
              type="text"
              name="mobile"
              value={form?.mobile ?? ''}
              onChange={onChange}
              placeholder={t('전화번호')}
            />
            <StyledMessage variant="danger">{errors?.mobile}</StyledMessage>
          </dd>
        </dl>
        <dl>
          <dd>
            <JoinInput
              type="date"
              name="birth"
              value={form?.birth ?? ''}
              onChange={onChange}
            />
            <StyledMessage variant="danger">{errors?.birth}</StyledMessage>
          </dd>
        </dl>
        <dl>
        <dt>{t('성별')}</dt>
          <dd>
            <span onClick={() => onToggle('gender', 'FEMALE')}>
              {form?.gender === 'FEMALE' ? (
                <IoMdRadioButtonOn />
              ) : (
                <IoMdRadioButtonOff />
              )}
              {t('여성')}
            </span>
            <span onClick={() => onToggle('gender', 'MALE')}>
              {form?.gender === 'MALE' ? (
                <IoMdRadioButtonOn />
              ) : (
                <IoMdRadioButtonOff />
              )}
              {t('남성')}
            </span>
            <StyledMessage variant="danger">{errors?.gender}</StyledMessage>
          </dd>
        </dl>
        <dt>{t('직업')}</dt>
        <dl>
          <dd>
            <span onClick={() => onToggle('job', 'PROFESSOR')}>
              {form?.job === 'PROFESSOR' ? (
                <IoMdRadioButtonOn />
              ) : (
                <IoMdRadioButtonOff />
              )}
              {t('교수')}
            </span>
            <span onClick={() => onToggle('job', 'DOCTOR')}>
              {form?.job === 'DOCTOR' ? (
                <IoMdRadioButtonOn />
              ) : (
                <IoMdRadioButtonOff />
              )}
              {t('박사')}
            </span>
            <span onClick={() => onToggle('job', 'MASTER')}>
              {form?.job === 'MASTER' ? (
                <IoMdRadioButtonOn />
              ) : (
                <IoMdRadioButtonOff />
              )}
              {t('석사')}
            </span>
            <span onClick={() => onToggle('job', 'ACADEMIC')}>
              {form?.job === 'ACADEMIC' ? (
                <IoMdRadioButtonOn />
              ) : (
                <IoMdRadioButtonOff />
              )}
              {t('학생')}
            </span>
            <span onClick={() => onToggle('job', 'RESEARCHER')}>
              {form?.job === 'RESEARCHER' ? (
                <IoMdRadioButtonOn />
              ) : (
                <IoMdRadioButtonOff />
              )}
              {t('연구원')}
            </span>
            <span onClick={() => onToggle('job', 'LIBRARIAN')}>
              {form?.job === 'LIBRARIAN' ? (
                <IoMdRadioButtonOn />
              ) : (
                <IoMdRadioButtonOff />
              )}
              {t('사서')}
            </span>
            <span onClick={() => onToggle('job', 'UNIVERSITY_STAFF')}>
              {form?.job === 'UNIVERSITY_STAFF' ? (
                <IoMdRadioButtonOn />
              ) : (
                <IoMdRadioButtonOff />
              )}
              {t('대학직원')}
            </span>
            <span onClick={() => onToggle('job', 'TEACHER')}>
              {form?.job === 'TEACHER' ? (
                <IoMdRadioButtonOn />
              ) : (
                <IoMdRadioButtonOff />
              )}
              {t('교사')}
            </span>
            <span onClick={() => onToggle('job', 'PUBLIC_OFFICIAL')}>
              {form?.job === 'PUBLIC_OFFICIAL' ? (
                <IoMdRadioButtonOn />
              ) : (
                <IoMdRadioButtonOff />
              )}
              {t('공무원')}
            </span>
            <span onClick={() => onToggle('job', 'GENERAL_MEMBER')}>
              {form?.job === 'GENERAL_MEMBER' ? (
                <IoMdRadioButtonOn />
              ) : (
                <IoMdRadioButtonOff />
              )}
              {t('일반인')}
            </span>
            <StyledMessage variant="danger">{errors?.job}</StyledMessage>
          </dd>
        </dl>
        <div
          className="agree"
          suppressHydrationWarning
          onClick={() => onToggle('agree', !Boolean(form?.agree))}
        >
          {form?.agree ? <FaCheckSquare /> : <FaRegCheckSquare />}
          {t('약관에_동의')}
        </div>
        <StyledMessage variant="danger">{errors?.agree}</StyledMessage>
        <StyledButton type="submit" variant="navy">
          {t('회원가입')}
        </StyledButton>
        <StyledMessage variant="danger">{errors?.global}</StyledMessage>
      </FormBox>
    </>
  );
};

export default React.memo(JoinForm);
