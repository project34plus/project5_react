import requestData from '@/commons/libs/requestData';

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
