import apiRequest from '@/commons/libs/apiRequest';
import requestData from '@/commons/libs/requestData';

export const write = (form) =>
  saveProcess(`/thesis/comment/write`, 'POST', form);
// saveProcess(`http://localhost:4003/comment/write`, 'POST', form);

export const update = (seq, form) =>
  saveProcess(`/thesis/comment/update/${seq}`, 'PATCH', form);
  // saveProcess(`http://localhost:4003/comment/update/${seq}`, 'PATCH', form);

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
// export const getInfo = (seq) =>
//   requestData(`http://localhost:4003/comment/info/${seq}`);

// 댓글 목록 조회
export const getList = (seq) => requestData(`/thesis/comment/list/${seq}`);
// export const getList = (seq) =>
//   requestData(`http://localhost:4003/comment/list/${seq}`);

// 댓글 삭제
export const deleteData = (seq) =>
  requestData(`/thesis/comment/${seq}`, 'DELETE');
  // requestData(`http://localhost:4003/comment/${seq}`, 'DELETE');
