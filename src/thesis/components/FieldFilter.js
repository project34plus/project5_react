import React, { useState } from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
import { color } from '@/theme/color';
import fontSize from '@/theme/fontSize';

const { navy, white, yellow, gray } = color;
const { small, normal } = fontSize;

const FieldFilter = ({ fieldList, selected, onFieldChange }) => {
  return (
    <Wrapper>
      {fieldList.map(({ value, name }) => (
        <Button
          type="button"
          key={value}
          className={classNames({ on: selected.includes(value) })}
          onClick={() => onFieldChange(value)}
        >
          {name}
        </Button>
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  gap: 10px; //버튼 간격
`;

const Button = styled.button`
  padding: 10px 15px;
  border: 1px solid ${gray};
  background: ${white};
  color: ${navy};
  cursor: pointer;
  border-radius: 15px;
  font-size: ${normal};

  &:hover {
    background: ${yellow};
    color: ${white};
    border-color: ${yellow};
  }

  &.on {
    // 선택된 버튼 스타일
    background: ${yellow}; // 선택된 상태에서 배경색
    color: ${white}; // 선택된 상태에서 글자색
    border: none;
  }
`;

export default React.memo(FieldFilter);
