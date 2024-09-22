'use client';
import styled from 'styled-components';
import SubMenus from '@/mypage/components/SubMenus';
import Header from './Header';

const Mypage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1400px;
  margin-left: 180px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  aside {
    margin-right: 20px;
    position: relative;
  }

  .content {
    flex-grow: 1;
  }
`;

const MypageLayout = ({ children }) => {
  return (
    <>
      <Header />
      <Mypage>
      <SubMenus />
      <Wrapper className="layout-width">
        <section className="content">{children}</section>
      </Wrapper>
    </Mypage>
    </>
  );
};

export default MypageLayout;
