import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';

const MyRecentlyView = ({ items, className }) => {

  const router = useRouter();

  const handleClick = (tid) => {
    router.push(`/thesis/view/${tid}`); // Next.js 라우터를 사용해 논문 상세 페이지로 이동
  };

  return (
    <StyledContainer className={className}>
      <h1>최근 본 논문</h1>
      <StyledList>
        {items.slice(0, 6).map((item) => (
          <StyledListItem key={item.tid} onClick={() => handleClick(item.tid)}>
            <div>
              <strong>논문번호:</strong> <span>{item.tid}</span>
            </div>
            <div>
              <strong>제목:</strong> <span>{item.title}</span>
            </div>
            <div>
              <strong>저자:</strong> <span>{item.poster}</span>
            </div>
            <div>
              <strong>발행기관:</strong> <span>{item.publisher}</span>
            </div>
          </StyledListItem>
        ))}
      </StyledList>
    </StyledContainer>
  );
};

export default React.memo(MyRecentlyView);

const StyledContainer = styled.div`
  padding: 40px 50px;
  max-width: 1000px;
  margin-left: 20px;
  border: 1px solid rgba(0,0,0,0.6);
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  h1 {
    font-size: 28px;
    text-align: center;
    margin-bottom: 20px;
    color: #333;
  }
`;

const StyledList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const StyledListItem = styled.li`
  background-color: #fff;
  padding: 30px;
  border-radius: 8px;
  margin-bottom: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  font-size: 1.1rem;

  div {
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;

    &:last-child {
      margin-bottom: 0;
    }

    strong {
      color: #555;
      flex-shrink: 0;
      margin-right: 10px;
    }

    span {
      font-weight: 550;
      color: #333;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      flex: 1;
    }
  }

  &:hover {
    background-color: #d0dde9;
    transform: translateY(-3px);
    transition: all 0.2s ease-in-out;
    cursor: pointer;
  }
`;

