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
import HeaderComponent from '../Components/HeaderComponent';
import TextComponent from '../Components/TextComponent';
import SpaceComponent from '../Components/SpaceComponent';
import UserInfoInput from '../Components/UserInfoComponent';
import { useSelector } from 'react-redux';
import DrawerSceneWrapper from '../Components/DrawerSceneWrapper';
import { RootState } from '../redux/store';
const UserInfo = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/bg.png')}
        style={styles.container}
        resizeMode="cover"
      >
        <HeaderComponent title="User Info" />
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
              <Text style={styles.text}>Change profile photo</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.infomation}>
            <UserInfoInput
              label="First Name"
              value={user?.familyName ? user?.familyName : 'Renata'}
            />
            <UserInfoInput
              label="Last Name"
              value={user?.givenName ? user?.givenName : 'Andryshyn'}
            />
            <UserInfoInput
              label="Email"
              value={user?.email ? user?.email : 'huy139@gmail.com'}
            />
            <UserInfoInput
              label="Password"
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
