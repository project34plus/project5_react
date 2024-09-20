import apiRequest from '../../commons/libs/apiRequest';

// 로그인 처리
export const apiField = () =>
  new Promise((resolve, reject) => {
    apiRequest('/thesis/field/')
      .then((res) => {
        if (!res.data.success) {
          // 검증 실패, 로그인 실패
          reject(res.data);
          console.log(res);
          return;
        }

        // 로그인 성공시 - 토큰 데이터
        console.log(res.data.data[0]);
        return res.data.data
      })
      .catch((err) => reject(err));
  });

// 로그인한 회원정보 조회
export const apiUser = () =>
  new Promise((resolve, reject) => {
    apiRequest('/member/account')
      .then((res) => {
        if (res.status !== 200) {
          reject(res.data);
          cookies.remove('token', { path: '/' });
          return;
        }

        resolve(res.data.data);
      })
      .catch((err) => {
        cookies.remove('token', { path: '/' });
        reject(err);
      });
  });
