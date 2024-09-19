import requestData from '../requestData';

// 찜하기
export const addWish = (tid) => requestData(`/wish/${tid}`);

// 찜하기 해제
export const removeWish = (tid) => requestData(`/wish/${tid}`, 'DELETE');

// 찜한 목록
export const getWishList = () => requestData(`/wish`);
