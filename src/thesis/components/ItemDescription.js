import React from 'react';
import styled from 'styled-components';
import { Link } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import WishButton from '@/commons/components/WishButton';
import { color } from '@/theme/color';

const { gray } = color;

const Wrapper = styled.div`
  dl {
    border: 1px solid ${gray};
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
  } = item;

  return (
    <Wrapper>
      <div className="button">
        <WishButton tid={tid}></WishButton>
      </div>
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
      <dl>
        <dt>{t('발행기관')}</dt>
        <dd>{publisher}</dd>
      </dl>
      <dl>
        <dt>{t('키워드')}</dt>
        <dd>{keywords}</dd>
      </dl>
      <button>다운로드</button>
    </Wrapper>
  );
};

export default React.memo(ItemDescription);
