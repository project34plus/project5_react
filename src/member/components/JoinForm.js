'use client';
import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'next-i18next';
import { StyledButton } from '@/commons/components/buttons/StyledButton';
import StyledMessage from '@/commons/components/StyledMessage';
import JoinInput from './JoinInput';
import {
  IoAtSharp,
  IoLockClosed,
  IoLockClosedOutline,
  IoPersonCircleSharp,
  IoPhonePortraitOutline,
  IoCheckbox,
  IoCheckboxOutline,
  IoCheckmarkCircleOutline,
  IoCheckmarkCircleSharp,
  IoPersonSharp,
  IoCalendarNumberOutline,
} from 'react-icons/io5';

const FormBox = styled.form`
  width: 100%;
  padding: 30px 50px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.6);
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSize.big};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  text-align: center;
  margin-bottom: 30px;
  color: ${({ theme }) => theme.color.black};
`;

const Subtitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.center};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  text-align: left;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.color.darkgray};
  display: flex;
  align-items: center;
`;

const InputWrapper = styled.div`
  position: relative;
  margin-bottom: 15px;
`;

const Icon = styled.div`
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-90%);
  font-size: ${({ theme }) => theme.fontSize.small};
  color: ${({ theme }) => theme.color.midgray};
`;

const Icon2 = styled.span`
  margin-right: 10px;
  display: flex;
  align-items: center;
`;

const Icon3 = styled.span`
  margin-right: 3px;
  color: ${({ theme }) => theme.color.navy};
`;

const StyledInput = styled(JoinInput)`
  padding-left: 35px;
  height: 40px;
  font-size: ${({ theme }) => theme.fontSize.small};
`;

const OptionContainer = styled.div`
  display: flex;
  gap: 20px;
  font-size: ${({ theme }) => theme.fontSize.small};
  align-items: center;
  margin-bottom: 30px;

  span {
    display: flex;
    align-items: center;
    cursor: pointer;

    &:hover {
      color: ${({ theme }) => theme.color.navy};
      font-weight: ${({ theme }) => theme.fontWeight.bold};
    }

    &.selected {
      color: ${({ theme }) => theme.color.navy};
      font-weight: ${({ theme }) => theme.fontWeight.bold};
    }
  }
