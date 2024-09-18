import React from 'react';
import styled from 'styled-components';
import { color } from '@/theme/color';

const { navy } = color;

const BannerContainer = styled.section`
  width: 80%;
  height: auto;
  margin-left: auto; 
  border-bottom-left-radius: 100px; 
  overflow: hidden;

  img {
    width: 100%;
    height: auto;
    display: block;
    opacity: 0.7; 
    object-fit: cover;
  }
`;

const Banner = () => {
  return (
    <BannerContainer>
      <img src="/images/MainImg.jpg" alt="메인 이미지" />
    </BannerContainer>
  );
};

export default Banner;