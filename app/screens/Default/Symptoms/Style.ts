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
      justifyContent: 'center',
      paddingHorizontal: widht * 0.03,
      width: widht
    },
    headerText: {
      fontSize: 16,
      color: theme.GRAY_BLACK,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM
    },
    tipsIconVw: {
      padding: 5,
      position: 'absolute',
      right: 0
    },
    arrowButton: {
      padding: 5,
      position: 'absolute',
      left: widht * 0.03,
      zIndex: 2
    },
    saveButton: {
      width: widht * 0.9,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.PAGINATION_SELECCT,
      borderRadius: 15,
      height: verticalScale(57)
    },
    scrollStyle: {
      marginBottom: height * 0.1
    },
    buttonView: {
      height: height * 0.15, width: widht * 0.9,
      position: 'absolute', zIndex: 5,
      bottom: 0, alignItems: 'center',
      alignSelf: 'center',
      justifyContent: 'center', flexDirection: "row"
    },
    iconStyle: { height: 20, width: 16 },
    saveBtn: {
      fontSize: 16,
      color: theme.PRIMARY,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM
    },
    questionView: {
      marginHorizontal: scale(20),
      marginBottom: verticalScale(20)
    },
    extraTop: {
      marginTop: verticalScale(12)
    },
    sliderText: {
      // position: 'absolute',
      textAlign: 'center',
      // marginTop: scale(25),
      color: theme.SUB_TITLE
    },
    sliderMainView: {
      alignItems: 'center',
      position: 'absolute',
      backgroundColor: 'transparent'
    },
    sliderThum: {
      height: scale(20),
      width: scale(20),
      backgroundColor: 'transparent'
    },
    sliderTracker: {
      height: scale(5),
      backgroundColor: 'transparent'
    },
    lowText: {
      fontSize: 12,
      color: theme.MEDIUM_GRAY,
      fontFamily: FONTFAMILY.POPPINS_REGULAR
    },
    lowView: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    listStyle: {
      marginBottom: height * 0.1,
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
    headerVw: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      height: 50,
      width: widht,
      flex: 1
    },
    backVw: {
      position: "absolute",
      left: 0,
      padding: 5,
      marginLeft: -5,
      zIndex: 2
    },
    monthName: {
      fontSize: 18,
      color: "black"
    },
    calendar: {
      flexDirection: 'row',
      flex: 1,
      paddingLeft: scale(30), justifyContent: 'space-between'
    },
    modalContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    tipsModalVw: {
      width: widht - 30,
      borderRadius: 10,
      backgroundColor: theme.PRIMARY,
      paddingHorizontal: 25,
    },
    modalTitleText: {
      color: theme.GRAY_BLACK,
      fontSize: 16,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
      paddingTop: 25
    },
    modalDesText: {
      color: theme.GRAY_BLACK,
      fontSize: 12,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      marginTop: Platform.OS === 'ios' ? 8 : 5,
    },
    closeImageVw: {
      padding: 5,
      position: 'absolute',
      right: 10,
      top: 10
    },
    closeImg: {
      height: 10,
      width: 10
    }
  });
};

export default Style;
