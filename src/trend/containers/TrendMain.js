'use client';
import React, { useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { getCommonActions } from '@/commons/contexts/CommonContext';
import TrendSub from '../components/TrendSub';
import Container from '@/commons/components/Container';

const TrendMainTitle = () => {
  const { t } = useTranslation();
  const { setMainTitle } = getCommonActions();
  useLayoutEffect(() => {
    setMainTitle(t('최신연구트렌드'));
  }, [setMainTitle, t]);
};

const TrendMain = () => {
  return (
    <Container>
      <TrendMainTitle />
      <TrendSub />
    </Container>
  );
};

export default React.memo(TrendMain);
