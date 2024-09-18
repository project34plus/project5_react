import React from 'react';
import styled from 'styled-components';
import { color } from '@/theme/color';

const { darkgray } = color;

const FooterBox = styled.footer`
  background-color: ${darkgray};
`;

const Footer = () => {

  return (
    <FooterBox>
    </FooterBox>
  );
};

export default React.memo(Footer);