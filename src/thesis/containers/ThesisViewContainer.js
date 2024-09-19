'use client';
import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { apiGet } from '../apis/apiInfo.js';
import Loading from '@/commons/components/Loading';
import ItemDescription from '../components/ItemDescription';

const ThesisViewContainer = ({ setPageTitle }) => {
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(false);

  const { seq } = useParams();

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
    <>
      <div>
        <ItemDescription item={item} />
      </div>
    </>
  );
};

export default ThesisViewContainer;
