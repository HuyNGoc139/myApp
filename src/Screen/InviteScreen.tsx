import { View, Text, ImageBackground } from 'react-native';
import HeaderComponent from '../components/HeaderComponent';
import DrawerSceneWrapper from '../components/DrawerSceneWrapper';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp, useRoute } from '@react-navigation/native';

const InviteScreen = () => {
  return (
    <ImageBackground
      source={require('../assets/bg.png')}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <DrawerSceneWrapper>
        <HeaderComponent title="InviteScreen" />
        <Text>InviteScreen</Text>
      </DrawerSceneWrapper>
    </ImageBackground>
  );
};
export default InviteScreen;
