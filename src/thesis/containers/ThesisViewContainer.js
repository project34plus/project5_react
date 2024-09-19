'use client';
import React, {
  useLayoutEffect,
  useEffect,
  useState,
  useCallback,
} from 'react';
import { useParams } from 'next/navigation';
import { apiGet } from '../apis/apiInfo.js';
import Loading from '@/commons/components/Loading.js';
import ItemDescription from '../components/ItemDescription';
import { getCommonActions } from '@/commons/contexts/CommonContext';
import { useTranslation } from 'react-i18next';
import Container from '@/commons/components/Container.js';

const ThesisViewContainer = ({ setPageTitle }) => {
  const { t } = useTranslation();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(false);

  const { seq } = useParams();

  const { setMainTitle } = getCommonActions();

  useLayoutEffect(() => {
    setMainTitle(t('자료상세'));
  }, [setMainTitle, t]);

  useEffect(() => {
    setLoading(true);

    apiGet(seq).then((item) => {
      setPageTitle(item.title);
      setItem(item);
      console.log('item', item); // 데이터 확인용
    });

    setLoading(false);
  }, [seq, setPageTitle]);

  if (loading || !item) {
    return <Loading />;
  }

  return (
    <Container>
      <div>
        <ItemDescription item={item} />
      </div>
    </Container>
  );
};

export default React.memo(ThesisViewContainer);
