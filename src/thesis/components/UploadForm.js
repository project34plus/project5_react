'use client';
import React, { useState } from 'react';
import FileUpload from '@/commons/components/FileUpload';
import styled from 'styled-components';

const StyledFileUpload = styled(FileUpload)``;

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

  // 파일 선택 시 호출될 함수
  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles(files); // 선택한 파일을 상태로 저장
  };
  return (
    <div style={styles.formWrapper}>
      <h1 style={styles.heading}>{isEditMode ? '논문 수정' : '논문 등록'}</h1>
      <form onSubmit={handleSubmit} style={styles.formContainer}>
        {/* 제목 입력 필드 */}
        <div style={styles.formGroup}>
          <label style={styles.label}>제목</label>
          <input
            type="text"
            name="title"
            placeholder="제목을 입력하세요"
            value={formData.title || ''}
            onChange={(e) => handleInputChange('title', e.target.value)}
            style={styles.input}
            required
          />
        </div>

        {/* 카테고리 선택 필드 */}
        <div style={styles.formGroup}>
          <label style={styles.label}>카테고리</label>
          <select
            name="category"
            value={formData.category || 'DOMESTIC'}
            onChange={(e) => handleInputChange('category', e.target.value)}
            style={styles.select}
            required
          >
            <option value="DOMESTIC">국내 논문</option>
            <option value="FOREIGN">해외 논문</option>
          </select>
        </div>

        {/* 편집자 입력 필드 */}
        <div style={styles.formGroup}>
          <label style={styles.label}>저자</label>
          <input
            type="text"
            name="poster"
            placeholder="저자를 입력하세요"
            value={formData.poster || ''}
            onChange={(e) => handleInputChange('poster', e.target.value)}
            style={styles.input}
            required
          />
        </div>

        {/* 기여자 입력 필드 */}
        <div style={styles.formGroup}>
          <label style={styles.label}>기여자</label>
          <input
            type="text"
            name="contributor"
            placeholder="기여자를 입력하세요"
            value={formData.contributor || ''}
            onChange={(e) => handleInputChange('contributor', e.target.value)}
            style={styles.input}
          />
        </div>

        {/* 초록 입력 필드 */}
        <div style={styles.formGroup}>
          <label style={styles.label}>초록</label>
          <textarea
            name="thAbstract"
            placeholder="초록을 입력하세요"
            value={formData.thAbstract || ''}
            onChange={(e) => handleInputChange('thAbstract', e.target.value)}
            style={styles.textarea}
          />
        </div>

        {/* 참고 문헌 입력 필드 */}
        <div style={styles.formGroup}>
          <label style={styles.label}>참고 문헌</label>
          <textarea
            name="reference"
            placeholder="참고 문헌을 입력하세요"
            value={formData.reference || ''}
            onChange={(e) => handleInputChange('reference', e.target.value)}
            style={styles.textarea}
          />
        </div>

        {/* 발행기관 입력 필드 */}
        <div style={styles.formGroup}>
          <label style={styles.label}>발행기관</label>
          <input
            type="text"
            name="publisher"
            placeholder="발행기관을 입력하세요"
            value={formData.publisher || ''}
            onChange={(e) => handleInputChange('publisher', e.target.value)}
            style={styles.input}
          />
        </div>

        {/* 키워드 입력 필드 */}
        <div style={styles.formGroup}>
          <label style={styles.label}>키워드</label>
          <textarea
            name="keywords"
            placeholder="키워드를 입력하세요"
            value={formData.keywords || ''}
            onChange={(e) => handleInputChange('keywords', e.target.value)}
            style={styles.textarea}
          />
        </div>

        {/* 공개 여부 라디오 버튼 */}
        <div style={styles.formGroup}>
          <label style={styles.label}>공개 여부</label>
          <div style={styles.radioGroup}>
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
          </div>
        </div>

        {!isEditMode && (
          <div style={styles.formGroup}>
            <label style={styles.label}>학문 분류 코드</label>
            {(formData.fields || []).map((field, index) => (
              <select
                key={index}
                name={`field${index}`}
                value={field}
                onChange={(e) => handleFieldsChange(index, e.target.value)}
                style={styles.select}
                required
              >
                <option value="E-004">공학일반</option>
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
                <option value="N-014">화학</option>
              </select>
            ))}
          </div>
        )}

        {!isEditMode && (
          <div style={styles.formGroup}>
            <StyledFileUpload
              gid={formData?.gid}
              callback={fileUploadCallback}
              color="navy"
            >
              파일 선택
            </StyledFileUpload>
            <input
              type="file"
              multiple
              onChange={handleFileChange} // 파일 선택 시 호출
              style={styles.input}
            />
          </div>
        )}
        {/* 선택한 파일 목록 표시 */}
        {selectedFiles.length > 0 && (
          <div style={styles.formGroup}>
            <label style={styles.label}>선택한 파일</label>
            <ul>
              {selectedFiles.map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
          </div>
        )}

        {isEditMode && (
          <div style={styles.formGroup}>
            <label style={styles.label}>버전 입력</label>
            {/* 주 버전 (Major Version) */}
            <div style={styles.formGroup}>
              <label style={styles.label}>주 버전 (Major Version)</label>
              <input
                type="number"
                name="majorVersion"
                placeholder="주 버전을 입력하세요"
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
                placeholder="부 버전을 입력하세요"
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
          </div>
        )}
        {/* 제출 버튼 */}
        <div style={styles.formGroup}>
          <button type="submit" style={styles.submitButton}>
            {isEditMode ? '논문 수정' : '논문 제출'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ThesisUploadForm;

const styles = {
  formWrapper: {
    maxWidth: '600px',
    margin: '0 auto',
    backgroundColor: '#f9f9f9',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    fontSize: '28px',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '20px',
    color: '#333',
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    fontSize: '16px',
    fontWeight: '500',
    marginBottom: '5px',
    color: '#333',
  },
  input: {
    padding: '10px',
    fontSize: '14px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  textarea: {
    padding: '10px',
    fontSize: '14px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    minHeight: '100px',
  },
  radioGroup: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '200px',
  },
  select: {
    padding: '10px',
    fontSize: '14px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  submitButton: {
    padding: '10px',
    fontSize: '16px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    textAlign: 'center',
  },
};
