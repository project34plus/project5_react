import React from 'react';
import { Link } from 'react-router-dom';
import { useTransition } from 'react';
import ListItems from './ListItems';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

const List = ({items, search, onChange, onSubmitSearch, onSubmit }) => {
  const { t } = useTranslation();
  // 검색항목 제출
  return (
    <>
      <ListItems items={items} />
    </>
  );
};

export default React.memo(List);
