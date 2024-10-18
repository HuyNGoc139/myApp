import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Image,
} from 'react-native';
import HeaderComponent from '../components/HeaderComponent';
import TextComponent from '../components/TextComponent';
import SpaceComponent from '../components/SpaceComponent';
import UserInfoInput from '../components/UserInfoComponent';
import { useSelector } from 'react-redux';
import DrawerSceneWrapper from '../components/DrawerSceneWrapper';
import { RootState } from '../redux/store';
import { useTranslation } from 'react-i18next';

const UserInfo = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const { t } = useTranslation();
  console.log('====================================');
  console.log(user);
  console.log('====================================');
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/bg.png')}
        style={styles.container}
        resizeMode="cover"
      >
        <HeaderComponent title={t('userInfo')} />
        <ScrollView>
          <View style={styles.viewImage}>
            {user?.photo ? (
              <Image style={styles.image} source={{ uri: user.photo }} />
            ) : (
              <Image
                style={styles.image}
                source={{
                  uri: 'https://randomuser.me/api/portraits/men/41.jpg',
                }}
              />
            )}
            <TouchableOpacity>
              <Text style={styles.text}>{t('userInfo')}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.infomation}>
            <UserInfoInput
              label={t('firstname')}
              value={user?.familyName ? user?.familyName : 'Renata'}
            />
            <UserInfoInput
              label={t('lastname')}
              value={user?.givenName ? user?.givenName : 'Andryshyn'}
            />
            <UserInfoInput
              label="Email"
              value={user?.email ? user?.email : 'huy139@gmail.com'}
            />
            <UserInfoInput
              label={t('password')}
              value={'123123123'}
              secureTextEntry
            />
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewImage: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
    color: 'rgba(255, 88, 137, 1)',
  },
  image: {
    width: 85,
    height: 85,
    marginBottom: 12,
    borderWidth: 4,
    borderRadius: 170,
    borderColor: 'rgba(200, 216, 222, 0.9)',
  },
  infomation: {
    marginTop: 20,
  },
});

export default UserInfo;
