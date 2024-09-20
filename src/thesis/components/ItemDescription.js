import React from 'react';
import styled from 'styled-components';
import { Link } from 'next/navigation';
import WishButton from '@/commons/components/WishButton';

const Wrapper = styled.div``;

const ItemDescription = ({ item }) => {
  const {
    title,
    poster,
    tid,
    // contributor,
    // thAbstract,
    // toc,
    // reference,
    // publisher,
    // keywords,
  } = item;

  return (
    <Wrapper>
      <dl>
        <dt>논문명</dt>
        <dd>{title}</dd>
      </dl>
      <dl>
        <dt>작성자</dt>
        <dd>{poster}</dd>
      </dl>
      <div className="button">
        <WishButton tid={tid}></WishButton>
      </div>
    </Wrapper>
  );
};

export default ItemDescription;
