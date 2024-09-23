'use client';
import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import StyledMessage from '@/commons/components/StyledMessage';
import { StyledInput } from '@/commons/components/inputs/StyledInput';
import { MidButton } from '@/commons/components/buttons/BlueButtons';
import { IoAtSharp, IoLockClosedOutline, IoPersonSharp } from 'react-icons/io5';
import JoinInput from './JoinInput';

const FormBox = styled.form`
  width: 100%;
  height: 430px;
  padding: 30px 50px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.6);
  display: flex;
  flex-direction: column;
  justify-content: center;

  .midButton {
    margin-top: 20px;
  }

 .signup-container {
  margin-top: 20px;
  text-align: center;
  font-size: ${({ theme }) => theme.fontSize.extraSmall};
  font-weight: ${({ theme }) => theme.fontWeight.regular};
}

.signup-link {
  margin-left: 5px;
  color: ${({ theme }) => theme.color.midNavy};
  text-decoration: underline;
}

.signup-link:hover {
  font-weight: ${({ theme }) => theme.fontWeight.bold};
}
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
  color: ${({ theme }) => theme.color.navy};
  display: flex;
  align-items: center;
`;

const InputWrapper = styled.div`
  position: relative;
  padding-bottom: 10px;
`;

const Icon = styled.div`
  position: absolute;
  left: 10px;
  top: 37%;
  font-size: ${({ theme }) => theme.fontSize.small};
  color: ${({ theme }) => theme.color.midgray};
`;

const Icon2 = styled.span`
  margin-right: 10px;
  display: flex;
  align-items: center;
`;

const StyledInput2 = styled(JoinInput)`
  padding-left: 40px;
  height: 40px;
  ${({ theme }) => theme.fontSize.center};
`;

const LoginForm = ({ form, errors, onSubmit, onChange }) => {
  const { t } = useTranslation();

  return (
    <>
    <Title>{t('로그인')}</Title>
    <FormBox onSubmit={onSubmit} autoComplete="off">
      <Subtitle>
        <Icon2>
          <IoPersonSharp />
        </Icon2>
        {t('회원정보입력')}
      </Subtitle>
      <dl>
        <dd>
          <InputWrapper>
            <Icon>
              <IoAtSharp />
            </Icon>
            <StyledInput2
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
            <Icon>
              <IoLockClosedOutline />
            </Icon>
            <StyledInput2
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
      <MidButton type="submit" width="200" className="midButton">
        {t('로그인')}
      </MidButton>
      <StyledMessage variant="danger">{errors?.global}</StyledMessage>
      
      <div className="signup-container">
          <span>{t('아직_회원이_아니신가요')}</span> 
          <a href="/member/join" className="signup-link">
            {t('가입하기')}
          </a>
        </div>
      </FormBox>
    </>
  );
};

export default React.memo(LoginForm);
