import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import WishButton from '@/commons/components/WishButton';
import { color } from '@/theme/color';
import fontSize from '@/theme/fontSize';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

const { gray, navy } = color;

const { small, normal } = fontSize;

const Wrapper = styled.div`
  word-break: break-all;

  dl {
    padding: 5px 15px;
    line-height: 170%;
  }

  dt {
    width: 140px;
    font-weight: bold;
    font-size: ${normal};
    margin-bottom: 5px;
  }

  dd {
    font-size: ${normal};
  }

  dl + dl {
    border-top: 1px solid ${gray};
  }

  button {
    width: 100px;
    height: 40px;
  }

  .btn-group {
    display: flex;
    gap: 10px;
    margin-top: 15px;
  }

  .info2_wrap {
    margin: 40px 0 30px 0;
    border-top: 2px solid black;
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
`;

const ItemDescription = ({ item }) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState({});

  const {
    tid,
    title,
    poster,
    contributor,
    _fields,
    category,
    thAbstract,
    toc,
    reference,
    publisher,
    keywords,
    viewCount,
  } = item;

  const toggleInfo = (section) => {
    setIsOpen((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <Wrapper>
      <div className="button">
        <WishButton tid={tid}></WishButton>
      </div>
      <dl>
        <dt>{t('조회수')}</dt>
        <dd>{viewCount}</dd>
      </dl>
      <dl>
        <dt>{t('논문명')}</dt>
        <dd>{title}</dd>
      </dl>
      <div className="info_wrap">
        <dl>
          <dt>{t('저자')}</dt>
          <dd>{poster}</dd>
        </dl>
        {contributor && (
          <dl>
            <dt>{t('기여자')}</dt>
            <dd>{contributor}</dd>
          </dl>
        )}
        {/*분류명이 필수 입력값이 되면 다시 수정할 것*/}
        {_fields && (
          <dl>
            <dt>{t('학문_분류')}</dt>
            <dd>
              {Object.values(_fields)?.[0][0]} |{' '}
              {Object.values(_fields)?.[0][1]}
            </dd>
          </dl>
        )}
        <dl>
          <dt>{t('발행기관')}</dt>
          <dd>{publisher}</dd>
        </dl>
        {category && (
          <dl>
            <dt>{t('카테고리')}</dt>
            <dd>{category}</dd>
          </dl>
        )}
        {keywords && (
          <dl>
            <dt>{t('키워드')}</dt>
            <dd>{keywords}</dd>
          </dl>
        )}
      </div>
      <div className="btn-group">
        <button>{t('원문보기')}</button>
        <button>{t('다운로드')}</button>
      </div>
      <div className="info2_wrap">
        <dl>
          <dt onClick={() => toggleInfo('abstract')} className="toggle">
            {t('초록')}
            <span className="arrow">
              {isOpen['abstract'] ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </span>
          </dt>
          {isOpen['abstract'] && <dd>{thAbstract}</dd>}
        </dl>
        <dl>
          <dt onClick={() => toggleInfo('toc')} className="toggle">
            {t('목차')}
            <span className="arrow">
              {isOpen['toc'] ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </span>
          </dt>
          {isOpen['toc'] && <dd>{toc ? toc : 'no data'}</dd>}
        </dl>
        <dl>
          <dt onClick={() => toggleInfo('reference')} className="toggle">
            {t('참고문헌')}
            <span className="arrow">
              {isOpen['reference'] ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </span>
          </dt>
          {isOpen['reference'] && (
            <dd>{reference ? reference : '내용이 없습니다'}</dd>
          )}
        </dl>
      </div>
    </Wrapper>
  );
};

export default React.memo(ItemDescription);
