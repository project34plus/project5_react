import React from 'react';
import { Link } from 'next/link';
import styled from 'styled-components';

const ItemsBox = ({ items }) => {
  return (
    items?.length > 0 &&
    items.map(({ tid, title, poster, fields }) => (
      <li key={tid}>
        <a href={`/thesis/info/${tid}`}>
          <div className="title">{title}</div>
          <div className="poster">{poster}</div>
          <div className="fields">{fields}</div>
        </a>
      </li>
    ))
  );
};

export default ItemsBox;
