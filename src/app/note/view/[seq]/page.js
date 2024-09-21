"use client";
import React, { useEffect, useState } from 'react';
import { getInfo } from '@/note/apis/apiNote';

const NoteViewPage = ({ noteId }) => {
    const [note, setNote] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNote = async () => {
            try {
                const fetchedNote = await getInfo(noteId);
                setNote(fetchedNote);
            } catch (err) {
                setError('노트 정보를 불러오는 데 실패했습니다.');
            }
        };

        fetchNote();
    }, [noteId]);

    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <div>
            <h1>{note?.title}</h1>
            <p>{note?.content}</p>
        </div>
    );
};

export default NoteViewPage;