import React from 'react';

const RecentList = ({ item, className }) => {
  const { title, poster, tid } = item;
  const url = `/thesis/info/${tid}`;
  return (
    <li className={className}>
      <div className="title">{title}</div>
      <div className="poster">{poster}</div>
    </li>
  );
};

const RecentTrend = ({ items }) => {
  console.log('recentTrend items', items);
  return (
    items.length &&
      <ul>
        {items.map((item) => (
          <RecentList key={item.tid} item={item} />
        ))}
      </ul>
    
  );
};

export default React.memo(RecentTrend);
