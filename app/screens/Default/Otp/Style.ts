/**
 * Otp style
 * @Author: Anand R
 * @Date: Thu Nov 18 2021 22:03:40 GMT+0530 (India Standard Time)
 * @Desc: Styling of View
 */

import { StyleSheet, Dimensions, Platform } from 'react-native';
const height = Dimensions.get('window').height;
const widht = Dimensions.get('window').width;
import { FONTFAMILY } from '../../../config/font-config';

/**
 * style
 */
const Style = (theme: any) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.PRIMARY,
    },
    imageWidht: {
      width: widht * .2,
      height: height * .2,
      resizeMode: 'contain'
    },
    imageContainer: {
      flex: .2,
      justifyContent: 'center', alignItems: 'center'
    },
    inputContainer: {
      alignItems: 'center',
      marginTop: 20
    },
    verifiCodeText: {
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      fontSize: 32,
      color: theme.GRAY_BLACK,
      marginTop: Platform.OS === 'ios' ? 30 : 25,
      marginBottom: Platform.OS === 'ios' ? 20 : 15
    },
    typeContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: Platform.OS === 'ios' ? 15 : 10,
      marginBottom: Platform.OS === 'ios' ? 20 : 15
    },
    otpSent: {
      color: theme.SUB_TITLE,
      fontSize: 18,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      textAlign: "center",
     paddingHorizontal:80
    },
    number: {
      color: theme.GRAY_BLACK,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      marginStart: height * 0.01,
      fontSize: 18,
      alignSelf: 'center',
      marginTop: 5
    },
    input: {
      marginLeft: widht * 0.03,
      width: 21,
      height: 21,
    },
    otpInputContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: height * 0.01
    },
    otpIns: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
    },
    contentContainer: {
      flex: 1
    },
    logo_container: {
      marginTop: 15
    },
    backVw: {
      position: 'absolute',
      left: 0,
      top: 0,
      width: 50,
      height: 50,
      alignItems: 'center',
      justifyContent: 'center'
    },
    termStyle: {
      color: theme.SUB_TITLE,
      alignSelf: 'center',
      fontSize: 14,
      paddingRight: widht * 0.05,
      fontFamily: FONTFAMILY.POPPINS_REGULAR
    },
    resendOtp: {
      marginLeft: -15,
      alignSelf: 'center',
      fontSize: 14,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      color: theme.SECONDARY
    },
    btnContainer: {
      width: '90%',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 15,
      height: 61
    },
    btnLGradient: {
      width: '100%',
      borderRadius: 15,
      height: '100%'
    },
    sucMsgContainer: {
      flexDirection: 'column',
      flex: 1,
    },
    msgContainer: {
      flex: .2,
      justifyContent: 'center',
      alignItems: 'center'
    },
    msg: {
      justifyContent: 'center',
      alignItems: 'center',
      flex: .3,
    },
    msgText: {
      color: theme.DARK_GRAY,
      textAlign: 'center',
      fontSize: 20,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM
    },
    welcomText: {
      marginTop: 30,
      color: theme.DARK_GRAY,
      textAlign: 'center',
      fontSize: 24,
      fontFamily: FONTFAMILY.MEDIUM
    },
    image: { width: widht * .5, height: height * .5 },
    cardStyle: {
      flex: 1,
      margin: 15,
      height: 130,
      backgroundColor: theme.PRIMARY,
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center'
    },
    helpContainer: {
      flex: 1,
      justifyContent: 'flex-end',
      marginBottom: 30
    },
    helpVw: {
      backgroundColor: theme.PRIMARY,
      paddingHorizontal: 20,
      paddingVertical: 10,
      marginHorizontal: 20
    },
    helpLineText: {
      color: theme.SUB_TITLE,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      fontSize: 14,
      textAlign: 'center'
    },
    textStyle: {
      color: theme.GRAY_BLACK,
      fontSize: 24,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      marginTop: Platform.OS === 'android' ? 5 : 0,
    },
    cellStyle: {
      borderWidth: 1,
      borderRadius: 30,
      borderColor: theme.OTP_BORDER,
      // shadowColor: 'grey',
      // shadowOffset: {
      //   width: 0,
      //   height: 2,
      // },
      // shadowOpacity: 0.7,
    },
    helpLineView: {
      flexDirection:"row", 
      marginTop:5,
      alignItems:"center"
    },
  });
};

export default Style;
