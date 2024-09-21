import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import Select from 'react-select';
import { color } from '@/theme/color';
import fontSize from '@/theme/fontSize';
import { FaPlus, FaMinus } from 'react-icons/fa6';
import DatePicker from 'react-datepicker';

const { gray, white, navy } = color;
const { small, normal } = fontSize;

const options = [
  { value: 'ALL', label: '전체' },
  { value: 'TITLE', label: '논문명' },
  { value: 'POSTER', label: '저자명' },
];

const SearchItemRows = ({options, form, onChange, i}) => {
  return (
    <div className="inputBox">
      <select name='sopts'
        value={form?.sopts?.length > i ? form?.sopts[i] : ''}
        onChange={(e) => onChange(e, i)}>
          {options.map(({value, label}) => <option key={`sopt_${value}`} value={value}>{label}</option>)}
      </select>
      
      <select name='operators' value={form?.operators?.length > i ? form?.operators[i] : ''} onChange={(e) => onChange(e, i)}>
        <option value='AND'>AND</option>
        <option value='OR'>OR</option>
        <option value='NOT'>NOT</option>
      </select>
      <input
        type="text"
        name="skeys"
        value={form?.skeys?.length > i ? form?.skeys[i] : ''}
        onChange={(e) => onChange(e, i)}
        placeholder="검색어를 입력하세요"
        className="inputBar"
      />
    </div>
  );
};



const SearchBox = ({ form, onChange, onSubmit }) => {

  const [itemsRows, setItemRows] = useState([]);

  useEffect(() => {
    setItemRows(form.searchRowsLast > 0 ? [...new Array(form.searchRowsLast).keys()].map(_ => SearchItemRows) : []);
  }, [form.searchRowsLast]);

  const onClick = useCallback((mode) => {
   
    setItemRows(items => {
       const newitems = mode === 'minus' ? items.filter((_, i) => i !== items.length - 1) : items.concat(SearchItemRows);
       onChange({target: {name: 'searchRowsLast', value: newitems.length}});
       return newitems;
    });
  }, [onChange]);

  return (
    <FormBox onSubmit={onSubmit} autoComplete="off">
      <div className="word-search">
        <p>검색어</p>
        <SearchItemRows options={options} form={form} onChange={onChange} i={0}/>
        {itemsRows.map((ItemRow, i) => <ItemRow key={`item-row-${i}`} options={options} form={form} onChange={onChange} i={i+1}/> )}
      
        <button type="button" className="plus" onClick={() => onClick('plus')}>
          <FaPlus />
        </button>
        <button type="button" className="minus" onClick={() => onClick('minus')}>
          <FaMinus />
        </button>
      </div>
      <div className="field-subject">
        <p>주제분류</p>
      </div>
      <div className="publish-date">
        <p>발행연도</p>
        <DatePicker></DatePicker>
        <DatePicker></DatePicker>
      </div>
      <Button>검색하기</Button>
    </FormBox>
  );
};

const FormBox = styled.form`
  display: flex;
  flex-direction: column;
  margin: 20px 0;
  justify-content: center;
  align-items: center;

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
  .plus,
  .minus {
    width: 50px;
    height: 50px;
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
  height: 50px;
  width: 150px;

  svg {
    width: 25px;
    height: 25px;
  }
`;

export default SearchBox;
