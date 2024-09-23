'use client';
import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

const SubMenuBox = styled.aside`
  min-height: 650px;
  min-width: 200px;
  background: ${({ theme }) => theme.color.white};
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);

  a {
    display: inline-block;
    background: ${({ theme }) => theme.color.white};
    color: ${({ theme }) => theme.color.navy};
    font-size: ${({ theme }) => theme.fontSize.small};
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    padding: 15px 20px;
    border-radius: 5px;
    transition: background 0.3s, color 0.3s, transform 0.2s;
    margin-bottom: 10px;

    &:hover {
      background: ${({ theme }) => theme.color.navy};
      color: ${({ theme }) => theme.color.white};
      transform: translateY(-2px);
    }
  }

  a + a {
    border-top: 1px solid ${({ theme }) => theme.color.gray};
  }
`;

const Submenus = () => {
  const { t } = useTranslation();
  return (
    <SubMenuBox>
      <a href="/trend/recent">{t('최신_인기_논문')}</a>
      <a href="/trend/fields">{t('학문별_인기논문')}</a>
      <a href="/trend/group">{t('그룹별_인기검색어')}</a>
    </SubMenuBox>
  );
};

export default React.memo(Submenus);
