import React from 'react';
import styled from 'styled-components';

const MessageBox = styled.div`
  color: ${({ theme }) => theme.color.danger};
  font-size: ${({ theme }) => theme.fontSize.small};
  margin-left: 20px;
`;

export default function StyledMessage({ children }) {
  if (!children) return;

  const messages = Array.isArray(children) ? children : [children];
  return messages.map((message) => (
    <MessageBox key={Date.now() + '_' + message}>{message}</MessageBox>
  ));
}
