import React, { useState, useEffect, useCallback, useContext } from 'react';
import { GoHeart, GoHeartFill } from 'react-icons/go';
import { useLocation, useNavigate } from 'react-router-dom';
import { addWish, removeWish } from '../libs/wish/apiWish';
import UserInfoContext from '../../member/modules/UserInfoContext';
import WishListContext from '../contexts/WishListContext';
import styled from 'styled-components';
import { color } from '../../styles/color';

const { mid_gray, white } = color;

const Icon = styled.div`
  cursor: pointer;
  color: ${(props) => (props.active ? '#ff6a39' : mid_gray)};
  // background-color: ${white};
  transition: color 0.3s;
  font-size: 40px;
`;

const WishButton = ({ IconOn, IconOff, tid}) => {
  const [toggle, setToggle] = useState(false);
  const On = IconOn ?? GoHeartFill;
  const Off = IconOff ?? GoHeart;

  const navigate = useNavigate();
  const location = useLocation();

  const {
    states: { isLogin },
  } = useContext(UserInfoContext);

  const { states } = useContext(WishListContext);

  const wishListKey = `ThesisWish`;
  const wishList = states[wishListKey];

  useEffect(() => {
    setToggle(Boolean(wishList.includes(tid)));
  }, [wishList, tid, isLogin]);

  const onClick = useCallback(
    (status) => {
      if (!isLogin) {
        navigate(`/member/login?redirectUrl=${location.pathname}`);
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
    [tid, navigate, location.pathname, isLogin],
  );

  const IconComponent = toggle ? On : Off;

  return (
    <Icon as={IconComponent} active={toggle} onClick={() => onClick(!toggle)} />
  );
};

export default React.memo(WishButton);
