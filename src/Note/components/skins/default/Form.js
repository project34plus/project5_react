import React, { useState, useEffect, useContext, useCallback } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import {
  ClassicEditor,
  Image,
  ImageInsert,
  Bold,
  Essentials,
  Italic,
  Paragraph,
} from 'ckeditor5';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import MessageBox from '../../../../commons/components/MessageBox';
import InputBox2 from '../../../../commons/components/InputBox2';
import UserInfoContext from '../../../../member/modules/UserInfoContext';
import { FaCheckSquare, FaSquare } from 'react-icons/fa';
import { MidButton } from '../../../../commons/components/Buttons';
import FileUpload from '../../../../commons/components/FileUpload';
import FileItems from '../../../../commons/components/FileItems';
import { color } from '../../../../styles/color';
import 'ckeditor5/ckeditor5.css';
import { IoPerson } from 'react-icons/io5';
import { RiLockPasswordFill } from 'react-icons/ri';
import { PiChatTeardropTextFill } from 'react-icons/pi';
import { RiMegaphoneFill } from 'react-icons/ri';


const Form = ({
  board,
  form,
  onSubmit,
  onToggleNotice,
  errors,
  fileUploadCallback,
  fileDeleteCallback,
  onChange,
}) => {
  const [mounted, setMounted] = useState(false);
  const [editor, setEditor] = useState(null);
  const { useEditor, useUploadImage, useUploadFile } = board;
  const { t } = useTranslation();
  const {
    states: { isLogin, isAdmin },
  } = useContext(UserInfoContext);

  useEffect(() => {
    setMounted(true);

    return () => {
      setMounted(false);
    };
  }, []);

  // 이미지 에디터 첨부
  const insertImageCallback = useCallback(
    (url) => {
      editor.execute('insertImage', { source: url });
    },
    [editor],
  );

  return (
    <Wrapper onSubmit={onSubmit} autoComplete="off">
      <div className="writerpw">
        <dl>
          <dt className="sub">
            <IoPerson className="icon" />
            {t('작성자')}
          </dt>
          <dd>
            <InputBox2
              type="text"
              name="poster"
              value={form?.poster}
              onChange={onChange}
              className="input-box"
              placeholder="이름을 입력하세요"
            />
            {errors?.poster && (
              <div className="message-box">
                <MessageBox color="danger" messages={errors.poster} />
              </div>
            )}
          </dd>
        </dl>

        {((form.mode === 'write' && !isLogin) ||
          (form.mode === 'update' && !form?.member)) && (
          <dl>
            <dt className="sub">
              <RiLockPasswordFill className="icon" />
              {t('비밀번호')}
            </dt>
            <dd>
              <InputBox2
                type="password"
                name="guestPw"
                value={form?.guestPw}
                onChange={onChange}
                className="input-box"
                placeholder="비회원 비밀번호"
              />
              {errors?.guestPw && (
                <div className="message-box">
                  <MessageBox color="danger" messages={errors.guestPw} />
                </div>
              )}
            </dd>
          </dl>
        )}
      </div>

      <div className="notice">
        {isAdmin && (
          <dl>
            <dt className="sub3">
              <RiMegaphoneFill className="icon" />
              {t('공지글')}
            </dt>
            <dd className="sub4">
              <div className="notice2">
                <label onClick={onToggleNotice}>
                  {t('공지글로_등록하기')}
                  {form?.notice ? (
                    <FaCheckSquare className="icon2" />
                  ) : (
                    <FaSquare className="icon2" />
                  )}
                </label>
              </div>
            </dd>
          </dl>
        )}
      </div>

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
          {useEditor ? (
            mounted && (
              <CKEditor
                editor={ClassicEditor}
                config={{
                  plugins: [
                    Bold,
                    Essentials,
                    Italic,
                    Paragraph,
                    Image,
                    ImageInsert,
                  ],
                  toolbar: ['undo', 'redo', 'bold', 'italic'],
                }}
                data={form?.content}
                onReady={(editor) => setEditor(editor)}
                onChange={(_, editor) => {
                  onChange({
                    target: { name: 'content', value: editor.getData() },
                  });
                }}
              />
            )
          ) : (
            <textarea
              name="content"
              value={form?.content}
              onChange={onChange}
              className="textarea"
            ></textarea>
          )}
          {errors?.content && (
            <div className="message-box">
              <MessageBox color="danger" messages={errors.content} />
            </div>
          )}
        </dd>
      </dl>

      <FileUploadContainer>
        <div className="imagefile">
          {useUploadImage && editor && (
            <div className="image">
              <dl>
                <dt className="sub2">{t('이미지 첨부')}</dt>
                <dd className="uploadButton">
                  <FileUpload
                    gid={form.gid}
                    location="editor"
                    imageOnly
                    color="dark"
                    width="120"
                    callback={(files) => fileUploadCallback(files, editor)}
                  >
                    {t('이미지_업로드')}
                  </FileUpload>
                  <FileItems
                    files={form?.editorImages}
                    mode="editor"
                    insertImageCallback={insertImageCallback}
                    fileDeleteCallback={fileDeleteCallback}
                  />
                </dd>
              </dl>
            </div>
          )}

          {useUploadFile && (
            <div className="image">
              <dl>
                <dt className="sub2">{t('파일첨부')}</dt>
                <dd className="uploadButton">
                  <FileUpload
                    gid={form.gid}
                    location="attach"
                    width="120"
                    color="dark"
                    callback={fileUploadCallback}
                  >
                    {t('파일선택')}
                  </FileUpload>
                  <FileItems
                    files={form?.attachFiles}
                    mode="attach"
                    fileDeleteCallback={fileDeleteCallback}
                  />
                </dd>
              </dl>
            </div>
          )}
        </div>
      </FileUploadContainer>

      <MidButton type="submit" className="submitButton">
        {t(form.mode === 'update' ? '수정하기' : '작성하기')}
      </MidButton>
    </Wrapper>
  );
};

export default React.memo(Form);
