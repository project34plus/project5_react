import apiRequest from './apiRequest';

const requestData = (url, method = 'GET') =>
  new Promise((resolve, reject) => {
    (async () => {
      try {
        const res = await apiRequest(url, method);
        if (res.status < 200 || res.status >= 400) {
          reject(res.data);
          return;
        }

        if (url.indexOf('/email-service') !== -1) {
          resolve(res.data);
          return;
        }
        resolve(res.data.data);
      } catch (err) {
        console.log('에러 ', err);
        reject(err);
      }
    })();
  });

export default requestData;
