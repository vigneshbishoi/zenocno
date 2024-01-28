/**
 * ProfilesMatch Component
 * @Author: Astha
 * @Date: Wed April 18 2022 17:35:26 GMT+0530 (India Standard Time)
 * @Desc: Display Profile Match
 */

import { StyleSheet, Dimensions , Platform} from 'react-native';
const height = Dimensions.get('window').height;
const widht = Dimensions.get('window').width;
import { FONTFAMILY } from "../../../config/font-config";
import { isIphoneX } from '../../../lib/isIphoneX';

/**
 * style
 */
const Style = (theme: any) => {
  return StyleSheet.create({
    userProfileVw: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      //marginEnd: 20,
      width:"75%",
    },
    userName: {
      color: theme.GRAY_BLACK,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
      fontSize: 16,
    },
    cartIcon: {
      width: 23,
      height: 23,
      resizeMode: 'contain'
       },
    cartText: {
      color: theme.PRIMARY,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      fontSize: 9,
      //alignSelf: 'center',
      textAlign:'center'
    },
    dateTitle:{
      backgroundColor:"#E6F3FC",
      width:"100%",
      padding:10,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
      fontSize: 14,
      color: theme.GRAY_BLACK,
    },
    cartItemContainer: {
      borderBottomWidth: 4,
      borderColor: 'aliceblue',
      backgroundColor:"white"
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
    },
    titleText: {
      fontSize: 14,
      color: theme.BLACK,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
    },
    qtyText: {
      fontSize: 14,
      color: theme.SUB_TITLE,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
    },
    priceText: {
      fontSize: 16,
      color: theme.BLACK,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
    },
    priceRupeeText: {
      fontSize: 16,
      color: theme.BLACK,
    },
    checkoutContainer: {
      paddingHorizontal: 30,
      backgroundColor: theme.PRIMARY
    },
    priseContainer: {
      flexDirection: "row",
      alignItems: 'center',
      paddingVertical: 30,
    },
    totalCountItems: {
      color: theme.BLACK,
      fontSize: 16,
    },
    totalPrise: {
      position: 'absolute',
      right: 0,
      color: theme.BLACK,
      fontSize: 24,
      fontWeight: 'bold'
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
  
    addRemoveItemContainer: {
      paddingVertical: 3,
      flexDirection: 'row',
      alignItems: 'center',
    },
    addRemoveItem: {
      width: 24,
      height: 24,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#108fe5',
    },
    addRemoveText: {
      fontWeight: 'bold',
      textAlign: 'center',
      fontSize: 14,
      color: theme.PRIMARY
    },
    totalItem: {
      fontSize: 13,
      color: theme.GRAY_BLACK,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
    },
    priseText:{
      color: theme.SUB_TITLE,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
      fontSize: 12,
      marginRight:5
    },
    priseRupeeText:{
      color: theme.SUB_TITLE,
      fontSize: 12,
      marginRight:5
    },
  });
};

export default Style;
