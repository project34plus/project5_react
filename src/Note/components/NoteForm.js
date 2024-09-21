import React, { useState, useEffect } from 'react';
import { write, update, getInfo } from '../apis/apiNote';

const NoteForm = ({ noteId, onSave, isEditing }) => {
  const [formData, setFormData] = useState({ title: '', content: '' });
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isEditing && noteId) {
      const fetchNote = async () => {
        try {
          const note = await getInfo(noteId);
          setFormData(note);
        } catch (err) {
          setError('노트 정보를 불러오는 데 실패했습니다.');
        }
      };
      fetchNote();
    } else {
      setFormData({ title: '', content: '' }); // Reset form for new note
    }
  }, [isEditing, noteId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      if (isEditing) {
        await update(noteId, formData);
      } else {
        await write(noteId, formData);
      }
      onSave(); // 성공 후 부모 컴포넌트에서 처리
    } catch (err) {
      setError(err.message || '저장 실패');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{isEditing ? '노트 수정' : '노트 작성'}</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <label htmlFor="title">제목:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="content">내용:</label>
        <textarea
          id="content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">{isEditing ? '수정하기' : '작성하기'}</button>
    </form>
  );
};

export default NoteForm;