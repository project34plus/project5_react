'use client';
import React, { useContext } from 'react';
import MyThesisList from '../components/MyThesisList';
import Container from '@/commons/components/Container';
import CommonContext from '@/commons/modules/CommonContext';

const MyThesisContainer = () => {

  const {
    actions: {setLinkText, setLinkHref},
  } = useContext(CommonContext)

  return (
    <Container>
        <MyThesisList />
    </Container>
  )
};

export default React.memo(MyThesisContainer);