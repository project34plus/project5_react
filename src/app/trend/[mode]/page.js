import FieldTrendContainer from '@/trend/containers/FieldTrendContainer';
import GroupTrendsContainer from '@/trend/containers/GroupTrendsContainer';
import RecentTrendContainer from '@/trend/containers/RecentTrendContainer';
import TrendMain from '@/trend/containers/TrendMain';

const MypageModePage = ({ params, searchParams }) => {
  const { mode } = params;

  let Container = null;
  switch (mode) {
    case 'recent':
      Container = RecentTrendContainer;
      break;
    case 'fields':
      Container = FieldTrendContainer;
      break;
    case 'group':
      Container = GroupTrendsContainer;
      break;
    default:
      Container = TrendMain;
  }
  return (
    <>
      <Container searchParams={searchParams}/>
    </>
  );
};

export default MypageModePage;
