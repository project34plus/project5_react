'use client';
import styled from 'styled-components';
import SubMenus from '@/mypage/components/SubMenus';
import Header from './Header';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  aside {
    width: 180px;
    margin-right: 20px;
  }

  .content {
    flex-grow: 1;
  }
`;

const MypageLayout = ({ children }) => {
  return (
    <>
      <Header />
      <Wrapper className="layout-width">
        <SubMenus />
        <section className="content">{children}</section>
      </Wrapper>
    </>
  );
};

export default MypageLayout;
