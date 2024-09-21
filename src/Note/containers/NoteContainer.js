"use client";
import React, { useState, useEffect } from 'react';
import NoteForm from '@/note/components/NoteForm'; 
import { getList, deleteData } from '../apis/apiNote';

const NoteContainer = ({ nid }) => {
  const [notes, setNotes] = useState([]);
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);

  const fetchNotes = async () => {
    try {
      const noteList = await getList(nid);
      setNotes(noteList);
    } catch (err) {
      setError('노트 목록을 불러오는 데 실패했습니다.');
    }
  };

  useEffect(() => {
    fetchNotes();
  }, [nid]);

  const handleSave = () => {
    setEditingNoteId(null);
    setIsEditing(false);
    fetchNotes(); // 노트 목록 새로고침
  };

  const handleEdit = (noteId) => {
    setEditingNoteId(noteId);
    setIsEditing(true);
  };

  const handleDelete = async (noteId) => {
    try {
      await deleteData(noteId);
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
    } catch (err) {
      setError('노트 삭제에 실패했습니다.');
    }
  };

  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            <h3>{note.title}</h3>
            <p>{note.content}</p>
            <button onClick={() => handleEdit(note.id)}>수정</button>
            <button onClick={() => handleDelete(note.id)}>삭제</button>
          </li>
        ))}
      </ul>
      <NoteForm noteId={editingNoteId} onSave={handleSave} isEditing={isEditing} />
    </div>
  );
};

export default NoteContainer;