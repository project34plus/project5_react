'use client';
import React, { useState,useEffect } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { apiField, apiMainField } from '@/thesis/apis/apiField';

const SubMenuBox = styled.aside`
    min-height: 100px;
    max-width: 800px;
    background: ${({ theme }) => theme.color.white};
    border-radius: 10px;
    padding: 10px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);

    a {
        display: inline-block;
        background: ${({ theme }) => theme.color.white};
        color: ${({ theme }) => theme.color.navy};
        font-size: ${({ theme }) => theme.fontSize.small};
        font-weight: ${({ theme }) => theme.fontWeight.bold};
        padding: 15px 20px;
        border-radius: 5px;
        transition: background 0.3s, color 0.3s, transform 0.2s;
        margin-bottom: 10px;

        &:hover {
            background: ${({ theme }) => theme.color.navy};
            color: ${({ theme }) => theme.color.white};
            transform: translateY(-2px);
        }
    }

    a + a {
        border-top: 1px solid ${({ theme }) => theme.color.gray};
    }
`;
async function fetchMainFields() {
  try {
    return await apiMainField();  // 비동기 작업 완료 후 반환
  } catch (err) {
    console.log(err);  // 에러 처리
    return [];  // 에러 발생 시 빈 배열 반환
  }
}

const SubMenus = () => {
  const { t } = useTranslation();
  const [mainFields, setMainFields] = useState([]);  // 상태 변수로 데이터 관리

  useEffect(() => {
    async function getData() {
      const data = await fetchMainFields();
      setMainFields(data);  // 데이터를 상태 변수에 저장
    }

    getData();  // 컴포넌트가 마운트될 때 데이터 가져오기
  }, []);

  return (
    <SubMenuBox>
      {mainFields.length > 0 ? (
        mainFields.map((field, index) => (
          <a href="#" key={index}>{t(field)}</a>
        ))
      ) : (
        <p>Loading...</p>  // 데이터가 없을 때 로딩 메시지
      )}
    </SubMenuBox>
  );
};

export default SubMenus;
