'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Next.js의 useRouter 사용
import Container from '@/commons/components/Container';
import styled from 'styled-components';

const AgreementPage = () => {
  const [agreed, setAgreed] = useState(false); // 동의 여부 상태
  const router = useRouter(); // Next.js에서 페이지 이동을 위한 useRouter

  const handleAgreeChange = (event) => {
    setAgreed(event.target.checked); // 체크박스 상태 업데이트
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (agreed) {
      router.push('/thesis/upload'); // 동의하면 /thesis/upload로 이동
    } else {
      alert('서약서에 동의해야 논문을 작성할 수 있습니다.');
    }
  };

  return (
    <Container>
      <StyledContainer>
        <h1>서약서 동의</h1>
        <p>
          본인은 본 논문을 작성함에 있어 다음의 사항을 준수할 것을 서약합니다.
          <br />
          <br />
          1. 본 논문의 모든 내용은 본인의 창의적인 연구 결과이며, 타인의 연구
          결과나 저작물을 표절하지 않았습니다.
          <br />
          <br />
          2. 논문 작성 중 참고한 모든 자료는 정당한 방법으로 인용하였으며, 인용
          출처를 명확히 밝혔습니다.
          <br />
          <br />
          3. 연구 과정에서의 데이터 조작이나 변조, 허위 사실을 기재하지 않았음을
          확인합니다.
          <br />
          <br />
          4. 공동 연구자의 기여도를 존중하고, 기여에 따라 공정하게 저자 정보를
          기재하였습니다.
          <br />
          <br />
          5. 본 논문이 제3자의 저작권이나 기타 권리를 침해하지 않았음을
          확인합니다.
          <br />
          <br />
          6. 본 논문이 연구 윤리 규정을 준수하였으며, 이에 위반할 경우 발생하는
          모든 법적 책임은 본인에게 있음을 서약합니다.
        </p>
        <form onSubmit={handleSubmit}>
          <CheckboxContainer>
            <input
              type="checkbox"
              id="agreement"
              checked={agreed}
              onChange={handleAgreeChange}
            />
            <label htmlFor="agreement">서약서에 동의합니다.</label>
          </CheckboxContainer>
          <SubmitButton type="submit" disabled={!agreed}>
            동의하고 작성하기
          </SubmitButton>
        </form>
      </StyledContainer>
    </Container>
  );
};

export default AgreementPage;

// Styled components
const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  font-size: 17px;
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  &:disabled {
    background-color: grey;
  }
`;
