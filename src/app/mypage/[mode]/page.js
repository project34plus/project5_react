import InfoContainer from '@/mypage/containers/InfoContainer';
import MemberOnlyContainer from '@/member/containers/MemberOnlyContainer';
import MyInterestsContainer from '@/mypage/containers/MyInterestsContainer';
import MyRecentlyViewContainer from '@/mypage/containers/MyRecentlyViewContainer';
import MyThesisContainer from '@/mypage/containers/MyThesisContainer';

const MypageModePage = ({ params }) => {
  const { mode } = params;

  let Container = null;
  switch (mode) {
    case 'Interests':
      Container = MyInterestsContainer;
      break;
    case 'RecentlyView':
      Container = MyRecentlyViewContainer;
      break;
    case 'MyThesis':
      Container = MyThesisContainer;
      break;
    case 'WishList':
      Container = MyWishListContainer;
      break;
    default:
      Container = InfoContainer;
  }
  return (
    <MemberOnlyContainer>
      <Container />
    </MemberOnlyContainer>
  );
};

export default MypageModePage;
