'use client';
import React, {
  useLayoutEffect, //렌더링 되기 전 실행됨
  useEffect,
  useState,
  useCallback,
} from 'react';
import { apiList } from '../apis/apiInfo.js';
import Pagination from '@/commons/components/Pagination';
import ItemsBox from '../components/ItemsBox';
import SearchBox from '../components/SearchBox';
import { useTranslation } from 'react-i18next';
import { getCommonActions } from '@/commons/contexts/CommonContext';
import ListSort from '../components/ListSort.js';
import { List } from 'react-content-loader';
import { produce } from 'immer';

function getQueryString(searchParams) {
  const qs = { limit: 10 };
  if (searchParams?.size > 0) {
    for (const [k, v] of searchParams) {
      qs[k] = v;
    }
  }
  return qs;
}

const MyListLoader = () => <List />;

const ThesisListContainer = ({ searchParams }) => {
  const { t } = useTranslation();
  const [form, setForm] = useState(() => getQueryString(searchParams));
  const [search, setSearch] = useState(() => getQueryString(searchParams));
  const [items, setItems] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(false);
  const { setMainTitle } = getCommonActions();

  const [filteredField, setFilteredField] = useState(null);

  useLayoutEffect(() => {
    setMainTitle(t('논문학술자료'));
  }, [setMainTitle, t]);

  useEffect(() => {
    setLoading(true);
    apiList(search).then((res) => {
      console.log('res', res);
      setItems(res.items || []);
      setPagination(res.pagination || {});
      setLoading(false);
    });
  }, [search]);

  /* 검색 관련 함수 */
  const onChangeSearch = useCallback((e, i) => {
    const name = e.target.name;
    const value = e.target.value;
    if (['sopts', 'skeys', 'operators'].includes(name)) {
      setForm((form) => {
        const newForm = { ...form };
        newForm[name] = newForm[name] ?? [];
        newForm[name][i] = value;

        newForm.operators = newForm.operators ?? [];
        if (!newForm.operators[i]) newForm.operators[i] = 'AND';

        newForm.sopts = newForm.sopts ?? [];
        if (!newForm.sopts[i]) newForm.sopts[i] = 'ALL';

        return newForm;
      });
    } else {
      setForm((form) => ({ ...form, [name]: value }));
    }
  }, []);

  const onSubmitSearch = useCallback(
    (e) => {
      e.preventDefault();

      const newForm = { ...form, page: 1 };

      if (form.sopts || form.skeys) {
        const searchRowsLast = form.searchRowsLast ?? 0;
        const searchOpts = [...new Array(searchRowsLast + 1).keys()]
          .filter(
            (i) =>
              form?.sopts?.length > i &&
              form?.sopts[i] &&
              form?.skeys?.length > i &&
              form?.skeys[i],
          )
          .map((i) => ({
            sopts: form.sopts[i],
            skeys: form.skeys[i],
            operators: form.operators[i],
          }));
        if (searchOpts.length > 0) {
          (newForm.sopts = []), (newForm.skeys = []), (newForm.operators = []);
          for (const { sopts, skeys, operators } of searchOpts) {
            newForm.sopts.push(sopts);
            newForm.skeys.push(skeys);
            newForm.operators.push(operators);
          }
        } else {
          delete newForm.sopts;
          delete newForm.skeys;
          delete newForm.operators;
        }
      }

      console.log('newForm', newForm);
      setSearch(newForm);
    },
    [form],
  );

  //선택한 옵션으로 변경
  const selectChange = useCallback(
    (selectedOption) => {
      setForm(
        produce((draft) => {
          draft.options = selectedOption ? selectedOption.value : null;
        }),
      );
    },
    [setForm],
  );

  /* 정렬 */
  const onChangeSort = useCallback((e) => {
    setSearch((search) => ({ ...search, sort: e.target.value }));
  }, []);

  /* 페이지 변경 함수 */
  const onChangePage = useCallback((p) => {
    setSearch((search) => ({ ...search, page: p }));
    window.location.hash = '#root';
  }, []);

  //분류명 필터 처리
  const handleFieldChange = (selectedField) => {
    setFilteredField(selectedField);
  };

  /* 로딩 처리 */
  if (loading) {
    return <MyListLoader />;
  }

  return (
    <>
      <SearchBox
        form={form}
        onChange={onChangeSearch}
        onSubmit={onSubmitSearch}
        selectChange={selectChange}
        onFieldChange={handleFieldChange}
      />
      <ListSort search={search} onChange={onChangeSort} />
      <ItemsBox items={items} pagination={pagination} />
      {items.length > 0 && (
        <Pagination onClick={onChangePage} pagination={pagination} />
      )}
    </>
  );
};

export default React.memo(ThesisListContainer);
