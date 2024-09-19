"use client";
import React, { useState } from "react";
import ThesisUploadForm from "../components/UploadForm"; // form.js에서 가져옴
import { uploadFile, uploadThesis } from "../apis/apiUpload";

const initialFormData = {
    category: "DOMESTIC",
    poster: "",
    contributor: "",
    mode:"",
    thAbstract: "",
    reference: "",
    visible: "false",
    publisher: "",
    title: "",
    gid: "12",
    fields: [],
    userName: "테스트 사용자",
    email: "testuser@example.com",
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
      } catch (error) {
        alert('업로드 실패:', error.message);
      }
    };
  
    return (
      <ThesisUploadForm
        formData={formData}
        handleInputChange={handleInputChange}
        handleFieldsChange={handleFieldsChange}
        handleFileChange={handleFileChange}
        handleSubmit={handleSubmit}
      />
    );
  };
  
  export default ThesisUploadContainer;