export const metadata = {
  title: '마이페이지',
};

const MyPage = () => {
  return (
    <>
      <h1>마이페이지 메인화면</h1>
      <a href="/mypage/MyThesisList">내가 등록한 논문</a>
      <br />
      <a href="/mypage/MyInfoEdit">내 프로필</a>
      <br />
      <a href="/mypage/MyRecentlyView">최근 본 논문</a>
      <br />
      <a href="/mypage/MyWishList">내가 찜한 논문</a>
      <br />
    </>
  );
};

export default MyPage;
