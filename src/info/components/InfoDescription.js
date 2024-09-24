import React, { useState } from 'react';
import Container from '@/commons/components/Container';
import { useTranslation } from 'react-i18next';
import { color } from '@/theme/color';
import fontSize from '@/theme/fontSize';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import styled from 'styled-components';

const { gray, navy } = color;
const { small, normal, big } = fontSize;

const InfoDescription = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState({});

  const toggleInfo = (section) => {
    setIsOpen((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <Container>
      <Wrapper>
        <div className="info_wrap">
          <dl>
            <dt onClick={() => toggleInfo('thesisList')} className="toggle">
              {t('논문학술자료')}
              <span className="arrow">
                {isOpen['thesisList'] ? <IoIosArrowUp /> : <IoIosArrowDown />}
              </span>
            </dt>
            {isOpen['thesisList'] && (
              <dd>논문 검색, 상세 정보 조회가 가능합니다</dd>
            )}
          </dl>
          <dl>
            <dt onClick={() => toggleInfo('thesisUpload')} className="toggle">
              {t('논문_등록')}
              <span className="arrow">
                {isOpen['thesisUpload'] ? <IoIosArrowUp /> : <IoIosArrowDown />}
              </span>
            </dt>
            {isOpen['thesisUpload'] && (
              <dd>
                논문 등록이 가능합니다, 단 관리자의 승인 시에만 등록이
                완료됩니다
              </dd>
            )}
          </dl>
          <dl>
            <dt onClick={() => toggleInfo('thesisTrand')} className="toggle">
              {t('최신_연구_트렌드')}
              <span className="arrow">
                {isOpen['thesisTrand'] ? <IoIosArrowUp /> : <IoIosArrowDown />}
              </span>
            </dt>
            {isOpen['thesisTrand'] && (
              <dd>통계를 기반으로 최신 트랜드 정보를 알려드립니다</dd>
            )}
          </dl>
          <dl>
            <dt
              onClick={() => toggleInfo('thesisRecommend')}
              className="toggle"
            >
              {t('추천_논문')}
              <span className="arrow">
                {isOpen['thesisRecommend'] ? (
                  <IoIosArrowUp />
                ) : (
                  <IoIosArrowDown />
                )}
              </span>
            </dt>
            {isOpen['thesisRecommend'] && (
              <dd>통계를 기반으로 관심있는 논문을 추천드립니다</dd>
            )}
          </dl>
          <dl>
            <dt onClick={() => toggleInfo('thesisNote')} className="toggle">
              {t('연구노트')}
              <span className="arrow">
                {isOpen['thesisNote'] ? <IoIosArrowUp /> : <IoIosArrowDown />}
              </span>
            </dt>
            {isOpen['thesisNote'] && <dd>번뜩이는 아이디어를 기록하세요</dd>}
          </dl>
        </div>
      </Wrapper>
    </Container>
  );
};

const Wrapper = styled.div`
  word-break: break-all;
  position: relative;

  .info_wrap {
  }

  .toggle {
    width: 100%;
    position: relative;
    margin-top: 5px;
    display: flex;
    align-items: center;

    .arrow {
      position: absolute;
      right: 10px;
    }
  }
  dl {
    padding: 15px;
    line-height: 170%;
  }

  dt {
    width: 140px;
    font-weight: bold;
    font-size: ${normal};
    margin-bottom: 10px;
  }

  dd {
    font-size: ${normal};
  }

  dl + dl {
    border-top: 1px solid ${gray};
  }
`;

export default React.memo(InfoDescription);
