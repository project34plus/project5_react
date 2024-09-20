import React, { useCallback, useContext } from 'react';
import styled from 'styled-components';
import cookies from 'react-cookies';
import { useTranslation } from 'react-i18next';
import { getCommonStates } from '../commons/contexts/CommonContext';
import { getUserContext } from '@/commons/contexts/UserInfoContext';
import { IoHome } from 'react-icons/io5';

const HeaderBox = styled.header`
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  background: ${({ theme }) => theme.color.navy};
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
    font-size: ${({ theme }) => theme.fontSize.extraSmall};
  }

  .home {
    color: ${({ theme }) => theme.color.white};
    text-decoration: none;
    padding: 0 20px;
    transition: color 0.3s;
    cursor: pointer;

    &:hover {
      color: ${({ theme }) => theme.color.gray};
    }
  }

  .layout-width {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }

  a {
    color: ${({ theme }) => theme.color.white};
    text-decoration: none;
    padding: 0 20px;
    transition: color 0.3s;
    cursor: pointer;

    &:hover {
      color: ${({ theme }) => theme.color.gray};
    }
  }
`;

const Icon = styled.span`
  font-size: ${({ theme }) => theme.fontSize.small};
  color: ${({ theme }) => theme.color.white};
  margin-right: 5px;
`;

const Header = () => {
  const { t } = useTranslation();
  const { showHeader } = getCommonStates();
  const {
    states: { isLogin, userInfo, isAdmin },
    actions: { setIsLogin, setIsAdmin, setUserInfo },
  } = getUserContext();
  const onLogout = useCallback(() => {
    setIsLogin(false);
    setIsAdmin(false);
    setUserInfo(null);
    cookies.remove('token', { path: '/' });
  }, [setIsLogin, setIsAdmin, setUserInfo]);

  return (
    showHeader && (
      <HeaderBox>
        <section className="site-top">
          <div className="layout-width">
            <a className="home" href="/">
              <Icon>
                <IoHome />
              </Icon>
              {t('사이트홈')}
            </a>
            <div>
              {isLogin ? (
                <div>
                  <a href="/mypage/info">{t('마이페이지')}</a>
                  <a onClick={onLogout}>{t('로그아웃')}</a>
                  <a href="/admin" target="_blank">
                    {t('사이트_관리')}
                  </a>
                  {/* 개발 기간에는 관리자 페이지 열어둘게요 */}
                  {/* {isAdmin && (
                    <a href="/admin" target="_blank">
                      {t('사이트_관리')}
                    </a>
                  )} */}
                </div>
              ) : (
                <div>
                  <a href="/member/join">{t('회원가입')}</a>
                  <a href="/member/login">{t('로그인')}</a>
                </div>
              )}
            </div>
          </div>
        </section>
      </HeaderBox>
    )
  );
};

export default React.memo(Header);
