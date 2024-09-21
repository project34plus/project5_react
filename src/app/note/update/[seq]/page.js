"use client";
import React from 'react';
import NoteForm from '@/note/components/NoteForm';
import { update, getInfo } from '@/note/apis/apiNote';

const NoteUpdatePage = ({ noteId }) => {
    const handleSave = async (formData) => {
        try {
            await update(noteId, formData);
            // 성공 메시지나 리디렉션 처리
        } catch (err) {
            console.error(err);
            // 오류 처리
        }
    };

    const fetchNote = async () => {
        try {
            const note = await getInfo(noteId);
            return note;
        } catch (err) {
            console.error(err);
            // 오류 처리
        }
    };

    return (
        <div>
            <h1>노트 수정</h1>
            <NoteForm onSave={handleSave} noteId={noteId} />
        </div>
    );
};

export default NoteUpdatePage;