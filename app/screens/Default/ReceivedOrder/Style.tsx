/**
 * ReviewOrder Component
 * @Author: Astha
 * @Date: Wed April 19 2022 17:35:26 GMT+0530 (India Standard Time)
 * @Desc: Display Review Order 
 */

import { StyleSheet, Dimensions, Platform } from 'react-native';
const height = Dimensions.get('window').height;
const widht = Dimensions.get('window').width;
import { FONTFAMILY } from "../../../config/font-config";
import { isIphoneX } from '../../../lib/isIphoneX';

/**
 * style
 */
const Style = (theme: any) => {
  return StyleSheet.create({
    headerTxt: {
      fontSize: 18,
      color: theme.GRAY_BLACK,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
    },
    orderDesText: {
      fontSize: 16,
      color: theme.BLACK,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      paddingHorizontal: 30,
      marginTop: Platform.OS === 'ios' ? 15 : 10
    },
    orderDetails: {
      marginHorizontal: 20,
      paddingVertical: Platform.OS === 'ios' ? 10 : 5,
      flexDirection: 'row',
      alignItems: 'center',
      borderBottomWidth: 2,
      borderColor: '#dedede'
    },
    orderHeader: {
      width: '30%',
      fontSize: 14,
      color: theme.SUB_TITLE,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      marginLeft: 8
    },
    orderContent: {
      fontSize: 14,
      color: theme.GRAY_BLACK,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM
    },
    orderDetailsVw: {
        borderColor:'aliceblue',
        borderTopWidth:8,
        borderBottomWidth:4,
        paddingTop: Platform.OS === 'android' ?  18 : 22,
        paddingBottom:Platform.OS === 'android' ?6 : 10 ,
        marginTop:15
    },
    cartItemContainer: {
      borderBottomWidth: 4,
      borderColor: 'aliceblue',
      paddingVertical:10,
    },
    cartItemVw: {
      marginHorizontal: 20,
      marginVertical: 10,
      height: 105,
      flexDirection: 'row',
    },
    cartImage: {
      height: 105,
      width: 105,
      resizeMode: 'contain',
      borderWidth: 1,
      borderColor:'#A2A2A2'
    },
    titleText: {
      fontSize: 14,
      color: theme.BLACK,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
    },
    qtyText: {
      fontSize: 12,
      color: theme.SUB_TITLE,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      marginTop: 5
    },
    priceTextCon: {
      position: 'absolute',
      right: 5,
      bottom: 6
    },
    priceText: {
      fontSize: 16,
      color: theme.GRAY_BLACK,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
    },
    priceRupeeText: {
      fontSize: 16,
      color: theme.GRAY_BLACK,
    },
    checkoutContainer: {
      paddingVertical: Platform.OS === 'ios' ? 10 : 8,
      paddingHorizontal:20
    },
    priseContainer: {
      flexDirection: "row",
      alignItems: 'center',
      paddingVertical: Platform.OS === 'ios' ? 6 : 4,
    },
    totalCountItems: {
      fontSize: 13,
      color: theme.GRAY_BLACK,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
    },
    totalPriseCon: {
      position: 'absolute',
      right:0,
    },
    totalRupeePrise: {
      color: theme.BLACK,
      fontSize: 16,
    },
    totalPrise: {
      color: theme.BLACK,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
      fontSize: 16,
    },
    totalPrice: {
      position: 'absolute',
      right:0,
      color: theme.BLACK,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
      fontSize: 16,
    },
    checkoutButton: {
      borderRadius: 20,
      backgroundColor: 'dodgerblue',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 23,
      marginVertical: 30
    },
    checkoutText: {
      color: theme.PRIMARY,
      fontSize: 16
    },
  
    totalItem: {
      fontSize: 13,
      color: theme.GRAY_BLACK,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
    },
    PaidStamp:{
      position:'absolute',
      right: 20
    },
  });
};

export default Style;
