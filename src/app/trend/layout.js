'use client';
import styled from 'styled-components';
import TrendSub from '@/trend/components/TrendSub';

const Wrapper = styled.div`
  display: flex;
  aside {
    width: 180px;
    margin-right: 20px;
  }

  .content {
    flex-grow: 1;
  }
`;

const TrendLayout = ({ children }) => {
  return (
    <Wrapper className="layout-width">
      <TrendSub />
      <section className="content">{children}</section>
    </Wrapper>
  );
};

export default TrendLayout;
