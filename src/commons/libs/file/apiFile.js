import requestData from '../requestData';

/* 파일 조회 S */
export const getFiles = (gid, location) => {
  let url = `/file/list/${gid}`;
  if (location) url += `?location=${location}`;

  return requestData(url);
};

export const getFile = (seq) => requestData(`/file/info/${seq}`);
/* 파일 조회 E */

/* 파일 삭제 S */
export const deleteFiles = (gid, location) => {
  let url = `/file/deletes/${gid}`;
  if (location) url += `?location=${location}`;

  return requestData(url, 'DELETE');
};

export const deleteFile = (seq) => requestData(`/file/delete/${seq}`, 'DELETE');
/* 파일 삭제 E */

export const apiFileDelete = (seq) =>
  new Promise((resolve, reject) => {
    (async () => {
      try {
        const res = await apiRequest(`/file/delete/${seq}`, 'DELETE');
        if (res.status === 200) {
          resolve(res.data.data);
          return;
        }
        reject(res.data);
      } catch (err) {
        reject(err);
      }
    })();
  });
