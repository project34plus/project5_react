import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: left;

  div {
    display: inline-block;
    border: 1px solid #000;
    padding: 10px;
  }
`;

const FieldsRank = ({ item, className }) => {
  const { name, subfield, count, wishCount } = item;
  return (
    <li className={className}>
      <div className="name">대분류:{name}</div>
      <div className="subfield">중분류:{subfield}</div>
      <div className="count">조회수:{count}</div>
      <div className="wishCount">찜하기수:{wishCount}</div>
    </li>
  );
};

const FieldTrends = ({ items }) => {
  return (
    <Wrapper>
      {items.length > 0 ? (
        <ul>
          {items.map((item, index) => (
            <FieldsRank key={index} item={item} />
          ))}
        </ul>
      ) : (
        <div>...Loading...</div>
      )}
    </Wrapper>
  );
};

export default FieldTrends;
