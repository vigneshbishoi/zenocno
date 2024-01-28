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
      backgroundColor: theme.SELECTED
    },
    headerTxt: {
      fontSize: 16,
      color: theme.GRAY_BLACK,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
      width: '70%',
      textAlign: 'center'
    },
    commonView: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 47
    },
    commonText: {
      fontSize: 13,
      color: theme.GRAY_BLACK,
      fontFamily: FONTFAMILY.POPPINS_REGULAR
    },
    starStyle: {
      color: theme.RED_COLOR,
      fontSize: 16
    },
    commonInputStyle: {
      backgroundColor: theme.PRIMARY,
      borderColor: theme.SECONDARY,
      borderWidth: 0.4,
      borderRadius: 10,
      padding: 20,
      marginBottom: 10,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      color: theme.GRAY_BLACK,
      fontSize: 15
    },
    extraInputStyle: {
      height: 320,
      marginTop: 5,
      paddingTop: 20,
      textAlignVertical: 'top'
    },
    reviewInput: {
      marginBottom: 10,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      color: theme.GRAY_BLACK,
      fontSize: 15

    },
    submitButtonVw: {
      backgroundColor: theme.SECONDARY,
      borderRadius: 10,
      alignItems: 'center',
      paddingVertical: Platform.OS === 'ios' ? 15 : 13,
      marginTop: 55
    },
    nameExtraStyle: {
      paddingVertical: Platform.OS === 'ios' ? 14 : 11,
      paddingHorizontal: 20,
      marginTop: 5
    },
    borderLine: {
      height: 1,
      width: '100%',
      backgroundColor: theme.BORDER_GREAY
    }
  });
};

export default Style;