import React from 'react';
import {
  createDrawerNavigator,
  DrawerItemList,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ImageSourcePropType,
} from 'react-native';
import { useSelector } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../Screen/HomeScreen';
import SettingScreen from '../Screen/SettingScreen';
import UserInfo from '../Screen/UserInfo';
import LoginScreen from '../Screen/LoginScreen';
import RewardScreen from '../Screen/RewardScreen';

import InviteScreen from '../Screen/InviteScreen';
import SendScreen from '../Screen/SendScreen';
import VideoScreen from '../Screen/VideoScreen';
import HelpScreen from '../Screen/HelpandSupport';
import DisclaimerScreen from '../Screen/Disclaimer';
import StreakScreen from '../Screen/StreakScreen';
import RegisterScreen from '../Screen/RegisterScreen';
import TodoScreen from '../Screen/TodoItemScreen';
import { RootState } from '../redux/store';
import RemiderScreen from '../Screen/Remider';
import Cog from '../assets/icon/cogs.svg';
import Home from '../assets/icon/home.svg';
import Ban from '../assets/icon/ban.svg';
import Bell from '../assets/icon/bell.svg';
import Help from '../assets/icon/help.svg';
import Mail from '../assets/icon/mail.svg';
import User from '../assets/icon/user.svg';
import Video from '../assets/icon/video.svg';
import Trophy from '../assets/icon/trophy.svg';
const Drawer = createDrawerNavigator();

const Stack = createStackNavigator();

interface DrawerImageProps {
  focused: boolean;
  source: any;
}

const drawerImage: React.FC<DrawerImageProps> = ({ focused, source }) => {
  const tintColor = focused
    ? 'rgba(247, 112, 152, 1)'
    : 'rgba(149, 158, 167, 1)';

  return (
    <View
      style={{ width: 18, justifyContent: 'flex-end', alignItems: 'center' }}
    >
      <Image
        source={source}
        style={{
          tintColor: tintColor,
        }}
      />
    </View>
  );
};
const drawerImage2: React.FC<DrawerImageProps> = ({ focused, source }) => {
  const tintColor = focused
    ? 'rgba(247, 112, 152, 1)'
    : 'rgba(149, 158, 167, 1)';

  return (
    <View
      style={{ width: 18, justifyContent: 'flex-end', alignItems: 'center' }}
    >
      {React.cloneElement(source({ fill: tintColor }))}
    </View>
  );
};

const CustomDrawerContent: React.FC<DrawerContentComponentProps> = (props) => {
  // const userName = useSelector((state: RootState) => state.auth.user?.json?.username);

  return (
    <>
      <View style={{ marginLeft: 45, marginTop: 50 }}>
        <Image
          source={{ uri: 'https://randomuser.me/api/portraits/men/41.jpg' }}
          style={styles.image}
        />
        <Text style={styles.name}>{'User'}</Text>
      </View>
      <DrawerItemList {...props} />
    </>
  );
};

