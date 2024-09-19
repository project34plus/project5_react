import React from 'react';
import styled from 'styled-components';

const JoinInput = styled.input`
  border-bottom: 3px solid ${({ theme }) => theme.color.gray};
  padding: 5px 15px;
  height: 70px;
  font-size: ${({ theme }) => theme.fontSize.normal};
  width: 100%;
  margin-bottom: 20px;
`;
export default React.memo(JoinInput);
