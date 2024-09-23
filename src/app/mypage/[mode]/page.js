import InfoContainer from '@/mypage/containers/InfoContainer';
import MemberOnlyContainer from '@/member/containers/MemberOnlyContainer';
import MyInterestsContainer from '@/mypage/containers/MyInterestsContainer';
import MyRecentlyViewContainer from '@/mypage/containers/MyRecentlyViewContainer';
import MyThesisContainer from '@/mypage/containers/MyThesisContainer';
import MyWishListContainer from '@/mypage/containers/MyWishListContainer';

const MypageModePage = ({ params }) => {
  const { mode } = params;

  let Container = null;
  switch (mode) {
    case 'MyInterests':
      Container = MyInterestsContainer;
      break;
    case 'MyRecentlyView':
      Container = MyRecentlyViewContainer;
      break;
    case 'MyThesisList':
      Container = MyThesisContainer;
      break;
    case 'MyWishList':
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
