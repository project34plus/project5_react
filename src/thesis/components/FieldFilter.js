import React, { useState } from 'react';
import styled from 'styled-components';
import { color } from '@/theme/color';

const {navy, white} = color;

const FieldFilter = ({ fieldList, onFieldChange }) => {
  const [selectedField, setSelectedField] = useState(null);

  const handleFieldClick = (value) => {
    setSelectedField(value);
    onFieldChange(value); // 부모 컴포넌트에 선택된 필드 전달
  };

  return (
    <Wrapper>
        {fieldList.map(({ value, name }) => (
          <Button
            key={value}
            onClick={() => handleFieldClick(value)}
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
  border-radius: 5px;

  &:hover {
    background: ${navy};
    color: ${white};
  }
`;

export default React.memo(FieldFilter);
