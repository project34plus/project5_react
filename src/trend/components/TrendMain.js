import React from 'react';
import { useTranslation } from 'react-i18next';
import Container from '@/commons/components/Container';
import { FaChartPie, FaRegChartBar } from 'react-icons/fa';
import { IoList } from 'react-icons/io5';
import { AiOutlineRadarChart } from 'react-icons/ai';
import styled from 'styled-components';
import Image from 'next/image';
import fontSize from '@/theme/fontSize';
import { color } from '@/theme/color';
const { small, normal, medium, big } = fontSize;
const { gray, grayNavy } = color;

const Wrapper = styled.div`
  font-size: ${small};
  margin-top: -100px;

  .img {
    display: flex; 
    flex-direction: column; 
    align-items: left;
    justify-content: center;
    height: 100%;
  }

  div {
    .info-title {
      padding-bottom: 10px;
      font-size: ${medium};
      font-weight: bold;
      border-bottom: 1px solid ${gray};
    }

    .info {
      font-weight: bold;
      font-size: ${normal};
    }

    dt + dd {
      margin: 10px 0;
    }

    dl + dl {
      margin-top: 50px;
    }
  }
`;

const TrendMain = () => {
  const { t } = useTranslation();
  return (
    <Container>
      <Wrapper>
        <div className="img">
          <Image
            src="/images/trend.gif"
            alt="최신_연구_트렌드"
            width={200}
            height={200}
          />
        </div>
        <div>
          <dl>
            <dt className="info-title">{t('최신_연구_트렌드란')}</dt>
            <dd>
              {t(
                'NonNull_이용자의_여러_이용통계를_항목별로_분류하여_자료별_이용통계_수치를_반영하여_시각화_자료를_제공합니다',
              )}
            </dd>
          </dl>
          <dl>
            <dt className="info">
              <IoList />
              &nbsp;{t('최신_인기_논문')}
            </dt>
            <dd>{t('NonNull_최신_자료')}</dd>
          </dl>
          <dl>
            <dt className="info">
              <FaRegChartBar />
              &nbsp;{t('학문별_인기논문')}
            </dt>
            <dd>{t('NonNull_학문별_인기')}</dd>
          </dl>
          <dl>
            <dt className="info">
              <FaChartPie />
              &nbsp;{t('그룹별_인기검색어')}
            </dt>
            <dd>{t('NonNull_직업별_검색어')}</dd>
          </dl>
        </div>
      </Wrapper>
    </Container>
  );
};

export default TrendMain;
