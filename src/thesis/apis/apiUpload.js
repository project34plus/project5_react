import saveProcess from '@/commons/libs/saveProcess';
// 파일 업로드 API
export const uploadFile = (uploadData) => {
  return saveProcess('/file/upload', 'POST', uploadData);
};

// 논문 정보 업로드 API
export const uploadThesis = (thesisData) => {
  return saveProcess('/thesis/upload', 'POST', thesisData);
};

export const updateThesis = (tid, thesisData) => {
  return saveProcess(`/thesis/update/${tid}/submit`, 'PATCH', thesisData);
};

export const deleteThesis = (tid) => {
  return saveProcess(`/thesis/${tid}`, 'DELETE');
}


// import saveProcess from ".";

// // 파일 업로드 API
// export const uploadFile = (uploadData) => {
//   return saveProcess("http://localhost:4002/upload", "POST", uploadData);
// };

// // 논문 정보 업로드 API
// export const uploadThesis = (thesisData) => {
//   return saveProcess("http://localhost:4003/upload", "POST", thesisData);
// };
