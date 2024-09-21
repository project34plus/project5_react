import React from 'react';
import styled from 'styled-components';
import { Link } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import WishButton from '@/commons/components/WishButton';
import { color } from '@/theme/color';
import fontSize from '@/theme/fontSize';

const { gray } = color;

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
    font-size: ${small};
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
  }

  .info_wrap {
    margin-top: 40px;
    border-top: 2px solid black;
  }
`;

const ItemDescription = ({ item }) => {
  const { t } = useTranslation();
  const {
    tid,
    title,
    poster,
    contributor,
    thAbstract,
    toc,
    reference,
    publisher,
    keywords,
    viewCount,
  } = item;

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
      <dl>
        <dt>{t('저자')}</dt>
        <dd>{poster}</dd>
      </dl>
      <dl>
        <dt>{t('기여자')}</dt>
        <dd>{contributor}</dd>
      </dl>
      <dl>
        <dt>{t('발행기관')}</dt>
        <dd>{publisher}</dd>
      </dl>
      <dl>
        <dt>{t('키워드')}</dt>
        <dd>{keywords}</dd>
      </dl>
      <div className='info_wrap'>
      <dl>
        <dt>{t('초록')}</dt>
        <dd>{thAbstract}</dd>
      </dl>
      <dl>
        <dt>{t('목차')}</dt>
        <dd>{toc}</dd>
      </dl>
      <dl>
        <dt>{t('참고문헌')}</dt>
        <dd>{reference}</dd>
      </dl>
      </div>
      <div className='btn-group'>
        <button>{t('원문보기')}</button>
        <button>{t('다운로드')}</button>
      </div>
    </Wrapper>
  );
};

export default React.memo(ItemDescription);
