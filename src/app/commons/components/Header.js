'use client';
import React, { useContext, useCallback } from 'react';
import cookies from 'react-cookies';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { color } from '@/app/styles/color';
import UserInfoContext from '../modules/UserInfoContext';
import Link from 'next/link';

const { navy, white } = color;

const HeaderBox = styled.header`
  .site-top a {
    color: #ffffff;
    text-decoration: none;
  }

  .site-top a:hover {
    color: #cccccc;
  }

  .site-top {
    background: ${navy};
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .layout-width {
      max-width: 1400px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
`;

const Header = () => {
  const { t } = useTranslation();
  const {
    states: { isLogin, userInfo, isAdmin },
    actions: { setIsLogin, setIsAdmin, setUserInfo },
  } = useContext(UserInfoContext);

  const onLogout = useCallback(() => {
    setIsLogin(false);
    setIsAdmin(false);
    setUserInfo(null);
    cookies.remove('token', { path: '/' });
  }, [setIsLogin, setIsAdmin, setUserInfo]);

  return (
    <HeaderBox>
      <section className="site-top">
        <div className="layout-width">
          {isLogin ? (
            <div>
              <a href="/mypage">마이페이지</a>
              <a onClick={onLogout}>로그아웃</a>
              <a href="/admin">관리자 페이지</a>
            </div>
          ) : (
            <div>
              <a href="/join">회원가입</a>
              <a href="/login">로그인</a>
            </div>
          )}
        </div>
      </section>
    </HeaderBox>
  );
};

export default React.memo(Header);
