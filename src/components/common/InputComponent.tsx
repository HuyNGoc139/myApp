import React from 'react';
import { View, TextInput, Image, StyleSheet } from 'react-native';

interface Props {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  iconSource?: any;
  inputpassword?: boolean;
  multiline?: boolean;
  numberOfLines?: number;
  height?: number;
}

const InputComponent = (prop: Props) => {
  const {
    onChangeText,
    placeholder,
    value,
    iconSource,
    secureTextEntry,
    inputpassword,
    multiline,
    numberOfLines,
    height,
  } = prop;
  return (
    <View style={styles.inputContainer}>
      {iconSource && (
        <Image
          style={inputpassword ? styles.iconPass : styles.icon}
          source={iconSource}
        />
      )}
      <TextInput
        placeholder={placeholder}
        textAlign="left"
        placeholderTextColor="#rgba(130, 129, 135, 1)"
        style={[styles.input, { height: height ? height : 50 }]}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        multiline={multiline}
        numberOfLines={numberOfLines}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 25,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    height: 50,
    color: '#fff',
    paddingHorizontal: 15,
    flex: 1,
    alignContent: 'flex-start',
  },
  icon: {
    width: 24,
    height: 24,
    marginLeft: 10,
  },
  iconPass: {
    width: 12.69,
    height: 15,
    marginLeft: 16,
  },
});

export default InputComponent;
