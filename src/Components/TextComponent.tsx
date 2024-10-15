import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import SpaceComponent from './SpaceComponent';

interface Props {
  title: string;
  isNext?: boolean;
  color?: boolean;
  onPress?: () => void;
}

const TextComponent = (props: Props) => {
  const { title, isNext, color, onPress } = props;

  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text
        style={[styles.text, color ? { color: 'rgba(255, 68, 113, 1)' } : null]}
      >
        {title}
      </Text>
      {isNext ? <Image source={require('../assets/Union.png')} /> : null}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingLeft: 24,
    flexDirection: 'row',
    alignItems: 'center',
    height: 52,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    paddingRight: 24,
    marginTop: 6,
  },
  text: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 1)', // Màu mặc định
    flex: 1,
    fontWeight: '400',
  },
});

export default TextComponent;
