import styled, { css } from 'styled-components';

const commonStyle = css`
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  margin: 10px;

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  }

  &:active {
    transform: translateY(2px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }
`;

export const ExtraSmallButton = styled.button`
  ${({ theme }) => css`
    font-size: ${theme.fontSize.extraSmall};
  `}
  height: 30px;
  ${commonStyle}
  ${({ backgroundColor }) => css`
    background: ${backgroundColor ||
    'linear-gradient(to bottom, #7892c2 3%, #035397 100%)'};
  `}
  ${({ color }) => css`
    color: ${color || 'white'};
  `}
  ${({ width }) => css`
    width: ${width || '70px'};
  `}
`;

export const SmallButton = styled.button`
  ${({ theme }) => css`
    font-size: ${theme.fontSize.small};
  `}
  height: 40px;
  ${commonStyle}
  ${({ backgroundColor }) => css`
    background: ${backgroundColor ||
    'linear-gradient(to bottom, #7892c2 3%, #035397 100%)'};
  `}
  ${({ color }) => css`
    color: ${color || 'white'};
  `}
  ${({ width }) => css`
    width: ${width || '100px'};
  `}
`;

export const MidButton = styled.button`
  ${({ theme }) => css`
    font-size: ${theme.fontSize.normal};
  `}
  height: 50px;
  ${commonStyle}
  ${({ backgroundColor }) => css`
    background: ${backgroundColor ||
    'linear-gradient(to bottom, #7892c2 3%, #035397 100%)'};
  `}
  ${({ color }) => css`
    color: ${color || 'white'};
  `}
  ${({ width }) => css`
    width: ${width || '200px'};
  `}
`;

export const BigButton = styled.button`
  ${({ theme }) => css`
    font-size: ${theme.fontSize.center};
  `}
  height: 65px;
  ${commonStyle}
  ${({ backgroundColor }) => css`
    background: ${backgroundColor ||
    'linear-gradient(to bottom, #7892c2 3%, #035397 100%)'};
  `}
  ${({ color }) => css`
    color: ${color || 'white'};
  `}
  ${({ width }) => css`
    width: ${width || '280px'};
  `}
`;

export const GoodButton = styled.button`
  ${({ theme }) => css`
    font-size: ${theme.fontSize.center};
  `}
  height: 75px;
  ${commonStyle}
  ${({ backgroundColor }) => css`
    background: ${backgroundColor ||
    'linear-gradient(to bottom, #7892c2 3%, #035397 100%)'};
  `}
  ${({ color }) => css`
    color: ${color || 'white'};
  `}
  ${({ width }) => css`
    width: ${width || '200px'};
  `}
`;

export const SmallRoundButton = styled.button`
  border-radius: 30px !important;
  ${({ theme }) => css`
    font-size: ${theme.fontSize.normal};
  `}
  height: 55px;
  ${commonStyle}
  ${({ backgroundColor }) => css`
    background: ${backgroundColor ||
    'linear-gradient(to bottom, #7892c2 3%, #035397 100%)'};
  `}
  ${({ color }) => css`
    color: ${color || 'white'};
  `}
  ${({ width }) => css`
    width: ${width || '200px'};
  `}
`;

export const BigRoundButton = styled.button`
  border-radius: 40px !important;
  ${({ theme }) => css`
    font-size: ${theme.fontSize.normal};
  `}
  height: 70px;
  ${commonStyle}
  ${({ backgroundColor }) => css`
    background: ${backgroundColor ||
    'linear-gradient(to bottom, #7892c2 3%, #035397 100%)'};
  `}
  ${({ color }) => css`
    color: ${color || 'white'};
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
