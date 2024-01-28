/**
 * Community style
 * @Author: Astha
 * @Date: Wed April 14 2022 17:35:26 GMT+0530 (India Standard Time)
 * @Desc: Styling of View
 */

import { StyleSheet, Dimensions, Platform } from 'react-native';
const height = Dimensions.get('window').height;
const widht = Dimensions.get('window').width;
import { FONTFAMILY } from "../../../config/font-config";
import { isIphoneX } from '../../../lib/isIphoneX';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

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
      alignItems: "center",
      flexDirection: 'row',
      justifyContent:'center',
      paddingHorizontal: scale(10),
      width: widht,
      height: verticalScale(40),
      marginTop: verticalScale(5)
    },
    arrowButton: {
      padding: scale(5),
      position:'absolute',
      right:10
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
    renderItemTitle: {
      fontSize: scale(14),
      color: theme.GRAY_BLACK,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
    },
    renderItemDesc: {
      fontSize: scale(12),
      marginTop: Platform.OS == 'ios' ? 2 : 0,
      justifyContent: 'center',
      color: theme.GRAY_BLACK,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
    },
    renderShadow: {
      flex: 1,
      backgroundColor: theme.PRIMARY,
      overflow: "hidden",
      borderRadius: scale(10),
      flexDirection: 'row',
      marginHorizontal: scale(15),
      marginBottom: verticalScale(10),
    },
    renderImage: {
      width: scale(94),
      margin: scale(4),
      height: scale(94),
      borderRadius: scale(10)
    },
    renderData: {
      margin: widht * 0.025,
      justifyContent: 'space-between',
      flex: 1
    },
    bookButton: {
      backgroundColor: theme.PAGINATION_SELECCT,
      alignItems: 'center', justifyContent: 'center',
      borderRadius: widht * 0.02, padding: 0,
      height: height * 0.038
    },
    renderLocation: {
      color: theme.SUB_TITLE,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      fontSize: 12
    },
    bookText: {
      marginHorizontal: widht * 0.04,
      color: theme.PRIMARY
    },
    renderExperience: { flexDirection: 'row', flex: 1, alignItems: "center" },
    experienceMainView: { flex: 1, paddingRight: scale(2) },
    experienceView: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center'
    },
    locationIcon: {
      paddingLeft: scale(5)
    },
    emptyList: {
      flex: 1, alignItems: 'center', justifyContent: 'center',
      height: height * 0.8
    },
    emptyListMsg: {
      fontSize: widht * 0.035,
      color: theme.GRAY_BLACK,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
    },
    calendarView: {
      flex: 1, backgroundColor: theme.PAGINATION_SELECCT,
      alignItems: 'center',
      // transform: [{ rotateY: '180deg' }],
    },
    calendarClose: {
      position: 'absolute', right: 5, padding: 5,
      zIndex: 2
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
    iconWidth: {
      width: scale(15)
    },
    saveButton: {
      marginTop: widht * 0.02,
      alignSelf: "center",
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(255,255,255,0.2)',
      borderRadius: 15,
      paddingVertical: 15,
      marginBottom: 20,
      width:'90%'
    },
    arrowRightButton: {
      padding: scale(5),
      position:'absolute',
      right:10
    },
  });
};

export default Style;