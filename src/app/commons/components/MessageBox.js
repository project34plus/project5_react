import React from 'react';
import styled, { css } from 'styled-components';
import { color } from '../../styles/color';
import fontSize from '../../styles/fontSize';

const { normedium } = fontSize;
const { dark, danger } = color;

const Box = styled.div`
  text-align: left;
  padding: 10px;
  font-size: ${normedium};
  border-radius: 3px;
  color: ${dark};

  ${({ color: c }) =>
    c &&
    css`
      color: ${danger};
    `}
`;

const MessageBox = ({ messages, color, children, index = 0 }) => {
  // messages 배열이 정의되지 않았을 경우 빈 배열로 초기화
  messages = messages || [];

  // children이 있으면 messages 배열에 추가
  if (children) messages.push(children);

  // 인덱스를 통해 특정 메시지만 사용
  const message = messages[index];

  return message ? (
    <Box color={color}>
      {message}
    </Box>
  ) : null;
};

export default React.memo(MessageBox);
