import React from 'react';
import styled from 'styled-components';
import { color } from '@/theme/color';
import fontSize from '@/theme/fontSize';
import fontWeight from '@/theme/fontWeight';

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
  return (
    <MenuContainer>
      <MenuList>
        <MenuItem>
          <MenuLink href="#">논문/학술자료</MenuLink>
        </MenuItem>
        <MenuItem>
          <MenuLink href="#">논문 등록</MenuLink>
        </MenuItem>
        <MenuItem>
          <MenuLink href="#">최신 연구 트렌드</MenuLink>
        </MenuItem>
        <MenuItem>
          <MenuLink href="#">알고리즘</MenuLink>
        </MenuItem>
        <MenuItem>
          <MenuLink href="#">연구노트</MenuLink>
        </MenuItem>
        <MenuItem>
          <MenuLink href="#">이용안내</MenuLink>
        </MenuItem>
      </MenuList>
    </MenuContainer>
  );
};

export default React.memo(MainMenu);
