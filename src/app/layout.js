"use client";
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { CommonProvider } from '@/commons/contexts/CommonContext';
import { UserInfoProvider } from '@/commons/contexts/UserInfoContext';
import SiteTitle from '@/commons/components/SiteTitle';
import Header from '@/outlines/Header';
import Footer from '@/outlines/Footer';
import MainMenu from '@/outlines/MainMenu';
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
        <CommonProvider>
          <html lang="ko">
            <head>
              <SiteTitle />
            </head>
            <body>
              <Header />
              <MainMenu />
              <main>{children}</main>
              <Footer />
            </body>
          </html>
        </CommonProvider>
      </UserInfoProvider>
    </ThemeProvider>
  );
}
