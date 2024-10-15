// src/Components/CustomButton.tsx
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Image, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';


interface Props {
  onPress?: () => void;
  title: string;
  colors?: string[];
  backgroundColor?: string;
  source?: any;
}

const ButtonComponent = (prop: Props) => {
  const { onPress, title, colors, backgroundColor, source } = prop;
  return (
    <TouchableOpacity style={styles.loginButton} onPress={onPress}>
      {colors ? (
        <LinearGradient colors={colors} style={styles.loginButtonGradient}>
          <Text style={styles.loginButtonText}>{title}</Text>
        </LinearGradient>
      ) : (
        <View
          style={[styles.loginButtonSingle, { backgroundColor }]}
        >
          {source && <Image style={{ marginLeft: 28 }} source={source} />}
          <Text style={styles.socialText}>{title}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  loginButton: {
    marginBottom: 20,
  },
  loginButtonGradient: {
    borderRadius: 30,
    paddingVertical: 15,
    alignItems: 'center',
  },
  loginButtonSingle: {
    borderRadius: 30,
    paddingVertical: 15,
    alignItems: 'center',
    flexDirection: 'row',
  },
  loginButtonText: {
    color: 'rgba(255, 255, 255, 1)',
    fontWeight: '800',
    fontSize: 18,
  },
  socialText: {
    color: '#rgba(255, 255, 255, 1)',
    fontWeight: '500',
    fontSize: 16,
    textAlign: 'center',
    flex: 1,
  },
});

export default ButtonComponent;
