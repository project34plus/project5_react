import styled, { css } from 'styled-components';
import { color } from '@/app/styles/color';
import fontSize from '@/app/styles/fontSize';

const commonStyle = css`
  width: 100%;
  border-radius: 3px;
  cursor: pointer;
`;

const {
    navy,
    midNavy,
    lightNavy,
    grayNavy,
    whiteGrayNavy,
    yellow,
    lemon,
    lightGrayNavy,
    gray,
  } = color;

  

export const ExtraSmallButton = styled.button``;
export const SmallButton = styled.button``;
export const MidButton = styled.button``;
export const BigButton = styled.button``;
export const ExtraBigButton = styled.button``;
export const ButtonGroup = styled.div`
  display: flex;
  width: ${({ width }) => (width ? `${width}px` : '100%')};
  margin: 20px auto;

  button {
    width: 0;
    flex-grow: 1;
  }

  button + button {
    margin-left: 5px;
  }
`;
