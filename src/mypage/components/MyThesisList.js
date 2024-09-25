import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import ThesisDelete from './ThesisDelete';

const ThesisListItem = ({ item, className }) => {
  const { tid, title, gid, poster, approvalStatus } = item;

  return (
    <li className={className}>
      <div className="tid">{tid}</div>
      <div className="title">
        <Link href={`/thesis/view/${tid}`}>{title}</Link>
      </div>
      <div className="poster">{poster}</div>
      <div className="approvalStatus">{approvalStatus}</div>
      <div className="actions">
        <StyledLink href={`/thesis/update/${tid}`} className="edit-button">
          수정하기
        </StyledLink>
        <ThesisDelete tid={tid} className="delete-button" />
      </div>
    </li>
  );
};

// 공통 스타일 정의
const ButtonLinkStyles = `
  color: blue;
  text-decoration: none;
  cursor: pointer;
  border: 1px solid blue;
  padding: 5px;
  border-radius: 4px;
  display: inline-block;
  text-align: center;

  &:hover {
    background-color: lightblue;
  }
`;

// Link 컴포넌트에 스타일 적용
const StyledLink = styled(Link)`
  ${ButtonLinkStyles}
`;

// 스타일 정의 (가로 정렬)
const StyledThesisListItem = styled(ThesisListItem)`
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
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis; /* 긴 텍스트 말줄임 처리 */
  }

  .title {
    width: 50%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis; /* 긴 텍스트 말줄임 처리 */
  }

  .poster {
    width: 20%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis; /* 긴 텍스트 말줄임 처리 */
  }

  .approvalStatus {
    width: 10%;
  }

  .actions {
    display: flex; /* 가로로 정렬 */
    gap: 10px; /* 버튼 간격 */
    width: 20%; /* 전체 버튼 영역 크기 */
    justify-content: flex-end; /* 오른쪽 정렬 */
  }

  .edit-button {
    ${ButtonLinkStyles}
  }

  .delete-button {
    ${ButtonLinkStyles}/* ThesisDelete에도 동일한 스타일 적용 */
  }

  // .edit-button {
  //   color: blue;
  //   text-decoration: none;
  //   cursor: pointer;
  //   border: 1px solid blue;
  //   padding: 5px;
  //   border-radius: 4px;
  // }
  // .delete-button {
  //   color: blue;
  //   text-decoration: none;
  //   cursor: pointer;
  //   border: 1px solid blue;
  //   padding: 5px;
  //   border-radius: 4px;
  // }

  // .edit-button:hover {
  //   background-color: lightblue;
  // }

  // .delete-button:hover {
  //   background-color: lightblue;
  // }

  // a {
  //   text-decoration: none;
  //   color: inherit;
  //   display: flex;
  //   justify-content: space-between;
  //   width: 100%;
  // }
`;

const MyThesisList = ({ items }) => {
  return items.length > 0 ? (
    items.map((item) => <StyledThesisListItem key={item.tid} item={item} />)
  ) : (
    <div>등록한 논문이 없습니다.</div>
  );
};

export default React.memo(MyThesisList);
