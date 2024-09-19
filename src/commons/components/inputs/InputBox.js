import React from 'react';
import styled, { css } from 'styled-components';
import fontSize from '@/app/styles/fontSize';
import { color } from '@/app/styles/color';

const { normal} = fontSize;
const {darkgray} = color;

const InputBox = styled.input`
  border: 1px solid ${darkgray};
  border-radius: 5px;
  padding: 5px;
  height: 35px;
  font-size: ${normal};
  ${({ width }) => css`
    width: ${width && '100px'};
  `}
`;
export default React.memo(InputBox);
