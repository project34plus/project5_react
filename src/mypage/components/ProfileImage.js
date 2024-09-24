import React from 'react';
import styled from 'styled-components';
import FileUpload from '@/commons/components/FileUpload';
import Image from 'next/image';

const Wrapper = styled.div`
  width: 200px;
  height: 200px;
  margin: auto;

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
        imageUrl={
          profileImage ?? (
            <Image
              src="/images/noImage.jpg"
              alt="기본프로필 이미지"
              width={200}
              height={200}
            />
          )
        }
        gid={gid}
        imageOnly={true}
        single={true}
        done={true} // false 로 바꾸면 수정하기 눌러야 프로필이미지 수정됨!
        callback={fileUploadCallback}
      />
    </Wrapper>
  );
};

export default React.memo(ProfileImage);
