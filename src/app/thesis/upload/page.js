"use client";  // 클라이언트 컴포넌트임을 명시

import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert, Picker, StyleSheet } from 'react-native';
import axios from 'axios';

const UploadThesisPage = () => {
    const [formData, setFormData] = useState({
        category: 'DOMESTIC',  // 기본값 DOMESTIC으로 설정
        poster: '',
        title: '',  // 제목 필드
        gid: '',  // 서버에서 반환된 GID 저장
        fields: [],  // 학문 분류 코드 (List<String>),
        userName: '테스트 사용자',  // 사용자명 하드코딩
        email: 'testuser@example.com',  // 이메일 하드코딩
    });

    const [file, setFile] = useState(null);

    // 입력 처리 함수
    const handleInputChange = (name, value) => {
        setFormData({ ...formData, [name]: value });
    };

    // fields 입력 처리 함수
    const handleFieldsChange = (index, value) => {
        const newFields = [...formData.fields];
        newFields[index] = value;
        setFormData({ ...formData, fields: newFields });
    };

    // 파일 선택 처리 함수
    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    // 파일 업로드 함수
    const handleFileUpload = async () => {
        if (!file) {
            Alert.alert('업로드할 파일을 먼저 선택하세요.');
            return;
        }

        const uploadData = new FormData();
        uploadData.append('file', file);

        try {
            const response = await axios.post('http://localhost:4002/upload', uploadData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            if (response.status === 200 || response.status === 201) {
                Alert.alert('파일이 성공적으로 업로드되었습니다.');
                const uploadedGid = response.data.gid;  // 파일 업로드 후 서버에서 반환된 GID
                setFormData({ ...formData, gid: uploadedGid });  // GID 저장 후 논문 업로드로 넘김
                handleSubmitThesis(uploadedGid);  // 논문 업로드 함수 호출
            }
        } catch (error) {
            Alert.alert('파일 업로드 실패:', error.message);
        }
    };

    // 논문 정보 제출 함수
    const handleSubmitThesis = async (gid) => {
        try {
            const thesisData = { ...formData, gid };  // GID 포함한 데이터

            const response = await axios.post('http://localhost:4003/upload', thesisData, {
                headers: { 'Content-Type': 'application/json' }
            });

            if (response.status === 200 || response.status === 201) {
                Alert.alert('논문 정보가 성공적으로 업로드되었습니다.');
            }
        } catch (error) {
            Alert.alert('논문 정보 업로드 실패:', error.message);
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.header}>논문 업로드</h2>

            {/* 제목 입력 필드 */}
            <div style={styles.formGroup}>
                <label style={styles.label}>제목:</label>
                <input
                    type="text"
                    style={styles.input}
                    placeholder="제목을 입력하세요"
                    onChange={e => handleInputChange('title', e.target.value)}
                    value={formData.title}
                />
            </div>

            {/* 카테고리 선택 필드 */}
            <div style={styles.formGroup}>
                <label style={styles.label}>카테고리:</label>
                <select
                    style={styles.picker}
                    value={formData.category}
                    onChange={e => handleInputChange('category', e.target.value)}
                >
                    <option value="DOMESTIC">국내 논문</option>
                    <option value="FOREIGN">해외 논문</option>
                </select>
            </div>

            {/* 편집자 입력 필드 */}
            <div style={styles.formGroup}>
                <label style={styles.label}>편집자:</label>
                <input
                    type="text"
                    style={styles.input}
                    placeholder="편집자를 입력하세요"
                    onChange={e => handleInputChange('poster', e.target.value)}
                    value={formData.poster}
                />
            </div>

            {/* fields 필드 입력 */}
            <div style={styles.formGroup}>
                <label style={styles.label}>학문 분류 코드:</label>
                <input
                    type="text"
                    style={styles.input}
                    placeholder="분류 코드를 입력하세요"
                    onChange={e => handleFieldsChange(0, e.target.value)}
                    value={formData.fields[0] || ''}
                />
            </div>

            {/* 파일 선택 버튼 */}
            <div style={styles.formGroup}>
                <label style={styles.label}>파일 선택:</label>
                <input type="file" onChange={handleFileChange} />
                {file && <p>선택된 파일: {file.name}</p>}
            </div>

            {/* 파일 업로드 버튼 */}
            <div style={styles.formGroup}>
                <button onClick={handleFileUpload}>파일 업로드 후 논문 정보 제출</button>
            </div>
        </div>
    );
};

export default UploadThesisPage;

const styles = {
    container: {
        padding: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    formGroup: {
        marginBottom: 15,
    },
    label: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        fontSize: 16,
        borderRadius: 5,
        width: '100%',
    },
    picker: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
        width: '100%',
    },
};
