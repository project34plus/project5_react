'use client';
import React, { useState, useCallback } from 'react';
import ThesisUploadForm from '../components/UploadForm';
import { uploadFile, uploadThesis } from '../apis/apiUpload';
import Container from '@/commons/components/Container';

const initialFormData = {
  gid: Date.now() + '',
  category: 'DOMESTIC',
  poster: '',
  contributor: '',
  thAbstract: '',
  reference: '',
  visible: 'false',
  publisher: '',
  title: '',
  fields: [''],
  language: '한국어',
  country: '한국',
  keywords: '',
  majorVersion: '1',
  minorVersion: '',
};

const ThesisUploadContainer = () => {
  const [formData, setFormData] = useState(initialFormData);

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleFieldsChange = (index, value) => {
    const newFields = [...formData.fields];
    newFields[index] = value;
    setFormData({ ...formData, fields: newFields });
  };
  const fileUploadCallback = useCallback((files) => {
    console.log('files', files);
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await uploadThesis(formData); // 새 논문 업로드
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
        fileUploadCallback={fileUploadCallback}
        handleSubmit={handleSubmit}
        isEditMode={false} // 업로드 모드
      />
    </Container>
  );
};

export default ThesisUploadContainer;
