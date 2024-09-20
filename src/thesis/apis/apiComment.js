import apiRequest from '@/commons/libs/apiRequest';
import requestData from '@/commons/libs/requestData';

export const write = (form) =>
  saveProcess(`thesis/comment/write`, 'POST', form);

export const update = (seq, form) =>
  saveProcess(`/thesis/comment/update`, 'PATCH', form);

function saveProcess(url, method, form) {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const res = await apiRequest(url, method, form);
        if (res.status === 200) {
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

// 댓글 하나 조회
export const getInfo = (seq) => requestData(`/thesis/comment/info/${seq}`);

// 댓글 목록 조회
export const getList = (tid) => requestData(`/thesis/comment/list/${tid}`);

// 댓글 삭제
export const deleteData = (seq) =>
  requestData(`/thesis/comment/${seq}`, 'DELETE');
