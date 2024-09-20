import React from 'react';
import styled from 'styled-components';
import { color } from '@/theme/color';

const { gray } = color;

const ItemsBox = ({ items }) => {
  return (
    <Wrapper>
      {items?.length > 0 &&
        items.map(({ tid, title, poster, publisher, keywords }) => (
          <li key={tid}>
            <a href={`/thesis/view/${tid}`}>
              <div className="title">{title}</div>
              <div className="poster">{poster}</div>
              <div className="publisher">{publisher}</div>
              <div className="keyword">{keywords}</div>
            </a>
          </li>
        ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  li {
    border: 1px solid ${gray};
  }
`;

export default ItemsBox;
