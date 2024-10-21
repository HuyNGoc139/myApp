import { View, Text, ImageBackground } from 'react-native';
import HeaderComponent from '../components/common/HeaderComponent';
import DrawerSceneWrapper from '../components/common/DrawerSceneWrapper';
const VideoScreen = () => {
  return (
    <ImageBackground
      source={require('../assets/bg.png')}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <DrawerSceneWrapper>
        <HeaderComponent title="VideoScreen" />
        <Text>VideoScreen</Text>
      </DrawerSceneWrapper>
    </ImageBackground>
  );
};
export default VideoScreen;
