import requestData from '@/commons/libs/requestData';

// 최신 인기 논문 조회용
export const apiList = (search) => {
  search = search ?? {};

  const qs = [];

  for (const [k, v] of Object.entries(search)) {
    qs.push(`${k}=${v}`);
  }

  let url = '/thesis/list';
  if (qs.length > 0) url += `?${qs.join('&')}`;

  return requestData(url);
};

// 학문 중분류별 인기 통계
export const apiFieldRanking = (search) => {
  search = search ?? {};

  const qs = [];

  for (const [k, v] of Object.entries(search)) {
    qs.push(`${k}=${v}`);
  }

  let url = '/thesis/trend/field';
  if (qs.length > 0) url += `?${qs.join('&')}`;

  return requestData(url);
};
