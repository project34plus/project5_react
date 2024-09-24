'use client';
import React, { useState } from 'react';
import ThesisUploadForm from '../components/UploadForm';
import { uploadFile, uploadThesis } from '../apis/apiUpload';
import Container from '@/commons/components/Container';

const initialFormData = {
  category: 'DOMESTIC',
  poster: '',
  contributor: '',
  thAbstract: '',
  reference: '',
  visible: 'false',
  publisher: '',
  title: '',
  fields: [],
  language: '한국어',
  country: '한국',
  keywords: '',
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

      await uploaxdThesis(formData); // 새 논문 업로드
      alert('논문이 성공적으로 등록되었습니다.');

      window.location.href = '/mypage/MyThesisList'; // 리다이렉트
    } catch (error) {
      console.error('Error during form submission:', error);
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
        isEditMode={false} // 업로드 모드
      />
    </Container>
  );
};

export default ThesisUploadContainer;
