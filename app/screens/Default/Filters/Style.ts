/**
 * Filters style
 * @Author: Anand R
 * @Date: Thu Sep 22 2022 16:54:49 GMT+0530 (India Standard Time)
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
      flex: 1,
      backgroundColor:theme.PRIMARY
    },
    subContainer: {
      flex: 1,
      // paddingHorizontal:20
    },
    headerTitle: {
      fontSize: 18,
      color: theme.GRAY_BLACK,
      fontFamily: FONTFAMILY.POPPINS_SEMIBOLD,
      lineHeight: 24,
    },
    headerClearAll: {
      fontSize: 16,
      color: theme.GRAY_BLACK,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      lineHeight: 26,
    },
    borderLine: {
      width: '100%',
      height: 1,
      backgroundColor: theme.LIGHT_BLUE_BORDER,
    },
    adjustcontainer: {
      height: 10,
      width: '100%',
    },
    filterTitleContainer:{
      backgroundColor:theme.SEMI_GRAY,
      padding:30,
      // width:'30%',
      alignItems:'center'
      // height:100
    },
    filterValueContainer:{
      width:'70%',
      marginLeft:10,
      // position:'absolute',
      // left: '32%',
      // top: -10      // alignItems:'center'
      // height:100
    },
    filterSubValueContainer:{
      flexDirection: 'row', alignItems: 'center', paddingVertical: 10
    },
    filterTitle:{
      fontSize: 12,
      color: theme.BLACK,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
    },
    filterVal:{
      fontSize: 12,
      color: theme.BLACK,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
    }
  });
};

export default Style;
