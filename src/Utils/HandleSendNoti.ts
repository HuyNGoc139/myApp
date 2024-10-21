import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';

export class HandelNotifications {
  static checkNotificationPermisstion = async () => {
    const authStatus = await messaging().requestPermission();
    if (
      authStatus == messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus == messaging.AuthorizationStatus.PROVISIONAL
    ) {
      this.getFcmToken();
    }
  };
  static getFcmToken = async () => {
    const fcmtoken = await AsyncStorage.getItem('fcmtoken');
    if (!fcmtoken) {
      const token = await messaging().getToken();
      console.log('====================================');
      console.log(token);
      console.log('====================================');
      if (token) {
        await AsyncStorage.setItem('fcmtoken', token);
      }
    }
  };
}
