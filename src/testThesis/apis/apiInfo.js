import requestData from "@/commons/libs/requestData";
//목록 조회
export const apiList = (search) => {
    search = search ?? {};
    const qs = [];
    for (const [k, v] of Object.entries(search)) {
      qs.push(`${k}=${v}`);
    }
  
    let url = '/list';
    if (qs.length > 0) url += `?${qs.join('&')}`;
  
  return requestData(url);
  
}

//상세 조회
export const apiGet = (tid) => requestData(`/info/${tid}`);

//찜한 목록 조회
export const apiWishlist = (page = 1, limit = 8) => {
    return requestData(`/wish?page=${page}&limit=${limit}`);
  };  