import React from 'react';
import styled from 'styled-components';
import SearchBox from './SearchBox';
import MainTitle from './MainTitle';
import Image from 'next/image';

const Container = styled.div`
  width: 100%;
  height: 700px;
  position: relative;
`;

const BannerContainer = styled.section`
  width: 90%;
  height: 500px;
  margin-left: auto;
  border-bottom-left-radius: 100px;
  overflow: hidden;

  img {
    width: 100%;
    height: 700px;
    display: block;
    object-fit: cover;
  }
`;

const SearchBoxContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const TitleContainer = styled.div`
  position: absolute;
  top: 3%;
  left: 18%;
  text-align: left;
`;

const Banner = () => {
  return (
    <Container>
      <BannerContainer>
        <Image
          src="/images/MainImg.jpg"
          alt="메인 이미지"
          width={1200}
          height={700}
        />
        <TitleContainer>
          <MainTitle />
        </TitleContainer>
      </BannerContainer>
      <SearchBoxContainer>
        <SearchBox />
      </SearchBoxContainer>
    </Container>
  );
};

export default React.memo(Banner);
