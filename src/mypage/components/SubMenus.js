'use client';
import React, { useContext } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import UserInfoContext from '@/commons/contexts/UserInfoContext';

const SubMenuBox = styled.aside`
  height: 600px;
  min-width: 200px;
  width: 200px;
  background: ${({ theme }) => theme.color.white};
  background-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.2) 1px,
    transparent 1px
  );
  background-size: 100% 40px;
  border-radius: 5px;
  padding: 20px 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
  position: relative;
  top: 70px;

  a {
    display: block;
    background: ${({ theme }) => theme.color.white};
    color: ${({ theme }) => theme.color.navy};
    font-size: ${({ theme }) => theme.fontSize.normal};
    font-weight: ${({ theme }) => theme.fontWeight.semiBold};
    padding: 15px 20px;
    border-radius: 5px;
    transition: background 0.3s, color 0.3s, transform 0.2s;
    margin-bottom: 15px;
    border: 1px solid ${({ theme }) => theme.color.navy};
    border-left: 6px solid ${({ theme }) => theme.color.navy};

    &:hover {
      color: ${({ theme }) => theme.color.black};
      border: 1px solid ${({ theme }) => theme.color.yellow};
      border-left: 6px solid ${({ theme }) => theme.color.yellow};
      transform: translateY(-1px);
    }
  }
`;

const Submenus = () => {
  const { t } = useTranslation();
  const {
    states: { userInfo },
  } = useContext(UserInfoContext);
  return (
    <SubMenuBox>
      <img
        src={userInfo?.profileImage || '/images/noImage.jpg'} // 기본 이미지 URL 설정
        alt="profile"
        width={150}
        height={150}
        style={{
          marginTop: '20px',
          marginBottom: '30px',
          marginLeft: '10px',
          borderRadius: '5%',
          border: '3px solid #7FA1C3',
          padding: '10px',
        }}
      />
      <a href="/mypage/info">{t('내_프로필')}</a>
      <a href="/mypage/MyThesisList">{t('등록한_논문')}</a>
      <a href="/mypage/MyRecentlyView">{t('최근_본_논문')}</a>
      <a href="/mypage/MyWishList">{t('즐겨찾는_논문')}</a>
    </SubMenuBox>
  );
};

export default React.memo(Submenus);
