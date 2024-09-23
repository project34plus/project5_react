import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import Select from 'react-select';
import { color } from '@/theme/color';
import fontSize from '@/theme/fontSize';
import { FaPlus, FaMinus } from 'react-icons/fa6';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';
import { registerLocale } from 'react-datepicker';
import { ko } from 'date-fns/locale/ko';
import FieldFilter from './FieldFilter';
registerLocale('ko', ko);

const { gray, white, navy, black } = color;
const { small, normal } = fontSize;

const fieldList = [
  { name: '공학', value: '공학' },
  { name: '농수해양학', value: '농수해양학' },
  { name: '복합학', value: '복합학' },
  { name: '사회과학', value: '사회과학' },
  { name: '예술체육학', value: '예술체육학' },
  { name: '의약학', value: '의약학' },
  { name: '인문학', value: '인문학' },
  { name: '자연과학', value: '자연과학' },
  { name: '미분류', value: '미분류' },
];

const options = [
  { value: 'ALL', label: '전체' },
  { value: 'TITLE', label: '논문명' },
  { value: 'POSTER', label: '저자명' },
  { value: 'TH-ABSTRACT', label: '초록' },
  { value: 'PUBLISHER', label: '발행기관' },
  { value: 'LANGUAGE', label: '언어' },
  { value: 'COUNTRY', label: '국가' },
];

