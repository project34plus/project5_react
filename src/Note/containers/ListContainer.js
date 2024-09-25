'use client';
import { getCommonActions } from '@/commons/contexts/CommonContext';
import { useTranslation } from 'react-i18next';
import Pagination from '@/commons/components/Pagination';
import { getList } from '../apis/apiNote';
import ListItems from '@/Note/components/skins/default/ListItems';

const { useLayoutEffect } = require("react");


const ListContainer =({ searchParams }) => {
    const { setMenuCode, setSubMenuCode, setMainTitle } = getCommonActions();
    const [search, setSearch] = useState(searchParams);
    const [items, setItems] = useState(null);

    const { t } = useTranslation();

    useLayoutEffect(() => {
        setMenuCode('note');
        setSubMenuCode('list');
        setMainTitle(t('노트_목록'));
      }, [setMenuCode, setSubMenuCode, setMainTitle, t]);
    
      useEffect(() => {
        (async () => {
          try {
            const data = await getList(search);
            if (data) {
              setItems(data.items);
              setPagination(data.pagination);
            }
    
            console.log('data', data);
          } catch (err) {
            console.error(err);
          }
        })();
      }, [search]);
    
      const onPageClick = useCallback((page) => {
        setSearch((search) => ({ ...search, page }));
      }, []);
    
      return (
        <>
          <ListItems items={items} />
          {pagination && (
            <Pagination pagination={pagination} onClick={onPageClick} />
          )}
        </>
      );
    };
    
    export default React.memo(ListContainer);