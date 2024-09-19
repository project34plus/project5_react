import saveProcess from '@/commons/libs/saveProcess';
import apiRequest from '../../commons/libs/apiRequest';
import requestData from '../../commons/libs/requestData';

export const write = (nid, form) =>
  saveProcess2(`/note/write/${nid}`, 'POST', form);

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

//노트 글 하나 조회
export const getInfo = (seq) => requestData(`/note/info/${noteSeq}`);

// 노트 글 목록 조회
export const getList = (nid, search) => {
  search = search ?? {};
  let qs = Object.entries(search)
    .map(([k, v]) => `${k}=${v}`)
    .join('&');

  qs = qs ? `?${qs}` : qs;

  const url = `/note/list/${nid}${qs}`;

  return requestData(url);
};

export const deleteData = (seq) => requestData(`/note/delete/${seq}`, 'DELETE');
