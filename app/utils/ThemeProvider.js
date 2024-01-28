import React, { useContext, useEffect, useState } from 'react';
import THEMES, { layoutStyles } from '../config/themes-config';

import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from 'i18n-js';
import translate from './Text';

const STORAGE_KEY = 'THEME_ID';
const LAYOUT_STORAGE_KEY = 'LAYOUT_ID';
const ThemeContext = React.createContext({});

export const ThemeContextProvider = ({ children }) => {
  const [themeID, setThemeID] = useState(false);
  const [layoutID, setLayoutID] = useState(false);

  useEffect(() => {
    (async () => {
      const storedThemeID = await AsyncStorage.getItem(STORAGE_KEY);
      const storedLayoutID = await AsyncStorage.getItem(LAYOUT_STORAGE_KEY);
      if (storedThemeID) {
        setThemeID(storedThemeID);
      } else {
        setThemeID(THEMES[0].theme_key);
      }
      if (storedLayoutID) {
        setLayoutID(storedLayoutID);
      } else {
        setLayoutID(layoutStyles[1].key);
      }
    })();
  }, []);

  return (
    <ThemeContext.Provider value={{ themeID, setThemeID, layoutID, setLayoutID }}>
      {!!themeID && !!layoutID ? children : null}
    </ThemeContext.Provider>
  );
};

export function withTheme(Component) {
  return props => {
    const { setThemeID, setLayoutID, layoutID, themeID } =
      useContext(ThemeContext);
    const getTheme = themeId =>
      THEMES.find(theme => theme.theme_key === themeId);
    const setTheme = themeId => {
      AsyncStorage.setItem(STORAGE_KEY, themeId);
      setThemeID(themeId);
    };
    const getLayout = layoutId =>
      layoutStyles.find(layout => layout.key === layoutId);
    const setLayout = layoutId => {
      AsyncStorage.setItem(LAYOUT_STORAGE_KEY, layoutId);
      setLayoutID(layoutId);
    };

    const getAppTheme = (layoutId, themeId) => {
      var theme = getTheme(themeId);
      var layout = getLayout(layoutId);
      return { ...theme, ...layout };
    };

    return (
      <Component
        {...props}
        themes={THEMES}
        theme={getAppTheme(layoutID, themeID)}
        setTheme={setTheme}
        themeID={themeID}
        setLayout={setLayout}
        layoutID={layoutID}
      />
    );
  };
}

export function _changeTranslations(languageTag, componentId) {
  var translationGetters = {
    // lazy requires (metro bundler does not support symlinks)
    en: () => require('../config/translations/en.json'),
    hn: () => require('../config/translations/hn.json'),
    en: () => require('../config/translations/en.json'),
    hn: () => require('../config/translations/hn.json'),
    ta: () => require('../config/translations/ta.json'),
    tel: () => require('../config/translations/tel.json'),
    ma: () => require('../config/translations/ma.json'),
    ka: () => require('../config/translations/ka.json'),
  };

  translate.cache.clear();
  i18n.translations = { [languageTag]: translationGetters[languageTag]() };
  i18n.locale = languageTag;
}
