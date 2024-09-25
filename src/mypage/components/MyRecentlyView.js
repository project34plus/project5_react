import React from 'react';

const MyRecentlyView = ({ items, className }) => {
  return (
    <div className={className}>
      <h1>최근 본 논문</h1>
      <ul>
        {items.map((item) => (
          <li key={item.tid}>
            <p>제목: {item.title}</p>
            <p>저자: {item.poster}</p>
            <p>발행기관: {item.publisher}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default React.memo(MyRecentlyView);
