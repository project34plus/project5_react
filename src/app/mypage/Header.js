import React, { useContext } from "react";
import styled from "styled-components";
import { IoMdHome } from 'react-icons/io';
import CommonContext from "@/commons/modules/CommonContext";


const HeaderBox = styled.header`
  /* 헤더 스타일 */
`;

const StyledLink = styled.a`
  font-size: 1.3em;
  color: #000; /* 링크 색상 설정 */
  text-decoration: none; /* 밑줄 제거 */
  &:hover {
    color: #007bff; /* 호버 시 색상 변경 */
  }
`;

export const PageNavWrap = styled.div`
  // box-sizing: border-box;
  // padding: 48px 20px 20px 48px;
  // border-bottom: solid 1.5px rgb(221, 221, 221);
  // max-width: 1300px;
  // position: relative;
  // margin: 0 auto 20px;

  //이 부분은 정렬을 위해 추가
  box-sizing: border-box;
  padding: 48px 20px 20px;
  border-bottom: solid 1.5px rgb(221, 221, 221);
  max-width: 1300px;
  position: relative;
  margin: 0 auto 20px;
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
          &nbsp;&nbsp; &gt; &nbsp;&nbsp;
          <StyledLink href={linkHref}>{linkText}</StyledLink>
          <PageTitle>
            <h1>{linkText}</h1>
          </PageTitle>
        </PageNavWrap>
      </HeaderBox>
    )
}

export default Header;