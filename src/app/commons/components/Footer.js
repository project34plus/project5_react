'use client';
import React from 'react';
import styled from 'styled-components';
import { color } from '@/app/styles/color';

const FooterBox = styled.footer`
.footerContainer {
  background: ${color.darkgray}
  height: 200px;
}
`;

const Footer = () => {
  return (
    <FooterBox>
      <div className="footerContainer">
        <div className="footerAbout"></div>
        <div className="footerContact"></div>
      </div>
      <div className="footerBottom"></div>
    </FooterBox>
  );
};

export default React.memo(Footer);
