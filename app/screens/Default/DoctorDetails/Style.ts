/**
 * LanguageSelection style
 * @Author: Anand R
 * @Date: Wed Nov 17 2021 23:35:26 GMT+0530 (India Standard Time)
 * @Desc: Styling of View
 */

import { StyleSheet, Dimensions, Platform } from 'react-native';
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
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
    headerVw: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      height: 50,
    },
    backVw: {
      position: "absolute",
      left: 0,
      width: 50,
      height: 50,
      alignItems: 'center',
      justifyContent: 'center'
    },
    headerTxt: {
      fontSize: 16,
      color: theme.GRAY_BLACK,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
      marginHorizontal: 40
    },
    selectionView: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.ICON_TINT,
      paddingHorizontal: 6,
      paddingVertical: 4,
      borderRadius: 25
    },
    tabSelectedView: {
      borderRadius: 15,
      backgroundColor: theme.PRIMARY,
      paddingHorizontal: 12,
      paddingVertical: 5
    },
    tabUnSelectedView: {
      paddingHorizontal: 12,
      paddingVertical: 5
    },
    tabText: {
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      fontSize: 11
    },

  });
};

export default Style;
