import requestData from '@/commons/libs/requestData';

export const apiRecommendData = (search) => {
  search = search ?? {};

  const qs = [];

  for (const [k, v] of Object.entries(search)) {
    qs.push(`${k}=${v}`);
  }

  let url = '/thesis/recommend/list';
  if (qs.length > 0) url += `?${qs.join('&')}`;

  return requestData(url);
};
