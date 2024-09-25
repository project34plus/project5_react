import React, { useState } from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
import { color } from '@/theme/color';
import fontSize from '@/theme/fontSize';

const { navy, white, yellow } = color;
const { small } = fontSize;

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
  border: 1px solid #ccc;
  background: ${white};
  color: ${navy};
  cursor: pointer;
  border-radius: 15px;
  font-size: ${small};

  &:hover {
    background: ${yellow};
    color: ${white};
  }
`;

export default React.memo(FieldFilter);
