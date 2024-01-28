/**
 * CreateDietPlan style
 * @Author: Anand R
 * @Date: Sat Dec 18 2021 09:25:06 GMT+0530 (India Standard Time)
 * @Desc: Styling of View
 */

import { StyleSheet, Dimensions, Platform } from 'react-native';
const height = Dimensions.get('window').height;
const widht = Dimensions.get('window').width;
import { FONTFAMILY } from '../../../config/font-config';
import { isIphoneX } from 'react-native-iphone-x-helper'

/**
 * style
 */
const Style = (theme: any) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      backgroundColor: theme.PRIMARY
    },
    headerImg: {
      alignItems: "center",
      justifyContent: "center",
      flex: Platform.OS === 'ios' ? isIphoneX() ? 0.5 : 0.55 : 0.5,
      // marginTop: Platform.OS === 'ios' ? 10 : 20,
    },
    backVw: {
      top: 10,
      position: 'absolute',
      left: Platform.OS === 'ios' ? isIphoneX() ? 8 : 25 : 8,
      padding: 7
    },
    img: {
      height: Platform.OS === 'ios' ? height : height - 250,
      width: widht,
    },
    content: {
      flex: Platform.OS === 'ios' ? isIphoneX() ? 0.5 : 0.45 : 0.5,
      textAlign: "center"
    },
    titleContainer: {
      paddingHorizontal: widht * 0.2
    },
    title: {
      textAlign: "center",
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
      color: theme.BLACK,
      fontSize: 30,
      paddingHorizontal: widht * 0.1
    },
    subTitleContainer: {
      paddingHorizontal: widht * 0.2
    },
    subTitle: {
      paddingTop: 10,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
      color: theme.GRAY_BLACK,
      fontSize: 20,
      textAlign: "center",
      paddingHorizontal: widht * 0.2
    },
    textContainer: {
      paddingHorizontal: widht * 0.1
    },
    text: {
      paddingTop: 15,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      color: theme.GRAY_BLACK,
      fontSize: 14,
      textAlign: "center",
      lineHeight: 20,
      paddingHorizontal: widht * 0.1
    },
    btnContainer: {
      marginTop: 30,
      justifyContent: 'center',
      alignItems: 'center',
      height: 61,
      backgroundColor: theme.SECONDARY,
      // width: '45%',
      marginHorizontal: 80,
      borderRadius: 20
    },
    btn: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    disable: {

    },
    btnText: {
      fontSize: 18,
      textAlign: "center",
      color: theme.PRIMARY,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
    },
  });
};

export default Style;
