'use client';
import React, { useState, useEffect, useLayoutEffect } from 'react';
import ThesisUploadForm from '../components/UploadForm';
import { uploadFile, uploadThesis, updateThesis } from '../apis/apiUpload';
import { apiGet } from '../apis/apiInfo';
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
  fields: [],
  language: '한국어',
  country: '한국',
  keywords: '',
};

const ThesisUploadContainer = ({ params }) => {
  const { tid } = params;
  const [formData, setFormData] = useState(initialFormData);
  const [file, setFile] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (tid) {
      setIsEditMode(true);
      const fetchThesisData = async () => {
        try {
          const thesisData = await apiGet(tid);
          setFormData(thesisData);
          console.log('Fetched Thesis Data:', thesisData);
        } catch (error) {
          console.error('Error fetching thesis data:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchThesisData();
    } else {
      setLoading(false);
    }
  }, [tid]);

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

      if (isEditMode) {
        await updateThesis(tid, formData);
        alert('논문 수정이 완료되었습니다.');
      } else {
        await uploadThesis(formData);
        alert('논문이 성공적으로 등록되었습니다.');
      }

      window.location.href = '/mypage/MyThesisList';
    } catch (error) {
      console.error('Error during form submission:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

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
