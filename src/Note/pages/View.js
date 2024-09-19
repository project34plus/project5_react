import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { ContentBox, OuterBox } from '../../commons/components/LayoutBox';
import Header from '../../layouts/Header';
import ViewContainer from '../containers/ViewContainer';
import { DetailImgBox } from '../../commons/components/DetailBox';
import { DetailTitle } from '../../commons/components/DetailBox';
import { IoMdPricetags } from "react-icons/io";

const View = (bid) => {
  const [pageTitle, setPageTitle] = useState('');

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>
      <OuterBox>
        <Header />
        <ContentBox>
          <DetailImgBox>
            <DetailTitle>
              <h1>
                <IoMdPricetags className="icon" /> {pageTitle}
              </h1>
            </DetailTitle>
            <ViewContainer setPageTitle={setPageTitle} />
          </DetailImgBox>
        </ContentBox>
      </OuterBox>
    </>
  );
};
export default React.memo(View);
