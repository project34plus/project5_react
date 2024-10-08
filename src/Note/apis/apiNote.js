import saveProcess from '@/commons/libs/saveProcess';
import apiRequest from '../../commons/libs/apiRequest';
import requestData from '../../commons/libs/requestData';

export const write = (nid, form) => {
  return apiRequest(`/note/write/${nid}`, 'POST', form);
};
export const write1 = async (nid, form) => {
  const res = await saveProcess2(`/note/write/${nid}`, 'POST', form);
  if (res.status === 201) {
    return res.data; // 성공적으로 작성된 노트 정보
  }
  throw new Error('노트 작성 실패');
};

export const update = (seq, form) =>
  saveProcess2(`/note/update/${seq}`, 'PATCH', form);

function saveProcess2(url, method, form) {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const res = await apiRequest(url, method, form);
        if (res.status === 201) {
          resolve(res.data.data);
          return;
        }

        reject(res.data);
      } catch (err) {
        console.error(err);
        reject(err);
      }
    })();
  });
}

export const getInfo = async (seq) => {
  const res = await requestData(`/note/info/${seq}`);
  console.log('res', res);
  return res; // 노트 정보
};

export const getList = async (nid, search) => {
  const qs = new URLSearchParams(search).toString();
  const url = `/note/list/${nid}${qs ? '?' + qs : ''}`;
  console.log('url asdfasdf:', url);
  const res = await requestData(url).catch((err) => {
    console.log('err? :', err);
  });
  console.log('data:', res);
  return res; // 노트 목록
};

export const deleteData = (seq) => requestData(`/note/delete/${seq}`, 'DELETE');
