import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

interface UserInfoInputProps {
  label: string;
  value: string;
  secureTextEntry?: boolean;
}

const UserInfoInput: React.FC<UserInfoInputProps> = ({
  label,
  value,
  secureTextEntry = false,
}) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        secureTextEntry={secureTextEntry}
        editable={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    alignItems: 'center',
    marginBottom: 6,
    paddingLeft: 24,
    height: 52,
  },
  label: {
    color: 'rgba(255, 255, 255, 1)',
    fontSize: 16,
    width: '30%',
  },
  input: {
    color: 'rgba(255, 255, 255, 1)',
    paddingLeft: 12,
    fontSize: 16,
  },
});

export default UserInfoInput;
