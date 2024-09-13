/* 테스트용 입니다. */
'use client';
import React from 'react';
import styled from 'styled-components';
import fontSize from '@/app/styles/fontSize';
import fontWeight from '@/app/styles/fontWeight';
import { color } from '@/app/styles/color';

const { extraSmall, small, normal, medium, big, extraBig, giantBig } = fontSize;

const { thin, extralight, light, regular, semiBold, bold, extraBold } =
  fontWeight;

const {
  navy,
  midNavy,
  lightNavy,
  grayNavy,
  whiteGrayNavy,
  yellow,
  lemon,
  lightGrayNavy,
  gray,
} = color;

export const TestBox = styled.input`
  border: 1px solid black;
  height: 50px;
  width: 500px;
  padding: 10px;
  border-radius: 5px;
  margin: 15px;
  font-size: ${medium};
  font-weight: ${thin};
  background: ${navy};
`;

export const TestBox0 = styled.input`
  border: 1px solid black;
  height: 50px;
  width: 500px;
  padding: 10px;
  border-radius: 5px;
  margin: 15px;
  font-size: ${medium};
  font-weight: ${thin};
  background: ${midNavy};
`;

export const TestBox1 = styled.input`
  border: 1px solid black;
  height: 50px;
  width: 500px;
  padding: 10px;
  border-radius: 5px;
  margin: 15px;
  font-size: ${medium};
  font-weight: ${thin};
  background: ${lightNavy};
`;

export const TestBox2 = styled.input`
  border: 1px solid black;
  height: 50px;
  width: 500px;
  padding: 10px;
  border-radius: 5px;
  margin: 15px;
  font-size: ${medium};
  font-weight: ${extralight};
  background: ${grayNavy};
`;

export const TestBox3 = styled.input`
  border: 1px solid black;
  height: 50px;
  width: 500px;
  padding: 10px;
  border-radius: 5px;
  margin: 15px;
  font-size: ${medium};
  font-weight: ${light};
  background: ${lightGrayNavy};
`;

export const TestBox4 = styled.input`
  border: 1px solid black;
  height: 50px;
  width: 500px;
  padding: 10px;
  border-radius: 5px;
  margin: 15px;
  font-size: ${medium};
  font-weight: ${regular};
  background: ${whiteGrayNavy};
`;

export const TestBox5 = styled.input`
  border: 1px solid black;
  height: 50px;
  width: 500px;
  padding: 10px;
  border-radius: 5px;
  margin: 15px;
  font-size: ${medium};
  font-weight: ${medium};
  background: ${yellow};
`;

export const TestBox6 = styled.input`
  border: 1px solid black;
  height: 50px;
  width: 500px;
  padding: 10px;
  border-radius: 5px;
  margin: 15px;
  font-size: ${medium};
  font-weight: ${semiBold};
  background: ${lemon};
`;

export const TestBox7 = styled.input`
  border: 1px solid black;
  height: 50px;
  width: 500px;
  padding: 10px;
  border-radius: 5px;
  margin: 15px;
  font-size: ${medium};
  font-weight: ${extraBold};
  background: ${gray};
`;
