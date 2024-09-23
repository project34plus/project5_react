import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const ThesisListItems = ({ item, className }) => {
  const { tid, title, gid, poster } = item;

  return (
    <div className="thesis-list">
      <Link href={`/thesis/view/${tid}`} passHref>
        <li className={className}>
          <div className="tid">{tid}</div>
          <div className="gid">{gid}</div>
          <div className="title">{title}</div>
          <div className="poster">{poster}</div>
        </li>
      </Link>
    </div>
  );
};

// 스타일 정의 (가로 정렬)
const StyledThesisListItem = styled(ThesisListItems)`
  display: flex;
  border-bottom: 1px solid #ccc;
  height: 50px;
  align-items: center;
  justify-content: space-between;
  font-size: 1.2rem;
  text-align: center;

  .tid {
    width: 10%;
    padding-left: 10px;
  }

  .gid {
    width: 20%;
  }

  .title {
    width: 50%;
  }

  .poster {
    width: 20%;
  }
`;

const MyThesisList = ({ items }) => {
  return (
    items.length > 0 &&
    items.map((item) => <StyledThesisListItem key={item.tid} item={item} />)
  );
};

export default React.memo(MyThesisList);
