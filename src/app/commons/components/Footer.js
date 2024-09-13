'use client';
import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { color } from '@/app/styles/color';

const { navy, white } = color;

const FooterBox = styled.footer`
.footerContainer {
background: ${color.darkgray}
height: 200px;
}
`;

const Footer = () => {
  const { t } = useTranslation();
  return (
    <FooterBox>
      <div className="footerContainer">
        <div className="footerAbout">
        </div>
        <div className="footerContact">
        </div>
      </div>
      <div className="footerBottom">
      </div>
    </FooterBox>
  );
};

export default React.memo(Footer);
