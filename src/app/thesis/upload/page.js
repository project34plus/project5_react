"use client";  // 클라이언트 컴포넌트임을 명시

import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert } from 'react-native';
import axios from 'axios';

const UploadThesisPage = () => {
    const [formData, setFormData] = useState({
        category: '',  // 문자열로 카테고리 입력 (DOMESTIC, FOREIGN)
        poster: '',
        title: '',  // 제목 필드
        gid: '123',  // 서버에서 반환된 GID 저장
        fields: [],  // 학문 분류 코드 (List<String>)
        userName: '테스트 사용자',  // 사용자명 하드코딩
        email: 'testuser@example.com',  // 이메일 하드코딩
    });

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

    // 논문 정보 제출 함수
    const handleSubmitThesis = async () => {
        try {
            console.log("Submitting form data:", formData);  // 전송 데이터 로그

            const response = await axios.post('http://localhost:4003/upload', formData, {
                headers: { 'Content-Type': 'application/json' }
            });

            if (response.status === 200 || response.status === 201) {
                Alert.alert('논문 정보가 성공적으로 업로드되었습니다.');
                setFormData({ ...formData, gid: response.data.gid });  // 서버에서 반환된 GID 저장
            }
        } catch (error) {
            Alert.alert('논문 정보 업로드 실패:', error.message);
        }
    };

    return (
        <View>
            {/* 제목 입력 필드 */}
            <Text>제목</Text>
            <TextInput
                placeholder="제목"
                onChangeText={text => handleInputChange('title', text)}
                value={formData.title}
            />

            {/* 카테고리 입력 필드 */}
            <Text>카테고리 (DOMESTIC 또는 FOREIGN)</Text>
            <TextInput
                placeholder="카테고리"
                onChangeText={text => handleInputChange('category', text)}
                value={formData.category}
            />

            {/* 편집자 입력 필드 */}
            <Text>편집자</Text>
            <TextInput
                placeholder="편집자"
                onChangeText={text => handleInputChange('poster', text)}
                value={formData.poster}
            />

            {/* fields 필드 입력 */}
            <Text>학문 분류 코드</Text>
            <TextInput
                placeholder="분류 코드 1"
                onChangeText={text => handleFieldsChange(0, text)}
                value={formData.fields[0] || ''}
            />

            {/* 논문 정보 제출 버튼 */}
            <Button title="논문 정보 제출" onPress={handleSubmitThesis} />
        </View>
    );
};

export default UploadThesisPage;
