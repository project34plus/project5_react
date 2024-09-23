import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

const Container = styled.div`
  width: 1400px;
  margin: auto;
  height: 300px;
  position: relative;
  margin-bottom: 50px;
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSize.medium};
  color: ${({ theme }) => theme.color.black};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`;

const PapersList = styled.div`
  width: 1400px;
  margin: auto;
  height: 250px;
  display: flex;
  justify-content: space-between;

 .picture {
  background: #f0f0f0;
  width: 160px;
  height: 200px;
  transition: transform 0.5s ease, box-shadow 0.5s ease;
 }

 .picture img {
  transition: opacity 0.5s ease;
 }

 .picture:hover {
  transform: scale(1.02);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
 }

 .picture:hover img {
  opacity: 0.7;
 }

  a {
    font-size: ${({ theme }) => theme.fontSize.normal};
    text-align: center;
    display: flex;
    justify-content: center;
    margin-bottom: 5px;
  }
`;

const ThemeBasedPaperContainer = () => {
  const { t } = useTranslation();
  return (
    <Container>
      <Title>주제별 인기 논문</Title>
      <PapersList>
        <div className='picture'>
        <a href="/trend/fields">
        <Image
          src="/images/natural.jpg"
          alt="자연과학"
          width={156}
          height={160}
        />
        </a>
        <a href="/trend/fields">{t('자연과학')}</a>
        </div>
        <div className='picture'>
        <a href="/trend/fields">
        <Image
          src="/images/Engineering.jpg"
          alt="공학_및_기술"
          width={156}
          height={160}
        />
        </a>
        <a href="/trend/fields">{t('공학_및_기술')}</a>
        </div>
        <div className='picture'>
        <a href="/trend/fields">
        <Image
          src="/images/medicine2.jpg"
          alt="의학_및_보건학"
          width={156}
          height={160}
        />
        </a>
        <a href="/trend/fields">{t('의학_및_보건학')}</a>
        </div>
        <div className='picture'>
        <a href="/trend/fields">
        <Image
          src="/images/humanities.jpg"
          alt="인문학"
          width={156}
          height={160}
        />
        </a>
        <a href="/trend/fields">{t('인문학')}</a>
        </div>
        <div className='picture'>
        <a href="/trend/fields">
        <Image
          src="/images/social.jpg"
          alt="사회과학"
          width={156}
          height={160}
        />
        </a>
        <a href="/trend/fields">{t('사회과학')}</a>
        </div>
        <div className='picture'>
        <a href="/trend/fields">
        <Image
          src="/images/natural2.jpg"
          alt="농업_및_생명공학"
          width={156}
          height={160}
        />
        </a>
        <a href="/trend/fields">{t('농업_및_생명공학')}</a>
        </div>
        <div className='picture'>
        <a href="/trend/fields">
        <Image
          src="/images/economy.jpg"
          alt="경영_및_경제"
          width={156}
          height={160}
        />
        </a>
        <a href="/trend/fields">{t('경영_및_경제')}</a>
        </div>
        <div className='picture'>
        <a href="/trend/fields">
        <Image
          src="/images/design.jpg"
          alt="예술_및_디자인"
          width={156}
          height={160}
        />
        </a>
        <a href="/trend/fields">{t('예술_및_디자인')}</a>
        </div>
      </PapersList>
    </Container>
  );
};

export default React.memo(ThemeBasedPaperContainer);
