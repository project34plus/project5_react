









function getQueryString(searchParams) {
    const qs = { limit: 10 };
    if (searchParams.size > 0) {
      for (const [k, v] of searchParams) {
        qs[k] = v;
      }
    }
    return qs;
  
  }

  function skinRoute(skin) {
    switch (skin) {
      case 'memo':
        return MemoList;
      default:
        return DefaultList;
    }
  }

  const ListContainer = ({ setPageTitle, nid}) => {
    const [searchParams] = useSearchParams();
    
  }