import requestData from '@/commons/libs/requestData';

// 로그인 처리
export const apiField = () => {
  return requestData('/thesis/field/list')
};

// 로그인한 회원정보 조회
export const apiMainField = () => {
    return requestData('/thesis/field/mainField');
};
