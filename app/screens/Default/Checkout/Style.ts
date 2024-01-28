/**
 * Checkout Component
 * @Author: Astha
 * @Date: Wed April 19 2022 17:35:26 GMT+0530 (India Standard Time)
 * @Desc: Display Checkout List 
 */

import { StyleSheet, Dimensions, Platform } from 'react-native';
import { color } from 'react-native-reanimated';
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
      height: 50,
    },
    headerTxt: {
      fontSize: 18,
      color: theme.GRAY_BLACK,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
    },
    mainHeaderText: {
      fontSize: 16,
      color: theme.GRAY_BLACK,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      marginTop: 15,
      marginBottom: 5
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 10
    },
    commonInput: {
      width: '49%',
      backgroundColor: theme.PRIMARY,
      borderRadius: 10,
      height: 50,
      paddingHorizontal: 15,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      color: theme.GRAY_BLACK,
      fontSize: 14
    },
    commonDropVw: {
      flexDirection: 'row',
       alignItems: 'center',
        width: '100%', 
        borderRadius: 10,
      height: 50,
      backgroundColor: theme.PRIMARY,
      paddingHorizontal: 15,
    },
    commonDropInput: {
      //fontFamily: FONTFAMILY.POPPINS_REGULAR,
      //color: theme.GRAY_BLACK,
      //fontSize: 14,
      marginRight: 15,
      width:"100%"
    },
    commonAddView: {
      flexDirection:"row",
      backgroundColor: theme.PRIMARY,
      borderRadius: 10,
      height: 50,
      paddingHorizontal: 15,
      marginVertical: 20,
      alignItems: 'center',
      justifyContent: 'space-between',
      ...Platform.select({
        ios: {
          shadowColor: 'grey',
          shadowOffset: {width: 3, height: 3},
          shadowOpacity: 0.4,
          shadowRadius: 3,
        },
        android: {
          elevation: 3,
        },
      }),
    },
    commonBigInput: {
      backgroundColor: theme.PRIMARY,
      borderRadius: 10,
      height: 50,
      paddingHorizontal: 15,
      marginTop: 10,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      color: theme.GRAY_BLACK,
      fontSize: 14
    },
    checkoutContainer: {
      paddingHorizontal: 30,
      backgroundColor: theme.PRIMARY
    },
    priseContainer: {
      flexDirection: "row",
      alignItems: 'center',
      paddingVertical: 20,
    },
    totalCountItems: {
      fontSize: 14,
      color: theme.SUB_TITLE,
      fontFamily: FONTFAMILY.REGULAR,
    },
    totalPrise: {
      position: 'absolute',
      right: 0,
      color: theme.GRAY_BLACK,
      fontFamily: FONTFAMILY.BOLD,
      fontSize: 22,
    },
    checkoutButton: {
      borderRadius: 20,
      backgroundColor: theme.SECONDARY,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 23,
      marginVertical: 20
    },
    checkoutText: {
      color: theme.PRIMARY,
      fontFamily: FONTFAMILY.REGULAR,
      fontSize: 18,
    },
    txtContainer: {
      backgroundColor: theme.INPUT_BG,
      paddingHorizontal: 20,
      borderRadius: 15,
      width: '80%',
      alignSelf: 'center',
      marginTop: 25
    },
    btnView: {
      borderRadius: 10,
      backgroundColor: theme.SECONDARY,
      marginTop: 20,
      height: 50,
      alignItems: 'center',
      justifyContent:"center",
      marginBottom: Platform.OS === 'ios' ? 25 : 15
    },
    btnTxt: {
      textAlign: 'center',
      fontSize: 16,
      color: theme.PRIMARY,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
    },
    addressContainer: {
      padding: 15,
      width: widht - 50,
      margin: 10,
      borderRadius:10,
      flexDirection:"row",
      backgroundColor: theme.PRIMARY,
      ...Platform.select({
        ios: {
          shadowColor: 'grey',
          shadowOffset: {width: 3, height: 3},
          shadowOpacity: 0.4,
          shadowRadius: 3,
        },
        android: {
          elevation: 3,
        },
      }),
    },
    defaultAdd: {
      fontSize: 14,
      color: theme.GRAY_BLACK,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
      marginTop: 8,
      marginBottom:5,
      marginHorizontal: 5,  
    },
    addressUserName: {
      fontSize: 14,
      color: theme.GRAY_BLACK,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
      //paddingHorizontal: 20,  
    },
    allDescText: {
      fontSize: 14,
      color: theme.SUB_TITLE,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
     // width: '80%',
      lineHeight: 20,
     // paddingHorizontal: 20,
    },
    changeAddressVw:{
      borderColor:theme.SECONDARY,
      borderWidth:1.5,
      borderRadius:20,
      marginHorizontal: 10,
      height: 50,
      width:widht/3,
      alignItems:'center',
      justifyContent:'center',
      marginVertical: Platform.OS === 'android' ? 15 : 17,
      alignSelf:"flex-end"
    },
    changeAddText:{
      color:theme.SECONDARY,
      fontSize:12,
      fontFamily:FONTFAMILY.POPPINS_MEDIUM
    },
  });
};

export default Style;
