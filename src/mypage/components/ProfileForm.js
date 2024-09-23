import React, { useTransition } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { StyledInput } from '@/commons/components/inputs/StyledInput';
import { MidButton } from '@/commons/components/buttons/BlueButtons';
import StyledMessage from '@/commons/components/StyledMessage';
import {
  IoAtSharp,
  IoLockClosed,
  IoLockClosedOutline,
  IoPersonCircleSharp,
  IoPhonePortraitOutline,
  IoCheckmarkCircleOutline,
  IoCheckmarkCircleSharp,
  IoPersonSharp,
  IoCalendarNumberOutline,
} from 'react-icons/io5';
import JoinInput from '@/member/components/JoinInput';

const FormBox = styled.form`
  width: 1000px;
  padding: 40px 50px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.6);
  margin-left: 20px;

  select {
    padding: 10px;
    border: 2px solid ${({ theme }) => theme.color.whiteGrayNavy};
    border-radius: 5px;
    background-color: #f9f9f9;
    color: ${({ theme }) => theme.color.black};
    font-size: ${({ theme }) => theme.fontSize.small};
    transition: border-color 0.3s;
  }

  select:focus {
    border-color: ${({ theme }) => theme.color.grayNavy};
    outline: none;
  }
  .selectBox {
    display: flex;
    gap: 5px;
    margin-bottom: 30px;
    margin-left: 25px;
  }
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
  color: ${({ theme }) => theme.color.navy};
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

const StyledInput2 = styled(JoinInput)`
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

const ProfileForm = ({
  form,
  _onChange,
  errors,
  onSubmit,
  onClick,
  onToggle,
  onReset,
  fields,
  interests,
}) => {
  const { t } = useTranslation();
  console.log(form);

  return (
    <>
      <FormBox onSubmit={onSubmit}>
        <Title>{t('회원정보_수정')}</Title>
        <div className="mypage">
          <Subtitle>
            <Icon2>
              <IoPersonSharp />
            </Icon2>
            {t('이메일')}
          </Subtitle>
          <dl>
            <dd>
              <InputWrapper>
                <Icon>
                  <IoAtSharp />
                </Icon>
                <StyledInput2
                  type="text"
                  name="email"
                  value={form?.email}
                  disabled
                  onChange={_onChange}
                />
              </InputWrapper>
            </dd>
          </dl>
          <dl>
            <dd>
              <InputWrapper>
                <Icon>
                  <IoLockClosedOutline />
                </Icon>
                <StyledInput2
                  type="password"
                  name="password"
                  value={form?.password}
                  onChange={_onChange}
                  placeholder={t('비밀번호')}
                />
              </InputWrapper>
              {errors?.password && (
                <StyledMessage variant="danger">
                  {errors?.password}
                </StyledMessage>
              )}
            </dd>
          </dl>
          <dl>
            <dd>
              <InputWrapper>
                <Icon>
                  <IoLockClosed />
                </Icon>
                <StyledInput2
                  type="password"
                  name="confirmPassword"
                  value={form?.confirmPassword}
                  onChange={_onChange}
                  placeholder={t('비밀번호_확인')}
                />
              </InputWrapper>
              {errors?.confirmPassword && (
                <StyledMessage variant="danger">
                  {errors?.confirmPassword}
                </StyledMessage>
              )}
            </dd>
          </dl>
          <dl>
            <dd>
              <InputWrapper>
                <Icon>
                  <IoPersonCircleSharp />
                </Icon>
                <StyledInput2
                  type="text"
                  name="userName"
                  value={form?.userName}
                  onChange={_onChange}
                  placeholder={t('회원명')}
                />
              </InputWrapper>
              {errors?.userName && (
                <StyledMessage variant="danger">
                  {errors?.userName}
                </StyledMessage>
              )}
            </dd>
          </dl>
          <dl>
            <dd>
              <InputWrapper>
                <Icon>
                  <IoPhonePortraitOutline />
                </Icon>
                <StyledInput2
                  type="text"
                  name="mobile"
                  value={form?.mobile}
                  onChange={_onChange}
                  placeholder={t('전화번호')}
                />
              </InputWrapper>
              {errors?.mobile && (
                <StyledMessage variant="danger">{errors?.mobile}</StyledMessage>
              )}
            </dd>
          </dl>
          <dl>
            <dd>
              <InputWrapper>
                <Icon>
                  <IoCalendarNumberOutline />
                </Icon>
                <StyledInput2
                  type="date"
                  name="birth"
                  value={form?.birth || ''}
                  onChange={_onChange}
                />
              </InputWrapper>
              {errors?.birth && (
                <StyledMessage variant="danger">{errors?.birth}</StyledMessage>
              )}
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
          <div className="selectBox">
            <select name="memMajor" value={form.memMajor} onChange={_onChange}>
              <option value="">{t('전공_선택')}</option>
              {fields.length > 0 ? (
                fields.map((field, index) => (
                  <option key={index} value={field}>
                    {field}
                  </option>
                ))
              ) : (
                <option disabled>{t('필드가 없습니다.')}</option>
              )}
            </select>

            <select name="memMinor" value={form.memMinor} onChange={_onChange}>
              <option value="">{t('부전공_선택')}</option>
              {fields.length > 0 ? (
                fields.map((field, index) => (
                  <option key={index} value={field}>
                    {field}
                  </option>
                ))
              ) : (
                <option disabled>{t('필드가 없습니다.')}</option>
              )}
            </select>
          </div>

          <Subtitle>
            <Icon2>
              <IoPersonSharp />
            </Icon2>
            {t('관심분야')}
          </Subtitle>
          <div className="selectBox">
            <select
              name="interest1"
              value={(form.interests && form.interests[0]) || ''}
              onChange={_onChange}
            >
              <option value="">{t('관심분야_선택')}</option>
              {interests.length > 0 ? (
                interests.map((interest) => (
                  <option key={interest.id} value={interest.id}>
                    {interest.subfield}
                  </option>
                ))
              ) : (
                <option disabled>{t('필드가 없습니다.')}</option>
              )}
            </select>

            <select
              name="interest2"
              value={(form.interests && form.interests[1]) || ''}
              onChange={_onChange}
            >
              <option value="">{t('관심분야_선택')}</option>
              {interests.length > 0 ? (
                interests.map((interest) => (
                  <option key={interest.id} value={interest.id}>
                    {interest.subfield}
                  </option>
                ))
              ) : (
                <option disabled>{t('필드가 없습니다.')}</option>
              )}
            </select>
          </div>
        </div>

        {errors?.global && (
          <StyledMessage variant="danger">{errors?.global}</StyledMessage>
        )}
        <StyledButtons>
          <MidButton type="submit">{t('회원정보_수정하기')}</MidButton>
          <MidButton type="button" onClick={onClick}>
            {t('회원탈퇴하기')}
          </MidButton>
        </StyledButtons>
      </FormBox>
    </>
  );
};

export default React.memo(ProfileForm);
