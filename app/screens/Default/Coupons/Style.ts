/**
 * Coupons style
 * @Author: Anand R
 * @Date: Tue Sep 20 2022 18:28:03 GMT+0530 (India Standard Time)
 * @Desc: Styling of View
 */

import {StyleSheet, Dimensions} from 'react-native';
import {FONTFAMILY} from '../../../config/font-config';
const height = Dimensions.get('window').height;
const widht = Dimensions.get('window').width;

/**
 * style
 */
const Style = (theme: any) => {
  return StyleSheet.create({
    container: {
      backgroundColor: theme.PRIMARY,
      width: '100%',
      height: '100%',
    },

    couponAvailContainer: {
      paddingHorizontal: 20,
      paddingVertical: 10,
      flexDirection: 'row',
      backgroundColor: theme.LIGHT_BLUE,
      width: '100%',
    },
    couponAvailableText: {
      fontSize: 18,
      fontFamily: FONTFAMILY.POPPINS_SEMIBOLD,
      color: theme.BLACK,
      marginLeft: 8.4,
    },
    cardContainer: {
      marginTop: 20,
      paddingHorizontal: 20,
    },
    inputContainer:{
      flexDirection:'row',
      borderBottomWidth: 1,
      borderBottomColor: '#999999',
      alignItems:'center',
      justifyContent:'space-between',
      marginHorizontal:20,
      marginBottom: 24
    },
    input: {
      // marginHorizontal:10,
      height: 50,
      // margin: 12,
      // padding: 10,
    },
    getOffText: {
      fontSize: 16,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
      color: theme.BLACK,
    },
    validText: {
      fontSize: 12,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
      color: theme.SUB_TITLE,
    },
    couponCodeContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 9,
      marginBottom: 12,
    },
    couponCode: {
      borderStyle: 'dotted',
      borderWidth: 1,
      backgroundColor: theme.LIGHT_BLUE,
      borderColor: theme.SECONDARY,
      borderRadius: 5,
      paddingHorizontal: 14,
      paddingVertical: 4,
    },
    codeText: {
      fontSize: 16,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
      color: theme.SECONDARY,
    },
    applyText: {
      fontSize: 12,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
      color: theme.SECONDARY,
    },
    moreText: {
      fontSize: 12,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
      color: theme.GREEN,
    },
    dividerLine: {
      backgroundColor: theme.LIGHT_GREY,
      height: 2,
      width: '91%',
      marginTop: 5,
      alignSelf: 'center',
    },
  });
};

export default Style;
