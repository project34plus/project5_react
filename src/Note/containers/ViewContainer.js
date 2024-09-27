'use client';
import React, {
  useLayoutEffect,
  useEffect,
  useState,
  useCallback,
  useContext,
} from 'react';
import { List } from 'react-content-loader';
import { getCommonActions } from '@/commons/contexts/CommonContext';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation'; //CSR ->router는 SSR
import { getFiles } from '@/commons/libs/file/apiFile.js';
import NoteItem from '../components/skins/default/NoteItem.js';
import { getInfo } from '../apis/apiNote';

const MyListLoader = () => <List />;

const ViewContainer = ({ params }) => {
  const { t } = useTranslation();
  const [item, setItem] = useState(null); //노트 데이터
  const router = useRouter();
  const { seq } = params;
  const { setMainTitle } = getCommonActions();

  useLayoutEffect(() => {
    setMainTitle(t('나의_연구노트'));
  }, [setMainTitle, t]);

  useEffect(() => {
    (async () => {
      try {
        const item = await getInfo(seq);
        if (item) {
          //파일 유무 체크
          const files = await getFiles(item.gid);
          if (files && files.length > 0) {
            item.fileInfo = files;
          }
        }
        setItem(item);
        console.log('item:', item);
      } catch (err) {
        console.error('노트 정보 불러오기 실패:', err);
        // 필요에 따라 적절한 에러 처리 로직 추가
        return; // 실패 시 함수 종료
      }
    })();
  }, [seq, router]);

  if (!item) {
    return <MyListLoader />;
  }

  return (
    <>
      <div>
        <NoteItem item={item} />
      </div>
    </>
  );
};

export default React.memo(ViewContainer);
