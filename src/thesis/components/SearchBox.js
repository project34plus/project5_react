import React from 'react';
import styled from 'styled-components';
import Select from 'react-select';
import { color } from '@/theme/color';
import fontSize from '@/theme/fontSize';
import { FaPlus } from 'react-icons/fa6';
import { ImSearch } from 'react-icons/im';

const { gray, white } = color;
const { small, normal } = fontSize;

const options = [...new Array().keys()].map(
  (item) => (
    { value: 'ALL', label: '전체' },
    { value: item.title, label: '논문명' },
    { value: item.poster, label: '저자명' }
  ),
);

const SearchBox = ({ form, onChange, onSubmit, selectChange }) => {
  return (
    <FormBox onSubmit={onSubmit} autoComplete="off">
      <div className="inputBox">
        {/* <select name="sopt" onChange={onChange} defaultValue={form.sopt}>
            <option value="ALL">통합검색</option>
            <option value="TITLE">논문명</option>
          </select> */}
        <Select
          onChange={selectChange}
          options={options}
          styles={StyledSelect}
          className="select"
        />
        <input
          type="text"
          name="skey"
          value={form.skey}
          onChange={onChange}
          placeholder="검색어를 입력하세요"
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

    input {
      border: 1px solid ${gray};
      height: 60px;
      width: 500px;
      font-size: ${small};
      padding-left: 10px;
    }
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
  }),
  singleValue: (provided) => ({
    ...provided,
    color: gray,
    lineHeight: '60px', // 선택된 값 세로 정렬
  }),
  indicatorContainer: (provided) => ({
    ...provided,
    height: '60px', // 드롭다운 화살표 높이
    padding: '0 8px', // 패딩 조정
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? gray : 'white',
    color: state.isSelected ? 'white' : gray,
    '&:hover': {
      backgroundColor: gray,
      color: 'white',
    },
  }),
  menu: (provided) => ({
    ...provided,
    zIndex: 100, // 드롭다운 메뉴 z-index
  }),
  hlgwow: () => ({
    height: '60px',
  })
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
