'use client';
import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'next-i18next';
import { MidButton } from '@/commons/components/buttons/BlueButtons';
import StyledMessage from '@/commons/components/StyledMessage';
import JoinInput from './JoinInput';
import {
  IoAtSharp,
  IoLockClosed,
  IoLockClosedOutline,
  IoPersonCircleSharp,
  IoPhonePortraitOutline,
  IoCheckbox,
  IoCheckboxOutline,
  IoCheckmarkCircleOutline,
  IoCheckmarkCircleSharp,
  IoPersonSharp,
  IoCalendarNumberOutline,
} from 'react-icons/io5';

const FormBox = styled.form`
  width: 100%;
  padding: 40px 50px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.6);
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSize.big};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  text-align: center;
  margin-bottom: 30px;
  color: ${({ theme }) => theme.color.black};
`;

const Subtitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.center};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  text-align: left;
  margin-bottom: 30px;
  color: ${({ theme }) => theme.color.darkgray};
  display: flex;
  align-items: center;
`;

const InputWrapper = styled.div`
  position: relative;
  padding-bottom: 10px;
`;

const Icon = styled.div`
  position: absolute;
  left: 10px;
  top: 37%;
  font-size: ${({ theme }) => theme.fontSize.small};
  color: ${({ theme }) => theme.color.midgray};
`;

const Icon2 = styled.span`
  margin-right: 10px;
  display: flex;
  align-items: center;
`;

const Icon3 = styled.span`
  margin-right: 3px;
  color: ${({ theme }) => theme.color.navy};
`;

const StyledInput = styled(JoinInput)`
  padding-left: 40px;
  height: 40px;
  font-size: ${({ theme }) => theme.fontSize.center};
`;

const OptionContainer = styled.div`
  display: flex;
  gap: 80px;
  font-size: ${({ theme }) => theme.fontSize.center};
  align-items: center;
  margin-bottom: 20px;
  margin-left: 25px;

  .options {
    display: flex;
    flex-direction: column;
    gap: 25px;
  }

  span {
    display: flex;
    align-items: center;
    cursor: pointer;

    &:hover {
      color: ${({ theme }) => theme.color.navy};
      font-weight: ${({ theme }) => theme.fontWeight.bold};
    }

    &.selected {
      color: ${({ theme }) => theme.color.navy};
      font-weight: ${({ theme }) => theme.fontWeight.bold};
    }
  }
