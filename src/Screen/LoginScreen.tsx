import { useDispatch, useSelector } from 'react-redux';
import React, { useState, useCallback, useEffect } from 'react';
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
import LinearGradient from 'react-native-linear-gradient';

import { validateEmail, validatePassword } from '../Utils/validate';
import SpaceComponent from '../Components/SpaceComponent';
import InputComponent from '../Components/InputComponent';
import ButtonComponent from '../Components/ButtonComponent';
import { loginUser, loginggUser, loginggUserAuto } from '../redux/authActions';
import { AppDispatch, RootState } from '../redux/store';
import Cog from '../assets/icon/cogs.svg';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import i18next from '../locales/i18n';
import { changeLanguage } from '../redux/reducers/languageSlice';

const LoginScreen = ({ navigation }: any) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();
  const user = useSelector((state: RootState) => state.auth.user);
  const error = useSelector((state: RootState) => state.auth.error);

  const currentLanguage = useSelector((state: RootState) => state.language.language);
  const toggleLanguage = () => {
    const newLanguage = currentLanguage === 'en' ? 'vi' : 'en';
    dispatch(changeLanguage(newLanguage));
  };

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '1038930635348-91umttq1d40pt74uj7dbbsuthdq40igt.apps.googleusercontent.com', // Client ID từ Firebase console
    });
    // autoLogin();
  }, []);

  async function onGoogleButtonPress() {
    try {
      dispatch(loginggUser());
    } catch (error) {
      console.log(error);
    }
  }

  // const autoLogin = async () => {
  //   dispatch(loginggUserAuto());
  // };

  const handleLetRegister = () => {
    navigation.navigate('Register');
  };

  const handleLogin = useCallback(() => {
    if (!username || !password) {
      Alert.alert(t('alert_enter_email_password'));
    } else if (!validateEmail(username)) {
      Alert.alert(t('alert_invalid_email'));
    } else if (!validatePassword(password)) {
      Alert.alert(t('alert_invalid_password'));
    } else {
      const token=username+password
      dispatch(loginUser({ username, password ,token}));
    }
  }, [username, password, dispatch, error]);

  // Reset error khi người dùng nhập lại
  useEffect(() => {
    if (error) {
      setUsername('');
      setPassword('');
    }
  }, [error]);

  const changeLng=(lng:string)=>{
    i18next.changeLanguage(lng)
  }

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
              Log In
            </Text>
            <InputComponent
              placeholder="Email"
              value={username}
              onChangeText={setUsername}
              iconSource={require('../assets/ic_mail.png')}
            />
            <InputComponent
              inputpassword
              placeholder={t('password')}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              iconSource={require('../assets/Vector.png')}
            />

            <TouchableOpacity>
              <Text style={styles.forgotPasswordText}>{t('forgetpass')}</Text>
            </TouchableOpacity>

            <ButtonComponent
              title={t('Login')}
              colors={['#FF5789', '#FF9B9C']}
              onPress={handleLogin}
            />
            <View style={styles.signupContainer}>
              <Text style={styles.signupText}>{t('dontaccount')}</Text>
              <TouchableOpacity onPress={handleLetRegister}>
                <Text style={styles.signupLink}>{t('signup')}</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.orTextContainer}>
              <View style={styles.line}></View>
              <Text style={styles.orText}>{t('orlogin')}</Text>
              <View style={styles.line}></View>
            </View>

            <ButtonComponent
              title={t('fb')}
              backgroundColor="#rgba(63, 96, 178, 1)"
              source={require('../assets/fb.png')}
            />

            <ButtonComponent
              title={t('gg')}
              backgroundColor="#000"
              source={require('../assets/Vector1.png')}
              onPress={onGoogleButtonPress}
            />
            <ButtonComponent
              title={t('changLng')}
              backgroundColor="#888"
              onPress={toggleLanguage}
            />
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
  input: {
    height: 50,
    color: '#fff',
    paddingHorizontal: 15,
    flex: 1,
  },
  icon: {
    width: 24,
    height: 24,
    marginLeft: 10,
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
});

export default LoginScreen;
