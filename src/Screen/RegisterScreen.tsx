import { useDispatch, useSelector } from 'react-redux';
import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  ImageBackground,
  Alert,
} from 'react-native';
import { validateEmail, validatePassword } from '../Utils/validate';
import SpaceComponent from '../Components/SpaceComponent';
import InputComponent from '../Components/InputComponent';
import ButtonComponent from '../Components/ButtonComponent';
import CheckBox from '@react-native-community/checkbox';
import { registerUser } from '../redux/authActions';
import { AppDispatch, RootState } from '../redux/store';

const RegisterScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const error = useSelector((state: RootState) => state.auth.error);

  const handleRegister = useCallback(() => {
    if (!firstName || !lastName || !email || !password) {
      Alert.alert('Error', 'Please fill all fields');
    } else if (!validateEmail(email)) {
      Alert.alert('Please enter the correct email format');
    } else if (!validatePassword(password)) {
      Alert.alert('Password must be at least 6 characters');
    } else if (!isChecked) {
      Alert.alert('Error', 'Please accept the Terms & Conditions');
    } else {
      dispatch(registerUser({ firstName, lastName, email, password }));
      if (error) {
        Alert.alert('Error', error);
      }
    }
  }, [firstName, lastName, email, password, isChecked, error]);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <ImageBackground
          source={require('../assets/bg.png')}
          style={styles.container}
          resizeMode="cover"
        >
          <View style={styles.header}>
            <Image source={require('../assets/logo.png')} style={styles.logo} />
            <View style={{ marginLeft: 20 }}>
              <Text style={styles.upnow}>UpNow</Text>
              <Text style={styles.text}>Digital Hypnotherapy</Text>
            </View>
          </View>
          <SpaceComponent height={5} color="rgba(255, 255, 255, 0.1)" />
          <View style={styles.formContainer}>
            <Text style={[styles.upnow, { marginLeft: 14, marginBottom: 20 }]}>
              Register
            </Text>
            <InputComponent
              placeholder="First name"
              value={firstName}
              onChangeText={setFirstName}
              iconSource={require('../assets/ic_mail2.png')}
            />
            <InputComponent
              placeholder="Last name"
              value={lastName}
              onChangeText={setLastName}
              iconSource={require('../assets/ic_mail2.png')}
            />
            <InputComponent
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              iconSource={require('../assets/ic_mail.png')}
            />
            <InputComponent
              inputpassword
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              iconSource={require('../assets/Vector.png')}
            />
            <View style={styles.containerPolicy}>
              <CheckBox
                value={isChecked}
                onValueChange={setIsChecked}
                style={styles.checkbox}
                tintColors={{
                  true: '#FF007F',
                  false: 'rgba(164, 188, 193, 1)',
                }}
                onCheckColor="#FFF"
                onTintColor="#FF007F"
                onFillColor="transparent"
              />
              <View style={styles.containerWrap}>
                <Text style={styles.signupText}>
                  by clicking on “Register” you agree to our
                </Text>
                <TouchableOpacity>
                  <Text
                    style={[
                      styles.signupText,
                      { color: 'rgba(255, 88, 137, 1)' },
                    ]}
                  >
                    Terms & Conditions{' '}
                  </Text>
                </TouchableOpacity>
                <Text style={styles.signupText}>and</Text>
                <TouchableOpacity>
                  <Text
                    style={[
                      styles.signupText,
                      { color: 'rgba(255, 88, 137, 1)' },
                    ]}
                  >
                    {' '}
                    Privacy Policy
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <ButtonComponent
              title="Register"
              colors={['#FF5789', '#FF9B9C']}
              onPress={handleRegister}
            />
            <View style={styles.signupContainer}>
              <Text style={styles.signupText}>Already have an account?</Text>
              <TouchableOpacity onPress={() => navigation.replace('Login')}>
                <Text style={styles.signupLink}>Log In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerPolicy: {
    flex: 1,
    flexDirection: 'row',
  },
  containerWrap: {
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  checkbox: {
    marginRight: 10,
  },
  header: {
    flexDirection: 'row',
    width: 203.54,
    height: 50.35,
    alignItems: 'center',
    marginLeft: 24,
    marginTop: 60,
    marginBottom: 20,
  },
  logo: {
    width: 50.35,
    height: 50.35,
  },
  upnow: {
    fontSize: 24,
    fontWeight: '900',
    color: '#fff',
    marginTop: 10,
    lineHeight: 24,
  },
  text: {
    fontSize: 14,
    color: '#2D8CFF',
    lineHeight: 17.59,
  },
  formContainer: {
    marginTop: 20,
    paddingHorizontal: 30,
    flex: 1,
  },
  forgotPasswordText: {
    color: 'rgba(255, 255, 255, 1)',
    textAlign: 'right',
    marginBottom: 30,
    fontSize: 15,
    fontWeight: '400',
  },

  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 36,
  },
  signupText: {
    color: 'rgba(255, 255, 255, 1)',
    fontSize: 15,
    fontWeight: '400',
  },
  signupLink: {
    color: '#rgba(255, 88, 137, 1)',
    fontWeight: 'bold',
    marginLeft: 5,
    fontSize: 15,
  },
  line: {
    height: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    flex: 1,
  },
  orText: {
    color: '#rgba(255, 255, 255, 1)',
    textAlign: 'center',
    fontSize: 15,
    padding: 10,
  },
  orTextContainer: {
    marginBottom: 30,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  linkText: {
    color: '#FF007F', // Pink color for the links
    fontWeight: 'bold',
  },
  textRegis: {
    fontSize: 14,
    color: '#fff',
    flex: 1,
    flexWrap: 'wrap',
  },
});
export default RegisterScreen;
