import axios from "axios";

// 파일 업로드 API
export const uploadFile = (uploadData) => {
  return axios.post("http://localhost:4002/upload", uploadData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

// 논문 정보 업로드 API
export const uploadThesis = (thesisData) => {
  return axios.post("http://localhost:4003/upload", thesisData, {
    headers: { "Content-Type": "application/json" },
  });
};