`;

const OptionContainer2 = styled.div`
  font-size: ${({ theme }) => theme.fontSize.center};

  textarea {
    display: block;
    aligin-items: center;
    width: 100%;
    height: 150px;
    overflow-y: 10px;
    margin-top: 15px;
    margin-bottom: 25px;
    border: 3px solid ${({ theme }) => theme.color.whiteGrayNavy};
    border-radius: 5px;
    padding: 13px;
    background-color: #f9f9f9;
    font-size: ${({ theme }) => theme.fontSize.small};
  }

  .agree {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
`;

const StyledButtons = styled.div`
  display: flex;
  justify-content: center;
`;

const JoinForm = ({
  form,
  errors,
  onSubmit,
  onChange,
  onToggle,
  onReset,
  fields,
}) => {
  const { t } = useTranslation();
  console.log('JoinForm fields:', fields);
  return (
    <>
      <Title>{t('회원가입')}</Title>
      <FormBox onSubmit={onSubmit} autoComplete="off">
        <Subtitle>
          <Icon2>
            <IoPersonSharp />
          </Icon2>
          {t('기본정보입력')}
        </Subtitle>
        <dl>
          <dd>
            <InputWrapper>
              <Icon>
                <IoAtSharp />
              </Icon>
              <StyledInput
                type="text"
                name="email"
                value={form?.email ?? ''}
                onChange={onChange}
                placeholder={t('메일_주소')}
              />
            </InputWrapper>
            <StyledMessage variant="danger">{errors?.email}</StyledMessage>
          </dd>
        </dl>
        <dl>
          <dd>
            <InputWrapper>
              <Icon>
                <IoLockClosedOutline />
              </Icon>
              <StyledInput
                type="password"
                name="password"
                value={form?.password ?? ''}
                onChange={onChange}
                placeholder={t('비밀번호')}
              />
            </InputWrapper>
            <StyledMessage variant="danger">{errors?.password}</StyledMessage>
          </dd>
        </dl>
        <dl>
          <dd>
            <InputWrapper>
              <Icon>
                <IoLockClosed />
              </Icon>
              <StyledInput
                type="password"
                name="confirmPassword"
                value={form?.confirmPassword ?? ''}
                onChange={onChange}
                placeholder={t('비밀번호_확인')}
              />
            </InputWrapper>
            <StyledMessage variant="danger">
              {errors?.confirmPassword}
            </StyledMessage>
          </dd>
        </dl>
        <dl>
          <dd>
            <InputWrapper>
              <Icon>
                <IoPersonCircleSharp />
              </Icon>
              <StyledInput
                type="text"
                name="userName"
                value={form?.userName ?? ''}
                onChange={onChange}
                placeholder={t('회원명')}
              />
            </InputWrapper>
            <StyledMessage variant="danger">{errors?.userName}</StyledMessage>
          </dd>
        </dl>
        <dl>
          <dd>
            <InputWrapper>
              <Icon>
                <IoPhonePortraitOutline />
              </Icon>
              <StyledInput
                type="text"
                name="mobile"
                value={form?.mobile ?? ''}
                onChange={onChange}
                placeholder={t('전화번호')}
              />
            </InputWrapper>
            <StyledMessage variant="danger">{errors?.mobile}</StyledMessage>
          </dd>
        </dl>
        <dl>
          <dd>
            <InputWrapper>
              <Icon>
                <IoCalendarNumberOutline />
              </Icon>
              <StyledInput
                type="date"
                name="birth"
                value={form?.birth ?? ''}
                onChange={onChange}
              />
            </InputWrapper>
            <StyledMessage variant="danger">{errors?.birth}</StyledMessage>
          </dd>
        </dl>

        <dl>
          <Subtitle>
            <Icon2>
              <IoPersonSharp />
            </Icon2>
            {t('성별')}
          </Subtitle>
          <dd>
            <OptionContainer>
              <span
                onClick={() => {
                  if (form?.gender === 'FEMALE') {
                    onToggle('gender', null); // 체크 해제
                  } else {
                    onToggle('gender', 'FEMALE'); // 체크
                  }
                }}
              >
                {form?.gender === 'FEMALE' ? (
                  <Icon3>
                    <IoCheckmarkCircleSharp />
                  </Icon3>
                ) : (
                  <Icon3>
                    <IoCheckmarkCircleOutline />
                  </Icon3>
                )}
                {t('여성')}
              </span>
              <span
                onClick={() => {
                  if (form?.gender === 'MALE') {
                    onToggle('gender', null); // 체크 해제
                  } else {
                    onToggle('gender', 'MALE'); // 체크
                  }
                }}
              >
                {form?.gender === 'MALE' ? (
                  <Icon3>
                    <IoCheckmarkCircleSharp />
                  </Icon3>
                ) : (
                  <Icon3>
                    <IoCheckmarkCircleOutline />
                  </Icon3>
                )}
                {t('남성')}
              </span>
            </OptionContainer>
          </dd>
        </dl>
        <Subtitle>
          <Icon2>
            <IoPersonSharp />
          </Icon2>
          {t('직업')}
        </Subtitle>
        <dl>
          <dd>
            <OptionContainer>
              <div className="options">
                <span
                  onClick={() => {
                    if (form?.job === 'PROFESSOR') {
                      onToggle('job', null); // 체크 해제
                    } else {
                      onToggle('job', 'PROFESSOR'); // 체크
                    }
                  }}
                >
                  {form?.job === 'PROFESSOR' ? (
                    <Icon3>
                      <IoCheckmarkCircleSharp />
                    </Icon3>
                  ) : (
                    <Icon3>
                      <IoCheckmarkCircleOutline />
                    </Icon3>
                  )}
                  {t('교수')}
                </span>
                <span
                  onClick={() => {
                    if (form?.job === 'DOCTOR') {
                      onToggle('job', null); // 체크 해제
                    } else {
                      onToggle('job', 'DOCTOR'); // 체크
                    }
                  }}
                >
                  {form?.job === 'DOCTOR' ? (
                    <Icon3>
                      <IoCheckmarkCircleSharp />
                    </Icon3>
                  ) : (
                    <Icon3>
                      <IoCheckmarkCircleOutline />
                    </Icon3>
                  )}
                  {t('박사')}
                </span>
              </div>
              <div className="options">
                <span
                  onClick={() => {
                    if (form?.job === 'MASTER') {
                      onToggle('job', null); // 체크 해제
                    } else {
                      onToggle('job', 'MASTER'); // 체크
                    }
                  }}
                >
                  {form?.job === 'MASTER' ? (
                    <Icon3>
                      <IoCheckmarkCircleSharp />
                    </Icon3>
                  ) : (
                    <Icon3>
                      <IoCheckmarkCircleOutline />
                    </Icon3>
                  )}
                  {t('석사')}
                </span>
                <span
                  onClick={() => {
                    if (form?.job === 'ACADEMIC') {
                      onToggle('job', null); // 체크 해제
                    } else {
                      onToggle('job', 'ACADEMIC'); // 체크
                    }
                  }}
                >
                  {form?.job === 'ACADEMIC' ? (
                    <Icon3>
                      <IoCheckmarkCircleSharp />
                    </Icon3>
                  ) : (
                    <Icon3>
                      <IoCheckmarkCircleOutline />
                    </Icon3>
                  )}
                  {t('학생')}
                </span>
              </div>
              <div className="options">
                <span
                  onClick={() => {
                    if (form?.job === 'RESEARCHER') {
                      onToggle('job', null); // 체크 해제
                    } else {
                      onToggle('job', 'RESEARCHER'); // 체크
                    }
                  }}
                >
                  {form?.job === 'RESEARCHER' ? (
                    <Icon3>
                      <IoCheckmarkCircleSharp />
                    </Icon3>
                  ) : (
                    <Icon3>
                      <IoCheckmarkCircleOutline />
                    </Icon3>
                  )}
                  {t('연구원')}
                </span>
                <span
                  onClick={() => {
                    if (form?.job === 'LIBRARIAN') {
                      onToggle('job', null); // 체크 해제
                    } else {
                      onToggle('job', 'LIBRARIAN'); // 체크
                    }
                  }}
                >
                  {form?.job === 'LIBRARIAN' ? (
                    <Icon3>
                      <IoCheckmarkCircleSharp />
                    </Icon3>
                  ) : (
                    <Icon3>
                      <IoCheckmarkCircleOutline />
                    </Icon3>
                  )}
                  {t('사서')}
                </span>
              </div>
              <div className="options">
                <span
                  onClick={() => {
                    if (form?.job === 'UNIVERSITY_STAFF') {
                      onToggle('job', null); // 체크 해제
                    } else {
                      onToggle('job', 'UNIVERSITY_STAFF'); // 체크
                    }
                  }}
                >
                  {form?.job === 'UNIVERSITY_STAFF' ? (
                    <Icon3>
                      <IoCheckmarkCircleSharp />
                    </Icon3>
                  ) : (
                    <Icon3>
                      <IoCheckmarkCircleOutline />
                    </Icon3>
                  )}
                  {t('대학직원')}
                </span>
                <span
                  onClick={() => {
                    if (form?.job === 'TEACHER') {
                      onToggle('job', null); // 체크 해제
                    } else {
                      onToggle('job', 'TEACHER'); // 체크
                    }
                  }}
                >
                  {form?.job === 'TEACHER' ? (
                    <Icon3>
                      <IoCheckmarkCircleSharp />
                    </Icon3>
                  ) : (
                    <Icon3>
                      <IoCheckmarkCircleOutline />
                    </Icon3>
                  )}
                  {t('교사')}
                </span>
              </div>
              <div className="options">
                <span
                  onClick={() => {
                    if (form?.job === 'PUBLIC_OFFICIAL') {
                      onToggle('job', null); // 체크 해제
                    } else {
                      onToggle('job', 'PUBLIC_OFFICIAL'); // 체크
                    }
                  }}
                >
                  {form?.job === 'PUBLIC_OFFICIAL' ? (
                    <Icon3>
                      <IoCheckmarkCircleSharp />
                    </Icon3>
                  ) : (
                    <Icon3>
                      <IoCheckmarkCircleOutline />
                    </Icon3>
                  )}
                  {t('공무원')}
                </span>
                <span
                  onClick={() => {
                    if (form?.job === 'GENERAL_MEMBER') {
                      onToggle('job', null); // 체크 해제
                    } else {
                      onToggle('job', 'GENERAL_MEMBER'); // 체크
                    }
                  }}
                >
                  {form?.job === 'GENERAL_MEMBER' ? (
                    <Icon3>
                      <IoCheckmarkCircleSharp />
                    </Icon3>
                  ) : (
                    <Icon3>
                      <IoCheckmarkCircleOutline />
                    </Icon3>
                  )}
                  {t('일반인')}
                </span>
              </div>
            </OptionContainer>
            <StyledMessage variant="danger">{errors?.job}</StyledMessage>
          </dd>
        </dl>
        <Subtitle>
          <Icon2>
            <IoPersonSharp />
          </Icon2>
          {t('전공')}
        </Subtitle>
        <select name="field" value={form.field || ''} onChange={onChange}>
          <option value="">{t('전공_선택')}</option>
          {fields.length > 0 ? (
            fields.map((field, index) => (
              <option key={index} value={field.name}>
                {field.name}
              </option>
            ))
          ) : (
            <option disabled>{t('필드가 없습니다.')}</option>
          )}
        </select>

        <select name="field" value={form.field || ''} onChange={onChange}>
          <option value="">{t('전공_선택')}</option>
          {fields.length > 0 ? (
            fields.map((field, index) => (
              <option key={index} value={field.name}>
                {field.name}
              </option>
            ))
          ) : (
            <option disabled>{t('필드가 없습니다.')}</option>
          )}
        </select>
        <OptionContainer2>
          <textarea
            value="01.고객의 개인정보 보호 ㈜NonNull (이하 회사라고 함)는 고객의
            개인정보를 중요시하며, 개인정보보호법, 정보통신망 이용촉진 및
            정보보호 등에 관한 법률 등 개인정보와 관련된 법령을 준수하고
            있습니다. 02. 개인정보의 수집·이용목적, 수집하는 개인정보의 항목 및
            수집방법 가. 개인정보의 수집·이용목적과 수집하는 개인정보의 항목 ①
            회사는 회원서비스 등을 통하여 고객들에게 보다 더 향상된 양질의
            서비스를 제공하기 위하여 고객 개인의 정보를 수집·이용하고 있습니다.
            수집·이용정보항목과 수집·이용 목적은 아래와 같습니다. [수집·이용정보
            항목] - 성명, 성별, 생년월일, ID, 비밀번호, 주소, 이메일, 쿠키 - 만
            14세 미만인 경우 추가 수집·이용정보 항목 : 법정대리인(부모 등)의
            성명, 생년월일, 휴대전화인증 정보, 쿠키 [수집·이용목적] (1) 회원관리
            서비스 이용에 따른 본인식별, 법정대리인 동의 유무 확인, 법정대리인
            본인의 확인, 연령별 서비스의 제공, 불량회원의 부정이용 방지와 비인가
            사용방지, 분쟁 해결, 불만처리 등 민원처리, 문의사항처리 등 (2)
            이벤트 운영 및 고객 연락 추첨행사, 이벤트 운영, 이벤트 결과 공지,
            경품 증정, 사은품 증정, 경품·사은품·기타 물품의 배송, 청구서 전달,
            본인의사 확인, 컨텐츠 제공 및 이와 관련한 고객 연락, 각종 세금
            신고·납부 및 공제, 회사에 부과되는 법적·행정적 의무의 이행 등 (3)
            마케팅 및 광고에 활용 고객 만족도 조사, 여론조사 등의 통계학적 분석,
            이벤트나 상품 등의 광고성 정보 전달 고객의 기본적 인권 침해의 우려가
            있는 민감한 개인정보(인종 및 민족, 사상 및 신조, 출신지 및 본적지,
            정치적 성향 및 범죄기록, 건강상태 등)는 수집하지 않으며 부득이하게
            수집해야 할 경우 고객들의 사전동의를 반드시 구합니다. 그리고, 어떤
            경우에도 수집한 개인정보를 고객들에게 위 수집·이용목적 이외에 다른
            목적으로는 사용하지 않으며, 고객의 동의를 받은 제3자 이외에는 다른
            제3자에게는 제공하지 않습니다."
            readOnly
          />
          <div
            className="agree"
            suppressHydrationWarning
            onClick={() => onToggle('agree', !Boolean(form?.agree))}
          >
            {form?.agree ? (
              <Icon3>
                <IoCheckbox />
              </Icon3>
            ) : (
              <Icon3>
                <IoCheckboxOutline />
              </Icon3>
            )}
            {t('약관에_동의')}
          </div>
        </OptionContainer2>
        <StyledMessage variant="danger">{errors?.agree}</StyledMessage>

        <StyledButtons>
          <MidButton type="button" width="300px" onClick={onReset}>
            {t('다시입력')}
          </MidButton>
          <MidButton type="submit" width="300px">
            {t('다음으로')}
          </MidButton>
          <StyledMessage variant="danger">{errors?.global}</StyledMessage>
        </StyledButtons>
      </FormBox>
    </>
  );
};

export default React.memo(JoinForm);
