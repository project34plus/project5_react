import React, { useState, useEffect, useCallback, useContext } from 'react';
import { GoHeart, GoHeartFill } from 'react-icons/go';
import { useRouter } from 'next/navigation'; // Next.js에서 경로 이동을 위한 훅
import { addWish, removeWish } from '../libs/wish/apiWish';
import UserInfoContext from '../contexts/UserInfoContext';
import WishListContext from '../contexts/WishListContext';
import styled from 'styled-components';


const Icon = styled.div`
    cursor: pointer;
    transition: color 0.3s;
    font-size: 40px;
    color: ${(props) => (props.active ? '#ff6a39' : '#ccc')};
`;

const WishButton = ({ IconOn, IconOff, tid }) => {
  const [toggle, setToggle] = useState(false);
  const On = IconOn ?? GoHeartFill;
  const Off = IconOff ?? GoHeart;

  const router = useRouter(); // useNavigate, useLocation 대신 useRouter 사용
  const {
    states: { isLogin },
  } = useContext(UserInfoContext);

  const { states, actions } = useContext(WishListContext);
  const wishList = states.thesisWish; // thesisWish 리스트 사용
  useEffect(() => {
    console.log('wishList: ', wishList);
    console.log('tid', tid);
    console.log(wishList.includes(tid.toString()));
    setToggle(Boolean(wishList.includes(tid.toString())));
  }, [wishList, tid, isLogin]);

  const onClick = useCallback(
    (status) => {
      if (!isLogin) {
        // 로그인 페이지로 리다이렉트
        router.push(`/member/login?redirectUrl=${window.location.pathname}`);
        return;
      }

      const requestWish = status ? addWish : removeWish;

      (async () => {
        try {
          await requestWish(tid);
          setToggle(status);
        } catch (err) {
          console.error(err);
        }
      })();
    },
    [tid, router, isLogin], // navigate와 location 대신 router 사용
  );

  const IconComponent = toggle ? On : Off;

  return (
    <Icon as={IconComponent} active={toggle} onClick={() => onClick(!toggle)} />
  );
};

export default React.memo(WishButton);
