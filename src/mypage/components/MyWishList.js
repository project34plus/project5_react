import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

const Wrapper = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  width: 100%;
`;

// 상단 바 스타일 (번호, 고유번호, 제목, 작성자)
const Header = styled.div`
  display: flex;
  border-bottom: 2px solid #ccc;
  font-weight: bold;
  text-align: center;
  padding: 10px 0;

  .header-tid {
    width: 10%;
  }

  .header-gid {
    width: 20%;
  }

  .header-title {
    width: 50%;
  }

  .header-poster {
    width: 20%;
  }
`;

const WishListItems = ({ item, className }) => {
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
const StyledThesisListItem = styled(WishListItems)`
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

// 데이터가 없을 때의 스타일 정의
const NoData = styled.li`
  font-size: 1.3em;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MyWishList = ({ items }) => {

  return (
    items.length > 0 &&
    items.map((item) => <StyledThesisListItem key={item.tid} item={item} />)
  );
};

export default React.memo(MyWishList);
