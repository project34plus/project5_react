'use client';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { CommonProvider } from '@/commons/contexts/CommonContext';
import { WishListProvider } from '@/commons/contexts/WishListContext';
import { getUserContext, UserInfoProvider } from '@/commons/contexts/UserInfoContext';
import SiteTitle from '@/commons/components/SiteTitle';
import Header from '@/outlines/Header';
import Footer from '@/outlines/Footer';
import MainMenu from '@/outlines/MainMenu';
import ScrollToTop from '@/mainpage/components/ScrollTopButton';
import { theme } from '../theme';
import '../i18n';

import './globals.css';

// export const metadata = {
//   title: '@NonNull',
//   description: '논문을 널위해 준비했어..',
// };

export default function RootLayout({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <UserInfoProvider>
        <WishListProvider>
          <CommonProvider>
            <html lang="ko">
            <head>
              <SiteTitle />
            </head>
            <body>
            <Header />
            <MainMenu />
            <main>
              {children}
              <ScrollToTop />
            </main>
            <Footer />
            </body>
            </html>
          </CommonProvider>
        </WishListProvider>
      </UserInfoProvider>
    </ThemeProvider>
  );
}
