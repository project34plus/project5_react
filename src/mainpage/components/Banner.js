import React from 'react';
import styled from 'styled-components';
import SearchBox from './SearchBox';

const Container = styled.div`
  width: 100%;
  height: 700px;
  position: relative;
`;

const BannerContainer = styled.section`
  width: 80%;
  height: 700px;
  margin-left: auto; 
  border-bottom-left-radius: 100px; 
  overflow: hidden;

  img {
    width: 100%;
    height: 700px;
    display: block;
    opacity: 0.7; 
    object-fit: cover;
  }
`;

const SearchBoxContainer = styled.div`
  position: absolute; 
  top: 50%; 
  left: 50%;
   transform: translate(-50%, -50%);
`;

const Banner = () => {
  return (
    <Container>
      <BannerContainer>
        <img src="/images/MainImg.jpg" alt="메인 이미지" />
      </BannerContainer>
      <SearchBoxContainer>
        <SearchBox />
      </SearchBoxContainer>
    </Container>
  );
};

export default Banner;