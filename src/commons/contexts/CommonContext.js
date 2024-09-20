/* eslint-disable react-hooks/rules-of-hooks */
import React, { createContext, useState, useContext } from 'react';

//사이트 공통으로 필요한 게 생기면 더 추가하기
const CommonContext = createContext({
  state: {
    linkText: '',
    linkHref: '',
  },
  mainTitle: '',
  subTitle: '',
  showHeader: true, // 헤더 보임 통제
  showFooter: true, // 푸터 보임 통제
  showMainMenu: true, // 메뉴 보임 통제
});

const CommonProvider = ({ children }) => {
  const [linkText, setLinkText] = useState('');
  const [linkHref, setLinkHref] = useState('');
  const [mainTitle, setMainTitle] = useState('');
  const [subTitle, setSubTitle] = useState('');
  const [showHeader, setShowHeader] = useState(true);
  const [showFooter, setShowFooter] = useState(true);
  const [showMainMenu, setShowMainMenu] = useState(true);

  const value = {
    states: {
      mainTitle,
      subTitle,
      showHeader,
      showFooter,
      showMainMenu,
      linkText,
      linkHref,
    },
    actions: {
      setMainTitle,
      setSubTitle,
      setShowHeader,
      setShowFooter,
      setShowMainMenu,
      setLinkText,
      setLinkHref,
    }, //주소 매핑으로 접근 가능, 필요한 것만 비구조할당으로 가져옴
  };

  return (
    <CommonContext.Provider value={value}>{children}</CommonContext.Provider>
  );
};

const { Consumer: CommonConsumer } = CommonContext;

export { CommonProvider, CommonConsumer };

export const getCommonStates = () => {
  const { states } = useContext(CommonContext);
  return states;
};

export const getCommonActions = () => {
  //변화감지
  const { actions } = useContext(CommonContext);
  return actions;
};

export default CommonContext;
