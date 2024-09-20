import React, { useContext } from 'react';
import styled from 'styled-components';
import { IoMdHome } from 'react-icons/io';
import CommonContext from '@/commons/contexts/CommonContext';

const HeaderBox = styled.header`
  /* 헤더 스타일 */
  display: flex;
  justify-content: flex-end;
  padding: 5px;
   max-width: 1200px;
   margin: 20px auto;
`;

const StyledLink = styled.a`
  color: #666;
  text-decoration: none;
  display: flex;
  align-items: center;

  &:hover {
    color: #007bff; // 호버 시 색상 변경
  }
`;

// 링크 사이 구분자 스타일
const Divider = styled.span`
  margin: 0 10px;
  color: #aaa; // 구분자 색상
`;

export const PageNavWrap = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.9em; // 텍스트 크기를 작게 조정
  color: #666; // 기본 텍스트 색상
`;

export const PageTitle = styled.div`
  margin-top: 20px;
  font-size: 20px;

  padding-left: 20px;
`;

const Header = () => {
  const {
    states: { linkHref, linkText },
  } = useContext(CommonContext);
  return (
    <HeaderBox>
      <PageNavWrap>
        <StyledLink href="/">
          <IoMdHome /> HOME
        </StyledLink>
        <Divider>&gt;</Divider>
        <StyledLink href={linkHref}>{linkText}</StyledLink>
      </PageNavWrap>
    </HeaderBox>
  );
};

export default Header;
