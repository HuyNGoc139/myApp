// theme.js
import { Assets, Colors } from 'react-native-ui-lib';

Colors.loadColors({
  primary: '#3498db', // Màu xanh dương
  secondary: '#2ecc71', // Màu xanh lá
  error: '#e74c3c', // Màu đỏ
  lightThemeBackground: '#ffffff', // Màu nền sáng
  darkThemeBackground: '#000000', // Màu nền tối
});

Assets.loadAssetsGroup('icons', {
  icon1: require('../assets/logo.png'),
});
