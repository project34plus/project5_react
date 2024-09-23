"use client";
import React from 'react';
import Link from 'next/link';
import Banner from '@/mainpage/containers/BannerContainer';
import LatestPaperContainer from '@/mainpage/containers/LatestPaperContainer';
import ThemeBasedPaperContainer from '@/mainpage/containers/ThemeBasedPaperContainer';
import MenuContainer from '@/mainpage/containers/MenuContainer';
const Home = () => {
  return (
    <>
    <Banner />
    <LatestPaperContainer />
    <ThemeBasedPaperContainer />
    <MenuContainer />
    </>
  );
};

export default Home;
