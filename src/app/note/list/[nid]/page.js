"use client";
import React, { useState, useEffect } from 'react';
import NoteContainer from '@/note/containers/NoteContainer';

const NoteListPage = () => {
    const nid = "note";
  
    return (
      <div>
        <h1>노트 목록</h1>
        <NoteContainer nid={nid} />
      </div>
    );
  };
  
  export default NoteListPage;