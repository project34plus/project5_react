import React from 'react';
import styled from 'styled-components';
export const StyledInput = styled.input`
  border: 1px solid ${({ theme }) => theme.color.darkgray};
  padding: 10px;
  border-radius: 5px;
  width: 100%;
  height: 35px;
  font-size: ${({ theme }) => theme.fontSize.normal};
`;
