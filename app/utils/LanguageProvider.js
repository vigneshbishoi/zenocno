/** 
 * javascript comment 
 * @Author: Anand R
 * @Date: 2019-11-15 
 * @Desc:  Localized Strings added - Language
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from 'i18n-js';
import translate from './Text';
import { useSelector } from "react-redux";

import configureStore from '../store';


const translationGetters = {
  // lazy requires (metro bundler does not support symlinks)
  en: () => require('../config/translations/en.json'),
  hn: () => require('../config/translations/hn.json'),
  ta: () => require('../config/translations/ta.json'),
  tel: () => require('../config/translations/tel.json'),
  ma: () => require('../config/translations/ma.json'),
  ka: () => require('../config/translations/ka.json'),

};



const setI18nConfig = async () => {

  var language = await AsyncStorage.getItem('LANGUAGE_KEY');
  var languageTag = "en";

  if (language != null) {
    languageTag = language//JSON.parse(language).languageTag;
  }

  // clear translation cache
  translate.cache.clear();
  // set i18n-js config
  i18n.translations = { [languageTag]: translationGetters[languageTag]() };
  i18n.locale = languageTag;
};

export default setI18nConfig;