import {ImageBackground } from 'react-native';
import {
  View,
  Text,
} from 'react-native-ui-lib';
import HeaderComponent from '../components/common/HeaderComponent';
import DrawerSceneWrapper from '../components/common/DrawerSceneWrapper';

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
