import React from 'react';

const MyThesisList = ({ items }) => {
  return (
    <ul>
      {items.length > 0 ? (
        items.map((item) => (
          <li key={item.tid}>
            <div>논문 ID: {item.tid}</div>
            <div>제목: {item.title}</div>
            <div>저자: {item.poster}</div>
          </li>
        ))
      ) : (
        <div>목록이 없습니다.</div>
      )}
    </ul>
  );
};

export default MyThesisList;