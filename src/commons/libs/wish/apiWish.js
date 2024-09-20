import requestData from '../requestData';

// 찜하기
export const addWish = (tid) => requestData(`/thesis/wish/${tid}`);

// 찜하기 해제
export const removeWish = (tid) => requestData(`/thesis/wish/${tid}`, 'DELETE');

// 찜한 목록
export const getWishList = () => requestData(`/thesis/wish`);
