'use client';
import React, { useState } from 'react';
import ThesisUploadForm from '../components/UploadForm'; // form.js에서 가져옴
import { uploadFile, uploadThesis } from '../apis/apiUpload';
import Container from '@/commons/components/Container';

const initialFormData = {
  category: 'DOMESTIC',
  poster: '',
  contributor: '',
  mode: '',
  thAbstract: '',
  reference: '',
  visible: 'false',
  publisher: '',
  title: '',
  fields: [],
  language: '한국어',
  country: '한국',
  keywords:''
};

const ThesisUploadContainer = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [file, setFile] = useState(null);

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleFieldsChange = (index, value) => {
    const newFields = [...formData.fields];
    newFields[index] = value;
    setFormData({ ...formData, fields: newFields });
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (file) {
        await uploadFile(file);
      }
      await uploadThesis(formData);
      alert('논문 정보가 성공적으로 업로드되었습니다.');

      window.location.href = 'http://localhost:6006/mypage/MyThesisList';
    } catch (error) {
      alert('업로드 실패:', error.message);
    }
  };

  return (
    <Container>
      <ThesisUploadForm
        formData={formData}
        handleInputChange={handleInputChange}
        handleFieldsChange={handleFieldsChange}
        handleFileChange={handleFileChange}
        handleSubmit={handleSubmit}
      />
    </Container>
  );
};

export default ThesisUploadContainer;
