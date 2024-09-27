'use client';
import React, { useState } from 'react';
import FileUpload from '@/commons/components/FileUpload';
import styled from 'styled-components';

const StyledFileUpload = styled(FileUpload)``;

const FormWrapper = styled.div`
  max-width: 900px;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.color.white};
  padding: 40px 50px;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25);
`;

const Heading = styled.h1`
  font-size: ${({ theme }) => theme.fontSize.big};
  font-weight: ${({ theme }) => theme.fontWeight};
  text-align: center;
  margin-bottom: 30px;
  color: ${({ theme }) => theme.color.black};
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

const Label = styled.label`
  font-size: ${({ theme }) => theme.fontSize.center};
  font-weight: ${({ theme }) => theme.fontWeight};
  color: ${({ theme }) => theme.color.navy};
  margin-bottom: 10px;
`;

const Input = styled.input`
  padding: 10px;
  font-size: ${({ theme }) => theme.fontSize.center};
  border: 2px solid ${({ theme }) => theme.color.whiteGrayNavy};
  border-radius: 5px;
  background-color: #f9f9f9;
  transition: border-color 0.3s;

  &:focus {
    border-color: ${({ theme }) => theme.color.grayNavy};
    outline: none;
  }
`;

const Textarea = styled.textarea`
  padding: 10px;
  font-size: ${({ theme }) => theme.fontSize.center};
  border: 2px solid ${({ theme }) => theme.color.whiteGrayNavy};
  border-radius: 5px;
  background-color: #f9f9f9;
  min-height: 100px;
  transition: border-color 0.3s;

  &:focus {
    border-color: ${({ theme }) => theme.color.grayNavy};
    outline: none;
  }
`;

const Select = styled.select`
  padding: 10px;
  font-size: ${({ theme }) => theme.fontSize.center};
  border: 2px solid ${({ theme }) => theme.color.whiteGrayNavy};
  border-radius: 5px;
  background-color: #f9f9f9;
  transition: border-color 0.3s;

  &:focus {
    border-color: ${({ theme }) => theme.color.grayNavy};
    outline: none;
  }
`;

const RadioGroup = styled.div`
  display: flex;
  gap: 20px;
`;

const SubmitButton = styled.button`
  padding: 10px;
  font-size: ${({ theme }) => theme.fontSize.medium};
  background-color: ${({ theme }) => theme.color.navy};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.color.darkNavy};
  }
