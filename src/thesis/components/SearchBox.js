import React from 'react';
import styled from 'styled-components';
import Select from 'react-select';
import { color } from '@/theme/color';
import fontSize from '@/theme/fontSize';
import { FaPlus } from 'react-icons/fa6';
import { ImSearch } from 'react-icons/im';

const { gray, white } = color;
const { small, normal } = fontSize;

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
        <Select
          onChange={selectChange}
          options={options}
          styles={customStyles}
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
    }
  }
  .plus {
    width: 40px;
    height: 40px;
    margin-left: 10px;
  }
`;

const customStyles = styled(Select)`

`;

const Button = styled.button`
  height: 40px;
  width: 50px;
`;

export default SearchBox;
