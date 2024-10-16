import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import 'intl-pluralrules';

import en from './en.json';
import vi from './vi.json';
import store from '../redux/store';

export const languageResources = {
  en: { translation: en },
  vi: { translation: vi },
};

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources: languageResources,
  lng: store.getState().language.language, // Lấy ngôn ngữ từ Redux store
  fallbackLng: 'en',
});

// Lắng nghe sự thay đổi của Redux để cập nhật ngôn ngữ
store.subscribe(() => {
  const currentLanguage = store.getState().language.language;
  i18n.changeLanguage(currentLanguage); // Thay đổi ngôn ngữ dựa trên Redux
});

export default i18n;
