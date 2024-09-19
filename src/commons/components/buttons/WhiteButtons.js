import styled, { css } from 'styled-components';
import fontSize from '@/app/styles/fontSize';
import { color } from '@/app/styles/color';
import fontWeight from '@/app/styles/fontWeight';

const commonStyle = css`
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 3px solid ${color.midNavy};
  margin: 10px;
  font-weight: ${fontWeight.bold};

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  }

  &:active {
    background-color: ${color.midNavy};
    transform: translateY(2px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    color: ${color.white};
  }
`;

const { extraSmall, small, normal, center } = fontSize;

const { midNavy, white } = color;

export const WhiteExtraSmallButton = styled.button`
  font-size: ${extraSmall};
  height: 30px;
  ${commonStyle}
  ${({ backgroundColor }) => css`
    background-color: ${backgroundColor || white};
  `}
  ${({ color }) => css`
    color: ${color || midNavy};
  `}
  ${({ width }) => css`
    width: ${width || '70px'};
  `}
`;

export const WhiteSmallButton = styled.button`
  font-size: ${small};
  height: 40px;
  ${commonStyle}
  ${({ backgroundColor }) => css`
    background-color: ${backgroundColor || white};
  `}
  ${({ color }) => css`
    color: ${color || midNavy};
  `}
  ${({ width }) => css`
    width: ${width || '100px'};
  `}
`;

export const WhiteMidButton = styled.button`
  font-size: ${normal};
  height: 50px;
  ${commonStyle}
  ${({ backgroundColor }) => css`
    background-color: ${backgroundColor || white};
  `}
  ${({ color }) => css`
    color: ${color || midNavy};
  `}
  ${({ width }) => css`
    width: ${width || '200px'};
  `}
`;

export const WhiteBigButton = styled.button`
  font-size: ${center};
  height: 65px;
  ${commonStyle}
  ${({ backgroundColor }) => css`
    background-color: ${backgroundColor || white};
  `}
  ${({ color }) => css`
    color: ${color || midNavy};
  `}
  ${({ width }) => css`
    width: ${width || '280px'};
  `}
`;

export const WhiteGoodButton = styled.button`
  font-size: ${center};
  height: 75px;
  ${commonStyle}
  ${({ backgroundColor }) => css`
    background-color: ${backgroundColor || white};
  `}
  ${({ color }) => css`
    color: ${color || midNavy};
  `}
  ${({ width }) => css`
    width: ${width || '200px'};
  `}
`;

export const WhiteSmallRoundButton = styled.button`
  border-radius: 30px !important;
  font-size: ${normal};
  height: 55px;
  ${commonStyle}
  ${({ backgroundColor }) => css`
    background-color: ${backgroundColor || white};
  `}
  ${({ color }) => css`
    color: ${color || midNavy};
  `}
  ${({ width }) => css`
    width: ${width || '200px'};
  `}
`;

export const WhiteBigRoundButton = styled.button`
  border-radius: 40px !important;
  font-size: ${center};
  height: 70px;
  ${commonStyle}
  ${({ backgroundColor }) => css`
    background-color: ${backgroundColor || white};
  `}
  ${({ color }) => css`
    color: ${color || midNavy};
  `}
  ${({ width }) => css`
    width: ${width || '300px'};
  `}
`;

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
