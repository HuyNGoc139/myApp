import { View, Text } from 'react-native';
import React from 'react';

interface Props {
  width?: number;
  height?: number;
  color?: string;
}

const SpaceComponent = (props: Props) => {
  const { width, height, color } = props;

  return <View style={{ width, height, backgroundColor: color }} />;
};

export default SpaceComponent;
