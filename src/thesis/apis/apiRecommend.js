import requestData from '@/commons/libs/requestData';

export const apiRecommendData = () => {
  let url = '/thesis/recommend/list';

  return requestData(url);
};
