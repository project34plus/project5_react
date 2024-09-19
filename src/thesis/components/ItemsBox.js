import React from 'react';
import { Link } from 'next/link';
import styled from 'styled-components';

const ItemBox = ({ item, className }) => {
  const {tid, title, poster, fields} = item;
  const url = `/thesis/info/${tid}`;

  return (
    <li className={className}>
      <Link to={url}>          
        <div className="title">{title}</div>
        <div className="poster">{poster}</div>
        <div className="fields">{fields}</div>
      </Link>
    </li>
  );
};

const ItemsBox = ({ items }) => {
  return (
    items.length > 0 &&
    items.map((item) => <ItemStyledBox key={item.tid} item={item} />)
  );
};

const ItemStyledBox = styled(ItemBox)``;

export default ItemsBox;