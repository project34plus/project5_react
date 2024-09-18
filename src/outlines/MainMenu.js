import React from 'react';
import { color } from '@/theme/color';
import fontSize from '@/theme/fontSize';
import fontWeight from '@/theme/fontWeight';
import { getCommonStates } from '@/commons/contexts/CommonContext';
import styled, { css } from 'styled-components';
import { useTranslation } from 'react-i18next';

const { navy, white, gray } = color;

const { small } = fontSize;

const {bold} = fontWeight;

const MenuContainer = styled.nav`
  background-color: ${white};
  border-bottom: 2px solid ${navy}; 
  position: fixed;
  top: 50px;
  left: 0;
  width: 100%;
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
  width: 150px;
  display: flex;
  justify-content: center; 
  align-items: center;
`;

const MenuLink = styled.a`
  display: inline-block;
  padding: 10px 15px;
  font-weight: ${bold};
  font-size: ${small};
  transition: background-color 0.3s, color 0.3s, transform 0.3s, box-shadow 0.3s;

  &:hover {
    background-color: ${white};
    color: ${navy};
    transform: translateY(-2px); 
  }

  &:active {
    transform: translateY(0);
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
          <MenuLink href="#">{t('논문학술자료')}</MenuLink>
        </MenuItem>
        <MenuItem>
          <MenuLink href="#">{t('논문_등록')}</MenuLink>
        </MenuItem>
        <MenuItem>
          <MenuLink href="#">{t('최신_연구_트렌드')}</MenuLink>
        </MenuItem>
        <MenuItem>
          <MenuLink href="#">{t('알고리즘')}</MenuLink>
        </MenuItem>
        <MenuItem>
          <MenuLink href="#">{t('연구노트')}</MenuLink>
        </MenuItem>
        <MenuItem>
          <MenuLink href="#">{t('이용안내')}</MenuLink>
        </MenuItem>
      </MenuList>
    </MenuContainer>
    )
  );
};

export default React.memo(MainMenu);
