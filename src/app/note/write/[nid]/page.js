'use client';
import NoteForm from '@/note2/components/NoteForm';

const NoteWritePage = () => {
  const handleSave = async (formData) => {
    try {
      await write('note', formData); // nid는 "note"로 고정
      // 성공 메시지나 리디렉션 처리
    } catch (err) {
      console.error(err);
      // 오류 처리
    }
  };

  return (
    <div>
      <h1>노트 작성</h1>

    </div>
  );
};
export default NoteWritePage;
