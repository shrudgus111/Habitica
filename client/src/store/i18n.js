import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "My Account": "My Account",
      "Logout": "Logout",
      "Language": "Language",
      "Launch Screen": "Launch Screen",
      "Display Mode": "Display Mode",
      // Add more translations here
    }
  },
  ko: {
    translation: {
      "My Account": "내 계정",
      "Logout": "로그아웃",
      "Language": "언어",
      "Launch Screen": "시작 화면",
      "Display Mode": "화면 모드",
      // Add more translations here
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "ko", // default language
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;