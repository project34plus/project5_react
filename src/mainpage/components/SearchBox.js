import React from 'react';
import styled from 'styled-components';

const SearchBoxContainer = styled.div`
  display: flex;
  align-items: center;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  width: 800px;
`;

const SearchInput = styled.input`
  height: 60px;
  background-color: ${({ theme }) => theme.color.white};
  border: 3px solid ${({ theme }) => theme.color.navy};
  padding: 10px;
  flex: 1;
  border-radius: 5px 0 0 5px;
  color: ${({ theme }) => theme.color.black};
  font-size: ${({ theme }) => theme.fontSize.small};

  &::placeholder {
    color: ${({ theme }) => theme.color.midgray};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.color.navy};
  }
`;

const SearchButton = styled.button`
  background-color: ${({ theme }) => theme.color.navy};
  font-size: ${({ theme }) => theme.fontSize.small};
  color: ${({ theme }) => theme.color.white};
  border: none;
  border-radius: 0 5px 5px 0;
  padding: 10px 15px;
  cursor: pointer;
  transition: background-color 0.3s;
  height: 60px;
  width: 80px;
`;

const SearchBox = () => {
  return (
    <SearchBoxContainer>
      <SearchInput type="text" placeholder="검색어를 입력하세요" />
      <SearchButton>검색</SearchButton>
    </SearchBoxContainer>
  );
};

export default React.memo(SearchBox);