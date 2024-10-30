import React, { useState, useCallback } from 'react';
import { StyleSheet } from 'react-native';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Colors,
  Button,
  ColorPicker,
} from 'react-native-ui-lib';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../redux/authActions';
import DrawerSceneWrapper from '../components/common/DrawerSceneWrapper';
import { useDrawerStatus } from '@react-navigation/drawer';
import { AppDispatch, RootState } from '../redux/store';
import { resetTodos } from '../redux/reducers/todoReducer';
import { useTranslation } from 'react-i18next';
import { updateUserStatus } from '../utils/updateUserStatus';
import { setColor } from '../redux/reducers/themeSlice';

const HomeScreen = ({ navigation }: any) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isOpen, setIsOpen] = useState(false);
  const drawerStatus = useDrawerStatus();
  const { t } = useTranslation();
  const [showColorPicker, setShowColorPicker] = useState(false);
  const themeColor = useSelector((state: RootState) => state.theme.color);

  const handleColorChange = (color: string) => {
    dispatch(setColor(color));
  };

  const handleLogout = useCallback(async () => {
    await updateUserStatus('offline');
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
    <View flex style={{ backgroundColor: themeColor }}>
      {drawerStatus === 'open' && (
        <View row spread style={{ zIndex: 10 }}>
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
        <View
          style={[
            styles.backgroundContainer,
            { borderRadius: drawerStatus === 'open' ? 20 : 0 },
          ]}
        >
          <TouchableOpacity onPress={openDrawer}>
            <Image
              style={styles.image}
              source={require('../assets/MaskGroup.png')}
            />
          </TouchableOpacity>
          <View center>
            <Text black text40>
              {t('welcome')}
            </Text>
            <Button
              label="Chọn màu nền"
              onPress={() => setShowColorPicker(!showColorPicker)}
              backgroundColor={Colors.blue30}
              marginB-12
            />

            {showColorPicker && (
              <ColorPicker
                initialColor={themeColor}
                onValueChange={(color: any) => handleColorChange(color)}
                onSubmit={(color: any) => handleColorChange(color)}
                colors={[
                  Colors.red30,
                  Colors.blue30,
                  Colors.green30,
                  Colors.yellow30,
                  '#FF5789',
                ]}
                backgroundColor="#E4E2E2"
              />
            )}
            <Button
              marginT-12
              label={t('logout')}
              onPress={handleLogout}
              backgroundColor={Colors.blue30}
            />
          </View>
        </View>
      </DrawerSceneWrapper>
      {drawerStatus === 'open' && (
        <View marginL-20 marginB-20 row>
          <Text white>Powered by </Text>
          <Text white bold>
            UpNow
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundContainer: {
    borderColor: 'white',
    overflow: 'hidden',
  },
  image: {
    margin: 26,
  },
});

export default HomeScreen;
