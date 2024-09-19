import React from 'react';
import styled from 'styled-components';
import { ImSearch } from 'react-icons/im';
import Select from 'react-select';

const options = [].map((item) => ({
  value: item.title,
  label: '논문명',
}));

const SearchBox = ({ form, onChange, onSubmit, selectChange, options }) => {
  return (
    <FormBox onSubmit={onSubmit} autoComplete="off">
      <div className="input_part">
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
      <div className="rsv_searchBar">
        <Button>
          <ImSearch />
        </Button>
      </div>
    </FormBox>
  );
};

const FormBox = styled.form``;

const Button = styled.button``;

export default SearchBox;
