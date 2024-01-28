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
    commonText: {
      textAlign: 'center',
      fontSize: 12,
      color: theme.SUB_TITLE,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
    },
    doctorInfovw: {
      paddingHorizontal: 20,
      paddingTop: 15,
      flexDirection: 'row',
      paddingBottom: 10
    },
    doctorImage: {
      width: 58,
      height: 58,
      borderRadius: 10
    },
    doctorInfo: {
      marginLeft: 8,
      width: '85%'
    },
    doctorName: {
      fontSize: 15,
      color: theme.GRAY_BLACK,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM
    },
    expertizationText: {
      fontSize: 13,
      color: theme.GRAY_BLACK,
      fontFamily: FONTFAMILY.POPPINS_REGULAR
    },
    bottomLine: {
      height: 7,
      backgroundColor: theme.SELECTED
    },
    desContainer: {
      paddingHorizontal: 20,
      paddingVertical: 15
    },
    commonTexts: {
      fontSize: 12,
      color: theme.SUB_TITLE,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
    },
    flatlistStyle:{
      borderColor:theme.BORDER_COLOR,
      borderWidth:1,
      marginVertical:Platform.OS === 'ios' ? 12 :8,
    },
    reasonItemContainer:{
      borderBottomColor:theme.BORDER_COLOR,
      borderBottomWidth:1,
      paddingVertical:Platform.OS === 'ios' ? 12 :10,
      flexDirection:'row',
      alignItems:'center',
      paddingHorizontal:10
    },
    unselectedVw:{
      width:19,
      height:19,
      borderRadius:19/2,
      borderColor:theme.BORDER_COLOR,
      borderWidth:1
    },
    selectedVw:{
      borderWidth:0,
      backgroundColor:theme.SECONDARY
    },
    cancelButtonVw:{
      borderRadius:10,
      backgroundColor:'#bfbfbf',
      alignItems:'center',
      paddingVertical:Platform.OS === 'ios' ? 17 :14,
      marginVertical:Platform.OS === 'ios' ? 20 :15,
    },
    wantCancelText:{
      fontSize: 16,
      color: theme.PRIMARY,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
    }
  });
};

export default Style;
