'use client';
import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import StyledMessage from '@/commons/components/StyledMessage';
import { StyledInput } from '@/commons/components/inputs/StyledInput';
import { StyledButton } from '@/commons/components/buttons/StyledButton';
import { IoAtSharp, IoLockClosedOutline } from 'react-icons/io5';

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

const InputWrapper = styled.div`
  position: relative;
  margin-bottom: 15px;
`;

const Icon = styled.div`
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  font-size: ${({ theme }) => theme.fontSize.small};
  color: ${({ theme }) => theme.color.midgray};
`;

const StyledInputWrapper = styled(StyledInput)`
  padding-left: 35px;
  height: 40px;
  font-size: ${({ theme }) => theme.fontSize.small};
`;

const LoginForm = ({ form, errors, onSubmit, onChange }) => {
  const { t } = useTranslation();

  return (
    <>
    <Title>{t('로그인')}</Title>
    <FormBox onSubmit={onSubmit} autoComplete="off">
      <dl>
        <dd>
          <InputWrapper>
            <Icon><IoAtSharp /></Icon>
            <StyledInputWrapper
              type="text"
              name="email"
              value={form?.email || ''}
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
            <Icon><IoLockClosedOutline /></Icon>
            <StyledInputWrapper
              type="password"
              name="password"
              value={form?.password || ''}
              onChange={onChange}
              placeholder={t('비밀번호')}
            />
          </InputWrapper>
          <StyledMessage variant="danger">{errors?.password}</StyledMessage>
        </dd>
      </dl>
      <StyledButton type="submit" variant="navy">
        {t('로그인')}
      </StyledButton>
      <StyledMessage variant="danger">{errors?.global}</StyledMessage>
    </FormBox>
    </>
  );
};

export default React.memo(LoginForm);
