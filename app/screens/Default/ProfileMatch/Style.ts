/**
 * ProfilesMatch Component
 * @Author: Astha
 * @Date: Wed April 18 2022 17:35:26 GMT+0530 (India Standard Time)
 * @Desc: Display Profile Match
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
    headerVw: {
      backgroundColor: theme.SELECTED,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 10,
      height: 50
    },
    headerTxt: {
      color: theme.GRAY_BLACK,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
      fontSize: 16,
    },
    backImageView: {
      borderTopLeftRadius: 40,
      borderTopRightRadius: 40,
      overflow: 'hidden',
      marginTop: 15,
      marginBottom: 0,
    },
    backImage: {
      width: Dimensions.get('window').width - 10,
      height: '100%',
    },
    progressContainer: {
      width: 70,
      height: 70,
      position: 'absolute',
      alignItems: 'center',
      justifyContent: 'center',
      right: 25,
      top: 25,
    },
    modalTitle: {
      color: theme.GRAY_BLACK,
      paddingVertical: 1,
      fontSize: 24,
      fontFamily: FONTFAMILY.MEDIUM,
    },
    modalDesText: {
      color: theme.SUB_TILTLE,
      paddingVertical: 1,
      fontSize: 20,
      fontFamily: FONTFAMILY.REGULAR,
    },
    msgButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'dodgerblue',
      paddingVertical: 20,
      borderRadius: 20,
      marginVertical: 15,
      justifyContent: 'center',
    },
    messageIcon: {
      width: 15,
      height: 15,
      resizeMode: 'contain'
    },
    messageIcon1: {
      width: 22,
      height: 17,
      resizeMode: 'contain'
    },
    messageText: {
      marginLeft: 15,
      color: theme.PRIMARY,
      fontSize: 16,
      fontFamily: FONTFAMILY.REGULAR,
    },
    textView: {
      flexDirection: 'row',
      paddingVertical: 8,
      alignItems: 'center'
    },
    text: {
      color: theme.SUB_TILTLE,
      fontSize: 18,
      fontFamily: FONTFAMILY.REGULAR,
    },
    useDesText: {
      color: theme.GRAY_BLACK,
      fontSize: 20,
      fontFamily: FONTFAMILY.MEDIUM,
      marginTop: 35,
    },
    userNameTxt: {
      fontSize: 16,
      fontFamily: FONTFAMILY.MEDIUM,
      color: theme.GRAY_BLACK,
      marginVertical: verticalScale(2)
    },
    cancerTypeTxt: {
      fontSize: 14,
      fontFamily: FONTFAMILY.REGULAR,
      color: theme.GRAY_BLACK,
      marginVertical: verticalScale(2)
    },
    userTypeTxt: {
      fontSize: 14,
      fontFamily: FONTFAMILY.REGULAR,
      color: '#666666',
      marginVertical: verticalScale(2)
    },
    matchTxt: {
      fontSize: 10,
      fontFamily: FONTFAMILY.MEDIUM,
      color: theme.PRIMARY
    },
    optionView: {
      overflow: "hidden",
      flexDirection: 'row',
      marginVertical: 5,
      width: '98%',
      alignItems: "center",
      alignSelf: 'center',
      borderRadius: height * 0.01,
      backgroundColor: theme.PRIMARY,
      shadowColor: theme.LIGHT_GRAY,
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.32,
      shadowRadius: 5.46,
      elevation: 9
    },
    viewMatch: {
      position: "absolute",
      bottom: scale(2),
      backgroundColor: "#108FE5",
      borderTopStartRadius: height * 0.01,
      borderTopEndRadius: height * 0.01,
      alignSelf: 'center',
      padding: 5
    },
    renderImageView: {
      width: scale(90),
      height: scale(90),
      padding: scale(2),
      overflow: 'hidden',
      borderRadius: height * 0.01,
    },
    renderImage: {
      height: '100%',
      width: '100%',
      borderRadius: height * 0.01
    },
    emptyList: {
      height: height * 0.8,
      alignItems: 'center',
      justifyContent: 'center'
    },
    renderTextView: {
      flex: 1,
      marginLeft: scale(8),
      marginRight: scale(10),
      justifyContent: 'center'
    },
    backButton: { position: "absolute", left: scale(10), padding: scale(5) },
    serachView: {
      backgroundColor: theme.PRIMARY,
      height: height * 0.048,
      marginLeft: widht * 0.03,
      alignItems: 'center', width: '90%',
      flexDirection: 'row',
      paddingLeft: widht * 0.025,
      borderRadius: widht * 0.02,
    },
    textInput: { flex: 1, marginLeft: widht * 0.025, padding: 0 },
    closeIcon: { padding: widht * 0.025 },
  });
};

export default Style;
