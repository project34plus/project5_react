import FieldTrendContainer from '@/trend/containers/FieldTrendContainer';
import GroupTrendContainer from '@/trend/containers/GroupTrendContainer';
import RecentTrendContainer from '@/trend/containers/RecentTrendContainer';
import TrendMain from '@/trend/containers/TrendMain';

const MypageModePage = ({ params, searchParams }) => {
  const { mode } = params;

  let Containers = null;
  switch (mode) {
    case 'recent':
      Containers = RecentTrendContainer;
      break;
    case 'fields':
      Containers = FieldTrendContainer;
      break;
    case 'group':
      Containers = GroupTrendContainer;
      break;
    default:
      Containers = TrendMain;
  }
  return (
    <>
      <Containers searchParams={searchParams}/>
    </>
  );
};

export default MypageModePage;
