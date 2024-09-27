import requestData from '../../commons/libs/requestData';
import saveProcess from '@/commons/libs/saveProcess';

/* 기존 코드
export default function apiConfig(nid) {
    return requestData(`/note/config/${nid}`);
}*/

// 게시판 설정
export const getNote = (nid) => requestData(`/note/config/${nid}`);

// 게시글 등록
export const write = (form) =>
  saveProcess(`/note/write/${form.nid}`, 'POST', form);

// 게시글 수정
export const update = (form) =>
  saveProcess(`/note/update/${form.noteSeq}`, 'PATCH', form);

// 게시글 삭제
/*
export const deleteData = (noteSeq) =>
  requestData(`/note/${noteSeq}`, 'DELETE');*/

// 게시글 조회
export const getInfo = (noteSeq) => requestData(`/note/info/${noteSeq}`);

// 게시글 목록
export const getList = (nid, search) => {
  search = search ?? {};
  let qs = Object.entries(search)
    .map(([k, v]) => `${k}=${v}`)
    .join('&');

  qs = qs ? `?${qs}` : qs;

  const url = `/note/list/${nid}${qs}`;

  return requestData(url);
};
