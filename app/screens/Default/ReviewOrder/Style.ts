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
import { scale, verticalScale } from 'react-native-size-matters';
/**
 * style
 */
const Style = (theme: any) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.SELECTED
    },
    
    headerTxt: {
      fontSize: 18,
      color: theme.GRAY_BLACK,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
    },
    downPressable: {
      right: 30,
      position: 'absolute'
    },
    downIcon: {
      width: 11,
      height: 6,

    },
    checkoutContainer: {
      paddingVertical: 20,
    },
    orderedUserName: {
      fontSize: 14,
      color: theme.GRAY_BLACK,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
      paddingVertical: 5,
      paddingHorizontal: 20,

    },
    changeAddressVw: {
      borderColor: theme.SECONDARY,
      borderWidth: 1.5,
      borderRadius: 10,
      marginHorizontal: 20,
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: Platform.OS === 'android' ? 15 : 17
    },
    changeAddText: {
      color: theme.SECONDARY,
      fontSize: 16,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM
    },
    orderSummaryVw: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 15,
      paddingHorizontal: 20,
    },
    allDescView: {
      flexDirection: 'row',
    },
    allDescText: {
      fontSize: 12,
      color: theme.SUB_TITLE,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      width: '80%',
      lineHeight: 20,
      paddingHorizontal: 20,
    },

    paymentText: {
      fontSize: 18,
      color: theme.GRAY_BLACK,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      width: '70%',
      lineHeight: 20,
    },
    editSelectView: {
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      right: 5
    },
    editSelectIcon: {
      height: 24,
      width: 24,
    },
    unSelectPaymentView: {
      height: 22,
      width: 22,
      backgroundColor: theme.PRIMARY,
      borderWidth: 1,
      borderColor: 'dodgerblue',
      borderRadius: 11,
      position: 'absolute',
      right: 5
    },
    paymentSelectIconView: {
      backgroundColor: 'dodgerblue',
      borderRadius: 30,
    },
    paymentSelectIcon: {
      height: 20,
      width: 20,
      margin: 8,
      tintColor: theme.PRIMARY
    },
    paymentUnselectIconView: {
      backgroundColor: 'aliceblue',
      borderRadius: 30,
    },
    paymentUnselectIcon: {
      height: 44,
      width: 44,
      margin: 3,
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
      right: 0,
    },
    totalPrise: {
      color: theme.BLACK,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
      fontSize: 16,
    },
    totalPrice: {
      position: 'absolute',
      right: 0,
      color: theme.BLACK,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
      fontSize: 16,
    },
    totalRupeePrise: {
      color: theme.BLACK,
      fontSize: 16,
    },
    checkoutButton: {
      borderRadius: 10,
      backgroundColor: theme.SECONDARY,
      alignItems: 'center',
      justifyContent: 'center',
      height: 50,
      marginVertical: Platform.OS === 'ios' ? 25 : 20,
      marginHorizontal: 30
    },
    checkoutText: {
      color: theme.PRIMARY,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
      fontSize: 16,
    },
    couponContainer: {
      paddingVertical: Platform.OS === 'ios' ? 6 : 4,
      paddingHorizontal: 20,
      backgroundColor: "white",
      marginVertical: 3,
    },
    couponText: {
      color: theme.GRAY_BLACK,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
      fontSize: 13,
      marginHorizontal: 5
    },
    commonBigInput: {
      backgroundColor: theme.PRIMARY,
      borderRadius: 10,
      borderColor: "#CECECE",
      borderWidth: 1,
      width: "75%",
      height:36,
      paddingVertical: 5,
      paddingHorizontal: 15,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      color: theme.GRAY_BLACK,
      fontSize: 14
    },
    redeemBtn: {
      width: "20%",
      backgroundColor: "#EFF9FF",
      borderColor: "#9AD6FF",
      borderWidth: 1,
      borderRadius: 4,
      height: 36,
      alignItems: "center",
      justifyContent: "center"
    },
    removeBtn: {
      width: "20%",
      height: 36,
      alignItems: "center",
      justifyContent: "center"
    },
    redeemText: {
      color: "#108FE5",
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      fontSize: 13,
      marginHorizontal: 5
    },
    responseText: {
      color: "#666666",
      fontSize: 13,
      marginHorizontal: 5,
    },//------------------------------------
    appliedcouponVw:{ 
      flexDirection: "row", 
      justifyContent: "space-between", 
      alignItems: "flex-end" 
    },
    appliedCouponTextVw:{ 
      flexDirection: "column",
      marginVertical:2, 
      justifyContent: "space-between" 
    },
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0,0,0,0.54)"
    },
    modalView: {
      margin: 30,
      backgroundColor: "white",
      borderRadius: 22,
      paddingHorizontal: 35,
      paddingVertical: 10,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    closeVw: {
      position: 'absolute',
      padding: 10,
      right: 0
    },
    closeImage: {
      width: 15,
      height: 15
    },
    redeemImage: {
      width: 109,
      height: 68
    },
    button: {
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 30,
      elevation: 2,
      marginTop: 20,
      marginBottom: 10,
      backgroundColor: "#108FE5",
    },
    textStyle: {
      textAlign: "center",
      fontSize: 12,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      color: theme.PRIMARY,
    },
    modalTitle: {
      textAlign: "center",
      fontSize: 43,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
      color: theme.GRAY_BLACK,
    },
    modalText: {
      textAlign: "center",
      fontSize: 12,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
      color: theme.GRAY_BLACK,
    },
    modalSubText: {
      textAlign: "center",
      fontSize: 10,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      color: theme.SUB_TITLE,
    },
    scoreText: {
      fontSize: 12,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      color: theme.SUB_TITLE,
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
  });
};

export default Style;