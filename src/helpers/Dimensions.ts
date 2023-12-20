import {Dimensions} from 'react-native';

const screen = Dimensions.get('screen');

export function w(num: number = 0) {
  return (screen.width * num) / 100;
}

export function h(num: number = 0) {
  const screen = Dimensions.get('screen');

  return (screen.height * num) / 100;
}
