/**
 * LanguageSelection style
 * @Author: Anand R
 * @Date: Wed Nov 17 2021 23:35:26 GMT+0530 (India Standard Time)
 * @Desc: Styling of View
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
    container: {
      flex: 1,
      backgroundColor: theme.PRIMARY
    },
    totalReviewsVw: {
      flexDirection: 'row',
      alignItems: 'center',
      // justifyContent:'center',
      backgroundColor: theme.SELECTED,
      // borderRadius:40,
      // marginHorizontal:20,
      paddingVertical: 12,
      paddingHorizontal: 20
      // marginVertical:8
    },
    headerTitle: {
      fontSize: 18,
      color: theme.GRAY_BLACK,
      fontFamily: FONTFAMILY.POPPINS_SEMIBOLD,
      lineHeight: 24
    },
    totalRateText: {
      fontSize: 15,
      color: theme.GRAY_BLACK,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
    },
    extraText: {
      marginLeft: 5,
      width: '30%'
    },
    itemContainer: {
      marginHorizontal: 20,
      paddingVertical: 15,
      borderBottomColor: theme.BORDER_COLOR,
      borderBottomWidth: 1
    },
    infoVw: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: Platform.OS === 'ios' ? -2 : -6
    },
    patientImageStyle: {
      width: 42,
      height: 42,
      borderRadius: 10
    },
    desContainer: {
      marginHorizontal: 7,
      width: '80%'
    },
    cancerDesText: {
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      color: theme.SUB_TITLE,
      fontSize: 11,
    }
  });
};

export default Style;