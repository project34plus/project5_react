import React from 'react';
import styled from 'styled-components';
import { getCommonStates } from '../commons/contexts/CommonContext';

const FooterContainer = styled.footer`
  background-color: ${({ theme }) => theme.color.darkgray};
  color: white;
  padding: 40px 0;
  text-align: left;
  position: relative;
  bottom: 0;
  width: 100%;
  height: 280px;
  display: flex;
  flex-direction: column;
`;

const FooterTitle = styled.h1`
  font-size: ${({ theme }) => theme.fontSize.center};
  margin: auto;
  width: 1400px;
`;

const FooterSubTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.small};
  margin: 10px 0;
  margin: auto;
  width: 1400px;
`;

const Divider = styled.hr`
  width: 100%;
  border: none;
  border-top: 1px solid ${({ theme }) => theme.color.midgray};
  margin: 20px 0;
`;

const FooterText = styled.div`
  display: flex;
  justify-content: space-between;
  width: 1400px;
  line-height: 2; 
  margin: auto;
`;

const LeftText = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
`;

const RightText = styled.div`
  display: flex;
  align-items: center;
  text-align: right;
`;

const Footer = () => {
  const { showFooter } = getCommonStates();
  return showFooter && (
    <FooterContainer>
      <FooterTitle>Project Nonnull</FooterTitle>
      <FooterSubTitle>The Paper Prepared for You: NonNull</FooterSubTitle>
      <Divider />
      <FooterText>
        <LeftText>
          <div>© 2024 NonNull. All rights reserved.</div>
          <div>Nonnull의 콘텐츠를 사전 허가 없이 무단으로 크롤링 및 복제, 배포할 경우 책임을 물을 수 있습니다.</div>
          <div>서울 마포구 신촌로 176 중앙빌딩 중앙정보기술인재개발원</div>
        </LeftText>
        <RightText>
          <div>이용 약관 ㅣ 개인정보 처리방침 ㅣ 기관 소개</div>
        </RightText>
      </FooterText>
    </FooterContainer>
  );
};

export default React.memo(Footer);
