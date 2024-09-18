import React, { useCallback, useContext } from 'react';
import styled from 'styled-components';
import cookies from 'react-cookies';
import { useTranslation } from 'react-i18next';
import UserInfoContext from '@/commons/contexts/UserInfoContext';
import { color } from '@/theme/color';

const { navy, white, gray } = color;

const HeaderBox = styled.header`
  position: fixed;
  top: 0;
  left: 0; 
  width: 100%;
  background: ${navy}; 
  height: 50px; 
  z-index: 1000;
  display: flex;
  align-items: center; 
  padding: 0 20px;

  .site-top {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  .layout-width {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
  }
  
  a {
    color: ${white};
    text-decoration: none;
    padding: 0 20px; 
    transition: color 0.3s;

    &:hover {
      color: ${gray};
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
