import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import InputBox2 from '../../../../commons/components/InputBox2';
import { PiChatTeardropTextFill } from 'react-icons/pi';
import MessageBox from '../../../../commons/components/MessageBox';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'; // ClassicEditor import 추가
import { StyledButton } from '@/commons/components/buttons/StyledButton';
import StyledMessage from '@/commons/components/StyledMessage';
import styled from 'styled-components';

const FormBox = styled.form`
  dl {
    display: flex;
    dt {
      width: 130px;
      margin-right: 10px;
    }

    dd {
      flex-grow: 1;
    }
  }
  dl + dl {
    margin-top: 5px;
  }

  button[type='submit'] {
    margin-top: 20px;
  }
`;

const Form = ({ form, errors, onSubmit, onChange }) => {
  const [mounted, setMounted] = useState(true);
  const { t } = useTranslation();

  return (
    <FormBox onSubmit={onSubmit} autoComplete="off">
      <dl>
        <dt className="sub">
          <PiChatTeardropTextFill className="icon" />
          {t('제목')}
        </dt>
        <dd>
          <InputBox2
            type="text"
            name="subject"
            value={form?.subject}
            onChange={onChange}
            placeholder="제목을 입력하세요"
          />
          {errors?.subject && (
            <div className="message-box">
              <MessageBox color="danger" messages={errors.subject} />
            </div>
          )}
        </dd>
      </dl>
      <dl>
        <dd>
          {mounted && (
            <CKEditor
              editor={ClassicEditor}
              data={form?.content}
              onReady={(editor) => {
                setMounted(true);
              }}
              onChange={(_, editor) => {
                onChange({
                  target: { name: 'content', value: editor.getData() },
                });
              }}
            />
          )}
          {errors?.content && (
            <div className="message-box">
              <MessageBox color="danger" messages={errors.content} />
            </div>
          )}
        </dd>
      </dl>
      <StyledButton type="submit" variant="primary">
        {form?.mode === 'update' ? t('수정하기') : t('등록하기')}
      </StyledButton>
      <StyledMessage variant="danger">{errors?.global}</StyledMessage>
    </FormBox>
  );
};

export default React.memo(Form);