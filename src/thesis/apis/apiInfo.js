import requestData from '@/commons/libs/requestData';

//목록 조회
export const apiList = (search) => {
  search = search ?? {};

  const qs = [];

  for (const [k, v] of Object.entries(search)) {
    if (Array.isArray(v)) {
      for (const _v of v) {
        qs.push(`${k}=${_v}`);
      }
    } else {
      qs.push(`${k}=${v}`);
    }
  }

  let url = '/thesis/list'; //실서버 DB
  // let url = 'http://localhost:4003/list'; //로컬 DB
  if (qs.length > 0) url += `?${qs.join('&')}`; //검색 조건이 있을 때

  return requestData(url);
};

// 상세 조회
export const apiGet = (tid) => requestData(`/thesis/info/${tid}`);
// export const apiGet = (tid) => requestData(`http://localhost:4003/info/${tid}`); //로컬 DB

// // 내가 등록한 논문 조회
// export const apiMyList = (search = {}) => {
//   const qs = [];

//   // search 객체를 쿼리 스트링으로 변환
//   for (const [key, value] of Object.entries(search)) {
//     qs.push(`${key}=${value}`);
//   }

//   let url = '/thesis/mylist';
//   if (qs.length > 0) {
//     url += `?${qs.join('&')}`; // 검색 조건이 있으면 쿼리 스트링 추가
//   }

//   return requestData(url); // requestData로 API 호출
// };
//내가 등록한 논문 -2버전
export const apiMyList = () => {
  const url = '/thesis/mylist';
  console.log('API 요청 보냄:', url); // API 요청 전 로그 출력

  return requestData(url, 'GET')
    .then((response) => {
      console.log('API 응답:', response); // API 응답 성공 시 데이터 출력
      return response; // 응답 데이터 반환
    })
    .catch((error) => {
      console.error('API 요청 중 오류 발생:', error); // 에러 발생 시 에러 로그 출력
      throw error; // 에러 다시 던지기
    });
};


//버전 조회
export const apiVersion = (tid) => requestData(`/thesis/info/${tid}/versions`);


// 찜한 목록 조회
export const apiWishlist = (page = 1, limit = 8) => {
  return requestData(`/thesis/wish?page=${page}&limit=${limit}`);
};

// 최근 본 논문 조회
export const apiUserLog = (page = 1, limit = 8) => {
  return requestData(`/thesis/myView?page=${page}&limit=${limit}`);
};
