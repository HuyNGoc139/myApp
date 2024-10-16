import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  Button,
  ImageBackground,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../redux/authActions';
import DrawerSceneWrapper from '../Components/DrawerSceneWrapper';
import { useDrawerStatus } from '@react-navigation/drawer';
import { AppDispatch, RootState } from '../redux/store';
import { resetTodos } from '../redux/reducers/todoReducer';
import Cog from '../assets/icon/cogs.svg';
import Home from '../assets/icon/home.svg';
import Ban from '../assets/icon/ban.svg';
import Bell from '../assets/icon/bell.svg';
import Help from '../assets/icon/help.svg';
import Mail from '../assets/icon/mail.svg';
import User from '../assets/icon/user.svg';
import Video from '../assets/icon/video.svg';
import Trophy from '../assets/icon/trophy.svg';
import { useTranslation } from 'react-i18next';

const HomeScreen = ({ navigation }: any) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const isLogin = useSelector((state: RootState) => state.auth.isAuthenticated);
  const dispatch = useDispatch<AppDispatch>();
  const [isOpen, setIsOpen] = useState(false);
  const drawerStatus = useDrawerStatus();
  const { t } = useTranslation();
  const handleLogout = useCallback(() => {
    dispatch(logoutUser());
    dispatch(resetTodos());
  }, [dispatch]);

  const closeDrawer = useCallback(() => {
    navigation.closeDrawer();
    setIsOpen(false);
  }, [navigation]);

  const openDrawer = useCallback(() => {
    navigation.openDrawer();
    setIsOpen(true);
  }, [navigation]);

  return (
    <ImageBackground
      source={require('../assets/bg.png')}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      {/* Header */}
      {drawerStatus == 'open' && (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            zIndex: 10,
          }}
        >
          <TouchableOpacity onPress={closeDrawer}>
            <Image
              style={styles.image}
              source={require('../assets/MaskGroup.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={closeDrawer}>
            <Image
              style={styles.image}
              source={require('../assets/close.png')}
            />
          </TouchableOpacity>
        </View>
      )}
      <DrawerSceneWrapper>
        {/* View chứa ImageBackground để thêm border */}
        <View
          style={[
            styles.backgroundContainer,
            { borderRadius: drawerStatus == 'open' ? 20 : 0 },
          ]}
        >
          <ImageBackground
            style={styles.imageBackground}
            source={{
              uri: 'https://s3-alpha-sig.figma.com/img/4b67/6a2d/4edf7f5da5d0388a0e118a254c21a8ef?Expires=1729468800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=LZ6zid6DBrlmYEmzE0pemy83D3oYGvsetnxoMLD9IuaXBjUF6vrrh-O18o-1n9DQjGF-DHGirHnrQ7npfB-oGTWTdu3F5U0w7Y3jWSARy9eedIprGIoj9575dgtikh9IktZ3G7MtC6CbMtnTG5oG6kEo~Oj~DIksIUMB09dw0pwm~EiDgvzshav6NLhT~45-SC-RJ1SVkHw~sIa6fOBG8NAGHZblixePPQiZOWvbb8ii4QqSsBkAF2VLXkwoyAuGoT2WcAM7W9MMAfZfHeRqedBIxB-S1IZpoqiK31xiUAwxfp39uKn4kqhNZHCoN9qUeUhNnNx-Z9DTTd8PZbLzhw__',
            }}
          >
            <TouchableOpacity onPress={openDrawer}>
              <Image
                style={styles.image}
                source={require('../assets/MaskGroup.png')}
              />
            </TouchableOpacity>
            <View style={{ alignItems: 'center', flex: 1 }}>
              <Text style={{ fontSize: 20, color: 'white' }}>
              {t('welcome')}
              </Text>
              <Button title={t('logout')} onPress={handleLogout} />
            </View>
          </ImageBackground>
        </View>
      </DrawerSceneWrapper>
      {/* Footer */}
      {drawerStatus == 'open' && (
        <View
          style={{ marginBottom: 20, marginLeft: 20, flexDirection: 'row' }}
        >
          <Text style={{ color: 'rgba(255, 255, 255, 1)' }}>Powered by </Text>
          <Text style={{ color: 'rgba(255, 255, 255, 1)', fontWeight: '700' }}>
            UpNow{' '}
          </Text>
        </View>
      )}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    // borderWidth: 2, // Thêm viền
    borderColor: 'white', // Màu viền
    // Độ bo góc
    overflow: 'hidden', // Ẩn phần góc bo thừa của ảnh nền
  },
  imageBackground: {
    flex: 1,
    borderRadius: 20, // Độ bo góc của ảnh nền để khớp với container
  },
  image: {
    margin: 26,
  },
});

export default HomeScreen;
