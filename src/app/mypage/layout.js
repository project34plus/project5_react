'use client';
import styled from 'styled-components';
import SubMenus from '@/mypage/components/SubMenus';
import Header from './Header';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;

  aside {
    width: 180px;
    margin-right: 20px;
  }

  .content {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const MypageLayout = ({ children }) => {
  return (
    <>
      <Header />
      <Wrapper className="layout-width">
        <section className="content">
          <div className="submenu">
            <SubMenus />
          </div>
          <div className="main-content">{children}</div>
        </section>
      </Wrapper>
    </>
  );
};

export default MypageLayout;
