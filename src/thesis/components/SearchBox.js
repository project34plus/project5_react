import React from 'react';
import styled from 'styled-components';
import { ImSearch } from 'react-icons/im';
import Select from 'react-select';
import { color } from '@/theme/color';

const { gray } = color;

const options = [].map(
  (item) => (
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
        <Select onChange={selectChange} className="select" options={options} />
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
    </FormBox>
  );
};

const FormBox = styled.form`
display: flex;
  .inputBox {
    display: flex;

    input {
      border: 1px solid ${gray};
      height: 40px;
    }
  }
  
  .select__control {
  height: 40px;
  }

`;

const Button = styled.button`
  height: 40px;
  width: 50px;
`;

export default SearchBox;
