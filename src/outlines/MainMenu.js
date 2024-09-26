import React from 'react';
import { color } from '@/theme/color';
import fontSize from '@/theme/fontSize';
import fontWeight from '@/theme/fontWeight';
import { getCommonStates } from '@/commons/contexts/CommonContext';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

const MenuContainer = styled.nav`
  background-color: ${({ theme }) => theme.color.white};
  border-bottom: 2px solid ${({ theme }) => theme.color.navy};
  position: relative;
  left: 0;
  width: 100%;
  height: 100px;
  z-index: 1000;
  display: flex;
  justify-content: center;
  padding: 10px 0;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const MenuList = styled.ul`
  display: flex;
`;

const MenuItem = styled.li`
  margin: 10px;
  width: 180px;
  display: flex;
  justify-content: center;
  align-items: center;

  a {
    display: inline-block;
    padding: 10px 15px;
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    font-size: ${({ theme }) => theme.fontSize.normal};
    transition: background-color 0.3s, color 0.3s, transform 0.3s,
      box-shadow 0.3s;

    &:hover {
      background-color: ${({ theme }) => theme.color.white};
      color: ${({ theme }) => theme.color.navy};
      transform: translateY(-2px);
    }

    &:active {
      transform: translateY(0);
    }
  }
`;

const MainMenu = () => {
  const { showMainMenu } = getCommonStates();
  const { t } = useTranslation();

  return (
    showMainMenu && (
      <MenuContainer>
        <MenuList>
          <MenuItem>
            <a href="/thesis/list">{t('논문학술자료')}</a>
          </MenuItem>
          <MenuItem>
            <a href="/thesis/agree">{t('논문_등록')}</a>
          </MenuItem>
          <MenuItem>
            <a href="/trend">{t('최신_연구_트렌드')}</a>
          </MenuItem>
          <MenuItem>
            <a href="/recommend">{t('추천_논문')}</a>
          </MenuItem>
          <MenuItem>
            <a href="/note/write/default">{t('연구노트')}</a>
          </MenuItem>
          <MenuItem>
            <a href="/info">{t('이용안내')}</a>
          </MenuItem>
        </MenuList>
      </MenuContainer>
    )
  );
};

export default React.memo(MainMenu);
