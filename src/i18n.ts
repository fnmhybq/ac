import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  zh: {
    translation: {
      title: '日期计算器',
      startDate: '起始日期',
      endDate: '终止日期',
      days: '天数间隔',
      calculate: '计算',
      placeholderStart: '请选择起始日期',
      placeholderEnd: '请选择终止日期',
      result: '天',
      langSwitch: 'English',
    },
  },
  en: {
    translation: {
      title: 'Date Calculator',
      startDate: 'Start Date',
      endDate: 'End Date',
      days: 'Days Interval',
      calculate: 'Calculate',
      placeholderStart: 'Select start date',
      placeholderEnd: 'Select end date',
      result: 'days',
      langSwitch: '中文',
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'zh', // 默认语言
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n; 