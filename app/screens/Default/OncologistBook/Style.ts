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
    
    headerText: {
      fontSize: scale(16),
      color: theme.GRAY_BLACK,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
      flex: 1,
      paddingHorizontal: widht * 0.01,
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
      fontSize: scale(14),
      color: theme.GRAY_BLACK,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
    },
    specialText: {
      fontSize: scale(12),
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
      color: theme.GRAY_BLACK
    },
    rowView: {
      alignItems: 'center',
      flexDirection: 'row'
    },
    experienceText: {
      color: theme.SUB_TITLE,
      fontSize: scale(12),
      fontFamily: FONTFAMILY.POPPINS_MEDIUM
    },
    commonPadding: {
      marginHorizontal: widht * 0.05,
    },
    hospitalIcon: {
      width: widht * 0.08,
      alignSelf: 'flex-start'
    },
    hospitalView: {
      marginTop: widht * 0.04
    },
    consultanView: {
      marginTop: widht * 0.06,
      marginBottom: widht * 0.08,
      justifyContent: 'space-between'
    },
    videoText: {
      fontSize: 12,
      color: theme.BLACK,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
    },
    videoView: {
      backgroundColor: theme.ICON_TINT,
      borderRadius: widht * 0.05,
      paddingHorizontal: widht * 0.01,
      paddingVertical: widht * 0.01,
    },
    videoPress: {
      paddingVertical: widht * 0.015,
      paddingHorizontal: widht * 0.018,
      borderRadius: widht * 0.05,
      backgroundColor: theme.PRIMARY
    },
    consultanNumber: {
      fontSize: 27,
      color: theme.BLACK,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
    },
    consultanRupeeNumber: {
      fontSize: 27,
      color: theme.BLACK,
    },
    consultanText: {
      fontSize: 16,
      color: theme.BLACK,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
    },
    calendarView: {
      flex: 1, backgroundColor: theme.PAGINATION_SELECCT,
      alignItems: 'center',
      borderRadius: widht * 0.02,
      marginVertical: widht * 0.02
    },
    calendarData: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
    },
    leftArrow: {
      top: 5, padding: 5, marginLeft: widht * 0.01
    },
    rightArrow: {
      top: 5, padding: 5, marginRight: widht * 0.01
    },
    renderView: {
      height: verticalScale(60),
      width: verticalScale(60),
      marginRight: widht * 0.05,
      borderRadius: verticalScale(50),
      backgroundColor: 'rgba(255,255,255,0.2)',
      alignItems: 'center', justifyContent: 'center',
      marginTop: height * 0.01,
      overflow: 'hidden',
      padding: verticalScale(10)
    },
    appointText: {
      fontSize: 14,
      color: theme.BLACK,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
    },
    renderTitle: {
      fontSize: 18,
      color: theme.PRIMARY,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
    },
    renderMonth: {
      fontSize: 10,
      color: theme.PRIMARY,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
      marginTop: -4
    },
    renderDay: {
      fontSize: 8,
      color: theme.PRIMARY,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
      backgroundColor: 'rgba(255,255,255,0.2)',
      paddingHorizontal: 4,
      marginBottom: -2
    },
    renderTimeView: {
      flexDirection: 'row',
      backgroundColor: 'rgba(255,255,255,0.2)',
      margin: scale(8),
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: widht * 0.02
    },
    renderTimeText: {
      fontSize: 10,
      color: theme.PRIMARY,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
      padding: scale(6)
    },
    saveButton: {
      marginTop: widht * 0.02,
      alignSelf: "center",
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.PAGINATION_SELECCT,
      width: '100%',
      borderRadius: 15,
      paddingVertical: 20,
      marginBottom: Platform.OS === 'ios' ? 20 : 50,
    },
    aboutText: {
      fontSize: 16,
      color: theme.BLACK,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
      marginTop: widht * 0.06,
      marginBottom: widht * 0.01
    },
    divider: {
      width: widht, borderWidth: 0.5,
      marginLeft: - widht * 0.05,
      marginVertical: widht * 0.04,
      borderColor: theme.LIGHT_GRAY
    },
    tickView: {
      marginTop: widht * 0.01,
      width: widht * 0.06,
      alignSelf: 'flex-start'
    },
    tickTop: {
      marginTop: widht * 0.02
    },
    faqIcon: {
      marginTop: widht * 0.01,
      width: widht * 0.08,
      alignSelf: 'flex-start'
    },
    faqView: {
      marginBottom: widht * 0.02
    },
    iconWidth: {
      width: scale(20)
    }
  });
};

export default Style;