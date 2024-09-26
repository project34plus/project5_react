import React from 'react';
import styled from 'styled-components';

const MyRecentlyView = ({ items, className }) => {
  return (
    <div className={className}>
      <h1>최근 본 논문</h1>
      <ul>
        {items.slice(0, 10).map((item) => (
          <StyledListItem key={item.tid}>
            <p><strong>논문번호:</strong> {item.tid}</p>
            <p><strong>제목:</strong> {item.title}</p>
            <p><strong>저자:</strong> {item.poster}</p>
            <p><strong>발행기관:</strong> {item.publisher}</p>
            <p><strong>초록:</strong> {item.thAbstract}</p>
            
          </StyledListItem>
        ))}
      </ul>
    </div>
  );
};

export default React.memo(MyRecentlyView);

const StyledListItem = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #ccc;
  margin-bottom: 10px;

  p {
    margin: 0;
    padding: 0 10px;
    font-size: 14px;
    flex-basis: 20%; /* 각 항목이 동일한 너비를 차지하도록 설정 */
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap; /* 텍스트가 길어질 경우 줄바꿈 방지 */
  }

  strong {
    font-weight: bold;
  }
`;