import {
  StyleProp,
  ViewStyle,
} from 'react-native';
import {
  View,
  TouchableOpacity,
} from 'react-native-ui-lib';
import React, { ReactNode } from 'react';
import { globalStyles } from '../../styles/globalStyles';

interface Props {
  children: ReactNode;
  justify?:
    | 'center'
    | 'flex-start'
    | 'flex-end'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
    | undefined;
  onPress?: () => void;
  styles?: StyleProp<ViewStyle>;
}

const RowComponent = (props: Props) => {
  const { children, justify, onPress, styles } = props;

  const localStyle = [
    globalStyles.row,
    {
      justifyContent: justify ?? 'center',
    },
    styles,
  ];

  return onPress ? (
    <TouchableOpacity
      style={localStyle}
      onPress={onPress ? () => onPress() : undefined}
    >
      {children}
    </TouchableOpacity>
  ) : (
    <View style={localStyle}>{children}</View>
  );
};

export default RowComponent;