const DrawerNavigator: React.FC = () => (
  <Drawer.Navigator
    initialRouteName="Home"
    drawerContent={(props) => <CustomDrawerContent {...props} />}
    screenOptions={{
      headerShown: false,
      drawerStyle: {
        backgroundColor: 'transparent',
        width: '56%',
        height: '86%',
        position: 'absolute',
        top: '7%',
      },
      overlayColor: 'transparent',
      drawerActiveTintColor: 'rgba(255, 255, 255, 1)',
      drawerInactiveTintColor: 'rgba(149, 158, 167, 1)',
      drawerActiveBackgroundColor: 'rgba(0, 0, 0, 0.2)',
    }}
  >
    <Drawer.Screen
      name="Home"
      component={HomeScreen}
      options={{
        drawerIcon: ({focused}) => {
          const strokeColor = focused ? 'rgba(247, 112, 152, 1)' : 'rgba(149, 158, 167, 1)';
          const fillColor = focused ? 'rgba(247, 112, 152, 1)' : 'rgba(149, 158, 167, 1)';
          return (
            <View
              style={{
                width: 18,
                justifyContent: 'flex-end',
                alignItems: 'center',
                
              }}
            >
              <Home width={22} height={22} stroke={strokeColor} strokeWidth={1} fill={fillColor}/>
            </View>
          );
        },
        drawerLabelStyle: { fontWeight: 'bold', marginLeft: -10 },
        drawerItemStyle: {
          borderTopLeftRadius: 100,
          borderBottomLeftRadius: 100,
        },
      }}
    />
    <Drawer.Screen
      name="Remider"
      component={RemiderScreen}
      options={{
        drawerIcon: ({focused}) => {
          const strokeColor = focused ? 'rgba(247, 112, 152, 1)' : 'rgba(149, 158, 167, 1)';
          const fillColor = focused ? 'rgba(247, 112, 152, 1)' : 'rgba(149, 158, 167, 1)';
          return (
            <View
              style={{
                width: 18,
                justifyContent: 'flex-end',
                alignItems: 'center',
                
              }}
            >
              <Bell width={26} height={26} stroke={strokeColor} strokeWidth={2} fill={fillColor}/>
            </View>
          );
        },
        drawerLabelStyle: { fontWeight: 'bold', marginLeft: -10 },
        drawerItemStyle: {
          borderTopLeftRadius: 100,
          borderBottomLeftRadius: 100,
        },
      }}
    />
    <Drawer.Screen
      name="Invite your friends"
      component={InviteScreen}
      options={{
        drawerIcon: ({focused}) => {
          const strokeColor = focused ? 'rgba(247, 112, 152, 1)' : 'rgba(149, 158, 167, 1)';
          const fillColor = focused ? 'rgba(247, 112, 152, 1)' : 'rgba(149, 158, 167, 1)';
          return (
            <View
              style={{
                width: 18,
                justifyContent: 'flex-end',
                alignItems: 'center',
                
              }}
            >
              <User width={28} height={28} stroke={strokeColor} strokeWidth={1} fill={fillColor}/>
            </View>
          );
        },
        drawerLabelStyle: { fontWeight: 'bold', marginLeft: -10 },
        drawerItemStyle: {
          borderTopLeftRadius: 100,
          borderBottomLeftRadius: 100,
        },
      }}
    />
    <Drawer.Screen
      name="Send a testimonial"
      component={SendScreen}
      options={{
        drawerIcon: ({focused}) => {
          const strokeColor = focused ? 'rgba(247, 112, 152, 1)' : 'rgba(149, 158, 167, 1)';
          const fillColor = focused ? 'rgba(247, 112, 152, 1)' : 'rgba(149, 158, 167, 1)';
          return (
            <View
              style={{
                width: 18,
                justifyContent: 'flex-end',
                alignItems: 'center',
                
              }}
            >
              <Mail width={26} height={26} stroke={strokeColor} strokeWidth={1} fill={fillColor}/>
            </View>
          );
        },
        drawerLabelStyle: { fontWeight: 'bold', marginLeft: -10 },
        drawerItemStyle: {
          borderTopLeftRadius: 100,
          borderBottomLeftRadius: 100,
        },
      }}
    />
    <Drawer.Screen
      name="Welcome to Video"
      component={VideoScreen}
      options={{
        drawerIcon: ({focused}) => {
          const strokeColor = focused ? 'rgba(247, 112, 152, 1)' : 'rgba(149, 158, 167, 1)';
          const fillColor = focused ? 'rgba(247, 112, 152, 1)' : 'rgba(149, 158, 167, 1)';
          return (
            <View
              style={{
                width: 18,
                justifyContent: 'flex-end',
                alignItems: 'center',
                
              }}
            >
              <Video width={22} height={22} stroke={strokeColor} strokeWidth={1} fill={fillColor}/>
            </View>
          );
        },
        drawerLabelStyle: { fontWeight: 'bold', marginLeft: -10 },
        drawerItemStyle: {
          borderTopLeftRadius: 100,
          borderBottomLeftRadius: 100,
        },
      }}
    />
    <Drawer.Screen
      name="Help & Support"
      component={HelpScreen}
      options={{
        drawerIcon: ({focused}) => {
          const strokeColor = focused ? 'rgba(247, 112, 152, 1)' : 'rgba(149, 158, 167, 1)';
          const fillColor = focused ? 'rgba(247, 112, 152, 1)' : 'rgba(149, 158, 167, 1)';
          return (
            <View
              style={{
                width: 18,
                justifyContent: 'flex-end',
                alignItems: 'center',
                
              }}
            >
              <Help width={26} height={26} stroke={strokeColor} strokeWidth={1} fill={fillColor}/>
            </View>
          );
        },
        drawerLabelStyle: { fontWeight: 'bold', marginLeft: -10 },
        drawerItemStyle: {
          borderTopLeftRadius: 100,
          borderBottomLeftRadius: 100,
        },
      }}
    />
    <Drawer.Screen
      name="Reward"
      component={RewardScreen}
      options={{
        drawerIcon: ({focused}) => {
          const strokeColor = focused ? 'rgba(247, 112, 152, 1)' : 'rgba(149, 158, 167, 1)';
          const fillColor = focused ? 'rgba(247, 112, 152, 1)' : 'rgba(149, 158, 167, 1)';
          return (
            <View
              style={{
                width: 18,
                justifyContent: 'flex-end',
                alignItems: 'center',
                
              }}
            >
              <Trophy width={28} height={28} stroke={strokeColor} strokeWidth={1} fill={fillColor}/>
            </View>
          );
        },
        drawerLabelStyle: { fontWeight: 'bold', marginLeft: -10 },
        drawerItemStyle: {
          borderTopLeftRadius: 100,
          borderBottomLeftRadius: 100,
        },
      }}
    />
    <Drawer.Screen
      name="Setting"
      component={SettingScreen}
      options={{
        drawerIcon: ({focused}) => {
          const strokeColor = focused ? 'rgba(247, 112, 152, 1)' : 'rgba(149, 158, 167, 1)';
          const fillColor = focused ? 'rgba(247, 112, 152, 1)' : 'rgba(149, 158, 167, 1)';
          return (
            <View
              style={{
                width: 18,
                justifyContent: 'flex-end',
                alignItems: 'center',
                
              }}
            >
              <Cog width={30} height={30} stroke={strokeColor} strokeWidth={1} fill={fillColor}/>
            </View>
          );
        },
        drawerLabelStyle: { fontWeight: 'bold', marginLeft: -10 },
        drawerItemStyle: {
          borderTopLeftRadius: 100,
          borderBottomLeftRadius: 100,
        },
      }}
    />
    <Drawer.Screen
      name="Disclaimer"
      component={DisclaimerScreen}
      options={{
        drawerIcon: ({focused}) => {
          const strokeColor = focused ? 'rgba(247, 112, 152, 1)' : 'rgba(149, 158, 167, 1)';
          const fillColor = focused ? 'rgba(247, 112, 152, 1)' : 'rgba(149, 158, 167, 1)';
          return (
            <View
              style={{
                width: 18,
                justifyContent: 'flex-end',
                alignItems: 'center',
                
              }}
            >
              <Ban width={20} height={20} stroke={strokeColor} strokeWidth={1} fill={fillColor}/>
            </View>
          );
        },
        drawerLabelStyle: { fontWeight: 'bold', marginLeft: -10 },
        drawerItemStyle: {
          borderTopLeftRadius: 100,
          borderBottomLeftRadius: 100,
        },
      }}
    />
  </Drawer.Navigator>
);

const Router: React.FC = () => {
  const isLogin = useSelector((state: RootState) => state.auth.isAuthenticated);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isLogin ? (
        <>
          <Stack.Screen name="Drawer" component={DrawerNavigator} />
          <Stack.Screen name="UserInfo" component={UserInfo} />
          <Stack.Screen name="StreakScreen" component={StreakScreen} />
          {/* <Stack.Screen name="TodoScreen" component={TodoScreen} /> */}
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 65,
    height: 65,
    borderWidth: 4,
    borderRadius: 170,
    borderColor: 'rgba(200, 216, 222, 0.9)',
  },
  name: {
    marginTop: 10,
    fontWeight: 'bold',
    color: 'white',
    fontSize: 24,
    marginBottom: 10,
  },
});

export default Router;
