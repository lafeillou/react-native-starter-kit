/* eslint-disable import/prefer-default-export */
import { PixelRatio } from 'react-native';


/**
 * 转换dp
 * @param {number} number 设计稿dp
 */
export function calc(number) {
  // console.log(PixelRatio.get());
  // return number;
  // return number / PixelRatio.get();
  return number / 1.5;
  // return PixelRatio.getPixelSizeForLayoutSize(number) / PixelRatio.get();
}
