/**
 * Community style
 * @Author: Astha
 * @Date: Wed April 14 2022 17:35:26 GMT+0530 (India Standard Time)
 * @Desc: Styling of View
 */

import { StyleSheet, Dimensions, Platform } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';
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
      backgroundColor: theme.SELECTED,
      // paddingHorizontal: widht * 0.05,
    },
    header: {
      marginBottom: height * 0.025,
      alignItems: "center",
      flexDirection: 'row',
      // justifyContent: 'center',
      paddingHorizontal: widht * 0.03,
      width: widht,
      marginTop: Platform.OS == 'android' ? height * 0.015 : height * 0.01
    },
    headerText: {
      fontSize: scale(16),
      color: theme.GRAY_BLACK,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
      flex: 1,
      paddingHorizontal: widht * 0.01,
    },
    arrowButton: {
      padding: 5,
    },
    backArrow: {
      padding: 5,
      position: 'absolute',
      left: Dimensions.get('window').width * 0.03,
      zIndex: 2
    },
    renderShadow: {
      overflow: "hidden",
      flexDirection: 'row',
      marginHorizontal: widht * 0.05,
      marginBottom: widht * 0.04,
    },
    renderImage: {
      width: scale(94),
      margin: scale(4),
      height: scale(94),
      borderRadius: scale(10)
    },
    renderData: {
      marginLeft: widht * 0.025,
      justifyContent: 'space-between',
      flex: 1,
      paddingVertical: widht * 0.01
    },
    drName: {
      fontSize: 15,
      color: theme.BLACK,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
    },
    specialText: {
      fontSize: 13,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      color: theme.GRAY_BLACK
    },
    rowView: {
      alignItems: 'center',
      flexDirection: 'row'
    },
    experienceText: {
      color: theme.DARK_GRAY,
      marginLeft: widht * 0.01
    },
    divider: { borderWidth: 0.3, borderColor: theme.LIGHT_GRAY },
    successView: {
      paddingVertical: scale(15),
      paddingHorizontal: scale(20),
      alignItems: 'center',
      justifyContent: 'center'
    },
    successText: {
      fontSize: scale(14),
      textAlign: "center",
      color: theme.GRAY_BLACK,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
      marginTop: scale(12),
      paddingHorizontal: scale(5)
    },
    meanwhileText: {
      fontSize: scale(14),
      textAlign: "center",
      color: theme.GRAY_BLACK,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
      marginVertical: scale(25),
      paddingHorizontal: scale(5)
    },
    listText: {
      fontSize: scale(14),
      textAlign: "center",
      color: theme.GRAY_BLACK,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM
    },
    DietView: {
      flexDirection: 'row',
      marginHorizontal: scale(15),
      paddingVertical: scale(15),
      paddingHorizontal: scale(20),
      alignItems: 'center',
      backgroundColor: theme.PRIMARY,
      borderRadius: scale(10)
    },
    iconView: {
      width: scale(30)
    },
    commonShadow: {
      shadowColor: theme.LIGHT_GRAY,
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.32,
      shadowRadius: 5.46,
      elevation: 9
    },
  });
};

export default Style;