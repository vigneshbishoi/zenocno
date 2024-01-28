/**
 * LanguageSelection style
 * @Author: Anand R
 * @Date: Wed Nov 17 2021 23:35:26 GMT+0530 (India Standard Time)
 * @Desc: Styling of View
 */

import { StyleSheet, Dimensions, Platform } from 'react-native';
const height = Dimensions.get('window').height;
const widht = Dimensions.get('window').width;
import { FONTFAMILY } from "../../../config/font-config";
import { isIphoneX } from '../../../lib/isIphoneX';

/**
 * style
 */
const Style = (theme: any) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.SELECTED
    },
    mainVw: {
      alignItems: 'center',
      flex: 1
    },
    imageContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      width: widht,
      marginTop: 10
    },
    descVw: {
      position: 'absolute',
      bottom: Platform.OS == 'android' ? 30 : 20
    },
    headText: {
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
      fontSize: 28,
      color: theme.GRAY_BLACK,
      textAlign: 'center',
      marginHorizontal: 20,
      marginTop: Platform.OS === 'ios' ? 10 : 20,
      lineHeight: 35,
    },
    dietImg: {
      width: widht,
      height: height,
      resizeMode: 'contain',
      alignItems: 'center',
    },
    descriptionView: {
      marginVertical: 10,
      flexDirection: 'row',
    },
    imageSlide: {
      width: widht - 100,
      height: Platform.OS === 'android' ? height - 340 : height - 400,
      // resizeMode: 'contain',
      marginTop: 0
    },
    titleText: {
      color: '#0e65a1',
      paddingHorizontal: 10,
      fontSize: 20,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
      marginBottom: Platform.OS == 'ios' ? isIphoneX() ? 50 : 45 : 40,
      textAlign: 'center',
    },
    btnView: {
      marginHorizontal: 30,
      marginTop: 20,
      textAlign: 'center',
      borderRadius: 10,
      height: 55,
      width: 258,
      backgroundColor: theme.SECONDARY,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
    },
    btnTxt: {
      fontSize: 16,
      color: theme.PRIMARY,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
    },
    arrowRight: {
      width: 17,
      height: 15,
      resizeMode: 'contain',
      marginLeft: 10
    },
    trackVw: {
      width: 10,
      height: 10,
      borderRadius: 5,
      marginHorizontal: 10
    }

  });
};

export default Style;
