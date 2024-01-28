/**
 * Ecommerce Component
 * @Author: Astha
 * @Date: Wed April 18 2022 17:35:26 GMT+0530 (India Standard Time)
 * @Desc: Style Products
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
    headerVw: {
      backgroundColor: theme.SELECTED,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 10,
      height: 40,
      //  position: 'absolute',
      //  top: 0,
      //  left: 0,
      // right:0
    },
    headerTxt: {
      fontSize: 18,
      fontWeight: 'bold',
      color: theme.BLACK
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
      textAlign: 'center'
    },
    topicContainer: {
      marginRight: 10,
    },
    topicItem: {
      paddingHorizontal: 20,
      // backgroundColor: theme.LIGHT_BLUE,
      //borderColor: '#d4d4d4',
      flexDirection: 'row',
      alignItems: 'center',
      //borderWidth: 1,
      borderRadius: 10,
      height: 48,
      // ...Platform.select({
      //   ios: {
      //     shadowColor: 'grey',
      //     shadowOffset: {width: 3, height: 3},
      //     shadowOpacity: 0.4,
      //     shadowRadius: 3,
      //   },
      //   android: {
      //     elevation: 3,
      //   },
      // }),
    },
    selectedItemBG: {
      backgroundColor: theme.LIGHT_BLUE,
    },
    topicIcon: {
      width: 8,
      height: 8,
      resizeMode: 'contain',
      marginRight: 5,
    },
    topicTitle: {
      fontSize: 14,
      color: theme.GRAY_BLACK,
      fontFamily: FONTFAMILY.POPPINS_SEMIBOLD,
    },
    selectedTopicTitle: {
      color: theme.SECONDARY
      // color:theme.PRIMARY
    },
    offerImg: {
      height: 225,
      width: widht,
      // alignSelf:'center',
      // marginTop: 0,
      // paddingHorizontal:20,
      // resizeMode: 'contain'
    },
    headerText: {
      fontSize: 20,
      color: theme.GRAY_BLACK,
      fontFamily: FONTFAMILY.MEDIUM,
    },
    topProductItemContainer: {
      width: (Dimensions.get('window').width / 2),
      height: 369,
      //maxHeight:420,
      borderColor: '#d4d4d4', borderWidth: 1,
      padding: 5
    },
    topProductItem: {
      backgroundColor: theme.PRIMARY,
      height: "100%"
    },

    productImg: {
      height: 189,
      width: '100%',
      resizeMode: 'contain',
      alignSelf: 'center',
      borderWidth: 1,
      borderColor: "#A2A2A2",
    },
    itemTexts: {
      marginLeft: 15,
      marginRight: 10,
      paddingVertical: 5,
    },
    itemName: {
      color: theme.GRAY_BLACK,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
      fontSize: 12,
      marginRight: 15,
      marginTop: 3,
      width: "100%",
      // height: 40,
    },
    itemType: {
      color: theme.SUB_TITLE,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      fontSize: 12,
      width: "100%",
    },
    priseDisVw: {
      flexDirection: 'row',
      alignItems: 'center',
      width: "100%",
      marginTop: Platform.OS === 'ios' ? 5 : 2,
    },
    priceContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: "100%",
      marginTop: Platform.OS === 'ios' ? 5 : 2,
    },
    ratingDisVw: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: Platform.OS === 'ios' ? 5 : 2,
      // alignSelf: 'center',
      // justifyContent: 'space-between',
      // backgroundColor:'red'
    },
    rattingText: {
      position: 'absolute', height: 20, left: 80, top: 0.2
    },
    priseText: {
      color: theme.SUB_TITLE,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      fontSize: 9,
    },
    priseRupeeText: {
      color: theme.SUB_TITLE,
      fontSize: 9,
    },
    actulPriseRupeeText: {
      color: theme.SUB_TITLE,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      fontSize: 9,
    },
    offText: {
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
      fontSize: 12,
      color: theme.LIGHT_GREEN
    },
    rateImage: {
      width: 10,
      height: 10,
      marginLeft: 7,
      resizeMode: "contain"
    },
    reviewText: {
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      fontSize: 12,
      color: theme.GRAY_BLACK,
      //marginLeft:3
    },
    rupeeText: {
      color: theme.BLACK,
      fontSize: 13,
    },
    disPriceText: {
      color: theme.BLACK,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
      fontSize: 13,
    },
    addtocartVw: {
      height: 38,
      borderWidth: 1.5,
      borderColor: theme.SECONDARY,
      borderRadius: 10,
      marginHorizontal: 15,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 3
    },
    newAddtocartVw: {
      height: 38,
      backgroundColor: theme.SECONDARY,
      borderColor: theme.SECONDARY,
      borderRadius: 4,
      marginRight: 15,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 3,
      paddingHorizontal: 15
    },
    mewAddtocartText: {
      color: theme.PRIMARY,
      fontSize: 12,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM
    },
    zenText: {
      color: theme.SECONDARY,
      fontSize: 12,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
    },
    filterText: {
      color: theme.GRAY_BLACK,
      fontSize: 12,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
    },
    addtocartText: {
      color: theme.PRIMARY,
      fontSize: 10,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM
    },
    foodImage: {
      height: 140,
      width: 140,
    },
    imgTitle: {
      width: 250,
      color: theme.PRIMARY,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      fontSize: 30,
      paddingLeft: 20
    },
    shopNowBG: {
      backgroundColor: theme.PRIMARY,
      borderRadius: 10,
      width: 80,
      paddingVertical: 5,
      marginLeft: 30,
      position: 'absolute',
      bottom: 15,
      left: 40,

    },
    shopNowText: {
      color: theme.SECONDARY,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      fontSize: 11,
      alignSelf: 'center',
    },
    addRemoveItemContainer: {
      paddingVertical: 3,
      marginHorizontal: 10,
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1.5,
      borderColor: '#e2e2e2',
      borderRadius: 10,
      // height: 38,s
      justifyContent: 'space-between',
      alignSelf: "flex-start",
      // marginTop: 3,
      backgroundColor: theme.SECONDARY
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
      fontSize: 15,
      color: theme.PRIMARY,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
    },
    imageSlide: {
      width: widht,
      height: "100%",
      resizeMode: 'contain',
      marginTop: 0
    },
    titleText: {
      color: '#0e65a1',
      paddingHorizontal: 10,
      fontSize: 20,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      marginTop: 10,
      textAlign: 'center',
    },
    trackVw: {
      width: 10,
      height: 10,
      borderRadius: 5,
      marginHorizontal: 10
    },
    emptyTextHeader: {
      flex: 1,
      // justifyContent:'center',
      //  alignItems: 'center',
    },
    emptyMsg: {
      color: theme.PRIMARY,
      fontSize: 16,
    },
    // 
    productInfo: {
      fontSize: 11,
      color: theme.SUB_TITLE,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
    },
    addtoCardButton: {
      paddingVertical: 10,
      paddingHorizontal: 10,
      borderRadius: 5,
      backgroundColor: theme.SECONDARY
    }
  });
};

export default Style;
