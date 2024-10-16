import i18n from 'i18n-js';
import en from './en.json';
import vi from './vi.json';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { I18nManager } from 'react-native';

// Gán bản dịch
i18n.translations = {
  en,
  vi,
};

// Xác định ngôn ngữ mặc định
i18n.defaultLocale = 'en';

// Tự động phát hiện ngôn ngữ hiện tại của hệ thống
i18n.locale = 'en'; // Mặc định là tiếng Anh
i18n.fallbacks = true;// Nếu không tìm thấy ngôn ngữ thì sẽ dùng ngôn ngữ mặc định

// Hàm để lưu và lấy ngôn ngữ từ AsyncStorage
export const setI18nConfig = async () => {
  try {
    const savedLang = await AsyncStorage.getItem('language');
    const locale = savedLang || i18n.defaultLocale;
    i18n.locale = locale;
    I18nManager.forceRTL(i18n.isRTL); // Điều chỉnh theo chế độ RTL nếu cần
  } catch (error) {
    console.log('Error setting i18n config', error);
  }
};

// Hàm để thay đổi ngôn ngữ và lưu vào AsyncStorage
export const changeLanguage = async (lang) => {
  try {
    i18n.locale = lang;
    await AsyncStorage.setItem('language', lang);
    I18nManager.forceRTL(i18n.isRTL);
  } catch (error) {
    console.log('Error changing language', error);
  }
};

export default i18n;
