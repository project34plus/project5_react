import requestData from '@/commons/libs/requestData';

// 필드 대분류 목록 조회
export const apiList = (search) => {
  search = search ?? {};
  const qs = [];
  for (const [k, v] of Object.entries(search)) {
    qs.push(`${k}=${v}`);
  }

  let url = '/thesis/field/mainField';
  if (qs.length > 0) url += `?${qs.join('&')}`;

  return requestData(url);
};

// 필드 목록 조회
export const apiFieldList = (search) => {
  search = search ?? {};
  const qs = [];
  for (const [k, v] of Object.entries(search)) {
    qs.push(`${k}=${v}`);
  }

  let url = '/thesis/field/list';
  if (qs.length > 0) url += `?${qs.join('&')}`;

  return requestData(url);
};
