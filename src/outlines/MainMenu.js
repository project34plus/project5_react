import React from 'react';
import { color } from '@/theme/color';
import fontSize from '@/theme/fontSize';
import fontWeight from '@/theme/fontWeight';
import { getCommonStates } from '@/commons/contexts/CommonContext';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

const { navy, white, gray } = color;

const { small } = fontSize;

const { bold } = fontWeight;

const MenuContainer = styled.nav`
  background-color: ${({ theme }) => theme.color.white};
  border-bottom: 2px solid ${({ theme }) => theme.color.navy};
  position: relative;
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
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  font-size: ${({ theme }) => theme.fontSize.small};
  transition: background-color 0.3s, color 0.3s, transform 0.3s, box-shadow 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.color.white};
    color: ${({ theme }) => theme.color.navy};
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
            <MenuLink>
              <a href="/mypage/info">{t('논문학술자료')}</a>
            </MenuLink>
          </MenuItem>
          <MenuItem>
            <MenuLink>
              <a href="/mypage/info">{t('논문_등록')}</a>
            </MenuLink>
          </MenuItem>
          <MenuItem>
            <MenuLink>
              <a href="/mypage/info">{t('최신_연구_트렌드')}</a>
            </MenuLink>
          </MenuItem>
          <MenuItem>
            <MenuLink>
              <a href="/mypage/info">{t('알고리즘')}</a>
            </MenuLink>
          </MenuItem>
          <MenuItem>
            <MenuLink>
              <a href="/mypage/info">{t('연구노트')}</a>
            </MenuLink>
          </MenuItem>
          <MenuItem>
            <MenuLink>
              <a href="/mypage/info">{t('이용안내')}</a>
            </MenuLink>
          </MenuItem>
        </MenuList>
      </MenuContainer>
    )
  );
};

export default React.memo(MainMenu);
