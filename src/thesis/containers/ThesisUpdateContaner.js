'use client';
import React, { useState, useEffect,useCallback  } from 'react';
import ThesisUploadForm from '../components/UploadForm';
import { uploadFile, uploadThesis, updateThesis } from '../apis/apiUpload';
import { apiGet } from '../apis/apiInfo';
import Container from '@/commons/components/Container';

const initialFormData = {
  category: 'DOMESTIC',
  poster: '',
  contributor: '',
  majorVersion: '1',
  minorVersion: '0',
  thAbstract: '',
  reference: '',
  visible: 'true',
  publisher: '',
  title: '',
  fields: [''],
  language: '한국어',
  country: '한국',
  keywords: '',
};

const ThesisUpdateContainer = ({ params }) => {
  const { tid } = params; // 동적 경로에서 전달된 tid 값
  const [formData, setFormData] = useState(initialFormData);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);

  // 페이지 로드 시, tid로 기존 논문 데이터 가져오기
  useEffect(() => {
    if (tid) {
      const fetchThesisData = async () => {
        try {
          console.log('Fetching thesis data for tid:', tid); // tid 확인
          const thesisData = await apiGet(tid); // API 호출
          console.log('Fetched Thesis Data:', thesisData); // 받아온 데이터 확인
          setFormData((prevFormData) => ({
            ...prevFormData,
            ...thesisData, // 받아온 데이터를 formData에 덮어씌움
          }));
        } catch (error) {
          console.error('Error fetching thesis data:', error);
        } finally {
          setLoading(false); // 로딩 상태 해제
        }
      };
      fetchThesisData();
    } else {
      setLoading(false); // tid가 없을 경우 로딩 해제
    }
  }, [tid]);

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  /*
  const handleFieldsChange = (index, value) => {
    const newFields = [...formData.fields];
    newFields[index] = value;
    setFormData({ ...formData, fields: newFields });
  };
  */
  const fileUploadCallback = useCallback((files) => {
    console.log('files', files);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (file) {
        await uploadFile(file);
      }

      await updateThesis(tid, formData); // 논문 수정
      alert('논문 수정이 완료되었습니다.');

      window.location.href = '/mypage/MyThesisList'; // 리다이렉트
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
        fileUploadCallback={fileUploadCallback}
        handleSubmit={handleSubmit}
        isEditMode={true} // 수정 모드
      />
    </Container>
  );
};

export default ThesisUpdateContainer;
