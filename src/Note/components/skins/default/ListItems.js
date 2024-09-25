import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { t } from 'i18next';
import { FcInspection } from 'react-icons/fc';

const Wrapper = styled.ul``;

const ListItem = ({ item, className }) => {
  const {
    seq,
    subject,
    member,
    createdAt,
  } = item;

  return (
    <div className="note-list">
      <Link to={'/note/view/' + seq} className="subject">
        <li className={className}>
          <div className="seq">{seq}</div>
          <div className="title">
            {subject}
          </div>
          <div>
            <span className="datetime">{createdAt}</span>
          </div>
        </li>
      </Link>
    </div>
  );
};

const StyledListItem = styled(ListItem)`
  display: flex;
  border-bottom: 1px solid #ccc;
  height: 50px;
  align-items: center;
  justify-content: space-between;
  font-size: 1.2rem;
  text-align: center;

  .seq {
    width: 5%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-left: 20px;
  }

  .title {
    width: 60%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .post-info {
    width: 35%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .poster {
      width: 25%;
      height: 18px;
      padding-right: 40px;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .view {
      width: 25%;
    }
    .datetime {
      width: 50%;
    }
  }
`;

const NoData = styled.li`
  font-size: 1.3em;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ListItems = ({ items }) => {
  const { t } = useTranslation();

  return (
    <Wrapper>
      {items && items.length > 0 ? (
        items.map((item) => <StyledListItem key={item.seq} item={item} />)
      ) : (
        <NoData>
          {t('조회된_노트가_없습니다')}
          <FcInspection />
        </NoData>
      )}
    </Wrapper>
  );
};

export default React.memo(ListItems);
