/**
 * ProfilesMatch Component
 * @Author: Astha
 * @Date: Wed April 18 2022 17:35:26 GMT+0530 (India Standard Time)
 * @Desc: Display Profile Match
 */

import { StyleSheet, Dimensions } from 'react-native';
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
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 10,
      height: 60
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
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
    },
    modalDesText: {
      color: theme.GRAY_BLACK,
      paddingVertical: 1,
      fontSize: 18,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
    },
    modalDesSubText: {
      color: '#666666',
      paddingVertical: 1,
      fontSize: 18,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
    },
    msgButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.SECONDARY,
      paddingVertical: 20,
      borderRadius: 10,
      marginVertical: 15,
      justifyContent: 'center',
    },
    messageIcon: {
      width: 20,
      height: 20,
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
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
    },
    textView: {
      flexDirection: 'row',
      paddingVertical: 8,
      alignItems: 'center'
    },
    text: {
      color: '#666666',
      fontSize: 16,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
    },
    subText: {
      color: '#333333',
      fontSize: 16,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
    },
    useDesText: {
      color: theme.GRAY_BLACK,
      fontSize: 16,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
      marginTop: 20,
    },
    userNameTxt: {
      fontSize: 16,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
      color: theme.GRAY_BLACK
    },
    cancerTypeTxt: {
      fontSize: 14,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
      color: theme.GRAY_BLACK
    },
    userTypeTxt: {
      fontSize: 13,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
      color: theme.GRAY_BLACK
    },
    seeMore: {
      fontSize: 13,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
      color: theme.SECONDARY
    },
    backButtonView: {
      backgroundColor: "rgba(0,0,0,0.4)",
      position: "absolute", padding: scale(4),
      borderRadius: scale(50),
      marginLeft: scale(10),
      marginVertical: verticalScale(15)
    },
    mainDetailView: {
      flex: 1,
      paddingHorizontal: scale(30),
      borderTopLeftRadius: scale(30),
      borderTopRightRadius: scale(30),
      backgroundColor: theme.PRIMARY,
      paddingTop: verticalScale(10),
      marginTop: verticalScale(-25)
    }
  });
};

export default Style;
