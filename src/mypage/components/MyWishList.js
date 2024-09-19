import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { t } from 'i18next';
const Wrapper = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const WishListItems = ({ item, className }) => {
  const { tid, title, gid, createdAt, approvalStatus } = item;

  return (
    <div className="thesis-list">
      <Link to={'/thesis/info/' + tid} className="subject">
        <li className={className}>
          <div className="tid">{tid}</div>
          <div className="title">
            {title}
          </div>
          <div className="thesis-info">
            <div className="gid">GID: {gid}</div>
            <div className="status">Status: {approvalStatus}</div>
            <div className="createdAt">{new Date(createdAt).toLocaleDateString()}</div>
          </div>
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
    display: flex;
    align-items: center;
    justify-content: center;
    padding-left: 10px;
  }

  .title {
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .thesis-info {
    width: 40%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .gid {
      width: 20%;
      height: 18px;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .status {
      width: 30%;
      text-align: center;
    }

    .createdAt {
      width: 30%;
      text-align: center;
    }
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
  const { t } = useTranslation();
  return (
    <Wrapper>
      {items && items.length > 0 ? (
        items.map((item) => <StyledThesisListItem key={item.tid} item={item} />)
      ) : (
        <NoData>
            {t('즐겨찾기_한_논문이_없습니다.')}
        </NoData>
      )}
    </Wrapper>
  );
};

export default React.memo(MyWishList);
