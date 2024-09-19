'use client';
import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'next-i18next';
import { FaCheckSquare, FaRegCheckSquare } from 'react-icons/fa';
import { IoMdRadioButtonOn, IoMdRadioButtonOff } from 'react-icons/io';
import { StyledInput } from '@/commons/components/inputs/StyledInput';
import { StyledButton } from '@/commons/components/buttons/StyledButton';
import StyledMessage from '@/commons/components/StyledMessage';

const FormBox = styled.form``;

const JoinForm = ({ form, errors, onSubmit, onChange, onToggle }) => {
  const { t } = useTranslation();

  return (
    <FormBox onSubmit={onSubmit} autoComplete="off">
      <dl>
        <dt>{t('이메일')}</dt>
        <dd>
          <StyledInput
            type="text"
            name="email"
            value={form?.email ?? ''}
            onChange={onChange}
          />
          <StyledMessage variant="danger">{errors?.email}</StyledMessage>
        </dd>
      </dl>
      <dl>
        <dt>{t('비밀번호')}</dt>
        <dd>
          <StyledInput
            type="password"
            name="password"
            value={form?.password ?? ''}
            onChange={onChange}
          />
          <StyledMessage variant="danger">{errors?.password}</StyledMessage>
        </dd>
      </dl>
      <dl>
        <dt>{t('비밀번호_확인')}</dt>
        <dd>
          <StyledInput
            type="password"
            name="confirmPassword"
            value={form?.confirmPassword ?? ''}
            onChange={onChange}
          />
          <StyledMessage variant="danger">
            {errors?.confirmPassword}
          </StyledMessage>
        </dd>
      </dl>
      <dl>
        <dt>{t('회원명')}</dt>
        <dd>
          <StyledInput
            type="text"
            name="userName"
            value={form?.userName ?? ''}
            onChange={onChange}
          />
          <StyledMessage variant="danger">{errors?.userName}</StyledMessage>
        </dd>
      </dl>
      <dl>
        <dt>{t('휴대전화번호')}</dt>
        <dd>
          <StyledInput
            type="text"
            name="mobile"
            value={form?.mobile ?? ''}
            onChange={onChange}
          />
          <StyledMessage variant="danger">{errors?.mobile}</StyledMessage>
        </dd>
      </dl>
      <dl>
        <dt>{t('생년월일')}</dt>
        <dd>
          <StyledInput
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
      <dl>
        <dt>{t('직업')}</dt>
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
      <StyledButton type="submit" variant="primary">
        {t('회원가입')}
      </StyledButton>
      <StyledMessage variant="danger">{errors?.global}</StyledMessage>
    </FormBox>
  );
};

export default React.memo(JoinForm);