`;

const JoinForm = ({ form, errors, onSubmit, onChange, onToggle }) => {
  const { t } = useTranslation();
  return (
    <>
      <Title>{t('회원가입')}</Title>
      <FormBox onSubmit={onSubmit} autoComplete="off">
        <Subtitle>
          <Icon2>
            <IoPersonSharp />
          </Icon2>
          {t('기본정보입력')}
        </Subtitle>
        <dl>
          <dd>
            <InputWrapper>
              <Icon>
                <IoAtSharp />
              </Icon>
              <StyledInput
                type="text"
                name="email"
                value={form?.email ?? ''}
                onChange={onChange}
                placeholder={t('메일_주소')}
              />
            </InputWrapper>
            <StyledMessage variant="danger">{errors?.email}</StyledMessage>
          </dd>
        </dl>
        <dl>
          <dd>
            <InputWrapper>
              <Icon>
                <IoLockClosedOutline />
              </Icon>
              <StyledInput
                type="password"
                name="password"
                value={form?.password ?? ''}
                onChange={onChange}
                placeholder={t('비밀번호')}
              />
            </InputWrapper>
            <StyledMessage variant="danger">{errors?.password}</StyledMessage>
          </dd>
        </dl>
        <dl>
          <dd>
            <InputWrapper>
              <Icon>
                <IoLockClosed />
              </Icon>
              <StyledInput
                type="password"
                name="confirmPassword"
                value={form?.confirmPassword ?? ''}
                onChange={onChange}
                placeholder={t('비밀번호_확인')}
              />
            </InputWrapper>
            <StyledMessage variant="danger">
              {errors?.confirmPassword}
            </StyledMessage>
          </dd>
        </dl>
        <dl>
          <dd>
            <InputWrapper>
              <Icon>
                <IoPersonCircleSharp />
              </Icon>
              <StyledInput
                type="text"
                name="userName"
                value={form?.userName ?? ''}
                onChange={onChange}
                placeholder={t('회원명')}
              />
            </InputWrapper>
            <StyledMessage variant="danger">{errors?.userName}</StyledMessage>
          </dd>
        </dl>
        <dl>
          <dd>
            <InputWrapper>
              <Icon>
                <IoPhonePortraitOutline />
              </Icon>
              <StyledInput
                type="text"
                name="mobile"
                value={form?.mobile ?? ''}
                onChange={onChange}
                placeholder={t('전화번호')}
              />
            </InputWrapper>
            <StyledMessage variant="danger">{errors?.mobile}</StyledMessage>
          </dd>
        </dl>
        <dl>
          <dd>
            <InputWrapper>
              <Icon>
                <IoCalendarNumberOutline />
              </Icon>
              <StyledInput
                type="date"
                name="birth"
                value={form?.birth ?? ''}
                onChange={onChange}
              />
            </InputWrapper>
            <StyledMessage variant="danger">{errors?.birth}</StyledMessage>
          </dd>
        </dl>

        <dl>
          <Subtitle>
            <Icon2>
              <IoPersonSharp />
            </Icon2>
            {t('성별')}
          </Subtitle>
          <dd>
            <OptionContainer>
              <span onClick={() => onToggle('gender', 'FEMALE')}>
                {form?.gender === 'FEMALE' ? (
                  <Icon3>
                    <IoCheckmarkCircleSharp />
                  </Icon3>
                ) : (
                  <Icon3>
                    <IoCheckmarkCircleOutline />
                  </Icon3>
                )}
                {t('여성')}
              </span>
              <span onClick={() => onToggle('gender', 'MALE')}>
                {form?.gender === 'MALE' ? (
                  <Icon3>
                    <IoCheckmarkCircleSharp />
                  </Icon3>
                ) : (
                  <Icon3>
                    <IoCheckmarkCircleOutline />
                  </Icon3>
                )}
                {t('남성')}
              </span>
            </OptionContainer>
            <StyledMessage variant="danger">{errors?.gender}</StyledMessage>
          </dd>
        </dl>

        <Subtitle>
          <Icon2>
            <IoPersonSharp />
          </Icon2>
          {t('직업')}
        </Subtitle>
        <dl>
          <dd>
            <OptionContainer>
              <span onClick={() => onToggle('job', 'PROFESSOR')}>
                {form?.job === 'PROFESSOR' ? (
                  <Icon3>
                    <IoCheckmarkCircleSharp />
                  </Icon3>
                ) : (
                  <Icon3>
                    <IoCheckmarkCircleOutline />
                  </Icon3>
                )}
                {t('교수')}
              </span>
              <span onClick={() => onToggle('job', 'DOCTOR')}>
                {form?.job === 'DOCTOR' ? (
                  <Icon3>
                    <IoCheckmarkCircleSharp />
                  </Icon3>
                ) : (
                  <Icon3>
                    <IoCheckmarkCircleOutline />
                  </Icon3>
                )}
                {t('박사')}
              </span>
              <span onClick={() => onToggle('job', 'MASTER')}>
                {form?.job === 'MASTER' ? (
                  <Icon3>
                    <IoCheckmarkCircleSharp />
                  </Icon3>
                ) : (
                  <Icon3>
                    <IoCheckmarkCircleOutline />
                  </Icon3>
                )}
                {t('석사')}
              </span>
              <span onClick={() => onToggle('job', 'ACADEMIC')}>
                {form?.job === 'ACADEMIC' ? (
                  <Icon3>
                    <IoCheckmarkCircleSharp />
                  </Icon3>
                ) : (
                  <Icon3>
                    <IoCheckmarkCircleOutline />
                  </Icon3>
                )}
                {t('학생')}
              </span>
              <span onClick={() => onToggle('job', 'RESEARCHER')}>
                {form?.job === 'RESEARCHER' ? (
                  <Icon3>
                    <IoCheckmarkCircleSharp />
                  </Icon3>
                ) : (
                  <Icon3>
                    <IoCheckmarkCircleOutline />
                  </Icon3>
                )}
                {t('연구원')}
              </span>
              <span onClick={() => onToggle('job', 'LIBRARIAN')}>
                {form?.job === 'LIBRARIAN' ? (
                  <Icon3>
                    <IoCheckmarkCircleSharp />
                  </Icon3>
                ) : (
                  <Icon3>
                    <IoCheckmarkCircleOutline />
                  </Icon3>
                )}
                {t('사서')}
              </span>
              <span onClick={() => onToggle('job', 'UNIVERSITY_STAFF')}>
                {form?.job === 'UNIVERSITY_STAFF' ? (
                  <Icon3>
                    <IoCheckmarkCircleSharp />
                  </Icon3>
                ) : (
                  <Icon3>
                    {' '}
                    <IoCheckmarkCircleOutline />
                  </Icon3>
                )}
                {t('대학직원')}
              </span>
              <span onClick={() => onToggle('job', 'TEACHER')}>
                {form?.job === 'TEACHER' ? (
                  <Icon3>
                    <IoCheckmarkCircleSharp />
                  </Icon3>
                ) : (
                  <Icon3>
                    {' '}
                    <IoCheckmarkCircleOutline />
                  </Icon3>
                )}
                {t('교사')}
              </span>
              <span onClick={() => onToggle('job', 'PUBLIC_OFFICIAL')}>
                {form?.job === 'PUBLIC_OFFICIAL' ? (
                  <Icon3>
                    <IoCheckmarkCircleSharp />
                  </Icon3>
                ) : (
                  <Icon3>
                    <IoCheckmarkCircleOutline />
                  </Icon3>
                )}
                {t('공무원')}
              </span>
              <span onClick={() => onToggle('job', 'GENERAL_MEMBER')}>
                {form?.job === 'GENERAL_MEMBER' ? (
                  <Icon3>
                    <IoCheckmarkCircleSharp />
                  </Icon3>
                ) : (
                  <Icon3>
                    <IoCheckmarkCircleOutline />
                  </Icon3>
                )}
                {t('일반인')}
              </span>
            </OptionContainer>
            <StyledMessage variant="danger">{errors?.job}</StyledMessage>
          </dd>
        </dl>

        <OptionContainer>
          <div
            className="agree"
            suppressHydrationWarning
            onClick={() => onToggle('agree', !Boolean(form?.agree))}
          >
            {form?.agree ? (
              <Icon3>
                <IoCheckbox />
              </Icon3>
            ) : (
              <Icon3>
                <IoCheckboxOutline />
              </Icon3>
            )}
            {t('약관에_동의')}
          </div>
        </OptionContainer>
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
