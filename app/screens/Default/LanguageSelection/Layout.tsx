/**
 * LanguageSelection layout page
 * @Author: Anand R
 * @Date: Wed Nov 17 2021 23:35:26 GMT+0530 (India Standard Time)
 * @Desc: View part for component
 */
import React, { useState } from 'react';
import style from './Style';
import { View, SafeAreaView, FlatList, ImageBackground, Image, Pressable } from 'react-native';
import { withTheme, _changeTranslations } from '../../../utils/ThemeProvider';
import Text from '../../../components/CustomText';
import translate from '../../../utils/Text'
import Logo from '../../../assets/images/Logo.svg'
import Icon from 'react-native-vector-icons/AntDesign'
import AsyncStorage from '@react-native-async-storage/async-storage';

interface IProps {
  theme: any;
  navigation: any;
  actions: any
  data: any
}
const Layout = (props: IProps) => {
  const styles = style(props.theme);
  const theme = props.theme
  const [isDropDownVisible, setDropDownVisible] = useState(false)
  const [currentLanguage, setCurrentLangauge] = useState('')
  var languageArray = [
    {
      label: translate('LANGUAGE').ENG,
      text: 'en'
    },
    {
      label: translate('LANGUAGE').HIN,
      text: 'hn'
    },
    {
      label: translate('LANGUAGE').BEN,
      text: 'en'
    },
    {
      label: translate('LANGUAGE').URD,
      text: 'en'
    },
    {
      label: translate('LANGUAGE').PUN,
      text: 'en'
    },
    {
      label: translate('LANGUAGE').MAR,
      text: 'en'
    },
    {
      label: translate('LANGUAGE').TEL,
      text: 'tel'
    },
    {
      label: translate('LANGUAGE').TAM,
      text: 'ta'
    },
    {
      label: translate('LANGUAGE').GUJ,
      text: 'en'
    },
    {
      label: translate('LANGUAGE').KAN,
      text: 'kn'
    },
    {
      label: translate('LANGUAGE').ODI,
      text: 'en'
    },
    {
      label: translate('LANGUAGE').MAL,
      text: 'ma'
    },
    {
      label: translate('LANGUAGE').ASS,
      text: 'en'
    },
  ]
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content_container}>
        <View style={{ height: '15%', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 80 }}>
          <Text style={styles.current_lang} >{translate('LANGUAGE').SELECT_LAN}</Text>
        </View>
        <View style={{ width: '100%', height: '85%' }}>
          <FlatList
            contentContainerStyle={styles.flatlist_container}
            // numColumns={2}
            renderItem={({ item, index }) => {
              return (
                <Pressable
                  onPress={() => {
                    setDropDownVisible(!isDropDownVisible)
                    setCurrentLangauge(item.label)
                    // props.navigation.navigate('Zen.UserOnBoarding')
                    props.navigation.navigate('Zen.Benefits')
                    AsyncStorage.setItem('LANGUAGE_KEY', item.text)
                    _changeTranslations(item.text, props.componentId);
                  }
                  }
                  style={[styles.item, { borderColor: currentLanguage == item.label ? (theme.SECONDARY) : "white" }]}>
                  <Text style={styles.unselected_text} >{item.label}</Text>
                  {currentLanguage == item.label &&
                    <Image style={styles.tickImg} source={require('../../../assets/images/tick.png')} />
                  }
                </Pressable>
              );
            }}
            data={languageArray} />
        </View>
      </View>
    </SafeAreaView >
  );
};
export default withTheme(Layout);
