/**
 * Login style
 * @Author: Anand R
 * @Date: Fri Nov 12 2021 13:46:28 GMT+0530 (India Standard Time)
 * @Desc: Styling of View
 */

import { StyleSheet, Dimensions, Platform } from 'react-native';
import { FONTFAMILY } from "../../../config/font-config";

const height = Dimensions.get('window').height;
const widht = Dimensions.get('window').width;

/**
 * style
 */
const Style = (theme: any) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.PRIMARY
    },    
    content_container: {
      // flex: .25,
      alignItems: 'center',
      marginTop: 40
    },
    headerText: {
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      fontSize: 32,
      color: theme.GRAY_BLACK,
      marginTop: Platform.OS === 'ios' ? 30 : 25,
      marginBottom: Platform.OS === 'ios' ? 20 : 15
    },
    loginPlaceText: {
      color: theme.SUB_TITLE,
      fontSize: 18,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      textAlign: "center",
      paddingHorizontal:80
    },
    subHeaderText: {
      marginBottom: 20,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
      fontSize: 14,
      color: theme.GRAY_BLACK
    },
    inputBox: {
      borderBottomWidth: 2,
      borderBottomColor: '#d8d8d8',
      width: '95%',
      height: 38,
      backgroundColor: theme.PRIMARY,
      alignSelf: 'center',
      marginTop: Platform.OS === 'ios' ? 7 : 4,
    },
    textBoxInputStyle: {
      height: 65,
      backgroundColor: theme.PRIMARY,
      alignSelf: 'center',
      fontSize: 18,
      color: theme.GRAY_BLACK,
      width: Platform.OS === 'android' ? '100%' : '90%',
      paddingHorizontal: 15,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      textAlignVertical: 'center'
    },
    textBoxInputIOSStyle: {
      width: '90%',
      height: 61,
      borderWidth: 1,
      alignSelf: 'center',
      borderColor: theme.BORDER_COLOR,
      borderRadius: 10,
      overflow: 'hidden',
      backgroundColor: theme.PRIMARY,
      fontSize: 18,
      color: theme.GRAY_BLACK,
      paddingHorizontal: 15,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
    },
    referralCodeVw: {
      alignItems: 'center',
      justifyContent: 'center',
      height: 61
    },
    referralCodeContainer: {
      height: Platform.OS == 'android' ? 61 : 58,
      width: '90%',
      borderRadius: 10,
      borderWidth: 1,
      alignItems: 'center',
      justifyContent: 'center',
      borderBottomWidth: Platform.OS === 'ios' ? 0.2 : 0.1,
      borderColor: theme.BORDER_COLOR,
      backgroundColor: theme.PRIMARY,
      alignSelf: 'center',
      ...Platform.select({
        ios: {
          shadowColor: 'grey',
          shadowOffset: { width: 1, height: 3 },
          shadowOpacity: 0.4,
        },
        android: {
          elevation: 10,
        },
      }),
    },
    commonText: {
      color: theme.GRAY_BLACK,
      fontSize: 16,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,      
    },
    referralCode: {
      width: '85%',
      marginTop: Platform.OS == 'android' ? 4 : 0,
      // height: 48
    },
    referralCodeText: {
      color: theme.SECONDARY,
      fontSize: 14,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      textAlign: 'center',
      textDecorationLine:'underline'
    },
    closeImageVw: {
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      right: 5,
      top: Platform.OS === 'ios' ? 7 : 20
    },
    footerContainer: {
      width: '100%',
      marginTop: Platform.OS === 'ios' ? 0 : 4
    },
    btn: {
      justifyContent: 'center',
      backgroundColor: 'red'
    },
    btnLgradient: {
      width: '100%',
      paddingVertical: 20
    },
    termStyle: {
      color: theme.SUB_TITLE,
      fontSize: 14,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      textAlign: 'center'
    },
    image: { width: 50, height: 50 },
    cardStyle: { flex: 1, margin: 15, height: 130, backgroundColor: theme.PRIMARY, borderRadius: 5, justifyContent: 'center', alignItems: 'center' },
    textInput: {
      color: theme.BLACK,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      lineHeight: 80,
    },
    sideDash: {
      height: '80%',
      borderWidth: 0.5,
      marginHorizontal: 0,
      justifyContent: 'center',
    },
    invalidText: {
      color: theme.RED,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      paddingBottom: 5,
      paddingTop: Platform.OS === 'ios' ? 5 : 2
    },
    helpContainer: {
      flex: 1,
      justifyContent: 'flex-end',
      marginBottom: 30
    },
    helpVw: {
      backgroundColor: theme.PRIMARY,
      justifyContent:"center",
      alignItems:"center", 
      flexDirection:"row"
    },
    helpLineView: {
      flexDirection:"row", 
      marginTop:5,
      alignItems:"center"
    },
    helpLineText: {
      color: theme.SUB_TITLE,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      fontSize: 14,
      alignSelf:'center'
    },
    iconStyle: {
      height:15, 
      width:15, 
      marginHorizontal: 5
    }
  });
};

export default Style;
