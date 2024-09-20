import React from 'react';
import styled from 'styled-components';
import { Link } from 'next/navigation';

const Wrapper = styled.div``;

const ItemDescription = ({ item }) => {
  const {
    title,
    poster,
    contributor,
    thAbstract,
    toc,
    reference,
    publisher,
    keywords,
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
      <dl>
        <dt>기여자</dt>
        <dd>{contributor}</dd>
      </dl>
      <dl>
        <dt>초록</dt>
        <dd>{thAbstract}</dd>
      </dl>
      <dl>
        <dt>목차</dt>
        <dd>{toc}</dd>
      </dl>
      <dl>
        <dt>참고문헌</dt>
        <dd>{reference}</dd>
      </dl>
      <dl>
        <dt>발행기관</dt>
        <dd>{publisher}</dd>
      </dl>
      <dl>
        <dt>키워드</dt>
        <dd>{keywords}</dd>
      </dl>
    </Wrapper>
  );
};

export default ItemDescription;
