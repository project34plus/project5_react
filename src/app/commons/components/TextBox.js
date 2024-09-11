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

export const TextBox = styled.input`
  border: 1px solid black;
  height: 50px;
  width: 500px;
  padding: 10px;
  border-radius: 5px;
  margin: 15px;
  font-size: ${medium};
  font-weight: ${thin};
  backGround: ${navy};
`;

export const TextBox0 = styled.input`
  border: 1px solid black;
  height: 50px;
  width: 500px;
  padding: 10px;
  border-radius: 5px;
  margin: 15px;
  font-size: ${medium};
  font-weight: ${thin};
  backGround: ${midNavy};
`;

export const TextBox1 = styled.input`
  border: 1px solid black;
  height: 50px;
  width: 500px;
  padding: 10px;
  border-radius: 5px;
  margin: 15px;
  font-size: ${medium};
  font-weight: ${thin};
  backGround: ${lightNavy};
`;

export const TextBox2 = styled.input`
  border: 1px solid black;
  height: 50px;
  width: 500px;
  padding: 10px;
  border-radius: 5px;
  margin: 15px;
  font-size: ${medium};
  font-weight: ${extralight};
  backGround: ${grayNavy};
`;

export const TextBox3 = styled.input`
  border: 1px solid black;
  height: 50px;
  width: 500px;
  padding: 10px;
  border-radius: 5px;
  margin: 15px;
  font-size: ${medium};
  font-weight: ${light};
  backGround: ${lightGrayNavy};
`;

export const TextBox4 = styled.input`
  border: 1px solid black;
  height: 50px;
  width: 500px;
  padding: 10px;
  border-radius: 5px;
  margin: 15px;
  font-size: ${medium};
  font-weight: ${regular};
  backGround: ${whiteGrayNavy};
`;

export const TextBox5 = styled.input`
  border: 1px solid black;
  height: 50px;
  width: 500px;
  padding: 10px;
  border-radius: 5px;
  margin: 15px;
  font-size: ${medium};
  font-weight: ${medium};
  backGround: ${yellow};
`;

export const TextBox6 = styled.input`
  border: 1px solid black;
  height: 50px;
  width: 500px;
  padding: 10px;
  border-radius: 5px;
  margin: 15px;
  font-size: ${medium};
  font-weight: ${semiBold};
  backGround: ${lemon};
`;

export const TextBox7 = styled.input`
  border: 1px solid black;
  height: 50px;
  width: 500px;
  padding: 10px;
  border-radius: 5px;
  margin: 15px;
  font-size: ${medium};
  font-weight: ${extraBold};
  backGround: ${gray};
`;
