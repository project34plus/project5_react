'use client';
import styled, { css } from 'styled-components';
import fontSize from '@/app/styles/fontSize';
import { color } from '@/app/styles/color';

const commonStyle = css`
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  margin: 10px;

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  &:active {
    background-color: ${color.navy};
    transform: translateY(2px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
`;

const { extraSmall, small, normal } = fontSize;

const {
  midNavy,
  white,
} = color;

export const ExtraSmallButton = styled.button`
  font-size: ${extraSmall};
  height: 30px;
  ${commonStyle}
  ${({ backgroundColor }) => css`
    background-color: ${backgroundColor || midNavy};
  `}
  ${({ color }) => css`
    color: ${color || white};
  `}
  ${({ width }) => css`
    width: ${width || '70px'};
  `}
`;

export const SmallButton = styled.button`
  font-size: ${small};
  height: 40px;
  ${commonStyle}
  ${({ backgroundColor }) => css`
    background-color: ${backgroundColor || midNavy};
  `}
  ${({ color }) => css`
    color: ${color || white};
  `}
  ${({ width }) => css`
    width: ${width || '100px'};
  `}
`;

export const MidButton = styled.button`
  font-size: ${normal};
  height: 50px;
  ${commonStyle}
  ${({ backgroundColor }) => css`
    background-color: ${backgroundColor || midNavy};
  `}
  ${({ color }) => css`
    color: ${color || white};
  `}
  ${({ width }) => css`
    width: ${width || '200px'};
  `}
`;

export const BigButton = styled.button`
  font-size: ${normal};
  height: 60px;
  ${commonStyle}
  ${({ backgroundColor }) => css`
    background-color: ${backgroundColor || midNavy};
  `}
  ${({ color }) => css`
    color: ${color || white};
  `}
  ${({ width }) => css`
    width: ${width || '280px'};
  `}
`;

export const WideButton = styled.button`
  font-size: ${normal};
  height: 55px;
  ${commonStyle}
  ${({ backgroundColor }) => css`
    background-color: ${backgroundColor || midNavy};
  `}
  ${({ color }) => css`
    color: ${color || white};
  `}
  ${({ width }) => css`
    width: ${width || '600px'};
  `}
`;

export const SmallRoundButton = styled.button`
  border-radius: 30px !important;
  font-size: ${normal};
  height: 55px;
  ${commonStyle}
  ${({ backgroundColor }) => css`
    background-color: ${backgroundColor || midNavy};
  `}
  ${({ color }) => css`
    color: ${color || white};
  `}
  ${({ width }) => css`
    width: ${width || '200px'};
  `}
`;

export const BigRoundButton = styled.button`
  border-radius: 40px !important;
  font-size: ${normal};
  height: 60px;
  ${commonStyle}
  ${({ backgroundColor }) => css`
    background-color: ${backgroundColor || midNavy};
  `}
  ${({ color }) => css`
    color: ${color || white};
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
