import requestData from '@/commons/libs/requestData';

//목록 조회
export const apiList = (search) => {
  search = search ?? {};

  const qs = [];

  for (const [k, v] of Object.entries(search)) {
    qs.push(`${k}=${v}`);
  }

  // let url = '/thesis/list'; //실서버 DB
  let url = 'http://localhost:4003/list'; //로컬 DB
  if (qs.length > 0) url += `?${qs.join('&')}`; //검색 조건이 있을 때

  return requestData(url);
};

// 상세 조회
// export const apiGet = (tid) => requestData(`/thesis/info/${tid}`);
export const apiGet = (tid) => requestData(`http://localhost:4003/info/${tid}`); //로컬 DB

// 찜한 목록 조회
export const apiWishlist = (page = 1, limit = 8) => {
  return requestData(`/thesis/wish?page=${page}&limit=${limit}`);
};