const SearchItemRows = ({ options, form, onChange, i }) => {
  return (
    <div className="inputBox">
      <select
        name="operators"
        value={form?.operators?.length > i ? form?.operators[i] : ''}
        onChange={(e) => onChange(e, i)}
      >
        <option value="AND">AND</option>
        <option value="OR">OR</option>
        <option value="NOT">NOT</option>
      </select>
      <select
        name="sopts"
        value={form?.sopts?.length > i ? form?.sopts[i] : ''}
        onChange={(e) => onChange(e, i)}
      >
        {options.map(({ value, label }) => (
          <option key={`sopt_${value}`} value={value}>
            {label}
          </option>
        ))}
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
  const { t } = useTranslation();
  const [filteredField, setFilteredField] = useState(null); // 필터링된 필드 상태

  useEffect(() => {
    setItemRows(
      form.searchRowsLast > 0
        ? [...new Array(form.searchRowsLast).keys()].map((_) => SearchItemRows)
        : [],
    );
  }, [form.searchRowsLast]);

  const onClick = useCallback(
    (mode) => {
      setItemRows((items) => {
        const newitems =
          mode === 'minus'
            ? items.filter((_, i) => i !== items.length - 1)
            : items.concat(SearchItemRows);
        onChange({
          target: { name: 'searchRowsLast', value: newitems.length },
        });
        return newitems;
      });
    },
    [onChange],
  );

  // 대분류 필터링 처리
  const handleFieldChange = (selectedField) => {
    setFilteredField(selectedField);
  };

  return (
    <FormBox onSubmit={onSubmit} autoComplete="off">
      <div className="word-search-form">
        <p>검색어</p>
        <div className="word-search">
          <SearchItemRows
            options={options}
            form={form}
            onChange={onChange}
            i={0}
          />
          {itemsRows.map((ItemRow, i) => (
            <ItemRow
              key={`item-row-${i}`}
              options={options}
              form={form}
              onChange={onChange}
              i={i + 1}
            />
          ))}
        </div>
        <div className="btn-group">
          <button
            type="button"
            className="plus"
            onClick={() => onClick('plus')}
          >
            <FaPlus />
          </button>
          <button
            type="button"
            className="minus"
            onClick={() => onClick('minus')}
          >
            <FaMinus />
          </button>
        </div>
      </div>
      <div className="field-subject">
        <p>주제분류</p>
        <FieldFilter fieldList={fieldList} onFieldChange={handleFieldChange} />
      </div>
      <div className="publish-date">
        <p>발행일</p>
        <div className="sdate">
          <DatePicker
            className="pick_sdate"
            locale="ko"
            selected={form?.sDate ? new Date(form.sDate) : null}
            onChange={(date) =>
              onChange({
                target: { name: 'sDate', value: format(date, 'yyyy-MM-dd') },
              })
            }
            dateFormat="yyyy-MM-dd" // 날짜 포맷 설정
            placeholderText={t('검색시작일')}
          />
        </div>
        <div>~</div>
        <div className="edate">
          <DatePicker
            className="pick_edate"
            locale="ko"
            selected={form?.eDate ? new Date(form.eDate) : null}
            onChange={(date) =>
              onChange({
                target: { name: 'eDate', value: format(date, 'yyyy-MM-dd') },
              })
            }
            dateFormat="yyyy-MM-dd" // 날짜 포맷 설정
            placeholderText={t('검색종료일')}
          />
        </div>
      </div>
      <div className="btn-group">
        <Button>검색하기</Button>
        <Button type="reset">초기화</Button>
      </div>
    </FormBox>
  );
};

const FormBox = styled.form`
  display: flex;
  flex-direction: column;
  margin: 40px 0 20px;
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
  .word-search-form {
    display: flex;
    align-items: center;
    margin-bottom: 20px;

    .word-search {
      display: flex;
      align-items: center;
      flex-direction: column;
    }
    > p {
      margin: 0 20px 0 0;
    }
  }

  .field-subject {
    margin-bottom: 20px;
    display: flex;
    align-items: center;

    > p {
      margin: 0 20px 0 0;
      text-align: left; /* 왼쪽 정렬 */
    }
  }

  .btn-group {
    margin-left: 10px;
  }

  .plus,
  .minus {
    width: 50px;
    height: 50px;

    svg {
      width: 25px;
      height: 25px;
    }
  }
  .publish-date {
    height: 45px;
    display: flex;
    gap: 10px;
    margin-bottom: 30px;
    align-items: center;
    > p {
      margin: 0 10px 0 0;
    }

    .pick_sdate,
    .pick_edate {
      border: 1px solid ${gray};
      display: flex;
      align-items: center;
      width: 160px;
      height: 45px;
      text-align: center;
      box-sizing: border-box;
      font-size: ${small};
      padding: 8px 20px;
      border-radius: 4px;
    }

    .react-datepicker {
      width: 300px;
      height: 300px;
      border-radius: 10px;
    }

    .react-datepicker__navigation--next,
    .react-datepicker__navigation--previous {
      margin: 5px 5px 0 5px;
    }

    .react-datepicker__month-container {
      width: 100%;
      height: 100%;
      border-radius: 10px;
      border: 1px solid ${gray};
    }

    .react-datepicker__triangle {
      fill: ${white};
      color: ${white};
    }

    .react-datepicker__header {
      background: #e2f7dd;
      width: 100%;
      padding: 10px;
      border-radius: 10px 10px 0 0;
      text-align: center;
    }

    //요일
    .react-datepicker__day-names {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 10px;
      width: 100%;
      font-weight: bold;
    }

    .react-datepicker__week {
      justify-content: space-between;
      display: flex;
      padding: 5px;

      > * {
        display: flex;
        width: 30px;
        height: 30px;
        justify-content: center;
        align-items: center;
        color: ${black};
        text-align: center;
        font-size: ${small};
        line-height: 1;
      }
    }

    //날짜
    .react-datepicker__month {
      display: flex;
      flex-direction: column;
      margin-top: 5px;
    }

    .react-datepicker__day {
      color: ${gray};
      margin: 0;
    }

    react-datepicker__day--weekend {
      color: #red;
    }

    .react-datepicker__current-month {
      font-size: ${small};
      margin-top: 3px;
    }

    .react-datepicker__day--today {
      // 오늘 날짜 하이라이트 커스텀
      color: ${navy};
      border: 1px solid ${gray};
      border-radius: 50%;
    }
    .react-datepicker__day--selected {
      background: ${gray};
      color: ${white};
      border-radius: 50%;
    }
    .react-datepicker__day:hover {
      background-color: ${navy}; /* 마우스 오버 시 배경색 변경 */
      color: ${gray}; /* 마우스 오버 시 텍스트 색상 변경 */
      border-radius: 50%; /* 원형 테두리 적용 */
    }

    .react-datepicker__day--outside-month {
      color: ${gray};
    }

    .react-datepicker__day--keyboard-selected {
      border-radius: 50%;
      background-color: ${navy};
    }
  }

  .btn-group {
    display: flex;
    gap: 10px;
  }

  select {
    margin-right: 5px;
    width: 100px;
    border: ${gray} 1px solid;
    font-size: ${small};
  }
`;

// 셀렉트
// const StyledSelect = {
//   control: (provided) => ({
//     ...provided,
//     border: `1px solid ${gray}`,
//     height: '60px', // 컨트롤 높이
//     marginRight: '10px',
//     width: '170px',
//     fontSize: `${small}`,
//   }),
//   option: (provided, state) => ({
//     ...provided,
//     padding: '15px 10px',
//     backgroundColor: state.isSelected ? `${navy}` : `${white}`,
//     color: state.isSelected ? `${white}` : `${navy}`,
//     '&:hover': {
//       backgroundColor: `${navy}`,
//       color: `${white}`,
//     },
//   }),
//   menu: (provided) => ({
//     ...provided,
//     zIndex: 100, // 드롭다운 메뉴 z-index
//     fontSize: `${small}`,
//   }),
//   singleValue: (provided) => ({
//     ...provided,
//     color: `${navy}`, // 선택된 값 색상
//   }),
// };

const Button = styled.button`
  height: 50px;
  width: 140px;
  font-size: ${normal};
`;

export default SearchBox;
