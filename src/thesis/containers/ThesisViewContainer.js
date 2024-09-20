'use client';
import React, {
  useLayoutEffect,
  useEffect,
  useState,
  useCallback,
} from 'react';
import { List } from 'react-content-loader';
import { useParams } from 'next/navigation';
import { apiGet } from '../apis/apiInfo.js';
import ItemDescription from '../components/ItemDescription';
import { getCommonActions } from '@/commons/contexts/CommonContext';
import { useTranslation } from 'react-i18next';
import Container from '@/commons/components/Container.js';

const MyListLoader = () => <List />;

const ThesisViewContainer = () => {
  const { t } = useTranslation();
  const [item, setItem] = useState(null);

  const { seq } = useParams();

  const { setMainTitle } = getCommonActions();

  useLayoutEffect(() => {
    setMainTitle(t('자료상세'));
  }, [setMainTitle, t]);

  useEffect(() => {
    apiGet(seq).then((item) => {
      setMainTitle(item.title);
      setItem(item);
      console.log('item', item); // 데이터 확인용
    });
  }, [seq, setMainTitle]);

  if (!item) {
    return <MyListLoader />;
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
