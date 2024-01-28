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
    subContainer: {
      flex: 1,
      backgroundColor: theme.SELECTED,
      marginTop: 15,
      paddingHorizontal:20
    },
    sosButtonContainer:{
      justifyContent:'center',
      marginVertical:Platform.OS === 'ios' ? 20 :17
    },
    headerTitleText:{
      color:theme.GRAY_BLACK,
      fontSize:16,
      fontFamily:FONTFAMILY.POPPINS_MEDIUM
    },
    addCriticalText:{
      position: 'absolute',
      color: theme.PRIMARY,
      fontFamily:FONTFAMILY.POPPINS_MEDIUM,
      fontSize:13,
      top: 40,
      left: Platform.OS === 'ios' ? isIphoneX() ? 28 : 10 :25
    },
    addSOSText:{
      position: 'absolute',
      fontSize: 16, 
      color: theme.PRIMARY,
      fontFamily:FONTFAMILY.POPPINS_MEDIUM,
      top: 20,
      left: Platform.OS === 'ios' ? isIphoneX() ? 28 : 10 : 25
    },
    feverRangeVw:{
      backgroundColor:theme.PRIMARY,
      borderRadius:15,
      paddingHorizontal:20,
      paddingVertical:15
    },
    feverDescriptionVw:{
      flexDirection:'row',
      alignItems:'center'
    },
  
    feverDes:{
      marginLeft:10, 
      width:'75%'
    },
    commonText:{
      fontSize:24,
      fontFamily:FONTFAMILY.POPPINS_MEDIUM,
      color:theme.GRAY_BLACK
    },
    vitalRangeName:{
      fontSize:12,
      fontFamily:FONTFAMILY.POPPINS_REGULAR,
      color:theme.SUB_TITLE,
      marginTop: Platform.OS === 'ios' ? -2 :-7
    },
    seeAllContainer:{
      position:'absolute',
      right:0
    },
    seeAllText:{
      color:'#2a9be8',
      fontSize:14,
      fontFamily:FONTFAMILY.POPPINS_REGULAR
    },    
    
  });
};

export default Style;