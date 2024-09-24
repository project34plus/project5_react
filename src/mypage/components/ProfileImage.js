import React from 'react';
import styled from 'styled-components';
import FileUpload from '@/commons/components/FileUpload';
import Image from 'next/image';

const Wrapper = styled.div`
  width: 250px;
  height: 250px;
  border: 3px solid ${({ theme }) => theme.color.whiteGrayNavy};
  display: flex;
  flex-direction: column;
  margin: auto;
  margin-bottom: 20px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const ProfileImage = ({ gid, profileImage, fileUploadCallback, className }) => {
  return (
    <Wrapper className={className}>
      <FileUpload
        width={200}
        imageUrl={profileImage ?? '/images/noImage.jpg'}
        gid={gid}
        imageOnly={true}
        single={true}
        done={true} // false 로 바꾸면 수정하기 눌러야 프로필이미지 수정됨!
        fileUploadCallback={fileUploadCallback}
      />
    </Wrapper>
  );
};

export default React.memo(ProfileImage);
