import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { color } from '@/theme/color';

const { gray } = color;

const MyThesisListItems = ({ items }) => {
  return (
    <Wrapper>
      {items?.length > 0 &&
        items.map(({ tid, title, gid, poster }) => (
          <li key={tid}>
            <Link href={`/thesis/view/${tid}`} passHref>
              <a>
                <div className="tid">{tid}</div>
                <div className="gid">{gid}</div>
                <div className="title">{title}</div>
                <div className="poster">{poster}</div>
              </a>
            </Link>
          </li>
        ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  li {
    display: flex;
    border-bottom: 1px solid ${gray};
    height: 50px;
    align-items: center;
    justify-content: space-between;
    font-size: 1.2rem;
    text-align: center;
    padding: 10px 0;

    a {
      display: flex;
      width: 100%;
      justify-content: space-between;
    }

    .tid {
      width: 10%;
      padding-left: 10px;
    }

    .gid {
      width: 20%;
    }

    .title {
      width: 50%;
    }

    .poster {
      width: 20%;
    }
  }
`;

export default React.memo(MyThesisListItems);
