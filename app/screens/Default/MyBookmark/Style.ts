/**
 * MyBookmark Component
 * @Author: Astha
 * @Date: Fri Jul 8 2022 17:35:26 GMT+0530 (India Standard Time)
 * @Desc: Display Bookmark post
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
    noActivityText:{
      fontSize:13,
      color:theme.GRAY_BLACK,
      fontFamily:FONTFAMILY.POPPINS_MEDIUM,
      textAlign: 'center',
     },
     emptyVw:{
      height: height - 100,
      width: widht,
      justifyContent:'center',
      alignItems: 'center'
     },
  });
};

export default Style;
