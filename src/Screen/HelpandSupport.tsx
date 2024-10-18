import { View, Text, ImageBackground } from 'react-native';
import HeaderComponent from '../components/HeaderComponent';
import DrawerSceneWrapper from '../components/DrawerSceneWrapper';

const HelpScreen = () => {
  return (
    <ImageBackground
      source={require('../assets/bg.png')}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <DrawerSceneWrapper>
        <HeaderComponent title="HelpScreen" />
        <Text>HelpScreen</Text>
      </DrawerSceneWrapper>
    </ImageBackground>
  );
};

export default HelpScreen;
