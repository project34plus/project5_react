import React from 'react';
import styled from 'styled-components';
import Select from 'react-select';
import { color } from '@/theme/color';
import fontSize from '@/theme/fontSize';
import { FaPlus } from 'react-icons/fa6';
import { ImSearch } from 'react-icons/im';

const { gray, white, navy } = color;
const { small, normal } = fontSize;

const options = [
    { value: 'ALL', label: '전체' },
    { value: 'TITLE', label: '논문명' },
    { value: 'POSTER', label: '저자명' }
];

const SearchBox = ({ form, onChange, onSubmit, selectChange }) => {
  return (
    <FormBox onSubmit={onSubmit} autoComplete="off">
      <div className="inputBox">
        <Select
          onChange={selectChange}
          options={options}
          styles={StyledSelect}
          placeholder='검색옵션'
        />
        <input
          type="text"
          name="skey"
          value={form.skey}
          onChange={onChange}
          placeholder="검색어를 입력하세요"
          className="inputBar"
        />
      </div>
      <div className="searchBar">
        <Button>
          <ImSearch />
        </Button>
      </div>
      <button className="plus">
        <FaPlus />
      </button>
    </FormBox>
  );
};

const FormBox = styled.form`
  display: flex;
  margin: 20px 0;
  justify-content: center;

  .inputBox {
    display: flex;
  }
  .inputBar {
    border: 1px solid ${gray};
    height: 60px;
    width: 500px;
    font-size: ${small};
    padding-left: 10px;
  }
  .plus {
    width: 60px;
    height: 60px;
    margin-left: 10px;

    svg {
      width: 25px;
      height: 25px;
    }
  }
`;

// 셀렉트박스
const StyledSelect = {
  control: (provided) => ({
    ...provided,
    border: `1px solid ${gray}`,
    height: '60px', // 컨트롤 높이
    marginRight: '10px',
    width: '170px',
    fontSize: `${small}`,
  }),
  option: (provided, state) => ({
    ...provided,
    padding: '15px 10px', 
    backgroundColor: state.isSelected ? `${navy}` : `${white}`,
    color: state.isSelected ? `${white}` : `${navy}`,
    '&:hover': {
      backgroundColor: `${navy}`,
      color: `${white}`,
    },
  }),
  menu: (provided) => ({
    ...provided,
    zIndex: 100, // 드롭다운 메뉴 z-index
    fontSize: `${small}`,
  }),
  singleValue: (provided) => ({
    ...provided,
    color: `${navy}`, // 선택된 값 색상
  }),
};

const Button = styled.button`
  height: 60px;
  width: 60px;

  svg {
    width: 25px;
    height: 25px;
  }
`;

export default SearchBox;
