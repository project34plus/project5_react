import React from 'react';
import styled from 'styled-components';

const ScrollToTopButton = styled.button`
  position: fixed;
  bottom: 30px;
  right: 30px;
  background-color:  ${({ theme }) => theme.color.lightGrayNavy};
  font-size: ${({ theme }) => theme.fontSize.small};
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  cursor: pointer;
  z-index: 1000;
  height: 50px;

  &:hover {
    background-color: ${({ theme }) => theme.color.lightNavy};
  }
`;

const ScrollToTop = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return <ScrollToTopButton onClick={scrollToTop}>↑ Top</ScrollToTopButton>;
};

export default React.memo(ScrollToTop);
