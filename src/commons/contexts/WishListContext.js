import { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { getWishList } from '../libs/wish/apiWish'; // 논문 위시리스트 API 호출
import UserInfoContext from './UserInfoContext';

const WishListContext = createContext({
  states: {
    thesisWish: [], // 논문 위시리스트
  },
  actions: {
    setThesisWish: null, // 위시리스트 상태 설정
  },
});

export const WishListProvider = ({ children }) => {
  const [thesisWish, setThesisWish] = useState([]);

  // 논문 위시리스트 업데이트 함수
  const updateWish = useCallback(() => {
    (async () => {
      try {
        const thesisWishList = await getWishList(); // 논문 위시리스트 가져오기
        setThesisWish(thesisWishList);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  const value = {
    states: {
      thesisWish,
    },
    actions: {
      setThesisWish,
      updateWish,
    },
  };

  const {
    states: { isLogin },
  } = useContext(UserInfoContext);

  // 로그아웃 시 위시리스트 초기화
  useEffect(() => {
    if (!isLogin) {
      setThesisWish([]);
      return;
    }
  }, [isLogin]);

  // 로그인 상태 변경 시 위시리스트 업데이트
  useEffect(() => {
    if (isLogin) {
      updateWish();
    }
  }, [isLogin, updateWish]);

  return (
    <WishListContext.Provider value={value}>
      {children}
    </WishListContext.Provider>
  );
};

export const { Consumer: WishListConsumer } = WishListContext;

export default WishListContext;
