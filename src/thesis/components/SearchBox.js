import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import Select from 'react-select';
import { color } from '@/theme/color';
import fontSize from '@/theme/fontSize';
import { FaPlus, FaMinus } from 'react-icons/fa6';
import DatePicker from 'react-datepicker';
import { useTranslation } from 'react-i18next';

const { gray, white, navy } = color;
const { small, normal } = fontSize;

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

      <select
        name="operators"
        value={form?.operators?.length > i ? form?.operators[i] : ''}
        onChange={(e) => onChange(e, i)}
      >
        <option value="AND">AND</option>
        <option value="OR">OR</option>
        <option value="NOT">NOT</option>
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

  return (
    <FormBox onSubmit={onSubmit} autoComplete="off">
      <div className="word-search">
        <p>검색어</p>
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

        <button type="button" className="plus" onClick={() => onClick('plus')}>
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
      <div className="field-subject">
        <p>주제분류</p>
      </div>
      <div className="publish-date">
        <p>발행연도</p>
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
      <Button>검색하기</Button>
      <Button type='reset'>초기화</Button>
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
  .publish-date {
    height: 45px;
    display: flex;

    .pick_sdate,
    .pick_edate {
      border: 1px solid ${gray};
      display: flex;
      align-items: center;
      width: 120px;
      height: 45px;
      text-align: center;
      margin-right: 3px;
      box-sizing: border-box;
      font-size: ${normal};
      padding: 8px 20px;
      border-radius: 4px;
    }
    .react-datepicker {
      border-radius: 10px;
      border: 1px solid ${gray};
      width: 250px;
      height: 240px;
    }

    .react-datepicker__month-container {
      width: 100%;
      height: 100%;
    }

    .react-datepicker__header {
      background-color: #e2f7dd;
      width: 100%;
      padding: 10px;
      border-radius: 10px 10px 0 0;
    }

    //요일
    .react-datepicker__day-names {
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin-top: 10px;
      width: 100%;
      font-weight: bold;
    }

    .react-datepicker__week {
      justify-content: space-between;
      display: flex;
      padding: 5px 15px;
    }

    //날짜
    .react-datepicker__month {
      display: flex;
      flex-direction: column;
      margin: 5px 0 0 0;
    }

    .react-datepicker__day {
      color: ${gray};
      margin: 0;
    }

    .react-datepicker__current-month {
      font-size: ${normal};
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