`;

const styles = {
  label: {
    fontSize: '16px',
    fontWeight: '500',
    marginBottom: '5px',
    marginRight: '10px',
    color: '#333',
  },
  input: {
    padding: '10px',
    fontSize: '14px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
};

const ThesisUploadForm = ({
  formData,
  handleInputChange,
  handleFieldsChange,
  handleSubmit,
  fileUploadCallback,
  isEditMode,
  majorVersion,
  minorVersion,
}) => {
  const [selectedFiles, setSelectedFiles] = useState([]); // 선택한 파일 저장

  const handleFileUpload = (files) => {
    if (!files || files.length === 0) {
      return;
    }

    // 선택한 파일 상태로 저장
    console.log('Uploaded files:', files);
    setSelectedFiles([...files]);
  };

  return (
    <FormWrapper>
      <Heading>{isEditMode ? '논문 수정' : '논문 등록'}</Heading>
      <FormContainer onSubmit={handleSubmit}>
        {/* 제목 입력 필드 */}
        <FormGroup>
          <Label>제목</Label>
          <Input
            type="text"
            name="title"
            placeholder="제목을 입력하세요"
            value={formData.title || ''}
            onChange={(e) => handleInputChange('title', e.target.value)}
            required
          />
        </FormGroup>

        {/* 카테고리 선택 필드 */}
        <FormGroup>
          <Label>카테고리</Label>
          <Select
            name="category"
            value={formData.category || 'DOMESTIC'}
            onChange={(e) => handleInputChange('category', e.target.value)}
            required
          >
            <option value="DOMESTIC">국내 논문</option>
            <option value="FOREIGN">해외 논문</option>
          </Select>
        </FormGroup>

        {/* 저자 입력 필드 */}
        <FormGroup>
          <Label>저자</Label>
          <Input
            type="text"
            name="poster"
            placeholder="저자를 입력하세요"
            value={formData.poster || ''}
            onChange={(e) => handleInputChange('poster', e.target.value)}
            required
          />
        </FormGroup>

        {/* 기여자 입력 필드 */}
        <FormGroup>
          <Label>기여자</Label>
          <Input
            type="text"
            name="contributor"
            placeholder="기여자를 입력하세요"
            value={formData.contributor || ''}
            onChange={(e) => handleInputChange('contributor', e.target.value)}
          />
        </FormGroup>

        {/* 초록 입력 필드 */}
        <FormGroup>
          <Label>초록</Label>
          <Textarea
            name="thAbstract"
            placeholder="초록을 입력하세요"
            value={formData.thAbstract || ''}
            onChange={(e) => handleInputChange('thAbstract', e.target.value)}
          />
        </FormGroup>

        {/* 참고 문헌 입력 필드 */}
        <FormGroup>
          <Label>참고 문헌</Label>
          <Textarea
            name="reference"
            placeholder="참고 문헌을 입력하세요"
            value={formData.reference || ''}
            onChange={(e) => handleInputChange('reference', e.target.value)}
          />
        </FormGroup>

        {/* 발행기관 입력 필드 */}
        <FormGroup>
          <Label>발행기관</Label>
          <Input
            type="text"
            name="publisher"
            placeholder="발행기관을 입력하세요"
            value={formData.publisher || ''}
            onChange={(e) => handleInputChange('publisher', e.target.value)}
          />
        </FormGroup>

        {/* 키워드 입력 필드 */}
        <FormGroup>
          <Label>키워드</Label>
          <Textarea
            name="keywords"
            placeholder="키워드를 입력하세요"
            value={formData.keywords || ''}
            onChange={(e) => handleInputChange('keywords', e.target.value)}
          />
        </FormGroup>

        {/* 공개 여부 라디오 버튼 */}
        <FormGroup>
          <Label>공개 여부</Label>
          <RadioGroup>
            <label>
              <input
                type="radio"
                name="visible"
                value={true}
                checked={formData.visible === true}
                onChange={(e) => handleInputChange('visible', true)}
              />
              공개
            </label>
            <label>
              <input
                type="radio"
                name="visible"
                value={false}
                checked={formData.visible === false}
                onChange={(e) => handleInputChange('visible', false)}
              />
              비공개
            </label>
          </RadioGroup>
        </FormGroup>

        {!isEditMode && (
          <FormGroup>
            <Label>학문 분류 코드</Label>
            {(formData.fields || []).map((field, index) => (
              <Select
                key={index}
                name={`field${index}`}
                value={field}
                onChange={(e) => handleFieldsChange(index, e.target.value)}
                style={styles.select}
                required
              >
                <option value="E-005">교통공학</option>
                <option value="E-006">금속공학</option>
                <option value="E-007">기계공학</option>
                <option value="E-008">기타공학</option>
                <option value="E-009">농공학</option>
                <option value="E-010">산림공학</option>
                <option value="E-011">산업공학</option>
                <option value="E-012">생물공학</option>
                <option value="E-013">섬유공학</option>
                <option value="E-014">안전공학</option>
                <option value="E-015">원자력공학</option>
                <option value="E-016">의공학</option>
                <option value="E-017">자동차공학</option>
                <option value="E-018">자원공학</option>
                <option value="E-019">재료공학</option>
                <option value="E-020">전기공학</option>
                <option value="E-021">전자/정보통신공학</option>
                <option value="E-022">제어계측공학</option>
                <option value="E-023">조선공학</option>
                <option value="E-024">컴퓨터학</option>
                <option value="E-025">토목공학</option>
                <option value="E-026">항공우주공학</option>
                <option value="E-027">해양공학</option>
                <option value="E-028">화학공학</option>
                <option value="E-029">환경공학</option>

                <option value="A-002">농학</option>
                <option value="A-003">수산학</option>
                <option value="A-004">식품과학</option>
                <option value="A-005">임학</option>
                <option value="A-006">조경학</option>
                <option value="A-007">축산학</option>
                <option value="A-008">해상운송학</option>

                <option value="C-002">감성과학</option>
                <option value="C-003">과학기술학</option>
                <option value="C-004">기술정책</option>
                <option value="C-005">뇌과학</option>
                <option value="C-006">문헌정보학</option>
                <option value="C-007">여성학</option>
                <option value="C-008">인지과학</option>
                <option value="C-009">학제간연구</option>

                <option value="S-002">경영학</option>
                <option value="S-003">경제학</option>
                <option value="S-004">관광학</option>
                <option value="S-005">교육학</option>
                <option value="S-006">국제/지역개발</option>
                <option value="S-007">군사학</option>
                <option value="S-008">기타사회과학</option>
                <option value="S-009">농업경제학</option>
                <option value="S-010">무역학</option>
                <option value="S-011">법학</option>
                <option value="S-012">사회과학일반</option>
                <option value="S-013">사회복지학</option>
                <option value="S-014">사회학</option>
                <option value="S-015">신문방송학</option>
                <option value="S-016">심리과학</option>
                <option value="S-017">인류학</option>
                <option value="S-018">정책학</option>
                <option value="S-019">정치외교학</option>
                <option value="S-020">지리학</option>
                <option value="S-021">지역학</option>
                <option value="S-022">행정학</option>
                <option value="S-023">회계학</option>

                <option value="P-002">기타예술체육</option>
                <option value="P-003">디자인</option>
                <option value="P-004">무용</option>
                <option value="P-005">미술</option>
                <option value="P-006">미용</option>
                <option value="P-007">사진</option>
                <option value="P-008">연극</option>
                <option value="P-009">영화</option>
                <option value="P-010">예술일반</option>
                <option value="P-011">음악학</option>
                <option value="P-012">의상</option>
                <option value="P-013">체육</option>

                <option value="M-002">가정의학</option>
                <option value="M-003">간호학</option>
                <option value="M-004">기생충학</option>
                <option value="M-005">기타의약학</option>
                <option value="M-006">내과학</option>
                <option value="M-007">마취과학</option>
                <option value="M-008">면역학</option>
                <option value="M-009">물리치료학</option>
                <option value="M-010">미생물학</option>
                <option value="M-011">방사선과학</option>
                <option value="M-012">병리학</option>
                <option value="M-013">비뇨기과학</option>
                <option value="M-014">산부인과학</option>
                <option value="M-015">생리학</option>
                <option value="M-016">생화학</option>
                <option value="M-017">성형외과학</option>
                <option value="M-018">소아과학</option>
                <option value="M-019">수의학</option>
                <option value="M-020">신경과학</option>
                <option value="M-021">신경외과학</option>
                <option value="M-022">안과학</option>
                <option value="M-023">약리학</option>
                <option value="M-024">약학</option>
                <option value="M-025">예방의학/직업환경의학</option>
                <option value="M-026">응급의학</option>
                <option value="M-027">의학일반</option>
                <option value="M-028">이비인후과학</option>
                <option value="M-029">일반외과학</option>
                <option value="M-030">임상병리학</option>
                <option value="M-031">임상안광학</option>
                <option value="M-032">작업치료학</option>
                <option value="M-033">재활의학</option>
                <option value="M-034">정신과학</option>
                <option value="M-035">정형외과학</option>
                <option value="M-036">치의학</option>
                <option value="M-037">피부과학</option>
                <option value="M-038">한의학</option>
                <option value="M-039">해부학</option>
                <option value="M-040">흉부외과학</option>

                <option value="H-002">가톨릭신학</option>
                <option value="H-003">기독교신학</option>
                <option value="H-004">기타동양어문학</option>
                <option value="H-005">기타서양어문학</option>
                <option value="H-006">기타인문학</option>
                <option value="H-007">독일어와문학</option>
                <option value="H-008">러시아어와문학</option>
                <option value="H-009">문학</option>
                <option value="H-010">불교학</option>
                <option value="H-011">사전학</option>
                <option value="H-012">서양고전어와문학</option>
                <option value="H-013">스페인어와문학</option>
                <option value="H-014">언어학</option>
                <option value="H-015">역사학</option>
                <option value="H-016">영어와문학</option>
                <option value="H-017">유교학</option>
                <option value="H-018">일본어와문학</option>
                <option value="H-019">종교학</option>
                <option value="H-020">중국어와문학</option>
                <option value="H-021">철학</option>
                <option value="H-022">통역번역학</option>
                <option value="H-023">프랑스어와문학</option>
                <option value="H-024">한국어와문학</option>

                <option value="N-002">기타자연과학</option>
                <option value="N-003">대기과학</option>
                <option value="N-004">물리학</option>
                <option value="N-005">생물학</option>
                <option value="N-006">생활과학</option>
                <option value="N-007">수학</option>
                <option value="N-008">자연과학일반</option>
                <option value="N-009">지구과학</option>
                <option value="N-010">지질학</option>
                <option value="N-011">천문학</option>
                <option value="N-012">통계학</option>
                <option value="N-013">해양학</option>
              </Select>
            ))}
          </FormGroup>
        )}

        {/* 파일 업로드 */}
        {!isEditMode && (
          <FormGroup>
            <FileUpload
              gid={formData?.gid}
              callback={handleFileUpload}
              color="navy"
            >
              파일 선택
            </FileUpload>
          </FormGroup>
        )}
        {selectedFiles.length > 0 && (
          <FormGroup>
            <Label>선택한 파일</Label>
            <ul>
              {selectedFiles.map((file, index) => (
                <li key={index}>{file.fileName || file.originalName || file.name}</li> // 파일 이름을 찾는 방식 변경
              ))}
            </ul>
          </FormGroup>
        )}  

        {isEditMode && (
          <FormGroup>
            <Label>버전 입력</Label>
            {/* 주 버전 (Major Version) */}
            <div style={styles.formGroup}>
              <label style={styles.label}>주 버전 (Major Version)</label>
              <input
                type="number"
                name="majorVersion"
                placeholder="주 버전을 선택하세요"
                value={
                  majorVersion !== undefined
                    ? majorVersion
                    : formData.majorVersion
                }
                onChange={(e) =>
                  handleInputChange('majorVersion', e.target.value)
                }
                style={styles.input}
                min="0"
                required
              />
            </div>

            {/* 부 버전 (Minor Version) */}
            <div style={styles.formGroup}>
              <label style={styles.label}>부 버전 (Minor Version)</label>
              <input
                type="number"
                name="minorVersion"
                placeholder="부 버전을 선택하세요"
                value={
                  minorVersion !== undefined
                    ? minorVersion
                    : formData.minorVersion
                }
                onChange={(e) =>
                  handleInputChange('minorVersion', e.target.value)
                }
                style={styles.input}
                min="0"
                required
              />
            </div>
          </FormGroup>
        )}
        {/* 제출 버튼 */}
        <FormGroup>
          <SubmitButton type="submit">
            {isEditMode ? '논문 수정' : '논문 제출'}
          </SubmitButton>
        </FormGroup>
      </FormContainer>
    </FormWrapper>
  );
};

export default ThesisUploadForm;
