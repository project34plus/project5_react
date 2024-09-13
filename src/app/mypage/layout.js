//마이페이지 전용 레이아웃 (공통적인 형태 구성해두기)
export default function MypageLayout({ children }) {
  return (
    <>
      <h1>마이페이지 전용 레이아웃</h1>
      {children}
      <h1>마이페이지 전용 하단 부분</h1>
    </>
  );
}
