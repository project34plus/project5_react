'use client';
import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import fontSize from '@/theme/fontSize';
import { color } from '@/theme/color';
import fontWeight from '@/theme/fontWeight';

const { white, navy, gray } = color;
const { normal, big } = fontSize;
const { bold } = fontWeight;

const SubMenuBox = styled.aside`
  height: 220px;
  min-width: 210px;
  background: ${white};
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  margin-left: -100px;
  margin-top: 30px;
  items-align: center;

  a {
    display: inline-block;
    background: ${white};
    color: ${navy};
    font-size: ${normal};
    font-weight: ${bold};
    padding: 15px 20px;
    border-radius: 3px;
    transition: background 0.3s, color 0.3s, transform 0.2s;

    &:hover {
      background: ${navy};
      color: ${white};
      transform: translateY(-2px);
    }
  }

  a + a {
    border-top: 1px solid ${gray};
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
