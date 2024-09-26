import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';

const Container = styled.div`
  width: 100%;
  margin: auto;
  height: 450px;
  position: relative;
  padding: 40px;
  background: ${({ theme }) => theme.color.navy};
`;

const MenuList = styled.div`
  width: 700px;
  margin: auto;
  height: 350px;

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;

  a {
    font-size: ${({ theme }) => theme.fontSize.normal};
    font-weight: ${({ theme }) => theme.fontWeight.bold};
  }

  .menus {
    width: 180px;
    height: 170px;
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: ${({ theme }) => theme.color.white};
    border-radius: 10px;
  }
`;

const MenuContainer = () => {
  const { t } = useTranslation();
  return (
    <Container>
      <MenuList>
        <div className="menus">
          <a href="/thesis/list">
            <Image
              src="/images/list.gif"
              alt="논문학술자료"
              width={120}
              height={120}
            />
          </a>
          <a href="/thesis/list">{t('논문학술자료')}</a>
        </div>
        <div className="menus">
          <a href="/thesis/upload">
            <Image
              src="/images/upload.gif"
              alt="논문등록"
              width={120}
              height={120}
            />
          </a>
          <a href="/thesis/upload">{t('논문등록')}</a>
        </div>
        <div className="menus">
          <a href="/trend">
            <Image
              src="/images/trend.gif"
              alt="최신_연구_트렌드"
              width={120}
              height={120}
            />
          </a>
          <a href="/trend">{t('최신_연구_트렌드')}</a>
        </div>
        <div className="menus">
          <a href="/recommend">
            <Image
              src="/images/recommend.gif"
              alt="추천_논문"
              width={120}
              height={120}
            />
          </a>
          <a href="/recommend">{t('추천_논문')}</a>
        </div>
        <div className="menus">
          <a href="/note">
            <Image
              src="/images/note.gif"
              alt="연구노트"
              width={120}
              height={120}
            />
          </a>
          <a href="/note">{t('연구노트')}</a>
        </div>
        <div className="menus">
          <a href="/info">
            <Image
              src="/images/info.gif"
              alt="이용안내"
              width={120}
              height={120}
            />
          </a>
          <a href="/info">{t('이용안내')}</a>
        </div>
      </MenuList>
    </Container>
  );
};

export default React.memo(MenuContainer);
